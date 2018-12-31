/*jslint node: true */
"use strict";
var fs = require('fs');
var crypto = require('crypto');
var util = require('util');
var constants = require('byteballcore/constants.js');
var conf = require('byteballcore/conf.js');
var objectHash = require('byteballcore/object_hash.js');
var desktopApp = require('byteballcore/desktop_app.js');
var db = require('byteballcore/db.js');
var eventBus = require('byteballcore/event_bus.js');
var ecdsaSig = require('byteballcore/signature.js');
var Mnemonic = require('bitcore-mnemonic');
var Bitcore = require('bitcore-lib');
var readline = require('readline');
var val = require('byteballcore/validation_utils.js');
var net = require('byteballcore/network.js');


var appDataDir = desktopApp.getAppDataDir();
var KEYS_FILENAME = appDataDir + '/' + (conf.KEYS_FILENAME || 'keys.json'); 
var wallet_id;
var xPrivKey;

var Provable = require('provable')


const TIMESTAMPER_ADDRESS = 'I2ADHGP4HL6J37NQAD73J7E5SKFIXJOT'; 
const FAKE_ADDRESS = 'XSSVKSCG27AINT4DOVABDMI6TC4QBDC6';
const CHANGE_ADDRESSES = ['V6UAYBIF5MJMQPWLP2YKWX4MUWIWUSH4', 'SZLRELSZUWFOWZMFP3NIRFXDABY3ZZJR', '4ZUZ5Y7DLEAEMERM6CRODU5EST73FGJD', 'ULUJXPQSXYPMML3554STECGFQRWUZBPO', 'Y3KUVL2S5I5YDPLDUOIEZDWMINV6EA4L', 'XSSVKSCG27AINT4DOVABDMI6TC4QBDC6', 'EFPIKZBZ7D7EKYDV2KLNYGFYDVYOPILE', 'EFEP6O6JBM7HGRXLG6Z2YOAVQIIIZEOF', '6FO2GM6SOCG2QYOVPQ5JWOIPYOCYHDAV', '4P635XKFOTAH5AUOODISH4SPPT2FKHNP', 'CLKSOCZPG5UXZFV2I465NBXEHOSQ5Q64', 'YOU2EEQSQ3QRDSSTJIVZL5QAHVSP3RHX', 'KADJM3KDN3P2X3JUV3QVX5722BDOQFME', 'O7WCVPUALD2GXXKLJ27HLOF7SA4GY3QP', 'N2WZZPZ46ZDHG5YDS7LDOQYNZHYWQREA'];
var change_index = 0;
const time_diff = 0;
const SALT = 'Changedthis'
const transitionbot = '05VFYLXXP3P2LNB3YMFOXD4UMPBJSNBV2';
var transitionbot_mute=false;

var start = false;
var locksending = false;
var lockjoining_4 = false;
var lockjoining_8 = false;
var lockjoining_32 = false;

var lockjoining_weekly = false;
var lockjoining_monthly = false;
var lockjoining_user = false;
var lockrefbonus = false;

var locktrading = false;
var lockpayment = false;

const ticketprice1 = "11";
const ticketprice10 = "108";
const ticketprice100 = "1050";
const jackpotbonus = 1000;
const jackbotfee = 0.8;
const referralbonustickets = 100;
const autoplaybonustickets = 25;

const noautojoin = { "amount4": 0, "amount8": 0, "amount32": 0 };
const newsettings = { "chat_messages": 1, "notifications": 1, "amount4": 0, "amount8": 0, "amount32": 0 }
const newaccount = { "name": 0, "tickets": 0, "settings": newsettings, "games": 0 };
const newachievment = { "name": "empty", "description": "empty", "tickets": 0, "xp": 0, "done":0 };

var allgames = { "active": [], "history": [], "own": [] };
var allstatistics = { "total_games": [], "total_users": [] };



// ======================================================= HTML Server Code


const path = require('path'),
	contentTypes = require('./utils/content-types'),
	sysInfo = require('./utils/sys-info'),
	env = process.env;


var fs = require('fs'),
	http = require('http'),
	https = require('https'),
	express = require('express');

var options = {
	key: fs.existsSync(conf.sslPath + 'privkey.pem') ? fs.readFileSync(conf.sslPath + 'privkey.pem') : null,
	cert: fs.existsSync(conf.sslPath + 'fullchain.pem') ? fs.readFileSync(conf.sslPath + 'fullchain.pem') : null
};


var app = express();

var server = https.createServer(options, app).listen(conf.webPort, function () {
	console.log("Express server listening on port " + conf.webPort);
});

var app = express();
app.listen(3000)


app.all('/*', function (req, res) {
	//res.writeHead(200);
	//res.end("hello world\n");

	var url = req.url;
	url = req.path;

	var ip = req.headers['x-forwarded-for'].split(',').pop() || req.connection.remoteAddress ||  req.socket.remoteAddress || req.connection.socket.remoteAddress;
	console.log("MyLog: got a http request from url: " + url + ' from ip: ' + ip);

	//if (ip === '219.106.131.244') {
	//    //res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	//    //res.setHeader('Expires', '-1');
	//    //res.setHeader('Pragma', 'no-cache');
	//    //res.setHeader('Content-Type', 'plain/text');
	//    //res.write('ip blocked (try again tomorrow)');
	//    //res.end();
	//    return 0;
	//}

	if (url == '/') {
		url += 'index.html';
	}

	// Check of each response

	if (url == '/health') {
		res.writeHead(200);
		res.end();
	}

	else if (url == '/statistics') {
		res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.setHeader('Expires', '-1');
		res.setHeader('Pragma', 'no-cache');
		res.setHeader('Content-Type', 'application/json');
		res.write(JSON.stringify(allstatistics));
		res.end();
	}

	else if (url == '/account/games') {

		function sendgames(games) {
			res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
			res.setHeader('Expires', '-1');
			res.setHeader('Pragma', 'no-cache');
			res.setHeader('Content-Type', 'application/json');
			res.write(JSON.stringify(games));
			res.end();
		}

		if (req.query.account) {
			var account = req.query.account;
			account = account.replace(/[^a-z0-9]/gi, ''); // replace any invalid char
			if (account.length != 64) { res.end('error 0'); return 0 };
			// i will have to check my owngames first
			getowngames(account, sendgames);

		} else { sendgames(allgames); }
	}

	else if (url == '/account/join') {

		function callback(text) {
			res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
			res.setHeader('Expires', '-1');
			res.setHeader('Pragma', 'no-cache');
			res.setHeader('Content-Type', 'plain/text');
			res.write(text);
			res.end();
		}

		if (req.query.account && req.query.type) {
			var account = req.query.account.replace(/[^a-z0-9]/gi, '');
			var type = req.query.type.replace(/[^0-9]/gi, '');

			if (account.length != 64) { res.end('error 0'); console.log("MyLog: rejected join for type: " + type + " from account: " + account); return 0; };
			if (type != '4' && type != '8' && type != '32' && type != '7') { res.end('error 1'); console.log("MyLog: rejected join for type: " + type + " from account: " + account); return 0; };
			// join a game! :)
			webjoin(account, type, callback);
			return 0;
		} else { res.end('error 5'); return 0; }
	}

	else if (url == '/account/get') {
		// check if i got a valid account id
		if (req.query.account) {

			function callback(data) {
				res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
				res.setHeader('Expires', '-1');
				res.setHeader('Pragma', 'no-cache');
				res.setHeader('Content-Type', 'application/json');
				res.write(JSON.stringify(data));
				res.end();
			}


			var account = req.query.account;
			account = account.replace(/[^a-z0-9]/gi, ''); // replace any invalid char
			if (account.length != 64) { res.end('error 0'); return 0 };

			if (req.query.type && req.query.value) {
				// Change Settings first
				var value = req.query.value.replace(/[^0-9]/gi, ''); // replace any invalid char;
				var type = req.query.type.replace(/[^a-z0-9]/gi, ''); // replace any invalid char;
				value = Number(value);
				if (value != 0 && value != 1) { res.end('error 3'); console.log("MyLog: rejected answer for: " + type + " to value: " + value + " from account: " + account); return 0 };
				if (type.length > 20) { res.end('error 4'); console.log("MyLog: rejected answer for: " + type + " to value: " + value + " from account: " + account); return 0 };
				// All should be cleaned up by now
			}

			if (type) {
				changeaccountinfo(account, type, value, callback);
			} else {
				getaccountinfo(account, callback);
			}

		} else {
			res.end('Account missing.');
		}
	} else {
		//res.end('trying to read: ' + './static' + url + ' ext: ' + path.extname(url).slice(1));
		fs.readFile('./static' + url, function (err, data) {
			if (err) {
				res.writeHead(404);
				res.end('Not found');
			} else {
				let ext = path.extname(url).slice(1);
				if (contentTypes[ext]) {
					res.setHeader('Content-Type', contentTypes[ext]);
				}
				if (ext === 'html') {
					res.setHeader('Cache-Control', 'no-cache, no-store');
				}
				res.end(data);
			}
		});
	}
});


// ======================================================= Luckybytes Functions


function sendtexttodevice(text_name, device_id, params=[]) {
	var device = require('byteballcore/device.js');
	// callback function 
	function send(lan) {
		if (lan === 'japanese') {
			var textstrings = require('./jp.js'); 
		}
		else if (lan === 'german') {
			var textstrings = require('./ge.js');
		}else if (lan === 'russian') {
			 var textstrings = require('./ru.js'); 
		} else {
			// default:
			var textstrings = require('./en.js'); 
		}

		// use specific language file
		var text = textstrings[text_name];
		// Replace Parameters
		if (params.length>0) {
			for (var i = 0; i < params.length; i++) {

				// todo: make this smarter 
				for (var j = 0; j < 10; j++) 
				{
					text = text.replace('{'+i+'}', params[i]);
				}

			}
		}
		// send message
		device.sendMessageToDevice(device_id, 'text', text);
	} //send callback function

	// get language of device
	// User_Language: device, language
	db.query("SELECT * FROM User_Language WHERE device=?", [device_id], function (rows) {
		var lan = "english";
		if (rows.length===1) //if the user has set a language, alternativly use the default one.
		{
			lan = rows[0].language || "english";
		} 
		send(lan);
	});
}

function gettext(text_name, lan, params=[]) {
	   
	if (lan === 'japanese') {
		var textstrings = require('./jp.js'); 
	}
	else if (lan === 'german') {
		var textstrings = require('./ge.js');
	} else if (lan === 'russian') {
		var textstrings = require('./ru.js'); 
	} else {
		// default:
		var textstrings = require('./en.js'); 
	}

	// use specific language file
	var text = textstrings[text_name];
	// Replace Parameters
	if (params.length>0) {
		for (var i = 0; i < params.length; i++) {

			// todo: make this smarter :(
			for (var j = 0; j < 10; j++) 
			{
				text = text.replace('{'+i+'}', params[i]);
			}

			//text = text.replace('{'+i+'}', params[i]);
		}
	}
	return text;        
}

   
function webjoin(account, type, callback) {
	//whats the users device id?
	console.log("MyLog: webjoining: " + account + " to game type: " + type);
	db.query("SELECT * FROM User_Account WHERE hashkey=?", [account], function (rows) {
		if (rows.length === 1) {
			var user = rows[0].device;

			if (!Number(rows[0].tickets > 0)) {
				callback('No tickets left!');
				return 0;
			}

			if (!val.isValidAddress(rows[0].withdraw_address)) {
				callback(nowithdraw);
				return 0;
			}
			// now join a game
			if (String(type) === '7') {
				handlecommand(user, '/playjackpot ' + type + ' web');
			} else {
				handlecommand(user, '/play' + type + ' web');
			}

			//make sure all went good!
			setTimeout(function () {
				callback('joined!');
			}, 500);
			return 0;
		} callback('Account not found!');
	});
}

function changeaccountinfo(account, type, value, callback) {

	console.log("MyLog: changing Settings: " + type + " to value: " + value + " from account: " + account);

	// First make changes than execute getaccount!
	var query = '';
	var input = '';

	if (type === 'notifications') { // Change notifications Settings 
		if (value === 0) {
			input = 'disabled';
		} else if (value === 1) {
			input = 'enabled';
		} else { console.log("MyLog: cant change settings, value unknown: " + type + " to value: " + value + " from account: " + account); getaccountinfo(account, callback); return 0; }
		db.query('UPDATE Device_Settings SET status_messages=? WHERE exists (select * from User_Account t2 where Device_Settings.device=t2.device and t2.hashkey=?)', [input, account], function () {
			getaccountinfo(account, callback);
		});
	} else if (type === 'chatmessages') { // Change notifications Settings
		if (value === 0) {
			input = 'disabled';
		} else if (value === 1) {
			input = 'enabled';
		} else { console.log("MyLog: cant change settings, value unknown: " + type + " to value: " + value + " from account: " + account); getaccountinfo(account, callback); return 0; }
		db.query('UPDATE Device_Settings SET chat_messages=? WHERE exists (select * from User_Account t2 where Device_Settings.device=t2.device and t2.hashkey=?)', [input, account], function () {
			getaccountinfo(account, callback);
		});
	} else { // Change Autojoin settings
		db.query('SELECT * FROM User_Account t1 LEFT JOIN Device_Settings AS t2 ON t1.device = t2.device WHERE t1.hashkey=?', [account], function (rows) {
			if (rows.length === 1) {
				var autojoin = JSON.parse(rows[0].setting2) || noautojoin;

				if (type === 'auto4') {
					autojoin.amount4 = Number(value);
				} else if (type === 'auto8') {
					autojoin.amount8 = Number(value);
				} else if (type === 'auto32') {
					autojoin.amount32 = Number(value);
				} else { console.log("MyLog: cant change settings, value unknown: " + type + " to value: " + value + " from account: " + account); getaccountinfo(account, callback); return 0; }

				// Now change autojoin
				db.query('UPDATE Device_Settings SET setting2=? WHERE exists (select * from User_Account t2 where Device_Settings.device=t2.device and t2.hashkey=?)', [JSON.stringify(autojoin), account], function (rows) {
					getaccountinfo(account, callback);
					return 0;
				});

			} else { getaccountinfo(account, callback); console.log("MyLog: cant change settings, account not found: " + type + " to value: " + value + " from account: " + account); return 0; }
		});


	}
}

function getaccountinfo(account, callback) {
	var data = JSON.parse(JSON.stringify(newaccount));// Deepclone it //newaccount;
	var settings = JSON.parse(JSON.stringify(newsettings));// Deepclone it;

	db.query('SELECT * FROM User_Account t1 LEFT JOIN Device_Settings AS t2 ON t1.device = t2.device WHERE t1.hashkey=?', [account], function (rows) {
		if (rows.length === 1) {
			// found an account
			data.name = rows[0].name || 'anonymous';
			data.tickets = rows[0].tickets || '0';
			// get settings
			// { "notifications": "on", "amount4": 0, "amount8": 0, "amount32": 0} 
			var autojoin = JSON.parse(rows[0].setting2) || noautojoin;
			data.settings.amount4 = autojoin.amount4;
			data.settings.amount8 = autojoin.amount8;
			data.settings.amount32 = autojoin.amount32;
			var notification = rows[0].status_messages || 'enabled';  // winning notifications
			var chatmessages = rows[0].chat_messages || 'enabled';  // chat messages
			if (notification === 'enabled') { data.settings.notifications = 1; }
			else { data.settings.notifications = 0; }
			if (chatmessages === 'enabled') { data.settings.chat_messages = 1; }//chat_messages
			else { data.settings.chat_messages = 0; }
			//data.settings.notifications = rows[0].status_messages || 'enabled';
			callback(data);
		} else {
			callback(newaccount);
		}
	});
}

function getowngames(account, callback) {
	// var allgames = { "active": emptygame, "history": emptygame};;
	var ownhistory = [];

	//whats the users device id?
	db.query("SELECT device FROM User_Account WHERE hashkey=?", [account], function (rows) {
		if (rows.length === 1) {
			var user = rows[0].device;
			// now check for own tickets
			db.query("SELECT * FROM Games WHERE status=? or status=? order by time desc", ["active", "time"], function (rows2) {
				if (rows2.length > 0) {
					var found4 = false;
					var found8 = false;
					var found32 = false;
					var foundweekly = false;
					var slots = [];
					var owncount = 0;
					var owngames = { "game4": 0, "game8": 0, "game32": 0, "game7": 0 };

					for (var i = 0; i < rows2.length; i++) {
						slots = JSON.parse(rows2[i].slots);
						owncount = 0;
						for (var j = 0; j < slots.length; j++) {
							if (slots[j].device === user) { owncount++ }
						}

						if (!found4 && rows2[i].extra === '4') {
							owngames.game4 = owncount;
							found4 = true;
						}

						if (!found8 && rows2[i].extra === '8') {
							owngames.game8 = owncount;
							found8 = true;
						}

						if (!found32 && rows2[i].extra === '32') {
							owngames.game32 = owncount;
							found32 = true;
						}

						if (!foundweekly && rows2[i].extra === '7') {
							owngames.game7 = owncount;
							foundweekly = true;
						}
					}


					// now check for own historic games 
					db.query("SELECT * FROM Games WHERE (status=? or status=?) and slots like ? order by time desc limit 5", ["done", "payout", "%" + user + "%"], function (rows) {
						for (var i = 0; i < rows.length; i++) {
							var game = rows[i].game;
							var status = rows[i].status;
							var proofhash = rows[i].proofhash;
							var type = rows[i].extra;
							var win = '';
							var gamename = '';
							var slots = JSON.parse(rows[i].slots);
							var ownslots = '';
							var ownprice = '';
							var price = 0;
							var last_msg;
							var wintype = '';


							for (var j = 0; j < slots.length; j++) {
								if (slots[j].device === user) { ownslots = ownslots + Number(j + 1) + ' ' }
							}
							var nameslots = [];
							for (var s = 0; s < slots.length; s++) {
								nameslots.push({ "id": s, "name": slots[s].name });
							}
							if (type === '4') { win = rows[i].win_4; wintype = 'luckybaud(' + game.slice(0, 4) + '...)'; }
							else if (type === '8') { win = rows[i].win_8; wintype = 'luckybyte(' + game.slice(0, 4) + '...)'; }
							else if (type === '32') { win = rows[i].win_32; wintype = 'luckyint(' + game.slice(0, 4) + '...)'; }
							else if (type === '7') { win = rows[i].win_4; wintype = 'Weekly Jackpot(' + game.slice(0, 4) + '...)'; }

							if (slots[win - 1].device === user) { price = Number(type * 10); last_msg = last_msg || 'Congratulations! You just won ' + Number(type) * 10 + ' MB 💰 at ' + wintype + '. You will get your payout shortly.'; }
							else { last_msg = last_msg || wintype + ' has ended. ' + nameslots[win - 1].name + ' won ' + Number(type) * 10 + ' MB 💰.'; }

							var newgame = { "game": game, "status": status, "type": type, "slots": nameslots, "winning_slot": win, "winner": nameslots[win - 1].name, "prize": price, "myslots": ownslots, "proof": rows[i].proofhash };
							ownhistory.push(newgame);
						}

						// Last save them all into the global variable
						var newallgames = { "active": allgames.active, "history": allgames.history, "own": owngames, "ownhistory": ownhistory, "last_msg": last_msg };
						callback(newallgames);
					}); // last 10
				} else { callback(allgames); }
			});
		} else { callback(allgames); }
	});
}


function updatestatistics() {
	// var allgames = { "active": emptygame, "history": emptygame};
	var gamestats = [];
	var users = 0;

	// Count Historic Games
	db.query("Select count(case extra when '4' then 1 else null end) amount_4, count(case extra when '8' then 1 else null end) amount_8, count(case extra when '32' then 1 else null end) amount_32 from Games where status='done'", function (rows) {
		if (rows.length === 1) {
			gamestats = { "total_4": rows[0].amount_4, "total_8": rows[0].amount_8, "total_32": rows[0].amount_32 };
		}


		db.query("select count(*) total from User_Account", function (rows2) {
			if (rows.length === 1) {
				users = rows2[0].total;
			}

			allstatistics = { "total_games": gamestats, "total_users": users };
		}); // Count Games
	}); // Count Games
}


