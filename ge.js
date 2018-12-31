/*jslint node: true */
"use strict";

var backtomenu = '\n\t➡ [\tMenü\t](command:menu) [\tEinstellungen\t](command:settings) [\tTicket Shop](command:tickets)';

exports.addbackto = '{0}'+backtomenu;
exports.lanchanged = 'Sprache geändert zu: {0}'+ backtomenu;
exports.testtext = '\tDeutscher Test Text \nHere you have variable 1: {0} and here the second one: {1}.';
exports.backtomenu = backtomenu;
exports.cantjoin = 'Fehler beim Spielbeitritt. Bitte versuche es in ein paar Sekunden erneut.{0}'+backtomenu;
exports.backtotickets = '\n\t➡ Zurück zum [Ticket Shop](command:tickets)?';
exports.setname = 'Um deinen Benutzernamen zu ändern, verwende den folgenden Syntax:\n\tname coolername\n"coolername" wäre dann dein Benutzername.' + backtomenu;
exports.nowithdraw = 'Bevor es losgehen kann, teile mir noch deine Wallet Adresse mit. Dafür clicke auf die 3 Punkte neben dem Textfeld und click dann auf: "meine Adresse einfügen".' + backtomenu;
exports.notickets = 'Du hast keine Tickets mehr.\n\t➡ Im [ticket shop](command:tickets) welche kaufen?';
exports.buyticket = 'Wieviele Tickets möchtest du kaufen?\n\t 1 🎫 ➡ kaufen für [{0} MBytes](command:buy1ticket)\n\t 10 🎫 ➡ kaufen für [{1} MBytes](command:buy10ticket)\n\t 100 🎫 ➡ kaufen für [{2} MBytes](command:buy100ticket)' + backtomenu;
exports.termtext = 'This chat bot is provided “as is,” with all faults, and luckybtes express no representations or warranties of any kind related to this chat bot or the materials and services provided with this chat bot.\n\n\nIn no event shall luckybtes, nor any of its authors, developers and employees, be held liable for anything arising out of or in any way connected with your use of this chat bot whether or not such liability is under contract. luckybtes, including its authors, developers and employees shall not be held liable for any direct, indirect, consequential or special liability arising out of or in any way related to your use of this chat bot.\nThis also includes loss of funds of any kind, including software or hardware failures, malicious attacks, connection, protocol or wallet failures.\n\n\nMinors or people below 18 years old are not allowed to use this chat bot.\n\n\nIf any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.\n\n\nIf you disagree with these terms you must not use this chat bot.' + backtomenu;
exports.welcometext = 'Willkommen zu LuckyBytes! LuckyBytes ist ein Lotteriespiel in dem du mit deinen Byteball Bytes spielen kannst. Es gibt drei verschiedene Spielmodi an denen du teilnehemen kannst. Je nach dem wieviele Mitspieler du hast, kannst du gewaltige Beträge gewinnen, ganz nach dem Prinzip «Der Gewinner bekommt alles». Alle Spiele sind nachweisbar fair und nicht manipuliert.\n\nAls erstest solltest du einen [👤 Benutzernamen](command:name) auswählen. Danach möchtest du vermutlich das  [🎲 Spiel Menü](command:menu) öffnen oder [💡 Hilfe](command:help) und weitere Informationen einholen. Beim verwenden dieses Chat-Bots akzeptierst du die [Bedingungen](command:terms).\nBesuche https://lucky.byte-ball.com für weitere Informationen!\n\nSprache ändern:\n\t➡ [english](command:language english)\n\t➡ [german](command:language german)\n\t➡ [japanese](command:language japanese)\n\t➡ [russian](command:language russian)\n\t'+backtomenu;
exports.helptext = 'Normalerweise solltest du LuckyBytes ohne manuelle Kommandos spielen können. Klicke einfach auf die blauen Wörter im Spiel Menü. Alternativ kannst du auch folgende Kommandos direkt eingeben:\n\n[menu](command:menu)\tSpiel Menü öffnen.\n[settings](command:settings)\tBenachrichtigungen ein- und ausschalten, Sprache wechseln oder das automatische Spielen aktivieren\n[name](command:name)\tBenutzernamen ändern\n[online](command:online)\tOnline spielen\n[history](command:history)\tzeigt deine und die gloable Spielhistorie\n[tickets](command:tickets)\töffnet den Ticket Shop\n\nUm mit anderen Spielern zu chatten, verwende einen Punkt (.) als erste Zeichen deines Texts.\nzum Beispiel:\n\t.Hallo alle!\n\nBesuche https://lucky.byte-ball.com für weitere Informationen!\n' + backtomenu;
exports.nouser = 'Keine Informationen vorhanden.' + backtomenu;
exports.cantchat = 'Versuchst du zu chatten? Falls ja, schreibe ein Punkt (.) vor deinen Text. Wie in diesem Beispiel:\n\n\t.Dieser Text wird im globalen Chat angezeigt!\n\nDu weißt, dass du es richtig gemacht hast, wenn dein Text vom chat bot wiederholt wird.'+backtomenu;
exports.nameinuse ='Entschuldigung, dieser Name ist bereits vergeben. Bitte wähle einen anderen.';
exports.autojoin_enabled  ='Automatischer Spielebeitritt mit aktiviert (je 1 🎫)!';
exports.autojoin_disabled  ='Automatischer Spielebeitritt deaktiviert!';
exports.joiningonhold = 'Spielebeitritte sind derzeit nicht möglich. Bitte versuche es in ein paar Minuten noch einmal.';
exports.tradingonhold = 'Tickets tauschen ist derzeit nicht möglich. Versuche es nochmal in ein paar Minuten.'+backtomenu;
exports.giveself = 'Du kannst dir selbst kein Ticket geben. Dummerchen!'+backtomenu;
exports.changedusername = 'Benutzernamen geändert zu: {0}'+backtomenu;
exports.paynow = 'Bitte bezahle jetzt: [payment](byteball:{0}?amount={1}&asset=base)';
exports.description_changed ='Beschreibung geändert!';
exports.chat_disabled ='Chat Benachrictigungen deaktiviert!';
exports.chat_enabled ='Chat Benachrictigungen aktiviert!';
exports.notifications_disabled ='Benachrictigungen deaktiviert!';
exports.notifications_enabled ='Benachrictigungen aktiviert!';
exports.changedescription = 'Um deine eigene Beschriftung zu ändern tippe: "description deine Beschreibung"\nBeispiel:\n\tdescription Meine neue Beschreibung ist nicht sehr einfallsreich.'+backtomenu;
exports.onlinelink ='Über den folgenden Link kannst du die Verbindung zu deinem online Account herstellen. Teile diesen Link mit niemanden! Mit diesem Link kannst du LuckyBytes von jedem Gerät spielen! Bei Verwendung erklärst du dich mit den [Bedingungen](command:terms) einverstanden.\n\n\t➡ Dein Account:\n https://lucky.byte-ball.com/play.html?account={0}\n'+backtomenu;
exports.payingerror = 'Hallo, es gab ein Problem bei der Auszahlung deines Gewinns. Keine Sorge, das bedeutet nur, dass alle unsere Adressen gerade sehr beschäftigt sind. Ein erneuter Versuch wird in 10 Minuten unternommen. Spiel: {0}'+backtomenu;
exports.newaddresstext = 'Deine neue Adresse wurde hinzugefügt: {0}'+backtomenu;

