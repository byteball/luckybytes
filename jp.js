/*jslint node: true  */
"use strict";

var backtomenu = '\n\t➡ 戻る: [\tメニュー\t](command:menu) [\t設定\t](command:settings) [\tショップ](command:tickets)';

exports.testtext = '\tThis is a japanese test text. \nHere you have variable 1: {0} and here the second one: {1}.';
exports.backtomenu = backtomenu;

exports.addbackto = '{0}'+backtomenu;
exports.lanchanged = 'To japanese: 言語切替: {0}'+backtomenu;
exports.cantjoin = 'ゲーム参加時にエラーが発生しました。数秒お待ちいただくか、または再度お試しください。{0}'+backtomenu;
exports.backtotickets = '\n\t➡ [ショップ](command:tickets) へ戻りますか？';
exports.setname = 'アカウント名の変更方法:\n\tname coolname\nと入力した場合 "coolname" が新規アカウント名となります。' + backtomenu;
exports.nowithdraw = '遊び始める前に、まずはウォレットのアドレスを教えてください。テキストメッセージ入力欄の隣にある3つの点が付いたボタンをクリックし "insert my address" を選択すれば簡単に行えますよ。' + backtomenu;
exports.notickets = 'チケットがもう残っていないようです。\n\t➡ [ショップ](command:tickets)で購入しますか？';
exports.buyticket = '何枚のチケットをお求めでしょうか？\n\t 1 🎫 ➡ 価格: [{0} MBytes](command:buy1ticket)\n\t 10 🎫 ➡ 価格: [{1} MBytes](command:buy10ticket)\n\t 100 🎫 ➡ 価格: [{2} MBytes](command:buy100ticket)' + backtomenu;
exports.termtext = 'このチャットボットはすべての不具合を「現状有姿 (as is)」で提供しており、LuckyBytesはこのチャットボットやこのチャットボットに付随する資料やサービスに関するいかなる事項に対しても表明や保証は行いません。\n\n\nLuckyBytes、その作者、開発者、及び従業員のいずれも、このチャットボットの使用に起因または関連する事項に対し、契約書における責任の記載如何に関わらず、一切の責任を負うことはありません。作者、開発者、及び従業員を含むLuckyBytesは、このチャットボットの使用に起因または関連する直接的、間接的、派生的、または特別な責任を一切負いません。\n上記には、ソフトウェアやハードウェアの障害、悪意のある攻撃、接続、プロトコル、ウォレットの障害など、あらゆる種類の資金損失が含まれます。\n\n\n未成年者または18歳未満の方は、このチャットボットを使用することは出来ません。\n\n\n適用される法律の下で本利用規約の内いずれかの条項が無効であると判明した場合、その条項は本規約の残りの条項に影響を与えること無く削除されます。\n\n\n以上の条件に同意しない場合は、このチャットボットを使用してはなりません。' + backtomenu;
exports.welcometext = 'LuckyBytesへようこそ！ LuckyBytesはByteball Bytesを使って遊ぶことの出来るくじです。参加可能なゲームモードは3種類あり、「勝者総取り」の原則に基づきプレイヤー数が増えるほど多くのBytesが勝ち取れます。また、全てのゲームは公平性が証明可能です。\n\nまずは[👤 アカウント名](command:name)を決めて下さい。その後 [🎲 メニュー](command:menu) または [💡 ヘルプ](command:help) にて詳細が確認可能です。(このチャットボットを利用するためには、[規約](command:terms)への同意が必要です。)\nその他詳細な情報は https://lucky.byte-ball.com をご確認下さい！\n\n言語切替:\n\t➡ [english](command:language english)\n\t➡ [german](command:language german)\n\t➡ [japanese](command:language japanese)\n\t➡ [russian](command:language russian)\n\t'+backtomenu;
exports.helptext = '基本的にLuckyBytesはメニューの青文字部分を選択するだけで遊ぶことが出来ますが、こちらのコマンドもご利用いただけます。:\n\n[menu](command:menu)\tゲームメニューを開く。\n[settings](command:settings)\t通知や自動参加の設定を行う。\n[name](command:name)\tアカウント名を変更する。\n[online](command:online)\tオンラインで遊ぶ。\n[history](command:history)\t個人または全体のゲーム履歴を参照。\n[tickets](command:tickets)\tショップを開く。\n\n他のユーザーとチャットする場合には、テキストの前にドット (.) を打って下さい。\n例:\n\t.やあ、みんな！\n\nその他詳細な情報は https://lucky.byte-ball.com をご確認下さい！\n' + backtomenu;
exports.nouser = '取得可能な情報がありません。' + backtomenu;
exports.cantchat = 'チャットがしたいですか？その場合は、このような感じでテキストの前にドット (.) を打って下さい。\n\n\t.このメッセージはユーザー全員に表示されます！\n\n自分のチャットに2回表示されることが成功の証です。'+backtomenu;
exports.nameinuse ='ごめんなさい。この名前は既に使われているので、別の名前を選択して下さい。';
exports.autojoin_enabled  ='1 🎫 単位での自動参加機能を有効にしました！';
exports.autojoin_disabled  ='自動参加機能を無効にしました！';
exports.joiningonhold = 'ごめんなさい、このゲームへの参加は現在保留中です。数分後に再度お試し下さい！';
exports.tradingonhold = 'ごめんなさい、チケット取引は現在保留中です。数分後に再度お試し下さい！'+backtomenu;
exports.giveself = '自分で自分にチケットを渡すことは...出来ません！'+backtomenu;
exports.changedusername = '次の名前に変更する: {0}'+backtomenu;
exports.paynow = '支払いをお願いします。: [payment](byteball:{0}?amount={1}&asset=base)';
exports.description_changed ='紹介文を変更しました！';
exports.chat_disabled ='チャットメッセージ機能を無効にしました！';
exports.chat_enabled ='チャットメッセージ機能を有効にしました！';
exports.notifications_disabled ='全ゲーム結果に関する通知を無効にしました！';
exports.notifications_enabled ='全ゲーム結果に関する通知を有効にしました！';
exports.changedescription = '紹介文を変更する場合には、"description 紹介文"と入力して下さい。\n例:\n\tdescription This new description is not so creative.'+backtomenu;
exports.onlinelink ='以下はオンラインアカウントと接続するためのリンクなので、他人とはシェアしないようにして下さい。接続によって、どのようなデバイスからでもLuckyBytesをお楽しみいただけます！ (サービス利用には[規約](command:terms)への同意が必要です。)\n\n\t➡ あなたのアカウント:\n https://lucky.byte-ball.com/play.html？account={0}\n'+backtomenu;
exports.payingerror = '賞金の支払い時にエラーが発生しました。ですがこれは単にウォレットが混雑しているだけなので、心配しないで下さい。10分後に再度支払い処理を行いますね！ ゲーム種別: {0}'+backtomenu;
exports.newaddresstext = '新規アドレスを追加: {0}'+backtomenu;

