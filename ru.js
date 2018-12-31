/*jslint node: true */
"use strict";

var backtomenu = '\n➡ [\tменю\t](command:menu) [\tнастройки\t](command:settings) [\tмагазин билетов](command:tickets)';

exports.addbackto = '{0}'+backtomenu;
exports.lanchanged = 'Изменить язык: {0}'+ backtomenu;
exports.testtext = '\tThis is a english test text. \nHere you have variable 1: {0} and here the second one: {1}.';
exports.backtomenu = backtomenu;
exports.cantjoin = 'Возникла ошибка. Пожалуйста, попробуйте снова через несколько секунд.{0}'+backtomenu;
exports.backtotickets = '\n\t➡ Back to the [ticket shop](command:tickets)?';
exports.setname = 'Для изменения имени используйте следующий синтаксис:\n\tname coolname\n"coolname" будет вашим новым именем.' + backtomenu;
exports.nowithdraw = 'Перед началом, пожалуйста сообщите мне адрес вашего кошелька. Для этого кликните на три точки перед текстовым полем и выберите "Вставьте ваш адрес".' + backtomenu;
exports.notickets = 'У вас больше не осталось билетов.\n\t➡ Купите несколько в [магазине билетов](command:tickets)?';
exports.buyticket = 'Сколько билетов желаете приобрести?\n\t 1 🎫 ➡ купить за [{0} MBytes](command:buy1ticket)\n\t 10 🎫 ➡ купить за [{1} MBytes](command:buy10ticket)\n\t 100 🎫 ➡ купить за [{2} MBytes](command:buy100ticket)' + backtomenu;
exports.termtext = 'Этот чатбот предоставлен “как есть”, включая все возможные ошибки, и лакибайты не предоставляют никаких гарантий относительно этого чатбота, включая любой контент и услуги, предоставляемые им.\nЛакибайты, его авторы, разработчики или сотрудники ни в коем случае не несут ответственности за любые возможные последствия, связанные с использованием вами этого чатбота, ни прямо, ни косвенно, ни каким-либо специальным образом.\nЭто также распространяется на потерю денежных средств любого рода, включая отказ программного и аппаратного обеспечения, вредоносные атаки, отказы соединения, протокола либо кошелька.\nНедееспособным и лицам младше 18 лет не разрешено пользоваться этим чатботом.\nЕсли любое из положений данных Условий окажется противоречащим закону, подобное положение теряет силу, не затрагивая остальные положения Условий. \nУсли вы не согласны с данными Условиями, вы обязуетесь не пользоваться этим чатботом.' + backtomenu;
exports.welcometext = 'Добро пожаловать в Лакибайты! Лакибайты - это лотеря, в которую вы можете играть, используя Байтболлы. В лотерее есть три игровых режима. Выиграйте большое количество Байтов в зависимости от числа игроков по принципу "победитель забирает все!". Все игры доказуемо честные.\n\nСначала вы должны выбрать себе имя [👤 имя](command:name). После этого вы можете открыть [🎲 меню игры](command:menu) или получить [💡 помощь](command:help). Используя этот чатбот, вы соглашаетесь с его [условиями](command:terms).\nПосетите https://lucky.byte-ball.com, чтобы узнать больше и играть в Лакибайты онлайн!\n\nИзменить язык:\n\t➡ [english](command:language english)\n\t➡ [german](command:language german)\n\t➡ [japanese](command:language japanese)\n\t➡ [russian](command:language russian)\n'+backtomenu;
exports.helptext = 'Обычно вы можете играть в Лакибайты без необходимости использования команд. Просто кликните на голубые слова в меню. В качестве альтернативы вот список всех доступных команд:\n\n[menu](command:menu)\tоткрыть меню игры.\n[settings](command:settings)\tвключить/выключить оповещения, изменить язык или включить автоприсоединение к игре\n[name](command:name)\tизменить ваше имя\n[online](command:online)\tиграть онлайн\n[history](command:history)\tпоказать историю ваших игр и глобальную историю игры\n[tickets](command:tickets)\tоткрыть магазин билетов\n\nЧтобы пообщаться с другими игроками, поставьте перед текстом точку: (.)\nНапример:\n\t.Привет всем!\n\nПосетить https://lucky.byte-ball.com, чтобы узнать больше и играть в Лакибайты онлайн!\n' + backtomenu;
exports.nouser = 'Информации нет' + backtomenu;
exports.cantchat = 'Пытаетесь пообщаться? Для этого, пожалуйста поставьте точку (.) в начале вашего текста как здесь:\n\n\t.это сообщение появится в глобальном чате!\n\nВ случае успеха ваше сообшение будет отображено в чате.'+backtomenu;
exports.nameinuse ='Увы, это имя уже используется. Пожалуйста, выберите другое.';
exports.autojoin_enabled  ='Автоприсоединение включено!🎫!';
exports.autojoin_disabled  ='Автоприсоединение отключено!';
exports.joiningonhold = 'Извините, присоединение к игре в данный момент отложено. Пожалуйста, попробуйте через несколько минут!';
exports.tradingonhold = 'Торговля билетами в даннымй момент отложена. Попробуйте через несколько минут.'+backtomenu;
exports.giveself = 'Вы не можете дать самому себе билет, глупенький'+backtomenu;
exports.changedusername = 'Ваше имя изменено на: {0}'+backtomenu;
exports.paynow = 'Пожалуйста, оплатите сейчас: [Платеж](byteball:{0}?amount={1}&asset=base)';
exports.description_changed ='Изменено описание!';
exports.chat_disabled ='Сообщения чата отключены!';
exports.chat_enabled ='Сообщения чата включены!';
exports.notifications_disabled ='Оповещения отключены!';
exports.notifications_enabled ='Оповещения включены!';
exports.changedescription = 'Чтобы изменить вашe описание, введите: "description ваш_текст"\nПример:\ndescription "мое новое описание не слишком креативное"'+backtomenu;
exports.onlinelink ='Следующая ссылка связывает вас с вашим аккаунтом. Не делитесь этой ссылкой с другими людьми. Вы можете играть в Лакибайты на любом устройстве, используя эту ссылку! Используя этот сервис, вы соглашаетесь с его [условиями](command:terms).\n\n\t➡ Ваш аккаунт:\n https://lucky.byte-ball.com/play.html?account={0}\n'+backtomenu;
exports.payingerror = 'Привет, возникла ошибка во время попытки выплатить вам приз. Не переживайте, это всего лишь означает, что все наши кошельки очень заняты прямо сейчас. Я попробую снова через 10 минут. Лакибайт: {0}'+backtomenu;
exports.newaddresstext = 'Добавлен ваш новый адрес: {0}'+backtomenu;exports.bonustextstring = '💛 [Получите бесплатные XP и Билеты](command:bonus) 💛\n\nЭтот раздел в разработке. Загляните через несколько дней, чтобы узнать, как получить бесплатные Билеты.\n\nПолучите 1 Билет за каждый 100-й билет рефералов.\n\tВаши Рефералы: {0} 👤\n\tВаши рефералы купили всего: {1} 🎫 Билетов\n\tВы заработали всего: {2} 🎫 Билетов\n\t➡ [нажмите здесь](command:referral) для получения вашей реферальной ссылки\n'+backtomenu;
exports.addedtickets = 'Привет! Я только что добавил{0} билетов на ваш аккаунт! Наслаждайтесь игрой!'+backtomenu;
exports.gotpayment = 'Привет, я только что получил ваш платеж: {0} {1} после подтверждения он будет переведен в Билеты. :)'+backtomenu;
exports.joinedgame = 'Успешно присоединился [{0}](command:game {1}) к слоту {2} - Удачи! Никогда не пропустите игру с, используя [автоподключение](command:settings)!' + '\n\t➡ [Присоединится 1 🎫](command:play{3}) снова с 1 билетом?\n'+backtomenu;
exports.joinedjackpot =  'Успешно присоединился [{0}](command:game {1}) к слоту {2}\n\t➡ [Присоединится 1 🎫](command:playjackpot {3}) снова с 1 билетом?\n\t➡ [Присоединится 10 🎫](command:playjackpot {3} auto 10) снова с 10 билетами?\n'+backtomenu;
exports.winningtext = 'Поздравляем {0}! Вы только что выиграли {1} MB 💰 в [{2}](command:game {3}). Выплата скоро будет произведена.'+backtomenu;
exports.playerinfo = "\t🎲\t{0}\n\n\tУровень:\t{1}\n\tОписание:\t{2}\n\n\t➡ [Дать (1 🎫)](command:giveticket {0}) один Билет: {0} (from your own)\n"+backtomenu;
exports.sendticket = 'Билет послан [{0}](command:/player {0}) очень щедро с вашей стороны!'+backtomenu;
exports.reflink = 'Это ваш реферальный код:\n\nbyteball:A5X5LT9HtUewgC6Zob3oRfoICNj34d44ZCRYmXnDmqdZ@byteball.org/bb#LuckyBytesR{0}\n\nЭто ваша реферальная ссылка на сайт:\n\nhttps://lucky.byte-ball.com/?p={1}\n\nЕсли кто-либо использует этот код для сопряжения с Лакибайтом, вы будете зарегистрированы как его рекрутер.\n'+backtomenu;
exports.referralprogram = 'Благодарим за использование реферальной программы. Я только что добавил {0} бонусных Билетов на ваш аккаунт!\nКоличество ваших билетов {1} от {2} рефералов. Всего вы получили {3} бонусных Билетов за вашу поддержку! Спасибо вам!.'+backtomenu;
exports.menutext = '🎲 [Играть онлайн](command:online)\t ⌨ [Настройки](command:settings)\t 💡 [Помощь](command:help)\n\tВаше имя: {0}\n\tВаши билеты: [{1}  🎫\t](command:tickets)➡ [Магазин Билетов](command:tickets)\n\n';
exports.menugametext ='\t ➡ ({0}/{1} слоты - ваши: {2})\n\t 💰 Приз: {3} Mbyte\t ➡ [Войти в игру (1 🎫)](command:{4})\n\n';
exports.menujackpottext = '\t ➡ ({0} слоты - ваши: {1})\n\t💰 Приз: {2} Mbyte \t ➡ [Войти в игру (1 🎫)](command:playjackpot {3})\n\tЗакончится через: {4} дней\t{5} часов\t{6} минут\n\n';
exports.menubottom = '\t\t\t🔃 [Обновить](command:menu)\t⌛ [Игровая история](command:history)\n\t\t\t\t\t💛 [Бесплатные Билеты](command:bonus)';

// New Text Strings 25.10.2017

exports.smallerror = 'Возникла небольшая проблема, пожалуйста попробуйте снова.'+backtomenu;
exports.usernotfound = 'Не могу найти этого игрока';
exports.gotticket = '[{0}](command:/player {0}) только что дал вам один Билет (1 🎫)!'+backtomenu;
exports.accountsettings = '\t ⌨ [Настройки аккаунта](command:settings)\n\nChat Messages: {0}\nОповощения глобальных побед: {1}\n\nАвтоматически присоединяться к каждой новой игре:\n\n\t{2}\n\nВаше описание:\t{3} ([изменить](command:description))\n\nИзменить язык:\n\t➡ [english](command:language english)\n\t➡ [german](command:language german)\n\t➡ [japanese](command:language japanese)\n\t➡ [russian](command:language russian)\n\t'+backtomenu;
exports.namechange = '[{0}](command:name) ➡ [изменить](command:name)';

console.log('Loaded language: russian');