function updategames() {
	// var allgames = { "active": emptygame, "history": emptygame};
	var active = [];
	var history = [];

	// Get all active games first 
	db.query("SELECT * FROM Games WHERE status=? or status=? order by time desc", ["active", "time"], function (rows2) {
		if (rows2.length > 0) {
			var found4 = false;
			var found8 = false;
			var found32 = false;
			var foundjackpot = false;
			var game4 = '';
			var game8 = '';
			var game32 = '';
			var slots = [];


			for (var i = 0; i < rows2.length; i++) {
				slots = JSON.parse(rows2[i].slots);
				var nameslots = [];
				for (var s = 0; s < slots.length; s++) {
					nameslots.push({ "id": s, "name": slots[s].name });
				}

				if (!found4 && rows2[i].extra === '4') {
					found4 = true;
					var newgame = { "game": rows2[i].game, "status": rows2[i].status, "type": rows2[i].extra, "slots": nameslots };
					active.push(newgame);
				}

				if (!found8 && rows2[i].extra === '8') {
					found8 = true;
					var newgame = { "game": rows2[i].game, "status": rows2[i].status, "type": rows2[i].extra, "slots": nameslots };
					active.push(newgame);
				}

				if (!found32 && rows2[i].extra === '32') {
					found32 = true;
					var newgame = { "game": rows2[i].game, "status": rows2[i].status, "type": rows2[i].extra, "slots": nameslots };
					active.push(newgame);
				}

				if (!foundjackpot && rows2[i].extra === '7') {
					foundjackpot = true;
					var price = slots.length * 10 * jackbotfee + jackpotbonus;
					var currentTime = new Date();
					var futureTime = new Date(rows2[i].time);
					var diff = new Date(futureTime - currentTime);
					var days = diff.getDate() - 1;
					var hours = diff.getHours();
					var minutes = diff.getMinutes();
					var newgame = { "game": rows2[i].game, "status": rows2[i].status, "type": rows2[i].extra, "slots": nameslots, "prize": price, "days": days, "hours": hours, "minutes": minutes };
					active.push(newgame);
				}
			}
		}

		// The 10 past last games ||No Jackpot Games here please!    
		db.query("SELECT * FROM Games WHERE (status=? or status=?) and (extra = '4' OR extra = '8' OR extra = '32') order by time desc limit 10", ["done", "payout"], function (rows) {
			for (var i = 0; i < rows.length; i++) {
				var type = rows[i].extra;
				var win = '';
				var prize = '';
				slots = JSON.parse(rows[i].slots);
				var nameslots = [];
				for (var s = 0; s < slots.length; s++) {
					nameslots.push({ "id": s, "name": slots[s].name || 'unknown' });
				}

				if (type === '4') { var win = rows[i].win_4; prize=Number(type*10);}
				else if (type === '8') { var win = rows[i].win_8;  prize=Number(type*10);}
				else if (type === '32') { var win = rows[i].win_32;  prize=Number(type*10);}

				var newgame = { "game": rows[i].game, "status": rows[i].status, "type": rows[i].extra, "slots": nameslots, "winning_slot": win, "winner": nameslots[win - 1].name, "proof": rows[i].proofhash, "prize": prize };



				history.push(newgame);
			}
			// Jackpot Games
			db.query("SELECT * FROM Games WHERE (status=? or status=?) and (extra = '7') order by time desc limit 5", ["done"], function (rows) {
				for (var i = 0; i < rows.length; i++) {
					var type = rows[i].extra;
					var win = '';
					var prize = '';
					slots = JSON.parse(rows[i].slots);
					var nameslots = [];
					for (var s = 0; s < slots.length; s++) {
						nameslots.push({ "id": s, "name": slots[s].name || 'unknown' });
					}

				 
					if ((type === '7') || (type === '30') || (type === '99')) {var win = rows[i].win_4; prize = rows[i].win_8;}

					var newgame = { "game": rows[i].game, "status": rows[i].status, "type": rows[i].extra, "slots": nameslots, "winning_slot": win, "winner": nameslots[win - 1].name, "proof": rows[i].proofhash, "prize": prize };

					history.push(newgame);
				}
				// Last save them all into the global variable
				var newallgames = { "active": active, "history": history };
				allgames = newallgames;
			}); // Jackpot Games
		}); // last 10
	}); // active games
}

function checksinglereferralbonus(user_device,last=false) {
	var device = require('byteballcore/device.js');

	// check when was the lastcheck and get the date
	db.query("select * from User_Referrals_Bonus where device=?",[user_device],function(rows){
		if (rows.length === 1) {
			var timestamp=rows[0].lastcheck;
			var bonustickets_old=rows[0].tickets;
			// check how many new tickets are there, what the total now?

			function ticket_cb(tickets,refs_total) {
				// now i know how many tickets in total the user has and how much are new.
				var bonustickets=Math.trunc(tickets/referralbonustickets);
				var bonustickets_new=bonustickets-bonustickets_old;

				if (bonustickets_new>0) {
					// issue new bonus tickets
					// change bonus tickets in list and add new tickets to user_account
					db.query("UPDATE User_Referrals_Bonus SET tickets =?, lastcheck=? WHERE device=?", [bonustickets, Date.now(), user_device], function () { 
						db.query("UPDATE User_Account SET tickets = COALESCE(tickets,0) + ? WHERE device=?", [bonustickets_new,user_device], function () { 
							//now inform the user and admin
							console.log("MyLog: Issued "+bonustickets_new+" Bonus Tickets to: "+user_device+"\nTotal referred Tickets: "+bonustickets+"\nTotal Referrals: "+refs_total+"\nTotal Bonus Tickets: "+bonustickets+backtomenu);
							//device.sendMessageToDevice(user_device, 'text', "Thanks for using the referral program. I just added "+bonustickets_new+" Bonus Tickets to your account!\nYou referred a total of "+tickets+" Tickets from a total of "+refs_total+" Referrals. For this great support you received a total of "+bonustickets+" Bonus tickets until now! Thanks again."+backtomenu);
							sendtexttodevice("referralprogram",user_device,[bonustickets_new,tickets,refs_total,bonustickets]);
							if (conf.control_addresses[0])
								device.sendMessageToDevice(conf.control_addresses[0], 'text', "Issued "+bonustickets_new+" Bonus Tickets to: "+user_device+"\nTotal referred Tickets: "+tickets+"\nTotal Referrals: "+refs_total+"\nTotal Bonus Tickets: "+bonustickets+backtomenu);
							if (last) {lockrefbonus=false;}
						});

					});

				} else {if (last) {lockrefbonus=false;}}
			}

			//Create Referral Array and check how many tickets they bought. Then start the callback function!
			db.query('select * from User_Referrals where recruiter_device=?', [user_device], function (rows2) {
				var refarray=[];
				if (rows2.length>0) {
					for (var i = 0; i < rows2.length; i++) {
						refarray.push(rows2[i].device);
					}
				}
				checkreferraltickets(refarray,ticket_cb);
			});

		} else if (rows.length === 0) {
			// Not yet in the list, create an entry and restart function
			db.query("REPLACE INTO User_Referrals_Bonus (device, tickets, lastcheck) VALUES (?,0,0)", [user_device], function () {
				checksinglereferralbonus(user_device,last);
				return 0;
			});
		}
	})
}

function checkbonustickets(user_device,callback) {
	var bonustickets=0;
	db.query("select * from User_Referrals_Bonus where device=?",[user_device],function(rows){
		if (rows.length === 1) {
			bonustickets=rows[0].tickets;
			callback(bonustickets);
		} else if (rows.length === 0) {
			// Not yet in the list, create an entry and restart function
			db.query("REPLACE INTO User_Referrals_Bonus (device, tickets, lastcheck) VALUES (?,0,0)", [user_device], function () {
				checkbonustickets(user_device,callback);
				return 0;
			});
		}
	})
}


function checkautoplaybonus(device_id, callback) {

	db.query("select * from User_Autoplay where device=?", [device_id], function (rows) {
		var points = 0;
		var tickets = 0;
		if (rows.length === 1) {
			points = rows[0].points || 0;
			tickets = rows[0].tickets_total || 0;
		}
		callback(points, tickets);
	});
}


function checkreferraltickets(refarray,callback){
	//select count(case amount when '11000000' then 1 else NULL end) tickets1, count(case amount when '108000000' then 1 else NULL end) tickets10, count(case amount when '1050000000' then 1 else NULL end) tickets100 from outputs t1 where exists (select * from units t3 where t3.unit=t1.unit and t3.is_stable=1) and exists (select * from user_account t2 where t2.device = "06EIURT3GC2SXDG36Y3KFQGIHYBYR6G6A" and t2.deposit_address=t1.address)
	var refs=refarray;
	db.query("select count(case amount when '11000000' then 1 else NULL end) tickets1, count(case amount when '108000000' then 1 else NULL end) tickets10, count(case amount when '1050000000' then 1 else NULL end) tickets100 from outputs t1 where exists (select * from units t3 where t3.unit=t1.unit and t3.is_stable=1) and exists (select * from user_account t2 where t2.device IN (?) and t2.deposit_address=t1.address)",[refs.join(',')],function(rows){
		if (rows.length === 1) {
			var tickets1 = Number(rows[0].tickets1) || 0;
			var tickets10 = Number(rows[0].tickets10) || 0;
			var tickets100 = Number(rows[0].tickets100) || 0;

			var ticketstotal = tickets1+tickets10*10+tickets100*100;
			callback(ticketstotal,refs.length);

		} else {callback(0,refs.length); return 0;}
	
	})
}

function handlerefpair(data) {
	var device = require('byteballcore/device.js');
	
	var referral = data.split('LuckyBytesR').pop().split('"').shift();
	var device_id = data.split('"from":"').pop().split('"').shift();

	//check if the device_id is already known or has a recruiter!
	db.query("Select device_address from correspondent_devices where device_address=? union all Select device as device_address from User_Account where device=?", [device_id,device_id], function(r) {
		if (r.length===1) {
			console.log('MyLog: Device already known Referralcode was: '+referral);
			return 0;
		}
		db.query("Select * from User_Referrals where device=?", [device_id], function(r2) {
			if (r2.length===1) {
				console.log('MyLog: Device already has an Recruiter Referralcode was: '+referral);
				return 0;
			}

			// Only now save a new recruiter, i also should know the time since recruitment... somehow...
			console.log('MyLog: New Referral from: '+referral);

			//Get recruiter_device
			db.query("Select * from User_Secrets where secret=?", [referral], function(rows) {

				if (rows.length===1) {
					var recruiter_device = rows[0].device;
					if (recruiter_device === device_id) { return 0;}
					db.query("REPLACE INTO User_Referrals (device, recruiter_device) VALUES (?,?)", [device_id, recruiter_device]);
					console.log('MyLog: Added a new refferal to: '+recruiter_device);
				} else {
					console.log('MyLog: This referral is unknown: '+referral);
					return 0;
				}
	
			});
		});
	});

	

	

	// User_Referrals: device, recruiter_device
   
}

function replaceConsoleLog() {
	var log_filename = conf.LOG_FILENAME || (appDataDir + '/log_' + Date.now() + '.txt');
	var writeStream = fs.createWriteStream(log_filename);
	console.log('MyLog:---------------');
	console.log('MyLog:From this point, output will be redirected to ' + log_filename);
	console.log("To release the terminal, type Ctrl-Z, then 'bg'");
	console.log = function () {
		var ldata = String(util.format.apply(null, arguments));
		
		if (ldata.search('"subject":"pairing","body":{"pairing_secret":"LuckyBytesR') >0 ) {
			// Referal join detected
			handlerefpair(ldata);
		}
		//if (ldata.search('yLog:') === -1) { return 0; }  

		writeStream.write(Date().toString() + ': ');
		writeStream.write(ldata + '\n');
	};
	console.warn = console.log;
	console.info = console.log;
	console.error = console.log;
	setstatus('ready!');
	start = true;
}

function readKeys(onDone) {

	console.log('---------------------');
	if (conf.control_addresses)
		console.log("remote access allowed from devices: " + conf.control_addresses.join(', '));
	if (conf.payout_address)
		console.log("payouts allowed to address: " + conf.payout_address);
	console.log('----------------------');
	fs.readFile(KEYS_FILENAME, 'utf8', function (err, data) {
		var rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			//terminal: true
		});
		if (err) { // first start
			console.log('failed to read keys, will gen');

			var userConfFile = appDataDir + '/conf.json';

			var deviceName = conf.deviceName;
			var passphrase = conf.pass;

			console.log('Devicename: ' + deviceName);

			fs.writeFile(userConfFile, JSON.stringify({ deviceName: deviceName }, null, '\t'), 'utf8', function (err) {
				if (err)
					throw Error('failed to write conf.json: ' + err);

				var deviceTempPrivKey = crypto.randomBytes(32);
				var devicePrevTempPrivKey = crypto.randomBytes(32);

				var mnemonic = new Mnemonic(); // generates new mnemonic
				while (!Mnemonic.isValid(mnemonic.toString()))
					mnemonic = new Mnemonic();

				writeKeys(mnemonic.phrase, deviceTempPrivKey, devicePrevTempPrivKey, function () {
					console.log('keys created');
					var xPrivKey = mnemonic.toHDPrivateKey(passphrase);
					createWallet(xPrivKey, function () {
						onDone(mnemonic.phrase, passphrase, deviceTempPrivKey, devicePrevTempPrivKey);
					});
				});
			});
		}
		else { // 2nd or later start

			var deviceName = conf.deviceName;
			var passphrase = conf.pass; //you would want to give the passphrase as a starting paramater and not save it in the conf file for security reasons!


			var keys = JSON.parse(data);
			var deviceTempPrivKey = Buffer(keys.temp_priv_key, 'base64');
			var devicePrevTempPrivKey = Buffer(keys.prev_temp_priv_key, 'base64');
			determineIfWalletExists(function (bWalletExists) {
				if (bWalletExists)
					onDone(keys.mnemonic_phrase, passphrase, deviceTempPrivKey, devicePrevTempPrivKey);
				else {
					var mnemonic = new Mnemonic(keys.mnemonic_phrase);
					var xPrivKey = mnemonic.toHDPrivateKey(passphrase);
					createWallet(xPrivKey, function () {
						onDone(keys.mnemonic_phrase, passphrase, deviceTempPrivKey, devicePrevTempPrivKey);
					});
				}
			});

		}
	});
}

function writeKeys(mnemonic_phrase, deviceTempPrivKey, devicePrevTempPrivKey, onDone) {
	var keys = {
		mnemonic_phrase: mnemonic_phrase,
		temp_priv_key: deviceTempPrivKey.toString('base64'),
		prev_temp_priv_key: devicePrevTempPrivKey.toString('base64')
	};
	fs.writeFile(KEYS_FILENAME, JSON.stringify(keys, null, '\t'), 'utf8', function (err) {
		if (err)
			throw Error("failed to write keys file");
		if (onDone)
			onDone();
	});
}

function createWallet(xPrivKey, onDone) {
	var devicePrivKey = xPrivKey.derive("m/1'").privateKey.bn.toBuffer({ size: 32 });
	var device = require('byteballcore/device.js');
	device.setDevicePrivateKey(devicePrivKey); // we need device address before creating a wallet
	var strXPubKey = Bitcore.HDPublicKey(xPrivKey.derive("m/44'/0'/0'")).toString();
	var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');
	walletDefinedByKeys.createWalletByDevices(strXPubKey, 0, 1, [], 'any walletName', false, function (wallet_id) {
		walletDefinedByKeys.issueNextAddress(wallet_id, 0, function (addressInfo) {
			onDone();
		});
	});
}

function isControlAddress(device_address) {
	return (conf.control_addresses && conf.control_addresses.indexOf(device_address) >= 0);
}

function readSingleAddress(handleAddress) {
	db.query("SELECT address FROM my_addresses WHERE wallet=?", [wallet_id], function (rows) {
		if (rows.length === 0)
			throw Error("no addresses");
		if (rows.length > 1)
			throw Error("more than 1 address");
		handleAddress(rows[0].address);
	});
}

function prepareBalanceText(handleBalanceText) {
	var Wallet = require('byteballcore/wallet.js');
	Wallet.readBalance(wallet_id, function (assocBalances) {
		var arrLines = [];
		for (var asset in assocBalances) {
			var total = assocBalances[asset].stable + assocBalances[asset].pending;
			var units = (asset === 'base') ? ' bytes' : (' of ' + asset);
			if (asset === 'qO2JsiuDMh/j+pqJYZw3u82O71WjCDf0vTNvsnntr8o=') { units = ' blackbytes'; }
			var line = total / 1000000000 + 'G' + units;
			if (assocBalances[asset].pending)
				line += ' (' + assocBalances[asset].pending / 1000000000 + ' pending)';
			arrLines.push(line);
		}
		handleBalanceText(arrLines.join("\n"));
	});
}

function prepareSharedBalanceText(handleBalanceText) {
	var Wallet = require('byteballcore/wallet.js');
	Wallet.readSharedBalance(wallet_id, function (assocBalances) {
		var arrLines = [];
		// assocBalances[asset][row.address][row.is_stable ? 'stable' : 'pending'] += row.balance;  

		for (var asset in assocBalances) {
			for (var address in assocBalances[asset]) {
				arrLines.push(address);
				var total = assocBalances[asset][address].stable + assocBalances[asset][address].pending;
				var units = (asset === 'base') ? ' bytes' : (' of ' + asset);
				if (asset === 'qO2JsiuDMh/j+pqJYZw3u82O71WjCDf0vTNvsnntr8o=') { units = ' blackbytes'; }
				var line = total / 1000000000 + 'G' + units;
				if (assocBalances[asset][address].pending)
					line += ' (' + assocBalances[asset][address].pending / 1000000000 + ' pending)';
				arrLines.push(line);
			}
		}
		handleBalanceText(arrLines.join("\n"));
	});
}

function sendtexttosharedaddress(shared_address, text) {
	var device = require('byteballcore/device.js');

	db.query('SELECT * FROM shared_address_signing_paths WHERE signing_path="r.1.0" AND shared_address= ?', [shared_address], function (rows2) {
		if (rows2.length === 1) {
			device.sendMessageToDevice(rows2[0].device_address, 'text', text);
		}
	});
}

function sendtexttodepositdaddress(address, text, params=[]) {
	var device = require('byteballcore/device.js');

	db.query('SELECT * FROM User_Account WHERE deposit_address= ?', [address], function (rows2) {
		if (rows2.length === 1) {
			//device.sendMessageToDevice(rows2[0].device, 'text', text);
			sendtexttodevice(text,rows2[0].device,params);
		}
	});
}

function resend(mydevice, asset, unit, to_address) {
	var indivisible_asset = require('byteballcore/indivisible_asset');
	var wallet_defined_by_keys = require('byteballcore/wallet_defined_by_keys');
	var walletDefinedByAddresses = require('byteballcore/wallet_defined_by_addresses');
	var device = require('byteballcore/device.js');

	function success() {
		device.sendMessageToDevice(mydevice, 'text', "Resend it.");
	}

	indivisible_asset.restorePrivateChains(asset, unit, to_address, function (arrRecipientChains, arrCosignerChains) {

		wallet_defined_by_keys.forwardPrivateChainsToOtherMembersOfWallets(arrCosignerChains, [wallet_id], null, success);
 
	});
}

function cashoutsharedaddress(shared_address, from_address) {
	var device = require('byteballcore/device.js');
	// Find Shared Address
	db.query('SELECT * FROM My_Contracts WHERE Shared_Address  = ?', [shared_address], function (rows) {
		if (rows.length === 1) {
			//device.sendMessageToDevice(from_address, 'text', 'No Contracts found.');
			device.sendMessageToDevice(from_address, 'text', 'cashing out ' + rows[0].Funded_Amount + ' ' + rows[0].Funded_Asset);
			issueChangeAddressAndSendSharedPaymentFromAddress(rows[0].Funded_Asset, rows[0].Funded_Amount, FAKE_ADDRESS, from_address, shared_address, function (err, unit) {

				if (err) {
					//device.sendMessageToDevice(from_address, 'text', "Coulnd send the Blackbytes to the contractor: " + err);
					device.sendMessageToDevice(from_address, 'text', 'Error: ' + err);

				} else {
					device.sendMessageToDevice(from_address, 'text', 'done!');
				}
			});
			return 0;
		} else { device.sendMessageToDevice(from_address, 'text', 'Error: 0 or to many addresses found') }

	})
}


function readSingleWallet(handleWallet) {
	db.query("SELECT wallet FROM wallets", function (rows) {
		if (rows.length === 0)
			throw Error("no wallets");
		if (rows.length > 1)
			throw Error("more than 1 wallet");
		handleWallet(rows[0].wallet);
	});
}

function determineIfWalletExists(handleResult) {
	db.query("SELECT wallet FROM wallets", function (rows) {
		if (rows.length > 1)
			throw Error("more than 1 wallet");
		handleResult(rows.length > 0);
	});
}