exports.bonustextstring = '💛 [フリーチケットを入手](command:bonus) 💛\n\nこの機能は現在開発中です。フリーチケット 🎫 を入手する方法については、数日後に再度ご確認下さい。\n\n紹介を受けた人が100枚チケットを買う毎にチケット1枚が得られます。\n\tあなたが紹介した人数: {0} 👤\n\t紹介を受けた人の購入チケット総数: {1} 🎫 枚\n\t無料チケットの獲得総数: {2} 🎫 枚\n\t➡ 紹介用リンクを手に入れるには [こちら](command:referral)をクリック。\n'+backtomenu;
exports.addedtickets = '新しく {0} 枚のチケットをアカウントへ追加しました！ 楽しんで下さい！'+backtomenu;
exports.gotpayment = '新しく {0} {1} の支払いを受領しました。しばらく後にチケットへと変更されます。:)'+backtomenu;
exports.joinedgame = '[{0}](command:game {1}) の 第{2}slot に参加しました。- 幸運を祈ります！ [自動参加機能](command:settings)についてもご検討下さい。' + '\n\t➡ 1チケットでさらにもう[1slot](command:play{3}) 参加しますか？\n'+backtomenu;
exports.joinedjackpot =  '[{0}](command:game {1}) の 第{2}slot に参加しました。\n\t➡ 1チケットでさらにもう[1slot](command:playjackpot {3}) 参加しますか？\n\t➡ 10チケットでさらにもう[10slot](command:playjackpot {3} auto 10) 参加しますか？\n'+backtomenu;
exports.winningtext = 'おめでとうございます {0}！ [{2}](command:game {3})にて {1} MB 💰 を獲得しました。賞金はすぐ後に支払われます。'+backtomenu;
exports.playerinfo = "\t🎲\t{0}\n\n\tレベル:\t{1}\n\t自己紹介:\t{2}\n\n\t➡ [(1 🎫)をあげる](command:giveticket {0}) one Ticket to: {0} (from your own)\n"+backtomenu;
exports.sendticket = 'チケットを[{0}](command:/player {0})へと送ります。気前が良いですね！'+backtomenu;
exports.reflink = 'こちらが紹介プログラム用コードです。:\n\nbyteball:A5X5LT9HtUewgC6Zob3oRfoICNj34d44ZCRYmXnDmqdZ@obyte.org/bb#LuckyBytesR{0}\n\nそしてこちらがウェブサイト用のリンクです。:\n\nhttps://lucky.byte-ball.com/？p={1}\n\n他の誰かがこのコードを用いてLukyBytesを使い始めた場合、あなたが紹介者として登録されます。\n'+backtomenu;
exports.referralprogram = '紹介プログラムをご利用いただきどうもありがとうございます。{0} 枚のボーナスチケットをアカウントに追加しました！\nお陰様で、これまで {1} 枚のチケット発行が {2} 人の参加によって行われました。一連のサポートへのお礼として、合計 {3} 枚のボーナスチケットがあなた宛に発行されています。今後ともどうぞよろしくお願い致します。'+backtomenu;

