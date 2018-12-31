/*jslint node: true */
"use strict";

//exports.port = 6611;
//exports.myUrl = 'wss://mydomain.com/bb';
exports.bServeAsHub = false;
exports.bLight = true;


exports.storage = 'sqlite';


exports.hub = 'byteball.org/bb'; 
exports.deviceName = 'Lucky Bytes';
exports.permanent_paring_secret = '0000';
exports.control_addresses = [];//['changethis']; //change this to your own address
exports.payout_address = '';
exports.pass = 'passphrase'; // it is stored in your conf, not secure
exports.KEYS_FILENAME = 'keys.json';

// where logs are written to (absolute path).  Default is log.txt in app data directory
//exports.LOG_FILENAME = '/dev/null';

exports.webPort = 8000;
exports.sslPath = '/etc/letsencrypt/live/lucky.byte-ball.com/';

console.log('finished luckybytes config.');
