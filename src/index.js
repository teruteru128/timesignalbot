
/*
  やりたいこと逆引き集
  https://scrapbox.io/discordjs-japan/%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E3%81%93%E3%81%A8%E9%80%86%E5%BC%95%E3%81%8D%E9%9B%86
*/
const { Client, Intents, TextChannel, DMChannel, ThreadChannel } = require('discord.js');
const cron = require('node-cron');
const crypto = require('crypto');
const builders = require('@discordjs/builders');
const { SlashCommandBuilder } = builders;
const client = new Client({
  partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_WEBHOOKS
  ]
});
// https://devcenter.heroku.com/ja/articles/getting-started-with-nodejs?singlepage=true#-13
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
new Promise(async (resolve, reject) => {
  // https://node-postgres.com/
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(result.rows[0].message); // Hello world!
    /* const result = await client.query('SELECT $1::text', ['Hello world!']);
    console.log(result.rows[0]); // Hello world! */
    /* const result = await client.query('SELECT $1', ['Hello world!']);
    console.log(result.rows[0]); // Hello world! */
    resolve();
  } catch (error) {
    console.error(error);
    reject(error);
  } finally {
    client.release();
  }
}).catch(err => console.error('pg error : %s', err));

/* 
const data1 = new SlashCommandBuilder().setName().setDescription()
  .addStringOption(opt => opt.setName('').setDescription().setRequired(true));
 */

// 全てのイベントにリスナーを設定する
client.on('apiRequest', async request => { });
client.on('apiResponse', async (request, response) => { });
client.on('channelCreate', async channel => { console.log('channelCreate : %s, %sが作成されました', channel.name, channel.guild !== null && channel.guild.name !== null ? channel.guild.name : '\'?\''); });
client.on('channelDelete', async channel => { });
client.on('channelPinsUpdate', async (channel, time) => { });
client.on('channelUpdate', async (oldChannel, newChannel) => { });
client.on('debug', async debug => { /* console.error('error : %s', debug); */ });
client.on('emojiCreate', async emoji => { });
client.on('emojiDelete', async emoji => { });
client.on('emojiUpdate', async (oldEmoji, newEmoji) => { });
client.on('error', async error => console.error('error : %s', error));
client.on('guildBanAdd', async ban => { });
client.on('guildBanRemove', async ban => { });
client.on('guildCreate', async guild => { });
client.on('guildDelete', async guild => { });
client.on('guildMemberAdd', async c => { /* console.log(`guildMemberAdd : ${c}`); */ });
client.on('guildMemberAvailable', async c => { /* console.log(`guildMemberAvailable : ${c} in ${c.guild.name}`); */ });
client.on('guildIntegrationsUpdate', async guild => { });
client.on('guildMemberRemove', async member => { });
client.on('guildMembersChunk', async (members, guild, chunk) => { });
client.on('guildMemberUpdate', async (oldMember, newMember) => { });
client.on('guildScheduledEventCreate', async guildScheduledEvent => { });
client.on('guildScheduledEventDelete', async guildScheduledEvent => { });
client.on('guildScheduledEventUpdate', async (oldGuildScheduledEvent, newGuildScheduledEvent) => { });
client.on('guildScheduledEventUserAdd', async (guildScheduledEvent, user) => { });
client.on('guildScheduledEventUserRemove', async (guildScheduledEvent, user) => { });
client.on('guildUnavailable', async guild => { });
client.on('guildUpdate', async (oldGuild, newGuild) => { });
client.on('invalidated', async () => console.log('invalidated'));
client.on('invalidRequestWarning', async invalidRequestWarningData => { });
client.on('inviteCreate', async invite => { console.log('inviceCreate : %s', invite); });
client.on('inviteDelete', async invite => { console.log('inviteDelete : %s', invite); });
client.on('messageDelete', async message => {
  // 起動時より前に作成されたメッセージが削除されると、authorがnullになる？=>本当らしい
  var logmsg = '';
  if (message.channel !== null)
    logmsg += `${message.channel.name}`;
  else
    logmsg += '(message.channel is null)';
  if (message.inGuild()) {
    logmsg += `(${message.guild.name})`;
  }
  logmsg += `で送信された(`;
  if (message.author !== null) {
    if (message.author.username !== null)
      logmsg += `${message.author.username}`;
    else
      logmsg += 'message.author.username is null';
  }
  else {
    logmsg += 'message.author is null';
  }
  logmsg += `)のメッセージが削除されました : ${message.content}`;
  console.log(logmsg);
});
client.on('messageDeleteBulk', async messages => messages.forEach((v, k, m) => console.log(`削除されましたs : ${v}`)));
client.on('messageReactionAdd', async (messageReaction, user) => { });
client.on('messageReactionRemove', async (messageReaction, user) => { });
client.on('messageReactionRemoveAll', async (message, reactions) => { });
client.on('messageReactionRemoveEmoji', async reaction => { });
client.on('messageUpdate', async (oldMessage, newMessage) => { });
client.on('presenceUpdate', async (oldPresence, newPresence) => { });
client.on('rateLimit', async rateLimitData => console.log('rateLimit : %s', rateLimitData));
client.on('roleCreate', async role => { });
client.on('roleDelete', async role => { });
client.on('roleUpdate', async (oldRole, newRole) => { });
client.on('shardDisconnect', async (event, id) => { });
client.on('shardError', async (error, shardId) => { });
client.on('shardReady', async (id, unavailableGuilds) => { });
client.on('shardReconnecting', async id => { });
client.on('shardResume', async (id, replayedEvents) => { });
client.on('stageInstanceCreate', async stageInstance => { });
client.on('stageInstanceDelete', async stageInstance => { });
client.on('stageInstanceUpdate', async (oldStageInstance, newStageInstance) => { });
client.on('stickerCreate', async sticker => { });
client.on('stickerDelete', async sticker => { });
client.on('stickerUpdate', async (oldSticker, newSticker) => { });
client.on('threadCreate', async thread => { });
client.on('threadDelete', async thread => { });
client.on('threadListSync', async threads => { });
client.on('threadMembersUpdate', async (oldMembers, newMembers) => { });
client.on('threadMemberUpdate', async (oldMember, newMember) => { });
client.on('threadUpdate', async (oldThread, newThread) => { });
client.on('typingStart', async typing => { });
client.on('userUpdate', async (oldUser, newUser) => { });
client.on('voiceStateUpdate', async (oldState, newState) => { });
client.on('warn', async info => console.warn('warn : %s', info));
client.on('webhookUpdate', async channel => { });

