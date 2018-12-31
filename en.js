/*jslint node: true */
"use strict";

var backtomenu = '\n\t➡ Back to: [\tmenu\t](command:menu) [\tsettings\t](command:settings) [\tticket shop](command:tickets)';

exports.addbackto = '{0}'+backtomenu;
exports.lanchanged = 'Changed language to: {0}'+ backtomenu;
exports.testtext = '\tThis is a english test text. \nHere you have variable 1: {0} and here the second one: {1}.';
exports.backtomenu = backtomenu;
exports.cantjoin = 'Error while trying to join this game. Please wait a few seconds and try again.{0}'+backtomenu;
exports.backtotickets = '\n\t➡ Back to the [ticket shop](command:tickets)?';
exports.setname = 'To change your username use the following syntax:\n\tname coolname\nwith "coolname" beeing your new username.' + backtomenu;
exports.nowithdraw = 'Before you can start, please tell me your wallet address. To do so, click on the 3 points next to the text field and click on "insert my address".' + backtomenu;
exports.notickets = 'You do not have any tickets left.\n\t➡ Buy some at the [ticket shop](command:tickets)?';
exports.buyticket = 'How many tickets do you want to buy?\n\t 1 🎫 ➡ buy for [{0} MBytes](command:buy1ticket)\n\t 10 🎫 ➡ buy for [{1} MBytes](command:buy10ticket)\n\t 100 🎫 ➡ buy for [{2} MBytes](command:buy100ticket)' + backtomenu;
exports.termtext = 'This chat bot is provided “as is,” with all faults, and luckybtes express no representations or warranties of any kind related to this chat bot or the materials and services provided with this chat bot.\n\n\nIn no event shall luckybtes, nor any of its authors, developers and employees, be held liable for anything arising out of or in any way connected with your use of this chat bot whether or not such liability is under contract. luckybtes, including its authors, developers and employees shall not be held liable for any direct, indirect, consequential or special liability arising out of or in any way related to your use of this chat bot.\nThis also includes loss of funds of any kind, including software or hardware failures, malicious attacks, connection, protocol or wallet failures.\n\n\nMinors or people below 18 years old are not allowed to use this chat bot.\n\n\nIf any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.\n\n\nIf you disagree with these terms you must not use this chat bot.' + backtomenu;
exports.welcometext = 'Welcome at LuckyBytes! LuckyBytes is a lottery in which you can play using your Byteball Bytes. There are three different game modes to participate in. Win large amounts of Bytes depending on the number of players on the principle of «the winner takes it all». All games are provably fair.\n\nFirst you should choose your [👤 username](command:name). After that you might want to open the [🎲 game menu](command:menu) or get [💡 help](command:help) and further information. By using this chat bot you agree to its [terms](command:terms).\nVisit https://lucky.byte-ball.com for further information and to play LuckyBytes online!\n\nChange language to:\n\t➡ [english](command:language english)\n\t➡ [german](command:language german)\n\t➡ [japanese](command:language japanese)\n\t➡ [russian](command:language russian)\n\t'+backtomenu;
exports.helptext = 'Normally you should be able to play LuckyBytes without the need to use commands. Just click on the blue words in the menu. Alternatively here is a list of all available commands:\n\n[menu](command:menu)\topens the game menu.\n[settings](command:settings)\tenable/disable notifications, change the language or enable auto join\n[name](command:name)\tchange your username\n[online](command:online)\tplay online\n[history](command:history)\tshows your own and the global game history\n[tickets](command:tickets)\topens the ticket shop\n\nTo chat with other users precede your text with a dot: (.)\nFor example:\n\t.hi everybody!\n\nVisit https://lucky.byte-ball.com for further information and to play LuckyBytes online!\n' + backtomenu;
exports.nouser = 'No information available' + backtomenu;
exports.cantchat = 'Are you trying to chat? To do so, please use a dot (.) in front of your text like this:\n\n\t.this message will appear in global chat!\n\nYou know that you succeeded if your message gets repeated by the chat.'+backtomenu;
exports.nameinuse ='Sorry this name is already in use. Please choose another one.';
exports.autojoin_enabled  ='Enabled auto join with 1 🎫!';
exports.autojoin_disabled  ='Disabled auto join!';
exports.joiningonhold = 'Sorry joining games is on hold right now. Please come back in a few minutes!';
exports.tradingonhold = 'Trading Tickets is on hold right now. Try again in a few minutes.'+backtomenu;
exports.giveself = 'You cant give your self a ticket. You silly.'+backtomenu;
exports.changedusername = 'Changed your username to: {0}'+backtomenu;
exports.paynow = 'Please pay now: [payment](byteball:{0}?amount={1}&asset=base)';
exports.description_changed ='Changed description!';
exports.chat_disabled ='Disabled chat messages!';
exports.chat_enabled ='Enabled chat messages!';
exports.notifications_disabled ='Disabled notifications!';
exports.notifications_enabled ='Enabled notifications!';
exports.changedescription = 'To change your own description type: "description your text"\nexample:\n\tdescription my new description is not very creative'+backtomenu;
exports.onlinelink ='The following link connects you with your online account. Do not share this link with other people. You can play LuckyBytes with this link from any device! When using this service you agree to its [terms](command:terms).\n\n\t➡ Your Account:\n https://lucky.byte-ball.com/play.html?account={0}\n'+backtomenu;
exports.payingerror = 'Hi, there was an error while trying to pay you the prize. Do not worry, this just means that all our wallets are very busy right now. I will retry it again in 10 minutes. Game: {0}'+backtomenu;
exports.newaddresstext = 'Added your new address: {0}'+backtomenu;