function signWithLocalPrivateKey(wallet_id, account, is_change, address_index, text_to_sign, handleSig) {
	var path = "m/44'/0'/" + account + "'/" + is_change + "/" + address_index;
	var privateKey = xPrivKey.derive(path).privateKey;
	var privKeyBuf = privateKey.bn.toBuffer({ size: 32 }); // https://github.com/bitpay/bitcore-lib/issues/47
	handleSig(ecdsaSig.sign(text_to_sign, privKeyBuf));
}


function handlePairing(from_address) {
	var device = require('byteballcore/device.js');
	sendtexttodevice("welcometext",from_address);
}

function sendPayment(asset, amount, to_address, change_address, device_address, onDone) {
	var device = require('byteballcore/device.js');
	var Wallet = require('byteballcore/wallet.js');
	Wallet.sendPaymentFromWallet(
		asset, wallet_id, to_address, amount, change_address,
		[], device_address,
		signWithLocalPrivateKey,
		function (err, unit) {
			if (device_address) {
				if (err)
					device.sendMessageToDevice(device_address, 'text', "Failed to pay: " + err);
			}
			if (onDone)
				onDone(err, unit);
		}
	);
}

function sendSharedPaymentFromAddress(asset, amount, to_address, change_address, device_address, shared_address, onDone) {
	var device = require('byteballcore/device.js');
	var Wallet = require('byteballcore/wallet.js');

	db.query(
		"SELECT shared_address FROM shared_addresses", function (rows) {
			if (rows.length === 0) {
				device.sendMessageToDevice(device_address, 'text', 'No Shared Addresses found');
				return 0;
			}
			var shared = [];
			shared.push(shared_address);

			var opts =
				{
					asset: asset,
					wallet: null,
					to_address: to_address,
					amount: amount,
					change_address: change_address,
					arrSigningDeviceAddresses: [device.getMyDeviceAddress()],
					recipient_device_address: device_address,
					signWithLocalPrivateKey: signWithLocalPrivateKey,
					paying_addresses: shared,
					fee_paying_wallet: wallet_id,
					bSendAll: false
				}
			if (asset === 'base') { opts.bSendAll = true }
			console.log('MyLog: I got here, trying to sendMultiPayment');
			Wallet.sendMultiPayment(opts,
				function (err, unit) {
					if (device_address) {
						if (err)
							device.sendMessageToDevice(device_address, 'text', "Failed to pay: " + err);
					}
					if (onDone)
						onDone(err, unit);
				}
			);
		});
}

function sendSharedPayment(asset, amount, to_address, change_address, device_address, onDone) {
	var device = require('byteballcore/device.js');
	var Wallet = require('byteballcore/wallet.js');

	db.query(
		"SELECT shared_address FROM shared_addresses", function (rows) {
			if (rows.length === 0) {
				device.sendMessageToDevice(device_address, 'text', 'No Shared Addresses found');
				return 0;
			}
			var shared = [];
			shared.push('RDBHECEYYAUG45BZKY3TUI3YXZ7RH6TM');


			device.sendMessageToDevice(device_address, 'text', 'test found: ' + shared[0]);

			var opts =
				{
					asset: asset,
					wallet: null,
					to_address: to_address,
					amount: amount,
					change_address: change_address,
					arrSigningDeviceAddresses: [],
					recipient_device_address: device_address,
					signWithLocalPrivateKey: signWithLocalPrivateKey,
					paying_addresses: shared,
					fee_paying_wallet: wallet_id,
					bSendAll: false
				}
			if (asset === 'base') { opts.bSendAll = true }

			Wallet.sendMultiPayment(opts,
				function (err, unit) {
					if (device_address) {
						if (err)
							device.sendMessageToDevice(device_address, 'text', "Failed to pay: " + err);
						else
							// if successful, the peer will also receive a payment notification
							device.sendMessageToDevice(device_address, 'text', "paid");
					}
					if (onDone)
						onDone(err, unit);
				}
			);
		});
}

function issueChangeAddressAndSendPayment(asset, amount, to_address, device_address, onDone) {
	var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');
	var change = CHANGE_ADDRESSES[change_index];
	change_index++;
	if (change_index === CHANGE_ADDRESSES.length) { change_index = 0; }
	sendPayment(asset, amount, to_address, change, device_address, onDone);

}

function issueChangeAddressAndSendSharedPayment(asset, amount, to_address, device_address, onDone) {
	var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');

	var change = CHANGE_ADDRESSES[change_index];
	change_index++;
	if (change_index === CHANGE_ADDRESSES.length) { change_index = 0; }
	sendSharedPayment(asset, amount, to_address, change, device_address, onDone);
}

function issueChangeAddressAndSendSharedPaymentFromAddress(asset, amount, to_address, device_address, shared_address, onDone) {

	var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');
	var change = CHANGE_ADDRESSES[change_index];
	change_index++;
	if (change_index === CHANGE_ADDRESSES.length) { change_index = 0; }
	sendSharedPaymentFromAddress(asset, amount, to_address, change, device_address, shared_address, onDone);

}

function issueOrSelectNextMainAddress(handleAddress) {
	var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');
	walletDefinedByKeys.issueOrSelectNextAddress(wallet_id, 0, function (objAddr) {
		handleAddress(objAddr.address);
	});
}

function sendstatusfromuser(from_address, text) {
	var device = require('byteballcore/device.js');
	device.readCorrespondent(from_address, function handleCorrespondent(Correspondent) {
		var cname = Correspondent.name || 'unkown user';
		cname = cname.replace(/[^a-z0-9]/gi, '');
		// Send to every Correspondent except the one sending it
	 
		db.query("SELECT device_address FROM correspondent_devices t1 WHERE NOT device_address=? AND NOT device_address= ? AND NOT exists (select * from Device_Settings t2 WHERE t1.device_address = t2.device AND t2.status_messages = ?)", [from_address,transitionbot, "disabled"], function (rows) {
			  if (rows.length > 0) {
				for (var i = 0; i < rows.length; i++) {
					device.sendMessageToDevice(rows[i].device_address, 'text', '[' + cname + '](command:/player '+cname+') ' + text);
				}
				return 0;
			}
		});
	});
	return 0;
}

function sendstatusfromusername(from_address, text, username) {
	var device = require('byteballcore/device.js');

	var cname = username || 'unkown user';
	cname = cname.replace(/[^a-z0-9]/gi, '');
	// Send to every Correspondent except the one sending it
   
	db.query("SELECT device_address FROM correspondent_devices t1 WHERE NOT device_address=? AND NOT device_address = ? AND NOT exists (select * from Device_Settings t2 WHERE t1.device_address = t2.device AND t2.status_messages = ?)", [from_address,transitionbot, "disabled"], function (rows) {
	
		if (rows.length > 0) {

		// Time Delay between messages
		var j = 0;
		function myLoop() {
			setTimeout(function () {
				device.sendMessageToDevice(rows[j].device_address, 'text', '[' + cname + '](command:/player '+cname+') ' + text);
					j++;
				if (rows.length > j) {
					myLoop(); // restart          
				}
			}, 50)
		}
		myLoop();                      //  start the loop

		}
	});

	return 0;
}

function sendann(text) {
	var device = require('byteballcore/device.js');

	db.query("SELECT device_address FROM correspondent_devices where not device_address =?",[transitionbot], function (rows) {
		if (rows.length > 0) {
			for (var i = 0; i < rows.length; i++) {
				device.sendMessageToDevice(rows[i].device_address, 'text', '[➡ ](command:/dontclickmeyet) ' + text);
			}
			return 0;
		}
	});
	return 0;
}

function setstatus(text) {
	env.NODE_STATUS = text;
}

function globalchat(from_address, text) {
 

	var device = require('byteballcore/device.js');

	// check if the user is banned
	db.query("select setting1 from Device_Settings WHERE device =?", [from_address], function (rows4) {

		if (rows4.length > 0) {
			if (rows4[0].setting1=== "banned") {
				device.sendMessageToDevice(from_address, 'text', 'You are excluded from global chat. :(\n');
				return 0;
			}
		}

		device.readCorrespondent(from_address, function handleCorrespondent(Correspondent) {
			//make it so that the person can read his own text
			db.query("SELECT device_address FROM correspondent_devices t1 WHERE NOT exists (select * from Device_Settings t2 WHERE t1.device_address = t2.device AND t2.chat_messages = ?) AND NOT device_address = ?", ["disabled",transitionbot], function (rows) {
				//db.query("SELECT device_address FROM correspondent_devices t1 WHERE NOT device_address=? AND NOT exists (select * from Device_Settings t2 WHERE t1.device_address = t2.device AND t2.chat_messages = ?) " + room_text, [from_address, "disabled"], function (rows) {
				if (rows.length === 0)
					device.sendMessageToDevice(from_address, 'text', 'Sadly, there is noone here to listen to you :(');
				if (rows.length > 0) {
					var usersname = Correspondent.name || 'unknown';
					var realusername = usersname; 
					if (isControlAddress(from_address)) { usersname = usersname + ' [✪]' }
					for (var i = 0; i < rows.length; i++) {
						device.sendMessageToDevice(rows[i].device_address, 'text', '[' + usersname + '](command:/player '+realusername+'): ' + text);
					}
					return 0;
				}
			});
		});
	})


	return 0;
}

function analyzePayParams(amountText, assetText, cb) {
	// expected: 
	// amountText = amount; only digits
	// assetText = asset; '' -> whitebytes, 'bytes' -> whitebytes, 'blackbytes' -> blackbytes, '{asset-ID}' -> any asset

	if (amountText === '' && assetText === '') return cb(null, null);

	var pattern = /^\d+$/;
	if (pattern.test(amountText)) {

		var amount = parseInt(amountText);

		var asset = assetText.toLowerCase();
		switch (asset) {
			case '':
			case 'bytes':
				return cb(null, amount);
			case 'blackbytes':
				return cb(constants.BLACKBYTES_ASSET, amount);
			default:
				// return original assetText string because asset ID it is case sensitive
				return cb(assetText, amount);
		}

	} else {
		return cb(null, null);
	}
}

function checkusername(from_address, text) {
	var device = require('byteballcore/device.js');
	device.readCorrespondent(from_address, function handleCorrespondent(Correspondent) {

		  if (Correspondent.name === 'undefined') {
			device.sendMessageToDevice(from_address, 'text', 'Hi there! Before you can talk, please set your username with: "/name username');
			return 0;
		}
		// handleText(from_address, text);
	});


}