// スラッシュコマンド登録用データ
const data = [{
  name: 'ping',
  description: 'Replies with Pong!',
  options: [{ name: 'payload', description: 'The message returned with the pong.', type: 'STRING', /* required: true */ }]
}, {
  name: 'nyanpass',
  description: 'get nyanpass count from nyanpass.com',
  optins: []
}, {
  name: 'neko',
  description: 'show cats face',
  optins: []
}];

// https://github.com/openjdk/jdk/blob/739769c8fc4b496f08a92225a12d07414537b6c0/src/java.base/share/classes/java/util/Random.java#L324
function nextInt(bound) {
  if (arguments.length < 1) {
    return crypto.webcrypto.getRandomValues(new Int32Array(1))[0];
  } else {
    if (bound <= 0) {
      throw 'bound must be positive';
    }

    // FIXME: 呼び出されるたびにarrayが生成されるのはもったいなくない？=>乱数がArray経由でしか取得できないからなんとも……
    var array = new Int32Array(1);
    crypto.webcrypto.getRandomValues(array);
    var r = array[0] >> 1;
    var m = r - 1;
    if ((bound & m) == 0)
      r = (bound * r) >> 31;
    else {
      for (var u = r; u - (r = u % bound) + m < 0; u = (crypto.webcrypto.getRandomValues(array)[0] >> 1));
    }
    return r;
  }
}

// https://github.com/openjdk/jdk/blob/739769c8fc4b496f08a92225a12d07414537b6c0/src/java.base/share/classes/java/util/Random.java#L425
function nextFloat() {
  return (crypto.webcrypto.getRandomValues(new Int32Array(1))[0] >> 8) / (1 << 24);
}

const kakuninyou_test_guild_id = '879315010218774528';
const tamokuteki_toire_guild_id = '795353457996595200';
const farm_server_guild_id = '572150608283566090';

const test_server_general_id = '879315010218774531';
const tamokuteki_toire_text_channel_id = '796357249743585290';
const syoki_spawn_text_channel_id = '572151278428225537';
const SIGNALING_TEXT_CHANNEL_LIST = [tamokuteki_toire_text_channel_id, syoki_spawn_text_channel_id];
const signal = now => {
  // やっぱり時代はリスト処理なんかねえ？
  /* create table SIGNALING_CHANNEL_ID(CHANNEL_ID varchar(24), GUILD_ID varchar(24), DESCRIPTION text,primary key(ID)); */
  var prefix = '真夜中';
  var date = now.getDate();
  var month = now.getMonth();
  var day = now.getDay();
  // choose prefix
  if (date == 1) {
    prefix = (date + 1) + '月';
  } else if (date == 20 && month == 10) {
    prefix = '20, november';
  } else if (day == 0) {
    prefix = '月曜日';
  }
  // build signal message
  var body = prefix + 'だよハルト' + 'オ'.repeat(40 + nextInt(60));
  new Promise.allSettled(SIGNALING_TEXT_CHANNEL_LIST.map((channelId, i, a) => client.channels.cache.get(channelId)).reduce((promises, channel, i, a) => { if (typeof channel.send == 'function') { promises.push(channel.send(body)); } return promises; }, []));
};

