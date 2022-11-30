
/*
  やりたいこと逆引き集
  https://scrapbox.io/discordjs-japan/%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E3%81%93%E3%81%A8%E9%80%86%E5%BC%95%E3%81%8D%E9%9B%86
*/
const {
  ActivityType,
  ChannelType,
  Client,
  GatewayIntentBits,
  InteractionType,
  TextChannel,
  DMChannel,
  ThreadChannel,
  Partials } = require('discord.js');
const cron = require('node-cron');
const { buildSignal } = require('./signalbuilder');
const { choiceCat } = require('./catchooser');
const random = require('./random');
const client = new Client({
  partials: [Partials.Channel,
  Partials.GuildMember,
  Partials.GuildScheduledEvent,
  Partials.Message,
  Partials.Reaction,
  Partials.ThreadMember,
  Partials.User],
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.MessageContent
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
/*
new Promise(async (resolve, reject) => {
  // https://node-postgres.com/
  const client = await pool.connect();
  try {
    let result = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(result.rows[0].message); // Hello world!
    result = await client.query('SELECT $1::text', ['Hello world!']);
    console.log(result.rows[0]); // Hello world!
    result = await client.query('SELECT $1', ['Hello world!']);
    console.log(result.rows[0]); // Hello world!
    resolve();
  } catch (error) {
    console.error(error);
    reject(error);
  } finally {
    client.release();
  }
}).catch(err => console.error('pg error : %s', err));
*/

/* 
const data1 = new SlashCommandBuilder().setName().setDescription()
  .addStringOption(opt => opt.setName('').setDescription().setRequired(true));
 */

// 全てのイベントにリスナーを設定する
client.on('apiRequest', async request => { });
client.on('apiResponse', async (request, response) => { });
client.on('channelCreate', async channel => { console.log('channelCreate : %s, %sが作成されました', channel.name, channel.guild !== null && channel.guild.name !== null ? channel.guild.name : '\'?\''); });
client.on('channelDelete', async channel => { console.log('channelCreate : %s, %sが削除されました', channel.name, channel.guild !== null && channel.guild.name !== null ? channel.guild.name : '\'?\''); });
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
client.on('inviteCreate', async invite => { console.log('inviceCreate : %s in %s', invite, invite.guild.name); });
client.on('inviteDelete', async invite => { console.log('inviteDelete : %s', invite); });
client.on('messageDelete', async message => {
  // 起動時より前に作成されたメッセージが削除されると、authorがnullになる？=>本当らしい
  let logmsg = '';
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
client.on('threadCreate', async thread => console.log('スレッド\'%s\'が\'%s\'で作成されました。', thread.name, thread.guild.name));
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

const KAKUNINYOU_TEST_GUILD_ID = '879315010218774528';
const TAMOKUTEKI_TOIRE_GUILD_ID = '795353457996595200';
const FARM_SERVER_GUILD_ID = '572150608283566090';

const TEST_SERVER_GENERAL_ID = '879315010218774531';
const TAMOKUTEKI_TOIRE_TEXT_CHANNEL_ID = '796357249743585290';
const SYOKI_SPAWN_TEXT_CHANNEL_ID = '572151278428225537';
const SIGNALING_TEXT_CHANNEL_LIST = [TAMOKUTEKI_TOIRE_TEXT_CHANNEL_ID, SYOKI_SPAWN_TEXT_CHANNEL_ID];
const signal = now => {
  // やっぱり時代はリスト処理なんかねえ？
  /* create table SIGNALING_CHANNEL_ID(CHANNEL_ID varchar(24), GUILD_ID varchar(24), DESCRIPTION text,primary key(ID)); */
  // build signal message
  let body = buildSignal(now);
  new Promise.allSettled(SIGNALING_TEXT_CHANNEL_LIST
    .map((channelId, i, a) => client.channels.cache.get(channelId))
    .reduce((promises, channel, i, a) => {
      if (channel.type == ChannelType.GuildText) {
        promises.push(channel.send(body));
      }
      return promises;
    }, []));
};

const yattaze = now => {
  let channel =
    client.channels.cache.get(TAMOKUTEKI_TOIRE_TEXT_CHANNEL_ID);
  if (channel.type == ChannelType.GuildText)
    channel.send('やったぜ。\nhttps://www.nicovideo.jp/watch/sm9248590').then(reason => reason, reason => console.error(reason));
};

const SIGNAL_SCHEDULES = [];
client.on('ready', client => {
  const promises = [];
  console.log(` ${client.user.username}(${client.user}, ${client.user.tag}) でログインしています。`);
  /*
  // 地雷起動時セットアップ
  new Promise(async (resolve, reject) => {
    const client = await pool.connect();
    try {
      let result = await client.query('SELECT mine from mines;');
      result.rows.reduce((mines, mine, i, a) => { mines.push(mine); return mines; }, MINES);
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    } finally {
      client.release();
    }
  });*/
  client.user.setActivity(MINES.source.split('\|').length + '個の地雷除去', { type: ActivityType.Competing });
  // 時報セットアップ
  SIGNAL_SCHEDULES.push(cron.schedule('0 0 0 * * *', signal, { timezone: 'Asia/Tokyo' }));
  // cron.schedule('22 22 22 22 2 *', signal2, { timezone: 'Asia/Tokyo' });
  // crypto.getCiphers().forEach((cipher, i, a) => console.log(cipher));
  // 8月16日（水）07時14分22秒
  SIGNAL_SCHEDULES.push(cron.schedule('22 14 7 16 8 3', yattaze, { timezone: 'Asia/Tokyo' }));
  return Promise.allSettled(promises);
});

client.on('interactionCreate', interaction => {
  console.debug(`isApplicationCommand : ${interaction.type == InteractionType.ApplicationCommand}, isAutocomplete : ${interaction.type == InteractionType.ApplicationCommandAutocomplete},` +
    ` isButton : ${interaction.isButton()}, isContextMenu: ${interaction.isContextMenuCommand()},` +
    ` isMessageComponent(): ${interaction.type == InteractionType.MessageComponent}, isMessageContextMenu(): ${interaction.isMessageContextMenuCommand()},` +
    ` isSelectMenu(): ${interaction.isSelectMenu()}, isUserContextMenu(): ${interaction.isUserContextMenuCommand()}`);
  if (!interaction.isChatInputCommand()) {
    // コマンドでない
    return;
  }
  // インタラクション(スラッシュコマンド)受信

  const { commandName } = interaction;
  const promises = [];

  if (commandName === 'ping') {
    const payload = interaction.options.getString('payload', false);
    // fetchReply プロパティはthenに返信メッセージを渡すフラグ
    // followUp() は reply() をawaitしてから送信しないと機能しない、らしい
    // then()の中で呼び出すのはあかんのか？
    // いけるっぽい
    let pongPromise = interaction.reply({ content: 'Pong!', fetchReply: false }).then(msg => { if (interaction.guildId === KAKUNINYOU_TEST_GUILD_ID && payload !== null) { return Promise.resolve(interaction.followUp(`${payload}`)); } else { return Promise.resolve(); } });
    promises.push(pongPromise);
    // https://discord.js.org/#/docs/main/stable/class/CommandInteraction?scrollTo=followUp
    // interaction.followUp
    // interaction.channel.send();
  }
  if (commandName === 'nyanpass') {
    promises.push(interaction.reply('にゃんぱすー！'));
    promises.push(interaction.client.users.cache.get('310413442760572929').send(`${interaction.user.username} さんが ${interaction.channel.name}(${!(interaction.channel instanceof DMChannel) ? interaction.channel.guild.name : 'DM'}) でにゃんぱすーしたのん！`));
  }
  if (commandName === 'neko') {
    const CHOSEN_CAT = choiceCat();
    promises.push(interaction.reply(CHOSEN_CAT));
  }
  return Promise.allSettled(promises);
});

const YOUBI = ['日', '月', '火', '水', '木', '金', '土'];
//const YATTAZE_PATTERN = /^(やったぜ。|やりましたわ。|やったわ。)$/g;
const SEX_PATTERN = /(SE|ＳＥ|セ)(X|Ｘ|ッ(クス|久))/i;
const MINES = new RegExp(process.env.MINES, 'giu');
const MINE_ROLE_ID = '844886159984558121';

client.on('messageCreate', msg => {
  let author = msg.author;
  // 他のBOTのメッセージには反応しない
  if (author.bot && !author.equals(client.user)) return;
  if (msg.channel instanceof TextChannel) {
    // console.debug('%s(%s) : %s', msg.member.displayName, msg.channel.name, msg.content);
  }
  if (msg.channel instanceof ThreadChannel) {
    console.debug('%s(%s) : %s', msg.member.displayName, msg.channel.name, msg.content);
  }
  if (msg.channel instanceof DMChannel) {
    console.debug('%s(DMChannel), %s', author.username, msg.content);
  }

  const promises = [];

  if (msg.content === '#ping') {
    // reply() のあとの then() に渡される msg は返信したメッセージ
    promises.push(msg.reply('Pong?')/* .then(msg => { console.log(msg.content); return Promise.resolve(msg); }) */);
  }
  if (msg.content.startsWith('!test') || msg.content.includes('console.print')) {
    console.info('%s', msg.content);
  }
  if (msg.guildId === KAKUNINYOU_TEST_GUILD_ID && msg.content.startsWith('!pumpkin')) {
    // 反省を促す
    promises.push(msg.reply('<:hansei:940458171309383710>'));
  }
  if (msg.guildId === KAKUNINYOU_TEST_GUILD_ID && msg.content.includes('<:hansei:940458171309383710>')) {
    // 反省を促す
    promises.push(msg.reply('||https://www.nicovideo.jp/watch/sm38736861||'));
  }
  if (MINES.test(msg.content)) {
    promises.push(msg.channel.send('https://tenor.com/view/radiation-atomic-bomb-bomb-boom-nuclear-bomb-gif-13364178'));
    // 多目的トイレサーバーに参加している
    // promises.push(msg.reply(`joined : ${msg.client.guilds.cache.get(TAMOKUTEKI_TOIRE_GUILD_ID).members.cache.has(author.id)}`));
    // サーバーの外での発言でも地雷ロール割当は無慈悲すぎるからやらない
    if (msg.guildId === TAMOKUTEKI_TOIRE_GUILD_ID && !msg.member.roles.cache.has(MINE_ROLE_ID)) {
      // 便器民かつ地雷ロールを割り当てられていない
      promises.push(msg.member.roles.add(msg.guild.roles.cache.get(MINE_ROLE_ID)));
    }
    // p.push(msg.client.users.cache.get('310413442760572929').send(`${msg.channel.name}(${msg.guild.name}) で ${author.username} さんが地雷を踏みました。`));
  }
  if (SEX_PATTERN.test(msg.content)) {
    // these are utc.
    //let start = new Date('2022-10-31 15:00:00');
    //let finish = new Date('2022-11-30 15:00:00');
    let now = new Date();
    // 性の六時間
    let c1 = new Date(now.getFullYear(), 11, 24, 12);
    let c2 = new Date(now.getFullYear(), 11, 24, 18);
    if (c1.getTime() <= now.getTime() && now.getTime() < c2.getTime()) {
      let percentage = 0;
      let a = null;
      do {
        percentage = random.nextInt(1048576);
        if (percentage < 65000) {
          a = '何がクリスマスじゃあい!';
        } else if (percentage < 115000) {
          a = 'https://dic.nicovideo.jp/id/4529483';
        } else if (percentage < 170000) {
          a = 'https://www.nicovideo.jp/watch/sm975673';
        } else if (percentage < 225000) {
          a = 'https://www.nicovideo.jp/watch/sm7755174';
        } else if (percentage < 280000) {
          a = 'https://www.nicovideo.jp/watch/sm12271031';
        } else if (percentage < 335000) {
          a = 'https://www.nicovideo.jp/watch/sm12904387';
        } else if (percentage < 390000) {
          a = 'https://www.nicovideo.jp/watch/sm17071230';
        } else if (percentage < 445000) {
          a = 'https://www.nicovideo.jp/watch/sm26450318';
        } else if (percentage < 500000) {
          a = 'https://www.nicovideo.jp/watch/sm31568802';
        } else if (percentage < 555000) {
          a = 'https://www.nicovideo.jp/watch/sm34346841';
        } else if (percentage < 610000) {
          a = 'https://www.nicovideo.jp/watch/sm39120005';
        } else if (percentage < 665000) {
          a = 'https://www.nicovideo.jp/watch/so36581429';
        } else if (percentage < 730000) {
          a = 'アンアン\n　　　　　　　ｏ\n　　　　ｏ＿ /）\n　 　　 ／＜＜\n\n12月24日の午後9時から翌25日の午前3時までの6時間は\n1年間で最もセックスをする人の多い「性の6時間」です。\n\n貴方の知り合いや友人ももれなくセックスをしています。\n普段はあどけない顔して世間話してるあの娘もセックスをしています。\n貴方が片想いしているあの綺麗な女性もセックスをしています。\n貴方にもし年頃の娘さんや姉・妹がいて、いま家にいないのでしたら間違いなくセックスしてます。\n貴方と別れたあの娘も貴方がその娘にやってきたことを別の男にやられています。\n貴方の将来の恋人や結婚する相手は、いま違う男のいちもつでヒィヒィ言っています。\n貴男が憧れているあのお兄さんやオジサマ方も今宵はベッドであおおーっ!!と他の男性と一夜を共にしていることでしょう。\n\nすべてを諦めましょう。そして、ともに戦いましょう。';
        } else if (percentage < 865000) {
          a = 'やらないか！';
        } else if (percentage < 905000) {
          a = 'やめないか！';
        } else if (percentage < 960000) {
          a = '(チキンを)食べないか！';
        } else if (percentage < 1000000) {
          a = 'ここに建てた病院とSEX！';
        }
      } while (a === NULL);
      promises.push(msg.reply(a));
    } else {
      promises.push(msg.reply(random.nextInt(100) < 2 ? 'やらないか！' : 'やめないか！'));
    }
  }
  // やったぜ。 : o
  // やったわ。 : o
  // やりましたわ。 : o
  // やりましたぜ。 : x
  if (msg.content.includes('やったぜ。') || msg.content === 'やりましたわ。' || msg.content === 'やったわ。') {
    // https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97#JST%20%E3%81%8C%E9%81%B8%E6%8A%9E%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%E3%83%9E%E3%82%B7%E3%83%B3%E3%81%AE%E5%A0%B4%E5%90%88
    // https://web.archive.org/web/20211114034218/https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97
    let now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    promises.push(msg.channel.send(`投稿者：${msg.member.displayName} （${now.getMonth() + 1}月${now.getDate()}日（${YOUBI[now.getDay()]}）` +
      `${now.getHours().toString().padStart(2, '0')}時${now.getMinutes().toString().padStart(2, '0')}分${now.getSeconds().toString().padStart(2, '0')}秒）`));
  }
  return Promise.allSettled(promises);
});

// process.env.DISCORD_TOKEN が設定されている場合、client.tokenはclientをインスタンス化したときにデフォルトで設定される。
// https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=login
client.login();