exports.bonustextstring = '💛 [Kostenlose XP und Tickets](command:bonus) 💛\n\nDieser Bereich ist noch im Aufbau. Schau in ein paar Tagen nocheinmal vorbei, um neue Möglichkeiten für kostenlose 🎫 Tickets kennenzulernen.\n\nErhalte 1 Ticket für je 100 vermittelte Ticket.\n\tDeine Referrals: {0} 👤\n\tInsgesamt vermittelte Tickets: {1} 🎫\n\tDu hast insgesamt: {2} 🎫 Tickets verdient.\n\t➡ [klicke hier](command:referral) um deinen Referral-Link zu erhalten.\n' +backtomenu;
exports.addedtickets = 'Hi! Ich habe deinem Account gerade {0} Tickets gutgeschrieben! Viel Spaß beim Spielen!'+backtomenu;
exports.gotpayment = 'Hi, ich habe gerade deine Einzahlung von: {0} {1} erhalten. Nachdem die Transaktion bestätigt ist, wird sie in Tickets umgewandelt. :)'+backtomenu;
exports.joinedgame = 'Erfolgreich beigetreten: [{0}](command:game {1}) im Slot {2} - viel Glück! Verpasse nie ein Spiel mit dem [automatischem Spielebeitritt](command:settings)!' + '\n\t➡ Nochmal [beitreten 1 🎫](command:play{3}) mit 1 Ticket?\n'+backtomenu;
exports.joinedjackpot =  'Erfolgreich beigetreten: [{0}](command:game {1}) im Slot {2}\n\t➡ Nochmal [beitreten 1 🎫](command:playjackpot {3}) mit 1 Ticket?\n\t➡ Nochmal [beitreten 10 🎫](command:playjackpot {3} auto 10) mit 10 Tickets?\n'+backtomenu;
exports.winningtext = 'Herzlichen Glückwunsch {0}! Du hast {1} MB 💰 bei [{2}](command:game {3}) gewonnen. Du erhälst deine Auszahlung in Kürze.'+backtomenu;
exports.playerinfo = "\t🎲\t{0}\n\n\tLevel:\t{1}\n\tBeschreibung:\t{2}\n\n\t➡ [Verschenke (1 🎫)](command:giveticket {0}) ein Ticket an: {0} (von deinen eigenen)\n"+backtomenu;
exports.sendticket = 'Ticket verschenkt an [{0}](command:/player {0}) wie gutmütig von dir!'+backtomenu;
exports.reflink = 'Das ist dein referral pairing code:\n\nbyteball:A5X5LT9HtUewgC6Zob3oRfoICNj34d44ZCRYmXnDmqdZ@byteball.org/bb#LuckyBytesR{0}\n\nDas ist dein referral link für die Webseite:\n\nhttps://lucky.byte-ball.com/?p={1}\n\nWenn jemand diesen Code verwendet um LuckyBytes beizutreten, wirst du als sein Vermittler registriert.\n'+backtomenu;
exports.referralprogram = 'Danke, dass du das Referral Programm nutzt. Ich habe deinem Account gerade {0} Bonus Tickets gutgeschrieben!\nDu hast ingesamt {1} Tickets geworben, von insgesamt {2} Referrals. Für deine großartige Untersützung hast du bereits ingesamt {3} Bonus Tickets erhalten! Dankeschön.'+backtomenu;