/**
 * 2022年2月22日22時22分22秒用コールバック
 * XXX: このコールバックだけ引数にclientがないの気持ち悪いよね
 */
const signal2 = now => {
  new Promise((res, rej) => client.channels.cache.get(tamokuteki_toire_text_channel_id))
    .then(channel => channel.send('ねこtimeだよハルトオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオオ'));
};

const SIGNAL_GUILD_ID_LIST = [kakuninyou_test_guild_id, tamokuteki_toire_guild_id, farm_server_guild_id];
const SIGNAL_SCHEDULES = [];
client.on('ready', client => {
  // スラッシュコマンドをギルドに登録
  const promises = [];
  SIGNAL_GUILD_ID_LIST.reduce((promises, guildId, i, a) => { promises.push(client.application.commands.set(data, guildId)); return promises; }, promises);
  console.log(` ${client.user.username}(${client.user}, ${client.user.tag}) でログインしています。`);
  // 地雷起動時セットアップ
  client.user.setActivity(MINES.length + '個の地雷除去', { type: 'COMPETING' });
  // 時報セットアップ
  SIGNAL_SCHEDULES.push(cron.schedule('0 0 0 * * *', signal, { timezone: 'Asia/Tokyo' }));
  // cron.schedule('22 22 22 22 2 *', signal2, { timezone: 'Asia/Tokyo' });
  return Promise.allSettled(promises);
});

const INITIAL_CAT_LIST = ['にゃーん', 'にゃん', 'にゃ？', 'にゃん？', 'にゃおーん', 'フシーッ！', '🐱', '🐈', '🐈‍⬛', '😿', '😻',
  '😹', '😽', '😾', '🙀', '😸', '😺', '😼', '🐾'];
const GENBA_NEKO = ['ヨシ！', 'どうして……', 'どうして\n夜中に\n起きてるん\nですか？', 'ああああ！\nああああ！\nあああああ！あー！',
  'オレじゃない\nアイツがやった\nシらない\nスんだこと', 'なんだか\n知らんが\nとにかく\nヨシ！', '100万回死んだねこ',
  'え！！半分の人員で倍の仕事を！？', '弊社なら年内施工も可能です！', 'どうして自分が指定した時間にいないんですか:anger:',
  'よくわからんが、まぁ動いてるからヨシ！', '正月もGWもお盆も普通に働いていた奴らだ。面構えが違う。'];

client.on('interactionCreate', interaction => {
  console.debug(`isApplicationCommand : ${interaction.isApplicationCommand()}, isAutocomplete : ${interaction.isAutocomplete()},` +
    ` isButton : ${interaction.isButton()}, isCommand: ${interaction.isCommand()}, isContextMenu: ${interaction.isContextMenu()},` +
    ` isMessageComponent(): ${interaction.isMessageComponent()}, isMessageContextMenu(): ${interaction.isMessageContextMenu()},` +
    ` isSelectMenu(): ${interaction.isSelectMenu()}, isUserContextMenu(): ${interaction.isUserContextMenu()}`);
  if (!interaction.isCommand()) {
    // コマンドでない
    return;
  }
  // インタラクション(スラッシュコマンド)受信

  const promises = [];

  if (interaction.commandName === 'ping') {
    const payload = interaction.options.getString('payload', false);
    // fetchReply プロパティはthenに返信メッセージを渡すフラグ
    var promise = interaction.reply({ content: payload === null ? `Pong! ${interaction.member.displayName}` : `Pong! ${payload}` });
    // followUp() は reply() をawaitしてから送信しないと機能しない、らしい
    // then()の中で呼び出すのはあかんのか？
    // いけるっぽい
    if (interaction.guildId === kakuninyou_test_guild_id) {
      promise = promise.then(() => interaction.followUp('うんちー！'));
    }
    promises.push(promise);
    // https://discord.js.org/#/docs/main/stable/class/CommandInteraction?scrollTo=followUp
    // interaction.followUp
    // interaction.channel.send();
  }
  if (interaction.commandName === 'nyanpass') {
    promises.push(interaction.reply('まだ実装してないのん……'));
    promises.push(interaction.client.users.cache.get('310413442760572929').send('にゃんぱすー'));
  }
  if (interaction.commandName === 'neko') {
    const list_of_candidate_cats = [];
    list_of_candidate_cats.splice(list_of_candidate_cats.length, 0, ...INITIAL_CAT_LIST);
    if (nextFloat() < 0.000001) {
      list_of_candidate_cats.push(Buffer.from('44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44Gb', 'base64').toString());
    }
    if (nextFloat() < 0.001) {
      list_of_candidate_cats.push('ねこですよろしくおねがいします');
    }
    if (nextFloat() < 0.25) {
      list_of_candidate_cats.push('(\\*´ω`\\*)にゃ～ん❤');
    }
    GENBA_NEKO.reduce((candiCatsList, candiCat, i, a) => { if (nextFloat() < 0.05) { candiCatsList.push(candiCat); } return candiCatsList; }, list_of_candidate_cats);
    const CAT_WORK_LIST_LENGTH = list_of_candidate_cats.length;
    const chosen_cat = list_of_candidate_cats[nextInt(CAT_WORK_LIST_LENGTH)];
    promises.push(interaction.reply(chosen_cat));
  }
  return Promise.allSettled(promises);
});