function changename(from_address, text) {
	var newname = text.substring(6, 25)
	//var newname = newname.replace(/[^a-z0-9]/gi, '');
	newname = newname.replace(/[&\/\\#,+()$~%.'":*?"!<>=´`{}]/g, '');
	var device = require('byteballcore/device.js');

	if ((newname.length) < 3) {
		//device.sendMessageToDevice(from_address, 'text', setname);
		sendtexttodevice("setname",from_address);
		return 0;
	}


	var check = 0;
	//check if name is already in use

	db.query("SELECT * FROM correspondent_devices WHERE name =?", [newname], check = function (rows) {
		if (rows.length > 0) {
			//device.sendMessageToDevice(from_address, 'text', nameinnuse);
			sendtexttodevice("nameinuse",from_address);
			return 0;
		}
		// Name available
		//sendstatusfromuser(from_address, 'changed name to: ' + newname)
		//device.sendMessageToDevice(from_address, 'text', changedusername + newname + backtomenu);
		sendtexttodevice("changedusername",from_address,[newname]);
		db.query("UPDATE correspondent_devices SET name =? WHERE device_address=?", [newname, from_address], function () { });
		// might be that useraccount is not there yet. so dont use update:
		db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,?,(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(SELECT tickets FROM User_Account WHERE device = ?),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [from_address, newname, from_address, from_address, from_address, from_address, from_address]);
		//db.query("UPDATE User_Account SET name =? WHERE device=?", [newname, from_address], function () { });
		return 1;
	});

}

function createmyowntables() {
	//CREATE TABLE IF NOT EXISTS foo (id INTEGER, ...);
	// device, name, deposit_address, withdraw_address, tickets, hashkey
	db.query("CREATE TABLE IF NOT EXISTS User_Account (device CHAR(33) NOT NULL PRIMARY KEY, name CHAR(32), deposit_address CHAR(32), withdraw_address CHAR(32), tickets CHAR(8), lastcheck CHAR (32), hashkey CHAR(64))");
   
	// Device_Settings: device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3
	db.query("CREATE TABLE IF NOT EXISTS Device_Settings (device CHAR(33) NOT NULL PRIMARY KEY, chat_messages CHAR(32), status_messages CHAR(32), info_messages CHAR(32), book_messages CHAR(32), setting1 CHAR(32), setting2 CHAR(32), setting3 CHAR(32))", function () { });

	// Games: game, proofhash, win_4, win_8, win_32, win_256, slots TEXT, status, time TIMESTAMP, extra
	db.query("CREATE TABLE IF NOT EXISTS Games (game CHAR(64) NOT NULL PRIMARY KEY, proofhash CHAR(64), win_4 CHAR(8), win_8 CHAR(8), win_32 CHAR(8), win_256 CHAR(8), slots TEXT, status CHAR(32), time TIMESTAMP, extra CHAR(32))", function () { });

	// XP And achievements
	// device, XP, achievements, bonus_tickets, level, extra
	db.query("CREATE TABLE IF NOT EXISTS User_XP (device CHAR(33) NOT NULL PRIMARY KEY, XP CHAR(32), achievements TEXT, bonus_tickets CHAR(8), level CHAR(8), extra TEXT)");

	// User_Secrets: device, secret
	db.query("CREATE TABLE IF NOT EXISTS User_Secrets (device CHAR(33) NOT NULL PRIMARY KEY, secret TEXT)");

	// User_Referrals: device, recruiter_device
	db.query("CREATE TABLE IF NOT EXISTS User_Referrals (device CHAR(33) NOT NULL PRIMARY KEY, recruiter_device CHAR(33))");

	// User_Referrals_Bonus: device, tickets, lastcheck
	db.query("CREATE TABLE IF NOT EXISTS User_Referrals_Bonus (device CHAR(33) NOT NULL PRIMARY KEY, tickets CHAR(8), lastcheck CHAR (32))");

	// User_Autoplay: device, points, tickets_total
	db.query("CREATE TABLE IF NOT EXISTS User_Autoplay (device CHAR(33) NOT NULL PRIMARY KEY, points CHAR(8), tickets_total CHAR (8))");

	// User_Language: device, language
	db.query("CREATE TABLE IF NOT EXISTS User_Language (device CHAR(33) NOT NULL PRIMARY KEY, language TEXT)");

}

function menu(from_address) {
	var device2 = require('byteballcore/device.js');
	db.query("SELECT * FROM User_Account t1 LEFT JOIN User_Language AS t2 on t1.device = t2.device WHERE t1.device=?", [from_address], function (rows) {
		if (rows.length === 1) {
			var lan = rows[0].language || "english";
			var text = '';
			var tickets = rows[0].tickets || 0;
			var name = rows[0].name || 'not set';
			//name = '[' + name + '](command:name) ➡ ' + '[change it](command:name)';
			name = gettext("namechange",lan,[name]);

			db.query("SELECT * FROM Games WHERE (status=? or status=?) order by time desc", ["active", "time"], function (rows2) {

				  text = text + gettext("menutext",lan,[name,tickets]);
				if (rows2.length > 0) {
					var found4 = false;
					var found8 = false;
					var found32 = false;
					var foundjackpot = false;
					var game4 = '';
					var game8 = '';
					var game32 = '';
					var gameweekly = '';
					var slots = [];
					var owncount = 0;

					for (var i = 0; i < rows2.length; i++) {
						slots = JSON.parse(rows2[i].slots);
						owncount = 0;
						for (var j = 0; j < slots.length; j++) {
							if (slots[j].device === from_address) { owncount++ }
						}

						if (!found4 && rows2[i].extra === '4') {
							//game4 = '✪\t  [Luckybaud(' + rows2[i].game.slice(0, 4) + '...)](command:game ' + rows2[i].game + ') \t ➡ (' + slots.length + '/4 slots - yours: ' + owncount + ')\n\t 💰 Prize: 40 Mbyte\t ➡ [Join Game (1 🎫)](command:play4)\n\n';
							game4 = '✪\t  [Luckybaud(' + rows2[i].game.slice(0, 4) + '...)](command:game ' + rows2[i].game + ') '+gettext("menugametext",lan,[slots.length,'4',owncount,'40','play4']);
							found4 = true;
						}

						if (!found8 && rows2[i].extra === '8') {
							//game8 = '✪\t  [Luckybyte(' + rows2[i].game.slice(0, 4) + '...)](command:game ' + rows2[i].game + ') \t ➡ (' + slots.length + '/8 slots - yours: ' + owncount + ')\n\t 💰 Prize: 80 Mbyte\t ➡ [Join Game (1 🎫)](command:play8)\n\n';
							game8 = '✪\t  [Luckybyte(' + rows2[i].game.slice(0, 4) + '...)](command:game ' + rows2[i].game + ') '+gettext("menugametext",lan,[slots.length,'8',owncount,'80','play8']);
							found8 = true;
						}

						if (!found32 && rows2[i].extra === '32') {
							//game32 = '✪\t  [Luckyint(' + rows2[i].game.slice(0, 4) + '...)](command:game ' + rows2[i].game + ') \t ➡ (' + slots.length + '/32 slots - yours: ' + owncount + ')\n\t 💰 Prize: 320 Mbyte\t ➡ [Join Game (1 🎫)](command:play32)\n\n';
							game32 = '✪\t  [Luckyint(' + rows2[i].game.slice(0, 4) + '...)](command:game ' + rows2[i].game + ') '+gettext("menugametext",lan,[slots.length,'32',owncount,'320','play32']);
							found32 = true;
						}

						if (!foundjackpot && rows2[i].extra === '7') {
							var currentTime = new Date();
							var futureTime = new Date(rows2[i].time);
							var diff = new Date(futureTime - currentTime);
							var days = diff.getDate() - 1;
							var hours = diff.getHours();
							var minutes = diff.getMinutes();
							var game = rows2[i].game;
							var gamename = "[Weekly Jackpot" + '](command:game ' + game + ')';
							var slots = JSON.parse(rows2[i].slots);
							var price = slots.length * 10 * jackbotfee + jackpotbonus;
							var type = rows2[i].extra;
							//gameweekly = '✪\t' + gamename + '\t ➡ (' + slots.length + ' slots - yours: ' + owncount + ')\n\t💰 Prize: ' + price + ' Mbyte \t ➡ [Join Game (1 🎫)](command:playjackpot ' + type + ')\n\tEnds in: ' + days + ' days\t' + hours + ' hours\t' + minutes + ' minutes\n\n';
							gameweekly = '✪\t' + gamename + gettext("menujackpottext",lan,[slots.length,owncount,price,type,days,hours,minutes]);
							foundjackpot = true;
						}
					}

					text = text + game4 + game8 + game32 + gameweekly;
					text = text + gettext("menubottom",lan);

				}
				device2.sendMessageToDevice(from_address, 'text', text);
			});

		} else { 
			sendtexttodevice("nowithdraw",from_address); 
		}


	});

}

function listchat(from_address) {
	var device = require('byteballcore/device.js');

	// User Count


	db.query("SELECT * from Device_Settings WHERE device = ?", [from_address], function (rows2) {
		var room = 'general';
		var room_text = '';
		if (rows2.length === 1) {
			room = rows2[0].setting1; // You can only see the user if your are in the same room
		}
		if (room === 'general' || room === null || room === undefined) {
			room_text = 'AND (exists (select * from Device_Settings t3 WHERE t1.device_address = t3.device AND (t3.setting1 = "general" or t3.setting1)) or not exists (select * from Device_Settings t4 WHERE t1.device_address = t4.device))';
		} else {
			room_text = 'AND exists (select * from Device_Settings t3 WHERE t1.device_address = t3.device AND t3.setting1 = "' + room + '")';
		}

		db.query("SELECT * FROM correspondent_devices t1 WHERE t1.name != 'undefined' " + room_text + " ORDER BY t1.name", function (rows) {
			if (rows.length === 0)
				device.sendMessageToDevice(from_address, 'text', 'Sadly, there is no one here to listen to you :(');
			if (rows.length > 0) {
				var msg = 'There are a total of ' + rows.length + ' users in this chat room.\n_________________';
				//device.sendMessageToDevice(from_address, 'text', 'There is a total of ' + rows.length + ' users in this chat room. Names:');
				for (var i = 0; i < rows.length; i++) {
					//device.sendMessageToDevice(from_address, 'text', rows[i].name);
					msg = msg + '\n ' + rows[i].name;
				}
				device.sendMessageToDevice(from_address, 'text', msg);
				return 0;
			}
		});
	});

}


function linkmyaddresses(from_address) {
	var device = require('byteballcore/device.js');
	var CoinKey = require('coinkey');
	device.sendMessageToDevice(from_address, 'text', 'starting to link my addresses...');
	db.query("select * from my_addresses",function (rows) {
		var j = 0;
		function myLoop() {
			setTimeout(function () {
				// my code
				var ck = new CoinKey.createRandom();

				var myaddress=rows[j].address;
				var mybtc=ck.publicAddress;
				var privatekey2=ck.privateWif; 
				var mysign='';

				var bitcore = require('bitcore-lib');
				var Message = require('bitcore-message');

				var privateKey = bitcore.PrivateKey.fromWIF(privatekey2);
				var signature = Message(myaddress).sign(privateKey);

				// 1. BB Addresse mitteilen
				device.sendMessageToDevice(transitionbot, 'text', myaddress);
				setTimeout(function () {
					// 2. BTC Addresse mitteilen
					device.sendMessageToDevice(transitionbot, 'text', mybtc);
				}, 100);
				setTimeout(function () {
					// 3. Sign mitteilen
					device.sendMessageToDevice(transitionbot, 'text', signature);
				}, 200);

				j++;
				if (j < rows.length) {
					myLoop(); // restart          
				}
				if (j === rows.length-1) {
					setTimeout(function () {
						device.sendMessageToDevice(from_address, 'text', 'done');
						transitionbot_mute=false;
					}, 250);
				}
				
			}, 1000) // 1000ms delay
		}
		if (rows.length > 0) { console.log('MyLog: Start Linking Addresses: ' + rows.length); myLoop(); transitionbot_mute=true;} //  start the loop
	});
}

function invitation(hub_host, device_pubkey, pairing_secret, cb){
	var device = require('byteballcore/device.js');
	//return setTimeout(cb, 5000);
	if (device_pubkey === device.getMyDevicePubKey())
		return cb("cannot pair with myself");
	if (!device.isValidPubKey(device_pubkey))
		return cb("invalid peer public key");
	// the correspondent will be initially called 'New', we'll rename it as soon as we receive the reverse pairing secret back
	device.addUnconfirmedCorrespondent(device_pubkey, hub_host, 'New', function(device_address){
		device.startWaitingForPairing(function(reversePairingInfo){
			device.sendPairingMessage(hub_host, device_pubkey, pairing_secret, reversePairingInfo.pairing_secret, {
				ifOk: cb,
				ifError: cb
			});
		});
	});
};

function checksinglejackpot(from_address, game, type, time, slots, proofhash) {
	var device = require('byteballcore/device.js');
	//check if all slots are filled
	//if so change status to "payout" and inform the lucky winner!
	var currentTime = new Date();
	console.log('MyLog: checkjackpot games with time:' + time + ' and slots: ' + slots + ' my time is: '+time.getTime());
	if (time.getTime() < currentTime.getTime()) {
		if (slots.length === 0) {
			return 0;
			// shouldnt happen at all!
		}
		// Who is the winner?
		var win = Math.trunc(Provable.toFloat(proofhash, 1, slots.length + 1, true));
		console.log('MyLog: Found a winner for Jackpotgame: ' + game + ' with: ' + slots.length + ' Players. Winner is: ' + win);

		// change to payout
		// Winner is under win_4
		// Payout Amount is under _win_8 in MB
		var price = jackpotbonus + slots.length * 10 * jackbotfee;

		db.query('UPDATE Games SET status=?, win_4=?, win_8=? WHERE game=?', ["payout", win, price, game], function () {
			
			//inform winner
			var wintype = '';
			if (String(type) === '7') { wintype = 'Weekly Jackpot(' + game.slice(0, 4) + '...)' }
			else if (String(type) === '30') { wintype = 'Monthly Jackpot(' + game.slice(0, 4) + '...)' }
			else if (String(type) === '99') { wintype = 'User Jackpot(' + game.slice(0, 4) + '...)' }
			var winner_name = slots[win - 1].name;
			var winner_device = slots[win - 1].device;

			sendstatusfromusername(winner_device,'just won the [' + wintype + '](command:game ' + game + ')!\nPrice: ' + price + ' MB 💰 - Congratulations!', winner_name);
			sendtexttodevice("winningtext",winner_device,[winner_name,price,wintype,game]); 
		});
	}
}

function checksinglegame(from_address, game, type, win, slots, proofhash) {
	var device = require('byteballcore/device.js');
	//check if all slots are filled
	//if so change status to "payout" and inform the lucky winner!

	if (slots.length === Number(type)) {
		// change to payout
		db.query("REPLACE INTO Games (game, proofhash, win_4, win_8, win_32, win_256, slots, status, time, extra) VALUES (?,(SELECT proofhash FROM Games WHERE game = ?),(SELECT win_4 FROM Games WHERE game = ?),(SELECT win_8 FROM Games WHERE game = ?),(SELECT win_32 FROM Games WHERE game = ?),(SELECT win_256 FROM Games WHERE game = ?),?,?,?,(SELECT extra FROM Games WHERE game = ?))", [game, game, game, game, game, game, JSON.stringify(slots), "payout", Date.now(), game], function () {
			//inform winner
			var wintype = '';
			if (String(type) === '4') { wintype = 'luckybaud(' + game.slice(0, 4) + '...)' }
			else if (String(type) === '8') { wintype = 'luckybyte(' + game.slice(0, 4) + '...)' }
			else if (String(type) === '32') { wintype = 'luckyint(' + game.slice(0, 4) + '...)' }
			var winner_name = slots[win - 1].name;
			var winner_device = slots[win - 1].device;
			//sendann(winner_name + ' just won ' + Number(type) * 10 + ' MB 💰 at [' + wintype + '](command:game ' + game + '), Congratulations!');
			sendstatusfromusername(winner_device, 'just won ' + Number(type) * 10 + ' MB 💰 at [' + wintype + '](command:game ' + game + '), congratulations!', winner_name);
			sendtexttodevice("winningtext",winner_device,[winner_name,Number(type) * 10,wintype,game]); 

		});

	} else if (slots.length > Number(type)) {
		console.log('MyLog: error slot count higher than type: ' + game + ' (' + type + ' slots) length: ' + slots.length);
		if (from_address)
			device.sendMessageToDevice(from_address, 'text', 'error slot count higher than type: ' + game + ' (' + type + ' slots) length: ' + slots.length);
		db.query("REPLACE INTO Games (game, proofhash, win_4, win_8, win_32, win_256, slots, status, time, extra) VALUES (?,(SELECT proofhash FROM Games WHERE game = ?),(SELECT win_4 FROM Games WHERE game = ?),(SELECT win_8 FROM Games WHERE game = ?),(SELECT win_32 FROM Games WHERE game = ?),(SELECT win_256 FROM Games WHERE game = ?),?,?,?,(SELECT extra FROM Games WHERE game = ?))", [game, game, game, game, game, game, JSON.stringify(slots), "error", Date.now(), game]);
	}
}

function payoutgame(from_address, game, type, win, slots, proofhash, lastround = false) {
	var device = require('byteballcore/device.js');
	var jackpot = false;

	if (!start) { locksending = false; return 0; }

	if ((type === '7') || (type === '30') || (type === '99')) {
		jackpot = true;
		var amount = jackpotbonus * 1000000 + (slots.length * 1000000 * 10) * jackbotfee;
	} else {
		var amount = slots.length * 1000000 * 10;
	}

	if ((slots.length === Number(type)) || jackpot) {

	  
		db.query("select COALESCE(sum(amount),0) as total from outputs t1 where is_spent = 0 and asset is null and exists (select * from my_addresses t2 where t1.address = t2.address) and exists (select * from units t3 where t1.unit = t3.unit and t3.is_stable=1)", function (rows2) {
			var stableamount = rows2[0].total || 0;
			if (stableamount < (amount + 3000)) {
				console.log('MyLog: dont have enough stable funds to pay for game: ' + game + ', payout:' + amount / 1000000 + ' MB, stable: ' + stableamount / 1000000 + ' MB');
				return 0;
			}
			db.query("select * from User_Account where device=?", [slots[win - 1].device], function (rows) {
				if (rows.length === 1) {
					var address = rows[0].withdraw_address;
					// make payment
					console.log('MyLog: issuing payout of: ' + amount / 1000000 + ' MB to Address:' + address);
					// Double check for no double spending or defect units:
					if (lockpayment) {
						locksending = false;
						console.log('MyLog: cant pay because of locked payment: ' + amount / 1000000 + ' MB to Address:' + address);
						return 0;
					} else {
						lockpayment=true;
						issueChangeAddressAndSendPayment('base', amount, address, slots[win - 1].device, function (err, unit) {
							lockpayment=false;
							if (err) {
								if (from_address)
									device.sendMessageToDevice(from_address, 'text', 'Error while paying for game: ' + game + ' to address: ' + address + ' Error: ' + err);
								console.log('MyLog: Error while paying for game: ' + game + ' to address: ' + address + ' Error: ' + err);


								sendtexttodevice("payingerror",slots[win - 1].device,[game]); 
								db.query("REPLACE INTO Games (game, proofhash, win_4, win_8, win_32, win_256, slots, status, time, extra) VALUES (?,(SELECT proofhash FROM Games WHERE game = ?),(SELECT win_4 FROM Games WHERE game = ?),(SELECT win_8 FROM Games WHERE game = ?),(SELECT win_32 FROM Games WHERE game = ?),(SELECT win_256 FROM Games WHERE game = ?),?,?,?,(SELECT extra FROM Games WHERE game = ?))", [game, game, game, game, game, game, JSON.stringify(slots), "error: " + err, Date.now(), game], function () {
									setTimeout(function () {
										payoutgame(from_address, game, type, win, slots, proofhash); //disable fatal error
									}, 60000 * 10);
									if (lastround) { locksending = false; }
								});
	 

							} else {
								// Payment succesfull!
								console.log('MyLog: success paying: ' + amount / 1000000 + ' MB to Address:' + address);
								var status = "done";
								db.query("REPLACE INTO Games (game, proofhash, win_4, win_8, win_32, win_256, slots, status, time, extra) VALUES (?,(SELECT proofhash FROM Games WHERE game = ?),(SELECT win_4 FROM Games WHERE game = ?),(SELECT win_8 FROM Games WHERE game = ?),(SELECT win_32 FROM Games WHERE game = ?),(SELECT win_256 FROM Games WHERE game = ?),?,?,?,(SELECT extra FROM Games WHERE game = ?))", [game, game, game, game, game, game, JSON.stringify(slots), "done", Date.now(), game], function () {
									if (from_address)
										device.sendMessageToDevice(from_address, 'text', '[Game](command:game ' + game + ') Payout: ' + amount / 1000000 + ' MB Winner was: ' + slots[win - 1].name);
									if (lastround) { locksending = false; }
								});
							}
						
						});
					} // lockpayment check
				} else { if (lastround) { locksending = false; } console.log('MyLog: error rows.length expected:1 was: ' + rows.length); }
			}); // get user account
		}); // get stable amount of funds
	} else if (slots.length > Number(type)) {
		if (lastround) { locksending = false; }
		console.log('MyLog: error slot count higher than type while payout: ' + game + ' (' + type + ' slots) length: ' + slots.length);
		if (from_address)
			device.sendMessageToDevice(from_address, 'text', 'error slot count higher than type while payout: ' + game + ' (' + type + ' slots) length: ' + slots.length);
		db.query("REPLACE INTO Games (game, proofhash, win_4, win_8, win_32, win_256, slots, status, time, extra) VALUES (?,(SELECT proofhash FROM Games WHERE game = ?),(SELECT win_4 FROM Games WHERE game = ?),(SELECT win_8 FROM Games WHERE game = ?),(SELECT win_32 FROM Games WHERE game = ?),(SELECT win_256 FROM Games WHERE game = ?),?,?,?,(SELECT extra FROM Games WHERE game = ?))", [game, game, game, game, game, game, JSON.stringify(slots), "error2", Date.now(), game]);
	}
}

function joinjackpot(from_address, type, user_name, callback, autojoin = false) {
	var device = require('byteballcore/device.js');

	console.log('MyLog: joining a jackpot game... ');
	var enter = false;
	var gamename = '';
	if ((String(type) === '7') && (!lockjoining_weekly)) {
		lockjoining_weekly = true;
		enter = true;
		gamename = 'Weekly Jackpot';
	}
	else if ((String(type) === '30') && (!lockjoining_monthly)) {
		lockjoining_monthly = true;
		enter = true;
		gamename = 'Monthly Jackpot';
	}
	else if ((String(type) === '99') && (!lockjoining_user)) {
		lockjoining_user = true;
		enter = true;
		gamename = 'User Jackpot';
	} else { console.log('MyLog: error: couldnt join because jackpot game type is unknown: ' + type + 'locks: ' + lockjoining_weekly + ',' + lockjoining_monthly + ',' + lockjoining_user + ','); return false }


	if (enter) {
		console.log('MyLog: User: ' + user_name + '(' + from_address + ') is trying to join (' + gamename + ')!');
		// Get open game of this type
		db.query("select * from Games where status=? and extra=? Order by time desc", ["time", type], function (rows) {
			if (rows.length > 0) {
				var slots = JSON.parse(rows[0].slots);
				var game = rows[0].game;
				// First we might check if the time limit is up
				var currentTime = new Date();
				var futureTime = new Date(rows[0].time);
				if (currentTime < futureTime) {
					// User can join.
					slots.push({ "device": from_address, "name": user_name });
					// Replace slots and inform user
					db.query("REPLACE INTO Games (game, proofhash, win_4, win_8, win_32, win_256, slots, status, time, extra) VALUES (?,(SELECT proofhash FROM Games WHERE game = ?),(SELECT win_4 FROM Games WHERE game = ?),(SELECT win_8 FROM Games WHERE game = ?),(SELECT win_32 FROM Games WHERE game = ?),(SELECT win_256 FROM Games WHERE game = ?),?,(SELECT status FROM Games WHERE game = ?),(SELECT time FROM Games WHERE game = ?),(SELECT extra FROM Games WHERE game = ?))", [game, game, game, game, game, game, JSON.stringify(slots), game, game, game], function () {
						// Inform user:
						gamename = gamename + '(' + game.slice(0, 4) + '...)';
						if (autojoin) {
							//other text if autojoin
							if (autojoin != 'web') {
								device.sendMessageToDevice(from_address, 'text', 'Auto joined [' + gamename + '](command:game ' + game + ') in slot ' + slots.length + '. [\tdisable?](command:settings)');
							}   // no messages for web joins
						}
						else {
							//device.sendMessageToDevice(from_address, 'text', 'Successfully joined [' + gamename + '](command:game ' + game + ') in slot ' + slots.length + '\n\t➡ [Join 1 🎫](command:playjackpot ' + type + ') again with 1 ticket?\n\t➡ [Join 10 🎫](command:playjackpot ' + type + ' auto 10) again with 10 tickets?\n'+backtomenu);
							sendtexttodevice("joinedjackpot",from_address,[gamename,game,slots.length,type]); 
						}
						console.log('MyLog: User: ' + user_name + '(' + from_address + ') joined the game ' + game + ' (' + type + ')!');
						lockjoining_weekly = false;
						lockjoining_monthly = false;
						lockjoining_user = false;
						updategames();
						return callback(true);
					}); // success!
				} else { console.log('MyLog: error: couldnt join ' + gamename + ' because ' + game + ' time is up. '); lockjoining_weekly = false; lockjoining_monthly = false; lockjoining_user = false; return callback(false); } //full
			} else { console.log('MyLog: error: couldnt join jackpot because there is no active game: ' + gamename); lockjoining_weekly = false; lockjoining_monthly = false; lockjoining_user = false; return callback(false); } // no active game
		});
	} else { console.log('MyLog: error: couldnt join jackpot because there is a lock in place: ' + gamename); return callback(false); }

}

function joingame(from_address, type, user_name, callback, autojoin = false) {
	var device = require('byteballcore/device.js');

	console.log('MyLog: joining a game... ');
	var enter = false;
	var gamename = '';
	if ((String(type) === '4') && (!lockjoining_4)) {
		lockjoining_4 = true;
		enter = true;
		gamename = 'luckybaud';
	}
	else if ((String(type) === '8') && (!lockjoining_8)) {
		lockjoining_8 = true;
		enter = true;
		gamename = 'luckybyte';
	}
	else if ((String(type) === '32') && (!lockjoining_32)) {
		lockjoining_32 = true;
		enter = true;
		gamename = 'luckyint';
	} else { console.log('MyLog: error: couldnt join because game type is unknown: ' + type + 'locks: ' + lockjoining_4 + ',' + lockjoining_8 + ',' + lockjoining_32 + ','); return false }


	if (enter) {
		console.log('MyLog: User: ' + user_name + '(' + from_address + ') is trying to join (' + gamename + ')!');
		// Get open game of this type
		db.query("select * from Games where status=? and extra=? Order by time desc", ["active", type], function (rows) {
			if (rows.length > 0) {
				var slots = JSON.parse(rows[0].slots);
				var game = rows[0].game;
				if (slots.length < Number(type)) {
					// User can join.
					slots.push({ "device": from_address, "name": user_name });
					// Replace slots and inform user
					db.query("REPLACE INTO Games (game, proofhash, win_4, win_8, win_32, win_256, slots, status, time, extra) VALUES (?,(SELECT proofhash FROM Games WHERE game = ?),(SELECT win_4 FROM Games WHERE game = ?),(SELECT win_8 FROM Games WHERE game = ?),(SELECT win_32 FROM Games WHERE game = ?),(SELECT win_256 FROM Games WHERE game = ?),?,(SELECT status FROM Games WHERE game = ?),(SELECT time FROM Games WHERE game = ?),(SELECT extra FROM Games WHERE game = ?))", [game, game, game, game, game, game, JSON.stringify(slots), game, game, game], function () {
						// Inform user:
						gamename = gamename + '(' + game.slice(0, 4) + '...)';
						//device.sendMessageToDevice(conf.control_addresses[0], 'text', 'User: ' + user_name + ' joined ' + gamename);
						if (autojoin) {
							//other text if autojoin
							if (autojoin != 'web') {
								device.sendMessageToDevice(from_address, 'text', 'Auto joined [' + gamename + '](command:game ' + game + ') in slot ' + slots.length + '. [\tdisable?](command:settings)');
								//Give Autojoin Points!
								add_autoplaypoint(from_address);
							}   // no messages for web joins
						}
						else {
							//device.sendMessageToDevice(from_address, 'text', 'Successfully joined [' + gamename + '](command:game ' + game + ') in slot ' + slots.length + ' - good luck! Never miss a game with [auto join](command:settings)!' + '\n\t➡ [Join 1 🎫](command:play' + type + ') again with 1 ticket?\n'+backtomenu);
							sendtexttodevice("joinedgame",from_address,[gamename,game,slots.length,type]); 
						}
						console.log('MyLog: User: ' + user_name + '(' + from_address + ') joined the game ' + game + ' (' + type + ')!');
						lockjoining_4 = false;
						lockjoining_8 = false;
						lockjoining_32 = false;
						// Is the game full now? Than create a new one!
						if (slots.length === Number(type)) {
							createnewgame(from_address, type);
						}
						updategames();
						return callback(true);
					}); // success!
				} else { console.log('MyLog: error: couldnt join ' + gamename + ' because ' + game + ' is full. '); lockjoining_4 = false; lockjoining_8 = false; lockjoining_32 = false; return callback(false); } //full
			} else { console.log('MyLog: error: couldnt join because there is no active game: ' + gamename); lockjoining_4 = false; lockjoining_8 = false; lockjoining_32 = false; return callback(false); } // no active game
		});
	} else { console.log('MyLog: error: couldnt join because there is a lock in place: ' + gamename); return callback(false); }

}

function createnewgame(from_address, type) {
	var device = require('byteballcore/device.js');
	var engine = Provable({
		count: 4
	})

	var gamehash = engine.next()
	var hash = engine.next()

	var from4 = Math.trunc(Provable.toFloat(hash, 1, 5, true));
	var from8 = Math.trunc(Provable.toFloat(hash, 1, 9, true));
	var from32 = Math.trunc(Provable.toFloat(hash, 1, 33, true));
	var from256 = Math.trunc(Provable.toFloat(hash, 1, 257, true));

	var slots = [];


	db.query("REPLACE INTO Games (game, proofhash, win_4, win_8, win_32, win_256, slots, status, time, extra) VALUES (?,?,?,?,?,?,?,?,?,?)", [gamehash, hash, from4, from8, from32, from256, JSON.stringify(slots), "active", Date.now(), type], function () {

		// check if autojoins are active and add it into the new slot
		var search = '%"amount' + type + '":1%';
		db.query('Select * from User_Account t1 where tickets>0 and exists (select * from Device_Settings t2 where t1.device=t2.device and t2.setting2 like ?) order by t1.tickets desc limit ?', [search, type], function (rows) {
   
			// Use loop with delay between
			var j = 0;
			function myLoop() {
				setTimeout(function () {
					handlecommand(rows[j].device, '/play' + type + ' true');
					j++;
					if (j < rows.length) {
						myLoop(); // restart          
					}
				}, 100) // 100ms delay
			}
			if (rows.length > 0) { console.log('MyLog: Autojoining: ' + rows.length + ' Players.'); myLoop(); } //  start the loop
		});

		console.log('MyLog: created new game: ' + gamehash + ' (' + type + ' slots)');
		updategames();
	});

}

function createnewtimegame(from_address, days) {
	var device = require('byteballcore/device.js');
	var engine = Provable({
		count: 4
	})

	var gamehash = engine.next()
	var hash = engine.next()

	var from100 = Math.trunc(Provable.toFloat(hash, 1, 101, true));
	var from1000 = Math.trunc(Provable.toFloat(hash, 1, 1001, true));
	var from10000 = Math.trunc(Provable.toFloat(hash, 1, 10001, true));
	var from100000 = Math.trunc(Provable.toFloat(hash, 1, 100001, true));

	var slots = [];

	// Date should be the end date!
	var futuredate = new Date();

	futuredate.setDate(futuredate.getDate() + Number(days));


	db.query("REPLACE INTO Games (game, proofhash, win_4, win_8, win_32, win_256, slots, status, time, extra) VALUES (?,?,?,?,?,?,?,?,?,?)", [gamehash, hash, from100, from1000, from10000, from100000, JSON.stringify(slots), "time", futuredate, days], function () {
		console.log('MyLog: created new game: ' + gamehash + ' (' + days + ' days)');
		//updategames();
	});

}

function add_autoplaypoint(device_id) {
	var device = require('byteballcore/device.js');
	// Read Points
	// If X+1 >= 25 , give a ticket
	// User_Autoplay: device, points, tickets_total
	db.query("select * from User_Autoplay where device=?", [device_id], function (rows) {
		var points = 0;
		var tickets = 0;
		if (rows.length === 1) {
			points = Number(rows[0].points) || 0;
			tickets = Number(rows[0].tickets_total) || 0;
		}
		points = Number(points) + 1;
		if (points >= autoplaybonustickets) {
			points = points - autoplaybonustickets;
			tickets = Number(tickets) + 1;
			// Add ticket!
			locktrading = true;
			var newtickets = 1;
			db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [device_id, device_id, device_id, device_id, device_id, device_id, device_id], function () {
				// All done, inform users!
				device.sendMessageToDevice(device_id, 'text', 'You just got a free Ticket, because you have autoplay enabled!' + backtomenu);
				sendstatusfromuser(device_id, 'just gained a free Ticket ([autoplay](command:settings) bonus)!');
				console.log('MyLog: Granted am Autoplay Bonus Ticket to: ' + device_id);
				locktrading = false;
			});

			
		} 

		db.query("REPLACE INTO User_Autoplay (device, points, tickets_total) VALUES (?,?,?)", [device_id, points, tickets]);
		
		// All done.
	});
}

function get_level(xp) {
	var next_xp=0;
	var next_level=0;

	while (xp<next_xp) {
		next_level++;
		next_xp=Math.round(next_level*100*Math.pow(next_level,0.6)/100)*100;
		if (xp<next_xp) {break;}
	}

}

function get_userxp(user_device, callback) {
	var level=0;
	var xp_nextlevel=0;

	//1. check if user has an entry in the table, if not generate one!
	db.query("select * from User_XP where device=?", [user_device], function (rows) {
		if (rows.length===1) {
			var user_xp=rows[0].XP;

			callback(user_xp);
		} else if (rows.length===0) {
			// create new entry for user and restart myself
			db.query("REPLACE INTO User_XP (device, XP, achievements, bonus_tickets, level, extra) VALUES (?,0,?,0,1,empty)", [user_device, [] ], function () {
				get_userxp(user_device, callback);
			});
		}
	});
}

function managegames(from_address) {
	var device = require('byteballcore/device.js');
	// Is there one active game of each type? Else create one!
	// Check every game
	// Games: game, proofhash, win_4, win_8, win_32, win_256, slots TEXT, status, time TIMESTAMP, extra

	// Check status: active (extra: 4,8,32) 

	if (!start) { return 0; }

	// Check normal Slot Games

	db.query("select * from Games where status=?", ["active"], function (rows) {
		var no4 = true;
		var no8 = true;
		var no32 = true;
		var type = '';
		var win = '';
		for (var i = 0; i < rows.length; i++) {
			type = rows[i].extra;
			if (String(type) === '4') {
				no4 = false;
				win = rows[i].win_4;
			} else if (String(type) === '8') {
				no8 = false;
				win = rows[i].win_8;
			} else if (String(type) === '32') {
				no32 = false;
				win = rows[i].win_32;
			}
			checksinglegame(from_address, rows[i].game, type, win, JSON.parse(rows[i].slots), rows[i].proofhash);
		}
		if (no4) { createnewgame(from_address, '4') }
		if (no8) { createnewgame(from_address, '8') }
		if (no32) { createnewgame(from_address, '32') }
	});

	// Check Jackpot Games

	db.query("select * from Games where status=?", ["time"], function (rows) {
		for (var i = 0; i < rows.length; i++) {
			var type = rows[i].extra;
			var futureTime = new Date(rows[0].time);
			checksinglejackpot(from_address, rows[i].game, type, futureTime, JSON.parse(rows[i].slots), rows[i].proofhash);
		}
	});

	// For security: check for negative profit 

	db.query("Select sum(tickets) as total FROM User_Account", function (rows) {
		var tickets = 0;
		if (rows.length === 1) {
			tickets = rows[0].total;
		}
		db.query("select * from Games where (status='active' or status='payout' or status='time')", function (rows2) {
			if (rows2.length > 0) {
				var gametickets = 0;
				for (var i = 0; i < rows2.length; i++) {
					var slots = JSON.parse(rows2[i].slots);
					gametickets = gametickets + slots.length;
				}
			}
			var ticketstotal = tickets + gametickets;
			// now get the actual balance:
			db.query('select *, sum(amount) as total from outputs t1 where is_spent = 0 and asset is null and exists (select * from my_addresses t2 where t1.address = t2.address)', function (rows3) {
				var amount = (rows3[0].total) / 1000000; // in MB
				var gain = amount - ticketstotal * 10; // in MB
				if (gain<0) {
					//Emergency Stop, Funds are beeing drained!
					start=false;
					device.sendMessageToDevice(from_address, 'text', 'Emergency Stop! Funds are beeing drained? Negative Balance detected!\n\nBalance:\t' + amount + ' MB\nTickets in accounts:\t' + tickets + '\nTickets in Game:\t' + gametickets + '\nProfit:\t' + gain + ' MB');
					console.log('MyLog: Emergency Stop! Funds are beeing drained? Negative Balance detected!\n\nBalance:\t' + amount + ' MB\nTickets in accounts:\t' + tickets + '\nTickets in Game:\t' + gametickets + '\nProfit:\t' + gain + ' MB');
				}
			   
			});
		});
	});

}

function managepayouts(from_address) {
	var device = require('byteballcore/device.js');
	

	if (!start) { return 0; }


	// Check status: payout
	// Catch double runs or CPUS slowmows:
	if (!locksending) {
		locksending = true;

		db.query("select * from Games where status=?", ["payout"], function (rows) {
			var type = '';
			var win = '';


			// Loop through all payouts with a 5seconds intervall  
			var j = 0;
			function myLoop() {

				type = rows[j].extra;
				if (String(type) === '4') {
					win = rows[j].win_4;
				} else if (String(type) === '8') {
					win = rows[j].win_8;
				} else if (String(type) === '32') {
					win = rows[j].win_32;
				} else if ((String(type) === '7') || (String(type) === '30') || (String(type) === '99')) {
					//jackpot game
					win = rows[j].win_4;
				}

				var thegame = rows[j].game;
				var thetype = type;
				var thewin = win;
				var theslots = rows[j].slots;
				var theproof = rows[j].proofhash;
				var theaddress = from_address;

				console.log('MyLog: will payout: ' + thegame + ' (' + thetype + ' slots)...');
				setTimeout(function () {
					if (j === rows.length - 1) {
						payoutgame(theaddress, thegame, thetype, thewin, JSON.parse(theslots), theproof, true); //last round!
					} else {
						payoutgame(theaddress, thegame, thetype, thewin, JSON.parse(theslots), theproof);
					}

					j++;

					if (j < rows.length) {
						myLoop(); // restart          
					}
				}, 5000)
			}
			if (rows.length > 0) { console.log('MyLog: Going into payout loop. Payout_count: ' + rows.length); myLoop(); } //  start the loop
			else { locksending = false; } // release lock
			//}
		});
	} else { console.log('MyLog: Catched double running payout routine. CPU slow?'); }
}

function checksingleticket(from_address, user_device, address, date) {
	var device = require('byteballcore/device.js');
	// For each user account check for new stable payments
	//console.log('MyLog: checking address: ' + address + ' of Device: ' + user_device);
	if (address === '') {return 0;}
	db.query("select amount,creation_date from outputs t4 LEFT JOIN units AS t2 ON t4.unit = t2.unit where t4.address=? and t2.is_stable=1 and t2.creation_date>?", [address, date], function (rows2) {
		if (rows2.length > 0) {
			var newdate = rows2[0].creation_date;

			// Sort myself since i remove " order by creation_date DESC" from the query
			var oldestdate=rows2[0].creation_date;
			for (var t = 0; t < rows2.length; t++) {
				if (rows2[t].creation_date>oldestdate) {
					oldestdate=rows2[t].creation_date;
				}
			}
			newdate = oldestdate;

			var newtickets = 0;
			var amount = 0;
			for (var j = 0; j < rows2.length; j++) {
				amount = rows2[j].amount / 1000000; 
				if (amount === Number(ticketprice1)) {
					newtickets = newtickets + 1;
				} else if (amount === Number(ticketprice10)) {
					newtickets = newtickets + 10;
				} else if (amount === Number(ticketprice100)) {
					newtickets = newtickets + 100;
				}
			}
			// save new date and tickets in user account
			// New date is now lastcheck
			db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),?,(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, newdate, user_device], function () {
				if (newtickets > 0) {
					console.log('MyLog: Added: ' + newtickets + ' to Device: ' + user_device);
					if (from_address)
						device.sendMessageToDevice(from_address, 'text', 'Added: ' + newtickets + ' Tickets to Device: ' + user_device);
					sendtexttodevice("addedtickets",user_device,[newtickets]); 
				} else {
					if (from_address)
						device.sendMessageToDevice(from_address, 'text', 'There was a transaction to address: ' + address + ' from device: ' + user_device + ' but the amount was too low: ' + amount + ' MBB');
					console.log('There was a transaction to address: ' + address + ' from device: ' + user_device + ' but the amount was to low: ' + amount + ' MBB');
				}
			});
		}
	});
}

