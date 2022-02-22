
/*
  やりたいこと逆引き集
  https://scrapbox.io/discordjs-japan/%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E3%81%93%E3%81%A8%E9%80%86%E5%BC%95%E3%81%8D%E9%9B%86
*/
const { Client, Intents, TextChannel, DMChannel, ThreadChannel } = require('discord.js');
const cron = require('node-cron');
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
client.on('channelCreate', async channel => { });
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
  console.log('msg.author : %s', message.author !== null ? message.author.username : 'author is null');
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
}];

const test_server_general_id = '879315010218774531';
const tamokuteki_toire_text_channel_id = '796357249743585290';
const syoki_spawn_text_channel_id = '572151278428225537';
const signal = now => {
  const list = [tamokuteki_toire_text_channel_id, syoki_spawn_text_channel_id];
  // やっぱり時代はリスト処理なんかねえ？
  /* create table SIGNALING_CHANNEL_ID(CHANNEL_ID varchar(24), GUILD_ID varchar(24), DESCRIPTION text,primary key(ID)); */
  var prefix = '真夜中';
  var date = now.getDate();
  var month = now.getMonth();
  var day = now.getDay();
  if (date == 1) {
    prefix = (date + 1) + '月';
  } else if (date == 20 && month == 10) {
    prefix = '20, november';
  } else if (day == 0) {
    prefix = '月曜日';
  }
  var body = prefix + 'だよハルト' + 'オ'.repeat(40 + Math.floor(Math.random() * 60));
  new Promise.allSettled(list.map((v, i, a)=>client.channels.cache.get(v)).flatMap((v, i, a) => typeof v.send == 'function' ? [v.send(body)] : []));
};

client.on('ready', async client => {
  // スラッシュコマンドをギルドに登録
  await client.application.commands.set(data, '879315010218774528');
  console.log(` ${client.user.username}(${client.user}, ${client.user.tag}) でログインしています。`);
  // 地雷起動時セットアップ
  client.user.setActivity(MINES.length + '個の地雷除去', { type: 'COMPETING' });
  // 時報セットアップ
  cron.schedule('0 0 0 * * *', signal, { timezone: 'Asia/Tokyo' });
});

client.on('interactionCreate', async interaction => {
  console.debug(`isApplicationCommand : ${interaction.isApplicationCommand()}, isAutocomplete : ${interaction.isAutocomplete()},` +
    ` isButton : ${interaction.isButton()}, isCommand: ${interaction.isCommand()}, isContextMenu: ${interaction.isContextMenu()},` +
    ` isMessageComponent(): ${interaction.isMessageComponent()}, isMessageContextMenu(): ${interaction.isMessageContextMenu()},` +
    ` isSelectMenu(): ${interaction.isSelectMenu()}, isUserContextMenu(): ${interaction.isUserContextMenu()}`);
  if (!interaction.isCommand()) {
    // コマンドでない
    return;
  }
  // インタラクション(スラッシュコマンド)受信

  if (interaction.commandName === 'ping') {
    const payload = interaction.options.getString('payload', false);
    // fetchReply プロパティはthenに返信メッセージを渡すフラグ
    await interaction.reply({ content: payload === null ? `Pong! ${interaction.member.displayName}` : `Pong! ${payload}` });
    await interaction.followUp('');
    // https://discord.js.org/#/docs/main/stable/class/CommandInteraction?scrollTo=followUp
    // interaction.followUp
    // interaction.channel.send();
  }
  if (interaction.commandName === 'nyanpass') {
    await interaction.reply('まだ実装してないのん……');
    await interaction.client.users.cache.get('310413442760572929').send('にゃんぱすー');
  }
});

const YOUBI = ['月', '火', '水', '木', '金', '土', '日'];
const SEX_PATTERN = /SEックス/i;
const MINES = process.env.MINES.split(',');

client.on('messageCreate', async msg => {
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

  if (msg.content === '#ping') {
    await msg.reply('Pong?');
  }
  if (msg.content.startsWith('!test') || msg.content.includes('console.print')) {
    console.info('%s', msg.content);
  }
  if (msg.guildId === '879315010218774528' && msg.content.startsWith('!pumpkin')) {
    // 反省を促す
    await msg.reply('<:hansei:940458171309383710>');
  }
  if (msg.guildId === '879315010218774528' && msg.content.includes('<:hansei:940458171309383710>')) {
    // 反省を促す
    await msg.reply('||https://www.nicovideo.jp/watch/sm38736861||');
  }
  if (msg.content.includes(':regional_indicator_z:')) {
    await msg.reply('z includes! 1');
  }
  if (msg.content.includes('regional_indicator_z')) {
    await msg.reply('z includes! 2');
  }
  // 絵文字のZ
  if (msg.content.includes('🇿')) {
    await msg.reply('🇿 includes! 3');
  }
  // エスケープシーケンス
  if (msg.content.includes('\u{1f1ff}')) {
    await msg.reply('\u{1f1ff} includes! 4');
  }
  await Promise.allSettled(MINES.flatMap((mine, index, array) => {
    var promises = [];
    if (msg.content.includes(mine)) {
      promises.push(msg.channel.send('https://tenor.com/view/radiation-atomic-bomb-bomb-boom-nuclear-bomb-gif-13364178'));
      if (msg.guildId === '795353457996595200') {
        mine_role = msg.guild.roles.cache.get('844886159984558121');
        promises.push(msg.member.roles.add(mine_role));
      }
      // promises.push(msg.client.users.cache.get('310413442760572929').send(`${msg.channel.name}(${msg.guild.name}) で ${msg.author.username} さんが地雷を踏みました。`));
    }
    return promises;
  })).catch(e => console.log('%s', e));
  if (SEX_PATTERN.test(msg.content)) {
    await msg.reply('やめないか！');
  }
  // やったぜ。 : o
  // やったわ。 : o
  // やりましたわ。 : o
  // やりましたぜ。 : x
  if (msg.content === 'やったぜ。' || msg.content === 'やりましたわ。' || msg.content === 'やったわ。') {
    // https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97#JST%20%E3%81%8C%E9%81%B8%E6%8A%9E%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%E3%83%9E%E3%82%B7%E3%83%B3%E3%81%AE%E5%A0%B4%E5%90%88
    // https://web.archive.org/web/20211114034218/https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97
    var now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    await msg.channel.send(`投稿者：${msg.member.displayName} （${now.getMonth() + 1}月${now.getDate()}日（${YOUBI[now.getDay()]}）` +
      `${now.getHours().toString().padStart(2, '0')}時${now.getMinutes().toString().padStart(2, '0')}分${now.getSeconds().toString().padStart(2, '0')}秒）`);
  }
});

// process.env.DISCORD_TOKEN が設定されている場合、client.tokenはclientをインスタンス化したときにデフォルトで設定される。
// https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=login
client.login();