exports.bonustextstring = '💛 [Get free XP and Tickets](command:bonus) 💛\n\nHere you find a few ways of how to earn free 🎫 tickets.\n\nEnable [\tAutoplay\t](command:settings) and get 1 Ticket for every 25th game joined this way!\n\tYour Autoplay Points: {3}\n\tFree Autoplay Tickets gained: {4}\n\nEarn 1 Ticket for every 100th referred ticket.\n\tYour Referrals: {0} 👤\n\tYour Referrals bought a total of: {1} 🎫 Tickets\n\tYou earned a total of: {2} 🎫 Tickets\n\t➡ [click here](command:referral) to get your referral link\n'+backtomenu;
exports.addedtickets = 'Hi! I just added {0} tickets to your account! Enjoy playing!'+backtomenu;
exports.gotpayment = 'Hi, i just got your payment of: {0} {1} after it becomes stable it will be converted into tickets. :)'+backtomenu;
exports.joinedgame = 'Successfully joined [{0}](command:game {1}) in slot {2} - good luck! Never miss a game with [auto join](command:settings)!' + '\n\t➡ [Join 1 🎫](command:play{3}) again with 1 ticket?\n'+backtomenu;
exports.joinedjackpot =  'Successfully joined [{0}](command:game {1}) in slot {2}\n\t➡ [Join 1 🎫](command:playjackpot {3}) again with 1 ticket?\n\t➡ [Join 10 🎫](command:playjackpot {3} auto 10) again with 10 tickets?\n'+backtomenu;
exports.winningtext = 'Congratulations {0}! You just won {1} MB 💰 at [{2}](command:game {3}). You will get your payout shortly.'+backtomenu;
exports.playerinfo = "\t🎲\t{0}\n\n\tLevel:\t{1}\n\tDescription:\t{2}\n\n\t➡ [Give (1 🎫)](command:giveticket {0}) one Ticket to: {0} (from your own)\n"+backtomenu;
exports.sendticket = 'Ticket sent to [{0}](command:/player {0}) how generous of you!'+backtomenu;
exports.reflink = 'This is your referral pairing code:\n\nbyteball:A5X5LT9HtUewgC6Zob3oRfoICNj34d44ZCRYmXnDmqdZ@byteball.org/bb#LuckyBytesR{0}\n\nThis is your referral link for the website:\n\nhttps://lucky.byte-ball.com/?p={1}\n\nIf someone uses this code to pair up with LuckyBytes you will be registered as his recruiter.\n'+backtomenu;
exports.referralprogram = 'Thanks for using the referral program. I just added {0} Bonus Tickets to your account!\nYou referred a total of {1} Tickets from a total of {2} Referrals. For this great support you received a total of {3} Bonus tickets until now! Thanks again.'+backtomenu;

exports.menutext = '\t\t 🎲 [Play online](command:online)\t ⌨ [Settings](command:settings)\t 💡 [Help&FAQ](command:help)\n\tYour name: {0}\n\tYour tickets: [{1}  🎫\t](command:tickets)➡ [Ticket Shop](command:tickets)\n\n';
exports.menugametext ='\t ➡ ({0}/{1} slots - yours: {2})\n\t 💰 Prize: {3} Mbyte\t ➡ [Join Game (1 🎫)](command:{4})\n\n';
exports.menujackpottext = '\t ➡ ({0} slots - yours: {1})\n\t💰 Prize: {2} Mbyte \t ➡ [Join Game (1 🎫)](command:playjackpot {3})\n\tEnds in: {4} days\t{5} hours\t{6} minutes\n\n';
exports.menubottom = '\t🔃 [refresh](command:menu)\t⌛ [Game History](command:history)\t💛 [Free Tickets](command:bonus)';

// New Text Strings 25.10.2017

exports.smallerror = 'Encountered a small issue, please try again.'+backtomenu;
exports.usernotfound = 'Unable to find this player';
exports.gotticket = '[{0}](command:/player {0}) just gave you one Ticket (1 🎫)!'+backtomenu;
exports.accountsettings = '\t ⌨ [Account Settings](command:settings)\n\nChat Messages: {0}\nGlobal Winning Notifications: {1}\n\nAutomatically join each new game of (Autoplay):\n\n\t{2}\n\nYour description:\t{3} ([change it](command:description))\n\nChange language to:\n\t➡ [english](command:language english)\n\t➡ [german](command:language german)\n\t➡ [japanese](command:language japanese)\n\t➡ [russian](command:language russian)\n\t'+backtomenu;
exports.namechange = '[{0}](command:name) ➡ [change it](command:name)';

console.log('Loaded language: english');