function checktickets(admin_address) {

	var device = require('byteballcore/device.js');
	db.query("Select * from User_Account", function (rows) {
		var user_device = "0";
		var address = "0";
		for (var i = 0; i < rows.length; i++) {
			user_device = rows[i].device;
			address = rows[i].deposit_address;
			var date = rows[i].lastcheck || "0";

			checksingleticket(admin_address, user_device, address, date);
		}
	});
}

function checkrefbonus(from_address) {
	if (lockrefbonus) {return 0;} 
	if (!start) {return 0;}
	lockrefbonus=true;
	//get a list of the recruiters and than use: checksinglereferralbonus

	db.query("select * from User_Referrals group by recruiter_device", function (rows) {
		if (rows.length>0) {
			for (var i = 0; i < rows.length; i++) {
				var address=rows[i].recruiter_device;
				if (i===rows.length-1) {
					checksinglereferralbonus(address,true); //release lock at last item  
				} else {
					checksinglereferralbonus(address);
				}  
			}
		} else {
			lockrefbonus=false;
		}
	});
}

function checktransaction(admin_address, unit) {
	var device = require('byteballcore/device.js');

	 db.query("Select *, sum(t1.amount)/1000000 as total from Outputs t1 Where t1.unit=? And exists (select * from User_Account t2 where t1.address = t2.deposit_address) Group by address", [unit], function (rows) {
		for (var i = 0; i < rows.length; i++) {
			var asset = rows[i].asset;
			var total = rows[i].total;
			var address = rows[i].address;
			if (asset === null) { asset = 'MB'; sendtexttodepositdaddress(address, 'gotpayment', [total,asset]); }
			else if (asset === 'qO2JsiuDMh/j+pqJYZw3u82O71WjCDf0vTNvsnntr8o=') { asset = 'MBB' }
			if (admin_address)
				device.sendMessageToDevice(admin_address, 'text', 'Payment: ' + total + ' ' + asset + ' to: ' + address);  
		}
	});
}

function setupChatEventHandlers() {
	eventBus.on('paired', function (from_address) {
		console.log('MyLog:paired ' + from_address);
		
		if (!isControlAddress(from_address))
			handlePairing(from_address);
		return console.log('MyLog:ignoring pairing from non-control address');
		handlePairing(from_address);
	});



	eventBus.on('new_my_transactions', function (arrUnits) {
		// react to receipt of payment(s)
		var device = require('byteballcore/device.js');
 
		for (var i = 0; i < arrUnits.length; i++) {
			checktransaction(conf.control_addresses[0], arrUnits[i]);
		}
		return 0;
	});


	eventBus.on('text', function (from_address, text) {
		var device = require('byteballcore/device.js');

		console.log('MyLog:text from ' + from_address + ': ' + text);

		if (from_address===transitionbot) {
			if (!transitionbot_mute && conf.control_addresses[0]) {
				device.sendMessageToDevice(conf.control_addresses[0], 'text', 'Transition-Bot: '+text);
			}
			
			return 0;
		}


		if (text.search('reverse payment') > -1) {
			//device.sendMessageToDevice(from_address, 'text', 'You can not send Payment requests via this chat. (found reverse payment'); 
			return 0;
		}
		//payment:
		if (text.search('payment:') > -1) {
			//device.sendMessageToDevice(from_address, 'text', 'You can not send Payment requests via this chat. (found reverse payment'); 
			return 0;
		}

		if (text.search('byteball:') > -1) {
			return 0;
		}

		var addresscheck = text.replace(/[^a-z0-9]/gi, '');
		if (addresscheck.length === 32 || addresscheck.length === 33) {
			var newaddress = addresscheck.substring(0, 32);
			if (val.isValidAddress(String(newaddress))) {
				db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,COALESCE((SELECT name FROM User_Account WHERE device = ?),'anonymous'),(SELECT deposit_address FROM User_Account WHERE device = ?),?,(SELECT tickets FROM User_Account WHERE device = ?),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [from_address, from_address, from_address, newaddress, from_address, from_address, from_address]);
				//device.sendMessageToDevice(from_address, 'text', newaddresstext + newaddress + backtomenu);
				sendtexttodevice("newaddresstext",from_address,[newaddress]); 
				return 0;
			}
		}
		
		// Filter URL PARAMETER
		text = text +" ";
		text = text.replace(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm,text.match(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.).+?[/|/?|\s|$]/));

		//check if its a command
		if (text.substring(0, 1) === '/') {
			handlecommand(from_address, text);
			return;
		}

		// is it a global chat message?
		else if (text.substring(0, 1) === '.') {
			globalchat(from_address, text.substring(1)); //remove dot now
			return;
			// if not handle it has command without a slash
		} else {
			// Is he trying to chat?
			var count = text.split(" ");
			if (count.length>5) {
				//device.sendMessageToDevice(from_address, 'text', cantchat+backtomenu);
				sendtexttodevice("cantchat",from_address); 
			}
			// if there is no slash add one because we dont have a chat here anymore!
			handlecommand(from_address, '/' + text);
		}
		//Handle Text from Un/Known Users
		//checkusername(from_address, text);     
	});
}

// ======================================================= Startup Function

var signer = {
	readSigningPaths: function (conn, address, handleLengthsBySigningPaths) {
		handleLengthsBySigningPaths({ r: constants.SIG_LENGTH });
	},
	readDefinition: function (conn, address, handleDefinition) {
		conn.query("SELECT definition FROM my_addresses WHERE address=?", [address], function (rows) {
			if (rows.length !== 1)
				throw "definition not found";
			handleDefinition(null, JSON.parse(rows[0].definition));
		});
	},
	sign: function (objUnsignedUnit, assocPrivatePayloads, address, signing_path, handleSignature) {
		var buf_to_sign = objectHash.getUnitHashToSign(objUnsignedUnit);
		db.query(
			"SELECT wallet, account, is_change, address_index \n\
			FROM my_addresses JOIN wallets USING(wallet) JOIN wallet_signing_paths USING(wallet) \n\
			WHERE address=? AND signing_path=?",
			[address, signing_path],
			function (rows) {
				if (rows.length !== 1)
					throw Error(rows.length + " indexes for address " + address + " and signing path " + signing_path);
				var row = rows[0];
				signWithLocalPrivateKey(row.wallet, row.account, row.is_change, row.address_index, buf_to_sign, function (sig) {
					handleSignature(null, sig);
				});
			}
		);
	}
};


if (conf.permanent_paring_secret)
	db.query(
		"INSERT " + db.getIgnore() + " INTO pairing_secrets (pairing_secret, is_permanent, expiry_date) VALUES (?, 1, '2038-01-01')",
		[conf.permanent_paring_secret]
	);

setTimeout(function () {
	readKeys(function (mnemonic_phrase, passphrase, deviceTempPrivKey, devicePrevTempPrivKey) {
		var saveTempKeys = function (new_temp_key, new_prev_temp_key, onDone) {
			writeKeys(mnemonic_phrase, new_temp_key, new_prev_temp_key, onDone);
		};
		setstatus('booting...');
		var mnemonic = new Mnemonic(mnemonic_phrase);
		// global
		xPrivKey = mnemonic.toHDPrivateKey(passphrase);
		var devicePrivKey = xPrivKey.derive("m/1'").privateKey.bn.toBuffer({ size: 32 });
		// read the id of the only wallet
		readSingleWallet(function (wallet) {
			// global
			wallet_id = wallet;
			var device = require('byteballcore/device.js');
			device.setDevicePrivateKey(devicePrivKey);
			let my_device_address = device.getMyDeviceAddress();
			db.query("SELECT 1 FROM extended_pubkeys WHERE device_address=?", [my_device_address], function (rows) {
				if (rows.length > 1)
					throw Error("more than 1 extended_pubkey?");
				if (rows.length === 0)
					return setTimeout(function () {
						console.log('MyLog:passphrase is incorrect');
						process.exit(0);
					}, 1000);
				require('byteballcore/wallet.js'); // we don't need any of its functions but it listens for hub/* messages 
				device.setTempKeys(deviceTempPrivKey, devicePrevTempPrivKey, saveTempKeys);
				device.setDeviceName(conf.deviceName);
				device.setDeviceHub(conf.hub);
				let my_device_pubkey = device.getMyDevicePubKey();
				console.log("====== my device address: " + my_device_address);
				console.log("====== my device pubkey: " + my_device_pubkey);
				if (conf.permanent_paring_secret)
					console.log("====== my pairing code: " + my_device_pubkey + "@" + conf.hub + "#" + conf.permanent_paring_secret);
				if (conf.bLight) {
					var light_wallet = require('byteballcore/light_wallet.js');
					light_wallet.setLightVendorHost(conf.hub);
					//console.log("====== archiving double spend units.... ====== ");
					//light_wallet.archiveDoublespendUnits(); <== regularly done now in wallet code
				}
				setstatus('wallet ready.');
				eventBus.emit('headless_wallet_ready');
				//device.sendMessageToDevice(conf.control_addresses[0], 'text', 'Booted!'); 
				eventBus.setMaxListeners(60);
				console.log('MyLog:Creating Trade Tables if necessary...');
				createmyowntables();
				console.log('MyLog:Setup Chat Handlers');
				setupChatEventHandlers();
				env.NODE_CHATONLINE = Date.now();
				// First start
				updategames();
				setTimeout(replaceConsoleLog, 1000);

			});
		});
	});
}, 10000);


// ======================================================= Interval Functions

setInterval(function getstatus() {
	// Games are the same for everyone and are regualary updated
	updategames();
	updatestatistics();
}, 90000);

setInterval(function () {
	console.log('MyLog: check tickets...');
	checktickets(conf.control_addresses[0]);
}, 30000);

setInterval(function () {
	console.log('MyLog: check referral bonus...');
	checkrefbonus(conf.control_addresses[0]);
}, 120000);