exports.menutext = '\t\t 🎲 [Online spielen](command:online)\t ⌨ [Einstellungen](command:settings)\t 💡 [Hilfe](command:help)\n\tDein Name: {0}\n\tDeine Tickets: [{1}  🎫\t](command:tickets)➡ [Ticket Shop](command:tickets)\n\n';
exports.menugametext ='\t ➡ ({0}/{1} Slots - deine: {2})\n\t 💰 Gewinn: {3} Mbyte\t ➡ [beitreten (1 🎫)](command:{4})\n\n';
exports.menujackpottext = '\t ➡ ({0} Slots - deine: {1})\n\t💰 Gewinn: {2} Mbyte \t ➡ [beitreten (1 🎫)](command:playjackpot {3})\n\tEndet in: {4} Tagen\t{5} Stunden\t{6} Minuten\n\n';
exports.menubottom = '\t\t\t🔃 [Aktualisieren](command:menu)\t⌛ [Spiel Verlauf](command:history)\n\t\t\t\t\t💛 [Kostenlose Tickets](command:bonus)';

// New Text Strings 25.10.2017

exports.smallerror = 'Hups, es gab ein kleines Problem. Bitte versuche es erneut.'+backtomenu;
exports.usernotfound = 'Kann diesen Spieler nicht finden.';
exports.gotticket = '[{0}](command:/player {0}) hat dir gerade ein Ticket (1 🎫) geschenkt!'+backtomenu;
exports.accountsettings = '\t ⌨ [Account Einstellungen](command:settings)\n\nChat Nachrichten: {0}\nGlobale Gewinnnachrichten: {1}\n\nAutomatischer Spielebeitritt für:\n\n\t{2}\n\nDeine Beschreibung:\t{3} ([ändern](command:description))\n\nSprache ändern:\n\t➡[ english](command:language english)\n\t➡ [german](command:language german)\n\t➡ [japanese](command:language japanese)\n\t➡ [russian](command:language russian)\n\t'+backtomenu;
exports.namechange = '[{0}](command:name) ➡ [ändern](command:name)';


console.log('Loaded language: german');