exports.menutext = '\t\t 🎲 [オンラインで遊ぶ](command:online)\t ⌨ [設定](command:settings)\t 💡 [ヘルプ](command:help)\n\tアカウント名: {0}\n\tチケット枚数: [{1}  🎫\t](command:tickets)➡ [ショップ](command:tickets)\n\n';
exports.menugametext ='\t ➡ ({0}/{1} slots - yours: {2})\n\t 💰 賞金: {3} Mbyte\t ➡ [参加する (1 🎫)](command:{4})\n\n';
exports.menujackpottext = '\t ➡ ({0} slots - yours: {1})\n\t💰 賞金: {2} Mbyte \t ➡ [参加する (1 🎫)](command:playjackpot {3})\n\t終了まで: {4} 日\t{5} 時間\t{6} 分\n\n';
exports.menubottom = '\t🔃 [リロード](command:menu)\t⌛ [履歴](command:history)\t💛 [フリーチケット](command:bonus)';

// New Text Strings 25.10.2017

exports.smallerror = '小さな問題が発生しました。もう一度お試し下さい。'+backtomenu;
exports.usernotfound = 'プレイヤーが見つかりません。';
exports.gotticket = '[{0}](command:/player {0}) があなたへ1チケット (1 🎫)を送りました！'+backtomenu;
exports.accountsettings = '\t ⌨ [アカウント設定](command:settings)\n\nチャットメッセージ: {0}\n全ゲーム結果に関する通知: {1}\n\n各ゲームへの自動参加:\n\n\t{2}\n\n自己紹介:\t{3} ([変更する](command:description))\n\n言語切替:\n\t➡ [english](command:language english)\n\t➡ [german](command:language german)\n\t➡ [japanese](command:language japanese)\n\t➡ [russian](command:language russian)\n\t'+backtomenu;

// New Text Strings 26.10.2017

exports.namechange = '[{0}](command:name) ➡ [変更する](command:name)';

console.log('Loaded language: japanese');