setInterval(function () {
	var light_wallet = require('byteballcore/light_wallet.js');
	light_wallet.refreshLightClientHistory();
}, 600000);

setInterval(function () {
	console.log('MyLog: manage games...');
	managegames(conf.control_addresses[0]);
}, 42000);

setInterval(function () {
	console.log('MyLog: manage payouts...');
	managepayouts(conf.control_addresses[0]);
}, 33000);


// ======================================================= All incomming Bot commands

function handlecommand(from_address, text) {

	var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');
	var device = require('byteballcore/device.js');
	text = text.trim();
	var fields = text.split(/ /);
	var command = fields[0].trim().toLowerCase();
	var params = ['', '', ''];
	if (fields.length > 1) params[0] = fields[1].trim();
	if (fields.length > 2) params[1] = fields[2].trim();
	if (fields.length > 3) params[2] = fields[3].trim();


	// COMMANDS FOR ALL USERS
	//check if it was a namechange attempt

	switch (command.substring(0, 6)) {
		case '/name':
			changename(from_address, text);
			break;
		case '/help':
			//device.sendMessageToDevice(from_address, 'text', helptext);
			sendtexttodevice("helptext",from_address);  
			break;
	}

	text = text.replace(/[&\/\\#,$~%.':*?!<>´`{}]/g, '');

	if (command === '/settings') {
		//// Device_Settings: device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3 
		db.query("SELECT * FROM Device_Settings WHERE device=?", [from_address], function (rows) {
			var chat = 'enabled';
			var status = 'enabled';
			var room = 'general';
			var autojoin4 = '[\toff\t](command:auto4)';
			var autojoin8 = '[\toff\t](command:auto8)';
			var autojoin32 = '[\toff\t](command:auto32)';
			var autojoin = noautojoin;


			if (rows.length === 1) {
				autojoin = JSON.parse(rows[0].setting2) || noautojoin;
				var description = rows[0].setting3 || 'empty';

				if (autojoin.amount4 === 0) {
					autojoin4 = '[\toff\t](command:auto4)\t';
				} else if (autojoin.amount4 > 0) {
					autojoin4 = autojoin.amount4 + ' 🎫[\tturn off](command:auto4_off)';
				}

				if (autojoin.amount8 === 0) {
					autojoin8 = '[\toff\t](command:auto8)\t';
				} else if (autojoin.amount8 > 0) {
					autojoin8 = autojoin.amount8 + ' 🎫[\tturn off](command:auto8_off)';
				}

				if (autojoin.amount32 === 0) {
					autojoin32 = '[\toff\t](command:auto32)\t';
				} else if (autojoin.amount32 > 0) {
					autojoin32 = autojoin.amount32 + ' 🎫[\tturn off](command:auto32_off)';
				}

				if (rows.length === 1) {
					chat = rows[0].chat_messages;
					status = rows[0].status_messages;
					room = rows[0].setting1;


					if (room === null || room === undefined) {
						room = 'general';
					} else { room = rows[0].setting1 }
				}
			}

			if (chat === 'disabled') {
				var chat_text = '\t[off](command:enable_chat)'
			} else { var chat_text = '\[on](command:disable_chat)'; chat = 'enabled' }

			if (status === 'disabled') {
				var status_text = '\t[off](command:enable_status)'
			} else { var status_text = '\t[on](command:disable_status)'; status = 'enabled'; }

			var autotext = 'Automatically join each new game of:\n\n\t Luckybaud:\t' + autojoin4 + '\n\t Luckybyte:  \t ' + autojoin8 + '\n\t Luckyint:\t\t' + autojoin32;

			  sendtexttodevice("accountsettings",from_address,[chat_text,status_text,'Luckybaud:\t' + autojoin4 + '\n\t Luckybyte:  \t ' + autojoin8 + '\n\t Luckyint:\t\t' + autojoin32,description]);  
		});
	}



	if (command === '/description') {
		if (params[0])
		{
			var newtext=params[0].substring(0,200);
			db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,(SELECT chat_messages FROM Device_Settings WHERE device = ?),(SELECT status_messages FROM Device_Settings WHERE device = ?),(SELECT info_messages FROM Device_Settings WHERE device = ?),(SELECT book_messages FROM Device_Settings WHERE device = ?),(SELECT setting1 FROM Device_Settings WHERE device = ?),(SELECT setting2 FROM Device_Settings WHERE device = ?),?)", [from_address, from_address, from_address, from_address, from_address, from_address, from_address, newtext]);
			
			sendtexttodevice("description_changed",from_address);
			handlecommand(from_address, '/settings'); //goto settings
		} else {
			
			sendtexttodevice("changedescription",from_address);
		}
		
	   
	}

	if (command === '/language') {
		var lan = params[0].substring(0, 15) || "english";
		db.query("REPLACE INTO User_Language (device, language) VALUES (?,?)", [from_address, lan]);
		sendtexttodevice("lanchanged",from_address,[lan]);
		sendtexttodevice("welcometext",from_address);
	}

	if (command === '/disable_chat') {
		//// Device_Settings: device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3
		db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,?,(SELECT status_messages FROM Device_Settings WHERE device = ?),(SELECT info_messages FROM Device_Settings WHERE device = ?),(SELECT book_messages FROM Device_Settings WHERE device = ?),(SELECT setting1 FROM Device_Settings WHERE device = ?),(SELECT setting2 FROM Device_Settings WHERE device = ?),(SELECT setting3 FROM Device_Settings WHERE device = ?))", [from_address, "disabled", from_address, from_address, from_address, from_address, from_address, from_address]);
		
		sendtexttodevice("chat_disabled",from_address);
		handlecommand(from_address, '/settings'); //goto settings
	}

	if (command === '/enable_chat') {
		//// Device_Settings: device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3
		db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,?,(SELECT status_messages FROM Device_Settings WHERE device = ?),(SELECT info_messages FROM Device_Settings WHERE device = ?),(SELECT book_messages FROM Device_Settings WHERE device = ?),(SELECT setting1 FROM Device_Settings WHERE device = ?),(SELECT setting2 FROM Device_Settings WHERE device = ?),(SELECT setting3 FROM Device_Settings WHERE device = ?))", [from_address, "enabled", from_address, from_address, from_address, from_address, from_address, from_address]);
		
		sendtexttodevice("chat_enabled",from_address);
		handlecommand(from_address, '/settings'); //goto settings
	}

	if (command === '/disable_status') {
		//// Device_Settings: device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3
		db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,(SELECT chat_messages FROM Device_Settings WHERE device = ?),?,(SELECT info_messages FROM Device_Settings WHERE device = ?),(SELECT book_messages FROM Device_Settings WHERE device = ?),(SELECT setting1 FROM Device_Settings WHERE device = ?),(SELECT setting2 FROM Device_Settings WHERE device = ?),(SELECT setting3 FROM Device_Settings WHERE device = ?))", [from_address, from_address, "disabled", from_address, from_address, from_address, from_address, from_address]);
		
		sendtexttodevice("notifications_disabled",from_address);
		handlecommand(from_address, '/settings'); //goto settings
	}

	if (command === '/enable_status') {
		//// Device_Settings: device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3
		db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,(SELECT chat_messages FROM Device_Settings WHERE device = ?),?,(SELECT info_messages FROM Device_Settings WHERE device = ?),(SELECT book_messages FROM Device_Settings WHERE device = ?),(SELECT setting1 FROM Device_Settings WHERE device = ?),(SELECT setting2 FROM Device_Settings WHERE device = ?),(SELECT setting3 FROM Device_Settings WHERE device = ?))", [from_address, from_address, "enabled", from_address, from_address, from_address, from_address, from_address]);
		
		sendtexttodevice("notifications_enabled",from_address);
		handlecommand(from_address, '/settings'); //goto settings
	}

	if (command === '/auto4') {
		// Load Settings

		db.query("SELECT * FROM Device_Settings WHERE device=?", [from_address], function (rows) {

			var autojoin = noautojoin;
			var chat = 'enabled';
			var status = 'enabled';
			var room = 'general';
			var info = 'enabled';
			var book = 'enabled';
			var settings3 = '';


			if (rows.length === 1) {
				chat = rows[0].chat_messages || 'enabled';
				status = rows[0].status_messages || 'enabled';
				room = rows[0].settings1 || 'general';
				info = rows[0].info_messages || 'enabled';
				book = rows[0].book_messages || 'enabled';
				settings3 = rows[0].settings3 || '';
				autojoin = JSON.parse(rows[0].setting2) || noautojoin;
			}

			autojoin.amount4 = 1;

			db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,?,?,?,?,?,?,?)", [from_address, chat, status, info, book, room, JSON.stringify(autojoin), settings3], function () {
				//device.sendMessageToDevice(from_address, 'text', autojoin_enabled);
				sendtexttodevice("autojoin_enabled",from_address);
				handlecommand(from_address, '/settings'); //goto settings
			});
		});
	}


	if (command === '/auto4_off') {
		// Load Settings

		db.query("SELECT * FROM Device_Settings WHERE device=?", [from_address], function (rows) {

			var autojoin = noautojoin;
			var chat = 'enabled';
			var status = 'enabled';
			var room = 'general';
			var info = 'enabled';
			var book = 'enabled';
			var settings3 = '';

			if (rows.length === 1) {
				chat = rows[0].chat_messages || 'enabled';
				status = rows[0].status_messages || 'enabled';
				room = rows[0].settings1 || 'general';
				info = rows[0].info_messages || 'enabled';
				book = rows[0].book_messages || 'enabled';
				settings3 = rows[0].settings3 || '';
				autojoin = JSON.parse(rows[0].setting2) || noautojoin;
			}

			autojoin.amount4 = 0;

			db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,?,?,?,?,?,?,?)", [from_address, chat, status, info, book, room, JSON.stringify(autojoin), settings3], function () {
				//device.sendMessageToDevice(from_address, 'text', autojoin_disabled);
				sendtexttodevice("autojoin_disabled",from_address);
				handlecommand(from_address, '/settings'); //goto settings
			});
		});
	}


	if (command === '/auto8') {
		// Load Settings

		db.query("SELECT * FROM Device_Settings WHERE device=?", [from_address], function (rows) {

			var autojoin = noautojoin;
			var chat = 'enabled';
			var status = 'enabled';
			var room = 'general';
			var info = 'enabled';
			var book = 'enabled';
			var settings3 = '';


			if (rows.length === 1) {
				chat = rows[0].chat_messages || 'enabled';
				status = rows[0].status_messages || 'enabled';
				room = rows[0].settings1 || 'general';
				info = rows[0].info_messages || 'enabled';
				book = rows[0].book_messages || 'enabled';
				settings3 = rows[0].settings3 || '';
				autojoin = JSON.parse(rows[0].setting2) || noautojoin;
			}

			autojoin.amount8 = 1;

			db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,?,?,?,?,?,?,?)", [from_address, chat, status, info, book, room, JSON.stringify(autojoin), settings3], function () {
				//device.sendMessageToDevice(from_address, 'text', autojoin_enabled);
				sendtexttodevice("autojoin_enabled",from_address);
				handlecommand(from_address, '/settings'); //goto settings
			});
		});
	}


	if (command === '/auto8_off') {
		// Load Settings

		db.query("SELECT * FROM Device_Settings WHERE device=?", [from_address], function (rows) {

			var autojoin = noautojoin;
			var chat = 'enabled';
			var status = 'enabled';
			var room = 'general';
			var info = 'enabled';
			var book = 'enabled';
			var settings3 = '';

			if (rows.length === 1) {
				chat = rows[0].chat_messages || 'enabled';
				status = rows[0].status_messages || 'enabled';
				room = rows[0].settings1 || 'general';
				info = rows[0].info_messages || 'enabled';
				book = rows[0].book_messages || 'enabled';
				settings3 = rows[0].settings3 || '';
				autojoin = JSON.parse(rows[0].setting2) || noautojoin;
			}

			autojoin.amount8 = 0;

			db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,?,?,?,?,?,?,?)", [from_address, chat, status, info, book, room, JSON.stringify(autojoin), settings3], function () {
				//device.sendMessageToDevice(from_address, 'text', autojoin_disabled);
				sendtexttodevice("autojoin_disabled",from_address);
				handlecommand(from_address, '/settings'); //goto settings
			});
		});
	}

	if (command === '/auto32') {
		// Load Settings

		db.query("SELECT * FROM Device_Settings WHERE device=?", [from_address], function (rows) {

			var autojoin = noautojoin;
			var chat = 'enabled';
			var status = 'enabled';
			var room = 'general';
			var info = 'enabled';
			var book = 'enabled';
			var settings3 = '';


			if (rows.length === 1) {
				chat = rows[0].chat_messages || 'enabled';
				status = rows[0].status_messages || 'enabled';
				room = rows[0].settings1 || 'general';
				info = rows[0].info_messages || 'enabled';
				book = rows[0].book_messages || 'enabled';
				settings3 = rows[0].settings3 || '';
				autojoin = JSON.parse(rows[0].setting2) || noautojoin;
			}

			autojoin.amount32 = 1;

			db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,?,?,?,?,?,?,?)", [from_address, chat, status, info, book, room, JSON.stringify(autojoin), settings3], function () {
				//device.sendMessageToDevice(from_address, 'text',autojoin_enabled);
				sendtexttodevice("autojoin_enabled",from_address);
				handlecommand(from_address, '/settings'); //goto settings
			});
		});
	}


	if (command === '/auto32_off') {
		// Load Settings

		db.query("SELECT * FROM Device_Settings WHERE device=?", [from_address], function (rows) {

			var autojoin = noautojoin;
			var chat = 'enabled';
			var status = 'enabled';
			var room = 'general';
			var info = 'enabled';
			var book = 'enabled';
			var settings3 = '';

			if (rows.length === 1) {
				chat = rows[0].chat_messages || 'enabled';
				status = rows[0].status_messages || 'enabled';
				room = rows[0].settings1 || 'general';
				info = rows[0].info_messages || 'enabled';
				book = rows[0].book_messages || 'enabled';
				settings3 = rows[0].settings3 || '';
				autojoin = JSON.parse(rows[0].setting2) || noautojoin;
			}

			autojoin.amount32 = 0;

			db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,?,?,?,?,?,?,?)", [from_address, chat, status, info, book, room, JSON.stringify(autojoin), settings3], function () {
				//device.sendMessageToDevice(from_address, 'text', autojoin_disabled);
				sendtexttodevice("autojoin_disabled",from_address);
				handlecommand(from_address, '/settings'); //goto settings
			});
		});
	}


	if (command === '/leave') {
		device.sendMessageToDevice(from_address, 'text', 'Since forcing an unpair can be unsafe. Please use /settings instead and disable nofitfications');
	}

	if (command === '/status') {
		if (allstatistics) { //"total_games": gamestats , "total_users": users
			device.sendMessageToDevice(from_address, 'text', "[Statistics](command:status):\n\nPlayers:\t" + allstatistics.total_users + "\n\tTotal Games Luckybaud:\t" + allstatistics.total_games.total_4 + "\n\tTotal Games Luckybyte:\t" + allstatistics.total_games.total_8 + "\n\tTotal Games Luckyint:\t" + allstatistics.total_games.total_32 + '\n\nLivedata available at: https://lucky.byte-ball.com/' + backtomenu);
		}
	}


	if (command === '/terms') {
		//device.sendMessageToDevice(from_address, 'text', termtext);
		sendtexttodevice("termtext",from_address);
	}


	if (command === '/menu') {
		menu(from_address);
		return 0;
	}

	if (command === '/testmenu') {
		menu(from_address);
		return 0;
	}

 
	if (command === '/buy1ticket') {

		//check or give deposit_address
		db.query("SELECT * FROM User_Account WHERE device=?", [from_address], function (rows) {
			if (rows.length === 1) {
				// user has an account
				if (!val.isValidAddress(rows[0].withdraw_address)) {
					//device.sendMessageToDevice(from_address, 'text', nowithdraw);
					sendtexttodevice("nowithdraw",from_address);
					return 0;
				}
				// user has an withdraw address
				var deposit = rows[0].deposit_address;
				if (!val.isValidAddress(deposit)) {
					// Create a new Address for the user
					var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');
					walletDefinedByKeys.issueNextAddress(wallet_id, 0, function (objAddress) {
						deposit = objAddress.address;
						db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),?,(SELECT withdraw_address FROM User_Account WHERE device = ?),(SELECT tickets FROM User_Account WHERE device = ?),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [from_address, from_address, deposit, from_address, from_address, from_address, from_address], function () {
							//device.sendMessageToDevice(from_address, 'text', paymentrequest(deposit, ticketprice1));
							sendtexttodevice("paynow",from_address,[deposit,ticketprice1*1000000]);
						});
					});

					return 0;
				}

				// deposit address is valid:
				//device.sendMessageToDevice(from_address, 'text', paymentrequest(deposit, ticketprice1));
				sendtexttodevice("paynow",from_address,[deposit,ticketprice1*1000000]);
			} else { sendtexttodevice("nowithdraw",from_address);} // device.sendMessageToDevice(from_address, 'text', nowithdraw); }
		});
		return 0;
	}

	if (command === '/buy10ticket') {

		//check or give deposit_address
		db.query("SELECT * FROM User_Account WHERE device=?", [from_address], function (rows) {
			if (rows.length === 1) {
				// user has an account
				if (!val.isValidAddress(rows[0].withdraw_address)) {
					//device.sendMessageToDevice(from_address, 'text', nowithdraw);
					sendtexttodevice("nowithdraw",from_address);
					return 0;
				}
				// user has an withdraw address
				var deposit = rows[0].deposit_address;
				if (!val.isValidAddress(deposit)) {
					// Create a new Address for the user
					var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');
					walletDefinedByKeys.issueNextAddress(wallet_id, 0, function (objAddress) {
						deposit = objAddress.address;
						db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),?,(SELECT withdraw_address FROM User_Account WHERE device = ?),(SELECT tickets FROM User_Account WHERE device = ?),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [from_address, from_address, deposit, from_address, from_address, from_address, from_address], function () {
							//device.sendMessageToDevice(from_address, 'text', paymentrequest(deposit, ticketprice10));
							sendtexttodevice("paynow",from_address,[deposit,ticketprice10*1000000]);
						});
					});

					return 0;
				}

				// deposit address is valid:
				//device.sendMessageToDevice(from_address, 'text', paymentrequest(deposit, ticketprice10));
				sendtexttodevice("paynow",from_address,[deposit,ticketprice10*1000000]);
			} else { sendtexttodevice("nowithdraw",from_address); } //device.sendMessageToDevice(from_address, 'text', nowithdraw); }
		});
		return 0;
	}

	if (command === '/buy100ticket') {

		//check or give deposit_address
		db.query("SELECT * FROM User_Account WHERE device=?", [from_address], function (rows) {
			if (rows.length === 1) {
				// user has an account
				if (!val.isValidAddress(rows[0].withdraw_address)) {
					//device.sendMessageToDevice(from_address, 'text', nowithdraw);
					sendtexttodevice("nowithdraw",from_address);
					return 0;
				}
				// user has an withdraw address
				var deposit = rows[0].deposit_address;
				if (!val.isValidAddress(deposit)) {
					// Create a new Address for the user
					var walletDefinedByKeys = require('byteballcore/wallet_defined_by_keys.js');
					walletDefinedByKeys.issueNextAddress(wallet_id, 0, function (objAddress) {
						deposit = objAddress.address;
						db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),?,(SELECT withdraw_address FROM User_Account WHERE device = ?),(SELECT tickets FROM User_Account WHERE device = ?),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [from_address, from_address, deposit, from_address, from_address, from_address, from_address], function () {
							//device.sendMessageToDevice(from_address, 'text', paymentrequest(deposit, ticketprice100));
							sendtexttodevice("paynow",from_address,[deposit,ticketprice100*1000000]);
						});
					});

					return 0;
				}

				// deposit address is valid:
				//device.sendMessageToDevice(from_address, 'text', paymentrequest(deposit, ticketprice100));
				sendtexttodevice("paynow",from_address,[deposit,ticketprice100*1000000]);
			} else { sendtexttodevice("nowithdraw",from_address); } //device.sendMessageToDevice(from_address, 'text', nowithdraw); }
		});
		return 0;
	}

	if (command === '/online') {

		var hash = crypto.createHash('sha256');
		hash.update(SALT + from_address);
		var online_secret = hash.digest('hex');
		// in any case use the origin online secret, not any usermade

		sendtexttodevice("onlinelink",from_address,[online_secret]);

		// using update here since an account should already be in place!
		db.query("UPDATE User_Account SET hashkey =? WHERE device=?", [online_secret, from_address]);

		db.query('select * from Device_Settings where device=?', [from_address], function (rows) {
			if (rows.length === 0) {
				// Just in case if the user has not set any settings do it now for him:
				db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,?,?,?,?,?,?,?)", [from_address, "enabled", "enabled", "enabled", "enabled", "general", JSON.stringify(noautojoin), "empty"]);
			}

		})
	}

	if (command === '/bonus') {

		
		// CB_To get Ref Tickets
		function cb_reftickets(totaltickets,totalrefs) {
			function cb_bonustickets(ref_bonus) {
				function cb_autoplaybonus(points, tickets) {
					var bonustext = [];
				  
					sendtexttodevice("bonustextstring", from_address, [totalrefs, totaltickets, ref_bonus, points, tickets]);
				}
				checkautoplaybonus(from_address, cb_autoplaybonus);
			}
			checkbonustickets(from_address,cb_bonustickets);
		}

		db.query('select * from User_Referrals where recruiter_device=?', [from_address], function (rows) {
			var refarray=[];
			if (rows.length>0) {
				for (var i = 0; i < rows.length; i++) {
					refarray.push(rows[i].device);
				}
			}
			checkreferraltickets(refarray,cb_reftickets);
		});


	   

	}

	if (command === '/referral') {

		var hash = crypto.createHash('sha256');
		hash.update(from_address+SALT); //other way around, so that it does not look like the online hash!
		var secret = hash.digest('hex').substring(0, 8);; //only use 8 digest!
		

		sendtexttodevice("reflink",from_address,[secret,secret]);

		var date = new Date();
		var sqllite_date = date.toISOString();

		// User_Secrets: device, secret
		db.query('select * from User_Secrets where device=?', [from_address], function (rows) {
			if (rows.length === 0) {
				// If the secret is not yet in place, do it know
				db.query("REPLACE INTO User_Secrets (device, secret) VALUES (?,?)", [from_address, secret], function() {
					db.query("REPLACE INTO pairing_secrets (pairing_secret, is_permanent, creation_date, expiry_date) VALUES (?,?,?,?)", ["LuckyBytesR"+secret, "1",sqllite_date,"2038-01-01"]);   
				});
				
			}

		})
	}

	if (command === '/playjackpot') {


		var autojoin = false;
		var rounds = Number(params[2]) || 1;

		if (params[1] === 'true') { autojoin = true; } else if (params[1] === 'web') { autojoin = 'web' };

		if (!start) {
			sendtexttodevice("joiningonhold",from_address);
			return;
		}

		var type = params[0];
		var user_name = 'unknown';
		var user_device = from_address;

		var j = 0;
		function multijoin() {
			setTimeout(function () {

				// Join BLOCK START
				var retry = true;

				function callback(success) {
					// if success = true joining was succesfull
					// if false i should try it again.
					if (success) {
						retry = false;
						// could lead to payment errors? Better just create a new game after game is full
						//managegames(conf.control_addresses[0]); // for example needed to create a new game or paying out!
					} else {
						//retry
						console.log('MyLog: User: ' + user_name + '(' + from_address + ') couldnt join a jackpot game (' + type + ') Retry again!');
					}
				}

				db.query("SELECT * FROM User_Account WHERE device=?", [user_device], function (rows) {
					if (rows.length === 1) {
						// user has an account
						if (!val.isValidAddress(rows[0].withdraw_address)) {
							//device.sendMessageToDevice(from_address, 'text', nowithdraw);
							sendtexttodevice("nowithdraw",from_address);
							return 0;
						}
						// user has an withdraw address
						if (rows[0].name) { user_name = rows[0].name };

						if (Number(rows[0].tickets > 0)) {
							var newtickets = -1;
							// remember: hashkey WAS the date of the last checked unit.
							db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
								//removed one ticket! Now join the game

								var i = 1;
								function myLoop() {
									setTimeout(function () {
										if (retry) {
											joinjackpot(user_device, type, user_name, callback, autojoin);
											i++;
										} else { return; }

										if (i < 5) {
											myLoop(); // restart          
										} else { // Failed to many times
											retry = false;
											// I cant join this game, tryed several times! Will inform user and admin. Also give the ticket back! 
											newtickets = 1;
											if (conf.control_addresses[0])
												device.sendMessageToDevice(conf.control_addresses[0], 'text', 'User: ' + user_name + '(' + user_device + ') couldnt join a jackpot game (' + type + ')!');
											console.log('MyLog: User: ' + user_name + '(' + user_device + ') final couldnt join a jackpot game (' + type + ')!');
											db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
												if (!autojoin) { sendtexttodevice("cantjoin",from_address,['\n\t➡ [retry now](command:' + text + ')']); } 
											});
										}
									}, 200)
								}
								myLoop(); //  start the loop

							});

						} else {
							// not enough tickets
							if (!autojoin) { sendtexttodevice("notickets",from_address); } 
						}
					} else { sendtexttodevice("nowithdraw",from_address); } 
				});
				// Join BLOCK END
				j++;
				if (j < rounds) { multijoin(); } // restart
			}, 200)
		}
		multijoin();  //  start the loop
	}


	if (command === '/play4') {

		var autojoin = false;
		if (params[0] === 'true') { autojoin = true; } else if (params[0] === 'web') { autojoin = 'web' };

		if (!start) {
			//device.sendMessageToDevice(from_address, 'text', joiningonhold);
			sendtexttodevice("joiningonhold",from_address);
			return;
		}

		// Get user_name and ticketcount
		var type = '4';
		var user_name = 'unknown';
		var user_device = from_address;
		var retry = true;

		function callback(success) {
			// if success = true joining was succesfull
			// if false i should try it again.
			if (success) {
				retry = false;
				// could lead to payment errors? Better just create a new game after game is full
				//managegames(conf.control_addresses[0]); // for example needed to create a new game or paying out!
			} else {
				//retry
				console.log('MyLog: User: ' + user_name + '(' + from_address + ') couldnt join a game (' + type + ') Retry again!');
			}
		}

		db.query("SELECT * FROM User_Account WHERE device=?", [user_device], function (rows) {
			if (rows.length === 1) {
				// user has an account
				if (!val.isValidAddress(rows[0].withdraw_address)) {
					//device.sendMessageToDevice(from_address, 'text', nowithdraw);
					sendtexttodevice("nowithdraw",from_address);
					return 0;
				}
				// user has an withdraw address
				if (rows[0].name) { user_name = rows[0].name };

				if (Number(rows[0].tickets > 0)) {
					var newtickets = -1;
					// remember: hashkey WAS the date of the last checked unit.
					db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
						//removed one ticket! Now join the game

						var i = 1;
						function myLoop() {
							setTimeout(function () {
								if (retry) {
									joingame(user_device, type, user_name, callback, autojoin);
									i++;
								} else { return; }

								if (i < 5) {
									myLoop(); // restart          
								} else { // Failed to many times
									retry = false;
									// I cant join this game, tryed several times! Will inform user and admin. Also give the ticket back!
									newtickets = 0;
									if (conf.control_addresses[0])
										device.sendMessageToDevice(conf.control_addresses[0], 'text', 'User: ' + user_name + '(' + user_device + ') couldnt join a game (' + type + ')!');
									console.log('MyLog: User: ' + user_name + '(' + user_device + ') final couldnt join a game (' + type + ')!');
									db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
										if (!autojoin) { sendtexttodevice("cantjoin",from_address,['\n\t➡ [retry now](command:' + text + ')']); } //device.sendMessageToDevice(from_address, 'text', cantjoin + '\n\t➡ [retry now](command:' + text + ')' + backtomenu); }
									});
								}
							}, 200)
						}
						myLoop();                      //  start the loop

					});

				} else {
					// not enough tickets
					if (!autojoin) { sendtexttodevice("notickets",from_address); } //device.sendMessageToDevice(from_address, 'text', notickets); }
				}
			} else { sendtexttodevice("nowithdraw",from_address); } //device.sendMessageToDevice(from_address, 'text', nowithdraw); }
		});

	}

	if (command === '/play8') {

		var autojoin = false;
		if (params[0] === 'true') { autojoin = true; } else if (params[0] === 'web') { autojoin = 'web' };

		if (!start) {
			//device.sendMessageToDevice(from_address, 'text', joiningonhold);
			sendtexttodevice("joiningonhold",from_address);
			return;
		}

		// Get user_name and ticketcount
		var type = '8';
		var user_name = 'unknown';
		var user_device = from_address;
		var retry = true;

		function callback(success) {
			// if success = true joining was succesfull
			// if false i should try it again.
			if (success) {
				retry = false;
				// could lead to payment errors? Better just create a new game after game is full
				//managegames(conf.control_addresses[0]); // for example needed to create a new game or paying out!
			} else {
				//retry
				console.log('MyLog: User: ' + user_name + '(' + from_address + ') couldnt join a game (' + type + ') Retry again!');
			}
		}

		db.query("SELECT * FROM User_Account WHERE device=?", [user_device], function (rows) {
			if (rows.length === 1) {
				// user has an account
				if (!val.isValidAddress(rows[0].withdraw_address)) {
					//device.sendMessageToDevice(from_address, 'text', nowithdraw);
					sendtexttodevice("nowithdraw",from_address);
					return 0;
				}
				// user has an withdraw address
				if (rows[0].name) { user_name = rows[0].name };

				if (Number(rows[0].tickets > 0)) {
					var newtickets = -1;
					// remember: hashkey WAS the date of the last checked unit.
					db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
						//removed one ticket! Now join the game

						var i = 1;
						function myLoop() {
							setTimeout(function () {
								if (retry) {
									joingame(user_device, type, user_name, callback, autojoin);
									i++;
								} else { return; }

								if (i < 5) {
									myLoop(); // restart          
								} else { // Failed to many times
									retry = false;
									// I cant join this game, tryed several times! Will inform user and admin. Also give the ticket back!
									newtickets = 0;
									if (conf.control_addresses[0])
										device.sendMessageToDevice(conf.control_addresses[0], 'text', 'User: ' + user_name + '(' + user_device + ') couldnt join a game (' + type + ')!');
									console.log('MyLog: User: ' + user_name + '(' + user_device + ') final couldnt join a game (' + type + ')!');
									db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
										if (!autojoin) { sendtexttodevice("cantjoin",from_address,['\n\t➡ [retry now](command:' + text + ')']); } //device.sendMessageToDevice(from_address, 'text', cantjoin + '\n\t➡ [retry now](command:' + text + ')' + backtomenu); }
									});
								}
							}, 200)
						}
						myLoop();                      //  start the loop

					});

				} else {
					// not enough tickets
					if (!autojoin) { sendtexttodevice("notickets",from_address); } // device.sendMessageToDevice(from_address, 'text', notickets); }
				}
			} else { sendtexttodevice("nowithdraw",from_address); } // device.sendMessageToDevice(from_address, 'text', nowithdraw); }
		});

	}

	if (command === '/play32') {

		var autojoin = false;
		if (params[0] === 'true') { autojoin = true; } else if (params[0] === 'web') { autojoin = 'web' };

		if (!start) {
			//device.sendMessageToDevice(from_address, 'text', joiningonhold);
			sendtexttodevice("joiningonhold",from_address);
			return;
		}

		// Get user_name and ticketcount
		var type = '32';
		var user_name = 'unknown';
		var user_device = from_address;
		var retry = true;

		function callback(success) {
			// if success = true joining was succesfull
			// if false i should try it again.
			if (success) {
				retry = false;
				// could lead to payment errors? Better just create a new game after game is full
				//managegames(conf.control_addresses[0]); // for example needed to create a new game or paying out!
			} else {
				//retry
				console.log('MyLog: User: ' + user_name + '(' + from_address + ') couldnt join a game (' + type + ') Retry again!');
			}
		}

		db.query("SELECT * FROM User_Account WHERE device=?", [user_device], function (rows) {
			if (rows.length === 1) {
				// user has an account
				if (!val.isValidAddress(rows[0].withdraw_address)) {
					//device.sendMessageToDevice(from_address, 'text', nowithdraw);
					sendtexttodevice("nowithdraw",from_address);
					return 0;
				}
				// user has an withdraw address
				if (rows[0].name) { user_name = rows[0].name };

				if (Number(rows[0].tickets > 0)) {
					var newtickets = -1;
					// remember: hashkey WAS the date of the last checked unit.
					db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
						//removed one ticket! Now join the game

						var i = 1;
						function myLoop() {
							setTimeout(function () {
								if (retry) {
									joingame(user_device, type, user_name, callback, autojoin);
									i++;
								} else { return; }

								if (i < 5) {
									myLoop(); // restart          
								} else { // Failed to many times
									retry = false;
									// I cant join this game, tryed several times! Will inform user and admin. Also give the ticket back!
									newtickets = 0;
									if (conf.control_addresses[0])
										device.sendMessageToDevice(conf.control_addresses[0], 'text', 'User: ' + user_name + '(' + user_device + ') couldnt join a game (' + type + ')!');
									console.log('MyLog: User: ' + user_name + '(' + user_device + ') final couldnt join a game (' + type + ')!');
									db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
										if (!autojoin) { sendtexttodevice("cantjoin",from_address,['\n\t➡ [retry now](command:' + text + ')']); } //device.sendMessageToDevice(from_address, 'text', cantjoin + '\n\t➡ [retry now](command:' + text + ')' + backtomenu); }
									});
								}
							}, 200)
						}
						myLoop();                      //  start the loop

					});

				} else {
					// not enough tickets
					if (!autojoin) { sendtexttodevice("notickets",from_address); } //device.sendMessageToDevice(from_address, 'text', notickets); }
				}
			} else { sendtexttodevice("nowithdraw",from_address); } //device.sendMessageToDevice(from_address, 'text', nowithdraw); }
		});

	}

	if (command === '/tickets') {
		// check if user has already a withdraw address
		db.query("SELECT * FROM User_Account WHERE device=?", [from_address], function (rows) {
			if (rows.length === 1) {
				// user has an account
				if (!val.isValidAddress(rows[0].withdraw_address)) {
					//device.sendMessageToDevice(from_address, 'text', nowithdraw);
					sendtexttodevice("nowithdraw",from_address);
					return 0;
				}
				// user has an withdraw address
				//device.sendMessageToDevice(from_address, 'text', buyticket);
				sendtexttodevice("buyticket",from_address,[ticketprice1,ticketprice10,ticketprice100]);

			} else { sendtexttodevice("nowithdraw",from_address); } //device.sendMessageToDevice(from_address, 'text', nowithdraw); }
		});
	}

	if (command === '/game') {
		// check if user has already a withdraw address
		var game = params[0];
		db.query("SELECT * FROM Games WHERE game=?", [game], function (rows) {
			if (rows.length === 1) {
				// user has an account
				var status = rows[0].status;
				var proofhash = rows[0].proofhash;
				var type = rows[0].extra;
				var win = '';
				var gamename = '';
				var slots = JSON.parse(rows[0].slots);
				var price = 0;
				var jackpotproof = '';

				if (type === '4') { win = rows[0].win_4; gamename = 'luckybaud'; price = Number(type) * 10; }
				else if (type === '8') { win = rows[0].win_8; gamename = 'luckybyte'; price = Number(type) * 10; }
				else if (type === '32') { win = rows[0].win_32; gamename = 'luckyint'; price = Number(type) * 10; }

				if (status === "done") {
					if (type === '7' || (type === '30') || (type === '99')) { win = rows[0].win_4; gamename = 'Weekly Jackpot'; price = rows[0].win_8; jackpotproof = '&number=' + slots.length; }
				} else {
					if (type === '7' || (type === '30') || (type === '99')) { win = rows[0].win_4; gamename = 'Weekly Jackpot'; price = jackbotfee * 10 * slots.length + jackpotbonus; jackpotproof = '&number=' + slots.length; }
				}


				gamename = gamename + '(' + game.slice(0, 4) + '...)';

				if (status === "time") { status = "Jackpot (active)" };

				var text = 'Game: [' + gamename + '](command:game ' + game + ')\n\n\tPrize: \t' + price + ' MB 💰\n\tStatus:\t' + status;

				text = text + '\n\n\tPlayers:';
				var extra = '';
				for (var i = 0; i < slots.length; i++) {
					if (slots[i].device === from_address) { extra = ' (you)'; } else { extra = ''; }
					text = text + '\n\t\t(' + Number(i + 1) + ') [' + slots[i].name+'](command:player '+slots[i].name+')' + extra;
				}

				if (status === "done") {
					text = text + '\n\n\tWinner: \t[' + slots[win - 1].name +'](command:player '+slots[win - 1].name+')' + ' (' + win + ')\n\nGamehash:\t' + game + '\n\nProof:\nhttps://lucky.byte-ball.com/proof.html?proofid=' + proofhash + jackpotproof;
				}

				//device.sendMessageToDevice(from_address, 'text', text + '\n' + backtomenu);
				sendtexttodevice("addbackto",from_address,[text+'\n']);

			} else { sendtexttodevice("addbackto",from_address,['unknown game: ' + game]); } //device.sendMessageToDevice(from_address, 'text', 'unknown game: ' + game + backtomenu); }
		});
	}

	if (command === '/history') {
		// Statistics payed out, top 10 players etc

		// Users History
		db.query("SELECT * FROM Games WHERE status=? and slots like ? order by time desc limit 20", ["done", "%" + from_address + "%"], function (rows2) {
			var list2 = [];
			list2.push('⌛ \t[Your Game History](command:history)\t ⌛\n');
			for (var i = 0; i < rows2.length; i++) {
				var game = rows2[i].game;
				var proofhash = rows2[i].proofhash;
				var type = rows2[i].extra;
				var win = '';
				var gamename = '';
				var slots = JSON.parse(rows2[i].slots);
				var ownslots = '';
				var ownprice = '';
				for (var j = 0; j < slots.length; j++) {
					if (slots[j].device === from_address) { ownslots = ownslots + Number(j + 1) + ' ' }
				}
				if (type === '4') { win = rows2[i].win_4; gamename = 'luckybaud'; }
				else if (type === '8') { win = rows2[i].win_8; gamename = 'luckybyte'; }
				else if (type === '32') { win = rows2[i].win_32; gamename = 'luckyint'; }
				else if (type === '7' || (type === '30') || (type === '99')) { win = rows2[i].win_4; gamename = 'Weekly Jackpot'; }

				if ((slots[win - 1].device === from_address) && (type === '4' || type === '8' || type === '32')) { ownprice = '\n\t➡ You won: ' + Number(type * 10) + ' MB 💰' }
				else if ((slots[win - 1].device === from_address) && (type === '7' || type === '30' || type === '99')) { ownprice = '\n\t➡ You won: ' + rows2[i].win_8 + ' MB 💰' };

				gamename = gamename + '(' + game.slice(0, 4) + '...)';

				var text = i + ' - [' + gamename + '](command:game ' + game + ')\tYour slots: ' + ownslots + ownprice;
				list2.push(text);
			}
			// Global History
			db.query("SELECT * FROM Games WHERE status=?  and (extra = '4' OR extra = '8' OR extra = '32') order by time desc limit 20", ["done"], function (rows) {
				var list = [];
				list.push('\n\n⌛ \t[Global Game History](command:history)\t ⌛\n');
				for (var i = 0; i < rows.length; i++) {
					var game = rows[i].game;
					var proofhash = rows[i].proofhash;
					var type = rows[i].extra;
					var win = '';
					var gamename = '';
					var slots = JSON.parse(rows[i].slots);
					if (type === '4') { win = rows[i].win_4; gamename = 'luckybaud'; }
					else if (type === '8') { win = rows[i].win_8; gamename = 'luckybyte'; }
					else if (type === '32') { win = rows[i].win_32; gamename = 'luckyint'; }
					else if (type === '7' || (type === '30') || (type === '99')) { win = rows[i].win_4; gamename = 'Jackpot'; }

					gamename = gamename + '(' + game.slice(0, 4) + '...)';

					var text = i + ' - [' + gamename + '](command:game ' + game + ')\tWinner: [' + slots[win - 1].name+'](command:player '+slots[win - 1].name+') (' + win + ')';
					list.push(text);
				}
				// Jackpot History
				db.query("SELECT * FROM Games WHERE status=?  and (extra = '7') order by time desc limit 5", ["done"], function (rows) {
					var list3 = [];
					list3.push('\n\n⌛ \t[Weekly Jackpot History](command:history)\t ⌛\n');
					for (var i = 0; i < rows.length; i++) {
						var game = rows[i].game;
						var proofhash = rows[i].proofhash;
						var type = rows[i].extra;
						var win = '';
						var price = '';
						var gamename = '';
						var slots = JSON.parse(rows[i].slots);
						if (type === '7' || (type === '30') || (type === '99')) { win = rows[i].win_4; gamename = 'Weekly Jackpot'; price = rows[i].win_8;}

						gamename = gamename + '(' + game.slice(0, 4) + '...)';

						var text = i + ' - [' + gamename + '](command:game ' + game + ')\tWinner: [' + slots[win - 1].name+'](command:player '+slots[win - 1].name+')\n\t➡ Prize: ' + price + ' MB 💰';
						list3.push(text);
					}
					sendtexttodevice("addbackto",from_address,[list2.join('\n') + list3.join('\n') +list.join('\n')]);
				});
			});
		});
	}



	if (command=== '/giveticket') {

		console.log('MyLog: Trading a Ticket from: '+from_address+' to user: '+params[0]);
		if (locktrading) {
			//device.sendMessageToDevice(from_address, 'text', 'encountered a small issue, please try again.'+backtomenu); 
			sendtexttodevice("smallerror",from_address);
			console.log('MyLog: Trading locked for: '+from_address+' to user: '+params[0]); 
			return 0};
		if (!params[0]) {console.log('MyLog: Cant trade without username: '+from_address+' to user: '+params[0]); return 0};
		if (!start) {
			//device.sendMessageToDevice(from_address, 'text', tradingonhold+backtomenu); 
			sendtexttodevice("tradingonhold",from_address);
			console.log('MyLog: Trading Tickets is on hold for: '+from_address+' to user: '+params[0]); 
			return 0};
		
		locktrading=true;

		var user_device=from_address;
		var user_name='';
		var friend_name=params[0];
		var friend_device='0';


		db.query("SELECT * FROM User_Account WHERE name = ?", [friend_name], function (rows2) {
			if (rows2.length===1) {
				friend_device=rows2[0].device;
				if (friend_device===user_device) {
					sendtexttodevice("giveself",from_address);
					console.log('MyLog: Cant give your self a ticket: '+from_address+' to user: '+params[0]);
					locktrading=false; 
					return 0;
				}

				db.query("SELECT * FROM User_Account WHERE device=?", [from_address], function (rows) {
					if (rows.length === 1) {
						// user has an account
						if (!val.isValidAddress(rows[0].withdraw_address)) {
							sendtexttodevice("nowithdraw",from_address);
							return 0;
						}
						// user has an withdraw address
						if (rows[0].name) { user_name = rows[0].name };

						if (Number(rows[0].tickets > 0)) {
							var newtickets = -1;
							// remember: hashkey WAS the date of the last checked unit.
							db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
								//removed one ticket! Now add it to the other user!
								var newticketfriend = 1;
								db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newticketfriend + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [friend_device, friend_device, friend_device, friend_device, friend_device, friend_device, friend_device], function () {
									// All done, inform users!
									sendtexttodevice("sendticket",from_address,[friend_name]);
									sendtexttodevice("sendticket",friend_device,[user_name]);
									sendstatusfromusername(from_address, 'just gave ['+friend_name+'](command:/player '+friend_name+') one Ticket (1 🎫), how generous!', user_name);
									console.log('MyLog: Transfered Ticket succesfull from: '+from_address+' to user: '+params[0]+' - '+friend_device);
									locktrading=false; 
								});

							});

						} else {
							// not enough tickets
							sendtexttodevice("notickets",from_address);
							console.log('MyLog: Cant trade because not enough tickets from: '+from_address+' to user: '+params[0]);
							locktrading=false; 
							return 0;
						}
					} else { 
						sendtexttodevice("nowithdraw",from_address);
						console.log('MyLog: Cant trade because no withdraw address set: '+from_address+' to user: '+params[0]);
						locktrading=false; 
						return 0;
					}
				});
			} // There is only one friend device known!
			else {
				//device.sendMessageToDevice(from_address, 'text', 'Unable to find this user'); 
				sendtexttodevice("usernotfound",from_address);
				console.log('MyLog: Cant trade with this user (to many or less rows) from: '+from_address+' to user: '+params[0]); 
				locktrading=false; 
				return 0}
		});
	}

	if (command === '/player') {
		if (params[0]) {
			var username=params[0];
			db.query("select * from User_Account t1 LEFT JOIN Device_Settings AS t2 ON t1.device = t2.device  where name = ?",[username],function(rows){
				if (rows.length===1) {
					// player level
					var user_device=rows[0].device || 0;
					var description=rows[0].setting3 || 'empty';
					db.query("select * from Games where slots like ?",['%'+user_device+'%'],function(rows2){
						var level=rows2.length || 0;
						level = Math.round(Math.sqrt(level));
						
						if (isControlAddress(user_device)) { level="✪ Admin ✪";}
						
						sendtexttodevice("playerinfo",from_address,[username,level,description]);
					}); // select played games
				} else {sendtexttodevice("usernotfound",from_address); } //device.sendMessageToDevice(from_address, 'text', nouser);} // to many or 0 users found
			});

		}
	}

	if (command=== '/give') {
		
		console.log('MyLog: Admin Trading 10 Tickets from: '+from_address+' to user: '+params[0]);
		if (locktrading) {device.sendMessageToDevice(from_address, 'text', 'encountered a small issue, please try again.'+backtomenu); console.log('MyLog: Trading locked for: '+from_address+' to user: '+params[0]); return 0};
		if (!params[0]) {device.sendMessageToDevice(from_address, 'text', 'Cant trade without username or number of tickets.\t example: "give 10 Pxrunes"'); return 0};
		if (!params[1]) {device.sendMessageToDevice(from_address, 'text', 'Cant trade without username or number of tickets.\t example: "give 10 Pxrunes"'); return 0};
		
		if (!start) {device.sendMessageToDevice(from_address, 'text', 'Trading Tickets is on hold right now. Try again in a few minutes.'+backtomenu); console.log('MyLog: Trading Tickets is on hold for: '+from_address+' to user: '+params[0]); return 0};
		
		

		var user_device=from_address;
		var user_name='';
		var friend_name=params[1];
		var number_tickets=Number(params[0]);
		if (number_tickets<1) {device.sendMessageToDevice(from_address, 'text', 'Cant trade without username or number of tickets.\t example: "give 10 Pxrunes"'); return 0};
		var friend_device='0';
		
		locktrading=true;

		db.query("SELECT * FROM User_Account WHERE name = ?", [friend_name], function (rows2) {
			if (rows2.length===1) {
				friend_device=rows2[0].device;
				if (friend_device===user_device) {
					device.sendMessageToDevice(from_address, 'text', 'You cant give your self a ticket. You silly.'+backtomenu);
					console.log('MyLog: Cant give your self a ticket: '+from_address+' to user: '+friend_name);
					locktrading=false; 
					return 0;
				}

				db.query("SELECT * FROM User_Account WHERE device=?", [from_address], function (rows) {
					if (rows.length === 1) {
						// user has an account
						if (!val.isValidAddress(rows[0].withdraw_address)) {
							device.sendMessageToDevice(from_address, 'text', nowithdraw);
							return 0;
						}
						// user has an withdraw address
						if (rows[0].name) { user_name = rows[0].name };

						if (Number(rows[0].tickets > number_tickets-1)) {
							var newtickets = number_tickets*-1;
							// remember: hashkey WAS the date of the last checked unit.
							db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newtickets + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [user_device, user_device, user_device, user_device, user_device, user_device, user_device], function () {
								//removed one ticket! Now add it to the other user!
								var newticketfriend = number_tickets;
								db.query("REPLACE INTO User_Account (device, name, deposit_address, withdraw_address, tickets, lastcheck, hashkey) VALUES (?,(SELECT name FROM User_Account WHERE device = ?),(SELECT deposit_address FROM User_Account WHERE device = ?),(SELECT withdraw_address FROM User_Account WHERE device = ?),(COALESCE((SELECT tickets FROM User_Account WHERE device = ?),0) + " + newticketfriend + "),(SELECT lastcheck FROM User_Account WHERE device = ?),(SELECT hashkey FROM User_Account WHERE device = ?))", [friend_device, friend_device, friend_device, friend_device, friend_device, friend_device, friend_device], function () {
									// All done, inform users!
									device.sendMessageToDevice(from_address, 'text', number_tickets+' Tickets send to ['+friend_name+'](command:/player '+friend_name+') how generous of you!'+backtomenu);
									device.sendMessageToDevice(friend_device, 'text', '['+user_name+'](command:/player '+user_name+') just gave you '+number_tickets+' Tickets ('+number_tickets+' 🎫)!'+backtomenu);
									sendstatusfromusername(from_address, 'just gave ['+friend_name+'](command:/player '+friend_name+') '+number_tickets+' Tickets ('+number_tickets+' 🎫), how generous!', user_name);
									console.log('MyLog: Transfered '+number_tickets+' Tickets succesfull from: '+from_address+' to user: '+friend_name+' - '+friend_device);
									locktrading=false; 
								});

							});

						} else {
							// not enough tickets
							device.sendMessageToDevice(from_address, 'text', notickets);
							console.log('MyLog: Cant trade because not enough tickets from: '+from_address+' to user: '+friend_name);
							locktrading=false; 
							return 0;
						}
					} else { 
						device.sendMessageToDevice(from_address, 'text', nowithdraw); 
						console.log('MyLog: Cant trade because no withdraw address set: '+from_address+' to user: '+friend_name);
						locktrading=false; 
						return 0;
					}
				});
			} // There is only one friend device known!
			else {
				device.sendMessageToDevice(from_address, 'text', 'Unable to find this user'); 
				console.log('MyLog: Cant trade with this user (to many or less rows) from: '+from_address+' to user: '+friend_name); 
				locktrading=false; 
				return 0}
		});
	}

	// COMMANDS FOR Admin

	if (!isControlAddress(from_address)) { return 0; }

	if (command === '/testauto') {
		add_autoplaypoint(from_address);
	}

	if (command === '/ban') {
	 
		var poorguy = params[0];
		//get device id
		db.query('select * from User_Account where name = ?', [poorguy], function (rows6) {
			if (rows6.length > 0) {
				var device_guy = rows6[0].device;
			 device.sendMessageToDevice(from_address, 'text', 'banned: ' + poorguy + '('+device_guy+')');
			db.query("REPLACE INTO Device_Settings (device, chat_messages, status_messages, info_messages, book_messages, setting1, setting2, setting3) VALUES (?,(SELECT chat_messages FROM Device_Settings WHERE device = ?),(SELECT status_messages FROM Device_Settings WHERE device = ?),(SELECT info_messages FROM Device_Settings WHERE device = ?),(SELECT book_messages FROM Device_Settings WHERE device = ?),?,(SELECT setting2 FROM Device_Settings WHERE device = ?),(SELECT setting3 FROM Device_Settings WHERE device = ?))", [device_guy, device_guy, device_guy, device_guy, device_guy, "banned", device_guy, device_guy]);
	
			}
					
		});
	}

	if (command === '/unban') {
		var poorguy = params[0];
		db.query('UPDATE Device_Settings SET setting1="general" WHERE exists (select * from User_Account t2 where Device_Settings.device=t2.device and t2.name=?)', [poorguy], function () {
			device.sendMessageToDevice(from_address, 'text', 'unbanned: ' + poorguy);
		});
	}

	

	if (command === '/lantest') {
		menulan(from_address);
	}

	if (command === '/increasetime') {
		db.query("UPDATE Games SET time ='1510160160992' WHERE status='time'");
		device.sendMessageToDevice(from_address, 'text', 'done.');
	}

	if (command === '/clearoutbox') {
		db.query("delete from outbox", function () {
			device.sendMessageToDevice(from_address, 'text', 'done.');
		});
		//select * from User_Referrals where device = recruiter_device
	}

	if (command=== '/cleanup') {
		db.query("delete from my_addresses where not exists (select * from user_account where my_addresses.address=user_account.deposit_address) and not exists (select * from outputs where my_addresses.address=outputs.address) ", function () {
			device.sendMessageToDevice(from_address, 'text', 'done.');
		});
	}

	if (command==='/testbonus') {
		checksinglereferralbonus(from_address);
	}

	if (command==='/deletetickets') {
		var tickets=Number(params[0]) || 0;
		db.query("UPDATE User_Account SET tickets = COALESCE(tickets,0) - ? WHERE device=?", [tickets,from_address], function () { 
			device.sendMessageToDevice(from_address, 'text', 'deleted '+tickets+' tickets.');    
		});
	}

	if (command === '/addbot') {

		invitation('byteball.org/bb', 'A2WMb6JEIrMhxVk+I0gIIW1vmM3ToKoLkNF8TqUV5UvX', '0000', function(msg) {
			device.sendMessageToDevice(from_address, 'text', 'done: '+msg);    
		});
	}

	if (command === '/bot') {
		// addUnconfirmedCorrespondent(device_pubkey, device_hub, device_name, onDone){
		var sendtext = params[0];
		device.sendMessageToDevice(from_address, 'text', 'send: '+sendtext);
		device.sendMessageToDevice(transitionbot, 'text', sendtext);
	}

	if (command === '/botlink') {
		// addUnconfirmedCorrespondent(device_pubkey, device_hub, device_name, onDone){ 
		linkmyaddresses(from_address);
	}
	
   

	if (command === '/create7') {
		createnewtimegame(from_address, 7);
		device.sendMessageToDevice(from_address, 'text', 'done.');
	}

	if (command === '/delete7') {
		db.query("DELETE FROM Games WHERE extra= '7' and status='time'");
		device.sendMessageToDevice(from_address, 'text', 'done.');
	} 
	
	if (command === '/deletethis') {
		db.query('delete from games where game="16a85c71958c7ea97e3ee8993c43e900bb7bb5e2321b6bb94d58a7c784b07b32"');
		device.sendMessageToDevice(from_address, 'text', 'done.');
	} 

	if (command === '/check7') {
		db.query("SELECT * FROM Games WHERE status=? and extra=? order by time desc", ["time", "7"], function (rows) {
			if (rows.length === 1) {
				var currentTime = new Date();
				var futureTime = new Date(rows[0].time);
				var diff = new Date(futureTime - currentTime);
				var days = diff.getDate() - 1;
				var hours = diff.getHours();
				var minutes = diff.getMinutes();
				var game = rows[0].game;
				var gamename = "[Weekly Jackpot" + '(' + game.slice(0, 4) + '...)](command:game ' + game + ')';
				var slots = JSON.parse(rows[0].slots);
				var price = slots.length * 10 * jackbotfee + jackpotbonus;
				var type = rows[0].extra;

				device.sendMessageToDevice(from_address, 'text', '✪\t' + gamename + '\t✪\n\t💰 Prize: ' + price + ' Mbyte \t ➡ [Join Game (1 🎫)](command:playjackpot ' + type + ')\n\tFilled: ' + slots.length + ' slots\t➡ Ends in:\t ' + days + 'd ' + hours + 'h ' + minutes + 'min');

			} else { device.sendMessageToDevice(from_address, 'text', 'error rows length: ' + rows.length); }

		});

	}


	if (command === '/deletegames') {
		db.query("DELETE FROM Games");
		device.sendMessageToDevice(from_address, 'text', "Deleted all games");
	}



	switch (command) {
		case '/address':
			if (conf.bSingleAddress)
				readSingleAddress(function (address) {
					device.sendMessageToDevice(from_address, 'text', address);
				});
			else
				walletDefinedByKeys.issueOrSelectNextAddress(wallet_id, 0, function (addressInfo) {
					device.sendMessageToDevice(from_address, 'text', addressInfo.address);
				});
			break;
		case '/start':
			start = true;
			device.sendMessageToDevice(from_address, 'text', 'Restarted trading.');
			break;
		case '/stop':
			start = false;
			device.sendMessageToDevice(from_address, 'text', 'Trades are on hold.');
			break;
		case '/balance':
			prepareBalanceText(function (balance_text) {
				// How much tickets are in the system?
				// Also add tickets in games right now!
				// total amount of bytes: select *, sum(amount) as total from outputs t1 where is_spent = 0 and asset is null and exists (select * from my_addresses t2 where t1.address = t2.address)
				// select * from Games where (status="active" or status="payout") Games active right now (need to get slots.length)
				device.sendMessageToDevice(from_address, 'text', balance_text);
				// 
				db.query("select count(case amount when '11000000' then 1 else null end) tickets1,count(case amount when '108000000' then 1 else null end) tickets10,count(case amount when '1050000000' then 1 else null end) tickets100 from outputs t1 where exists (select * from user_account t2 where t1.address = t2.deposit_address and not t2.deposit_address = 'IBCIDN5N6GM73JS6YXY5OHIKQHCUQUTV' and exists (select * from user_referrals t3 where t2.device = t3.device))", function (rowst) {
					var tickets1 = Number(rowst[0].tickets1) || 0;
					var tickets10 = Number(rowst[0].tickets10) || 0;
					var tickets100 = Number(rowst[0].tickets100) || 0;
					var ticketstotal = Number(Number(tickets1)+Number(tickets10)*10+Number(tickets100)*100);
					var reftickets = 'Total referred tickets: '+ticketstotal;

					db.query("Select sum(tickets) as total FROM User_Account", function (rows) {
						var tickets = 0;
						if (rows.length === 1) {
							tickets = rows[0].total;
						}
						//device.sendMessageToDevice(from_address, 'text', 'Normal:\n' + balance_text + '\nTickets: ' + tickets+' ('+Number(tickets/100)+' GB)');
						db.query("select * from Games where (status='active' or status='payout' or status='time')", function (rows2) {
							if (rows2.length > 0) {
								var gametickets = 0;
								for (var i = 0; i < rows2.length; i++) {
									var slots = JSON.parse(rows2[i].slots);
									gametickets = gametickets + slots.length;
								}
							}
							var ticketstotal = tickets + gametickets;
							// now get the actual balance:
							db.query('select *, sum(amount) as total from outputs t1 where is_spent = 0 and asset is null and exists (select * from my_addresses t2 where t1.address = t2.address)', function (rows3) {
								var amount = (rows3[0].total) / 1000000; // in MB
								var gain = amount - ticketstotal * 10; // in MB
								device.sendMessageToDevice(from_address, 'text', 'Balance:\t' + amount + ' MB\nTickets in accounts:\t' + tickets + '\nTickets in Game:\t' + gametickets + '\nProfit:\t' + gain + ' MB\n'+reftickets);
							});
						});
					});
				});

			});
			prepareSharedBalanceText(function (balance_text) {
				device.sendMessageToDevice(from_address, 'text', 'Shared:\n' + balance_text);
			});
			break;


		case '/pay':
			analyzePayParams(params[0], params[1], function (asset, amount) {
				if (asset === null && amount === null) {
					var msg = "syntax: pay [amount] [asset]";
					msg += "\namount: digits only";
					msg += "\nasset: one of '', 'bytes', 'blackbytes', ASSET_ID";
					msg += "\n";
					msg += "\nExample 1: 'pay 12345' pays 12345 bytes";
					msg += "\nExample 2: 'pay 12345 bytes' pays 12345 bytes";
					msg += "\nExample 3: 'pay 12345 blackbytes' pays 12345 blackbytes";
					msg += "\nExample 4: 'pay 12345 qO2JsiuDMh/j+pqJYZw3u82O71WjCDf0vTNvsnntr8o=' pays 12345 blackbytes";
					msg += "\nExample 5: 'pay 12345 ASSET_ID' pays 12345 of asset with ID ASSET_ID";
					return device.sendMessageToDevice(from_address, 'text', msg);
				}

				if (!conf.payout_address)
					return device.sendMessageToDevice(from_address, 'text', "payout address not defined");

				function payout(amount, asset) {
					if (conf.bSingleAddress)
						readSingleAddress(function (address) {
							sendPayment(asset, amount, conf.payout_address, address, from_address);
						});
					else
						// create a new change address or select first unused one
						issueChangeAddressAndSendPayment(asset, amount, conf.payout_address, from_address);
				};
				if (asset !== null) {
					db.query("SELECT unit FROM assets WHERE unit=?", [asset], function (rows) {
						if (rows.length === 1) {
							// asset exists
							payout(amount, asset);
						} else {
							// unknown asset
							device.sendMessageToDevice(from_address, 'text', 'unknown asset: ' + asset);
						}
					});
				} else {
					payout(amount, asset);
				}
			});
			break;
		default:
		//return device.sendMessageToDevice(from_address, 'text', 'dont know this command');
	}
}

exports.readSingleWallet = readSingleWallet;
exports.readSingleAddress = readSingleAddress;
exports.signer = signer;
exports.isControlAddress = isControlAddress;
exports.issueOrSelectNextMainAddress = issueOrSelectNextMainAddress;
exports.issueChangeAddressAndSendPayment = issueChangeAddressAndSendPayment;
exports.handlePairing = handlePairing;
   // exports.handleText = handleText;