const YOUBI = ['日', '月', '火', '水', '木', '金', '土'];
const SEX_PATTERN = /SEックス/i;
const MINES = process.env.MINES.split(',');
const MINE_ROLE_ID = '844886159984558121';

client.on('messageCreate', msg => {
  if (msg.author.bot) return; //BOTのメッセージには反応しない
  if (msg.channel instanceof TextChannel) {
    // console.debug('%s(%s) : %s', msg.member.displayName, msg.channel.name, msg.content);
  }
  if (msg.channel instanceof ThreadChannel) {
    console.debug('%s(%s) : %s', msg.member.displayName, msg.channel.name, msg.content);
  }
  if (msg.channel instanceof DMChannel) {
    console.debug('%s(DMChannel), %s', msg.author.username, msg.content);
  }

  const promises = [];

  if (msg.content === '#ping') {
    promises.push(msg.reply('Pong?'));
  }
  if (msg.content.startsWith('!test') || msg.content.includes('console.print')) {
    console.info('%s', msg.content);
  }
  if (msg.guildId === kakuninyou_test_guild_id && msg.content.startsWith('!pumpkin')) {
    // 反省を促す
    promises.push(msg.reply('<:hansei:940458171309383710>'));
  }
  if (msg.guildId === kakuninyou_test_guild_id && msg.content.includes('<:hansei:940458171309383710>')) {
    // 反省を促す
    promises.push(msg.reply('||https://www.nicovideo.jp/watch/sm38736861||'));
  }
  // FIXME: 絵文字のZをソースコードに含めるのってあんまりやりたくないよね、でも\u{}形式を使いたくない……
  if (msg.content.includes('🇿')) {
    promises.push(msg.reply('🇿 includes!'));
  }
  MINES.reduce((promises, mine, i, a) => {
    if (msg.content.includes(mine)) {
      promises.push(msg.channel.send('https://tenor.com/view/radiation-atomic-bomb-bomb-boom-nuclear-bomb-gif-13364178'));
      if (msg.guildId === tamokuteki_toire_guild_id && !msg.member.roles.cache.has(MINE_ROLE_ID)) {
        // 便器民かつ地雷ロールを割り当てられていない
        promises.push(msg.member.roles.add(msg.guild.roles.cache.get(MINE_ROLE_ID)));
      }
      // p.push(msg.client.users.cache.get('310413442760572929').send(`${msg.channel.name}(${msg.guild.name}) で ${msg.author.username} さんが地雷を踏みました。`));
    }
    return promises;
  }, promises);
  if (SEX_PATTERN.test(msg.content)) {
    promises.push(msg.reply('やめないか！'));
  }
  // やったぜ。 : o
  // やったわ。 : o
  // やりましたわ。 : o
  // やりましたぜ。 : x
  if (msg.content === 'やったぜ。' || msg.content === 'やりましたわ。' || msg.content === 'やったわ。') {
    // https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97#JST%20%E3%81%8C%E9%81%B8%E6%8A%9E%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%E3%83%9E%E3%82%B7%E3%83%B3%E3%81%AE%E5%A0%B4%E5%90%88
    // https://web.archive.org/web/20211114034218/https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97
    var now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    promises.push(msg.channel.send(`投稿者：${msg.member.displayName} （${now.getMonth() + 1}月${now.getDate()}日（${YOUBI[now.getDay()]}）` +
      `${now.getHours().toString().padStart(2, '0')}時${now.getMinutes().toString().padStart(2, '0')}分${now.getSeconds().toString().padStart(2, '0')}秒）`));
  }
  return Promise.allSettled(promises);
});

// process.env.DISCORD_TOKEN が設定されている場合、client.tokenはclientをインスタンス化したときにデフォルトで設定される。
// https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=login
client.login();
