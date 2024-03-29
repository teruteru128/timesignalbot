/*
  やりたいこと逆引き集
  https://scrapbox.io/discordjs-japan/%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E3%81%93%E3%81%A8%E9%80%86%E5%BC%95%E3%81%8D%E9%9B%86
*/
const {
  ActivityType,
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  Partials,
} = require('discord.js');
const cron = require('node-cron');
const { pino } = require('pino');

const { selectCat } = require('./modules/catchooser');
const { omikuji } = require('./modules/omikuji');
const random = require('./modules/random');
const constants = require('./constants');

const client = new Client({
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
  ],
});
/*
new Promise(async (resolve, reject) => {
  // https://node-postgres.com/
  const client = await pool.connect();
  try {
    let result = await client.query('SELECT $1::text as message', ['Hello world!']);
    logger.info(result.rows[0].message); // Hello world!
    result = await client.query('SELECT $1::text', ['Hello world!']);
    logger.info(result.rows[0]); // Hello world!
    result = await client.query('SELECT $1', ['Hello world!']);
    logger.info(result.rows[0]); // Hello world!
    resolve();
  } catch (error) {
    logger.error(error);
    reject(error);
  } finally {
    client.release();
  }
}).catch(err => logger.error('pg error : %s', err));
*/
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

/*
const data1 = new SlashCommandBuilder().setName().setDescription()
  .addStringOption(opt => opt.setName('').setDescription().setRequired(true));
 */

client.on(Events.Error, async (error) => logger.error('error : %s', error));
client.on(Events.Warn, async (info) => logger.warn('warn : %s', info));

const MINES = new RegExp(process.env.MINES, 'giu');

const MINE_STATUS_TXT = `${MINES.source.split('|').length}個の地雷`;
client.on(Events.ClientReady, (c) => {
  logger.info(` ${c.user.username}(${c.user}, ${c.user.tag}) でログインしています。`);
  c.user.setActivity(MINE_STATUS_TXT, { type: ActivityType.Watching });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    // インタラクション(スラッシュコマンド)受信
    logger.debug('This is chat input command.');

    if (interaction.commandName === 'ping') {
      const payload = interaction.options.getString('payload', false);
      // fetchReply プロパティはthenに返信メッセージを渡すフラグ
      // followUp() は reply() をawaitしてから送信しないと機能しない、らしい
      // then()の中で呼び出すのはあかんのか？
      // いけるっぽい
      await interaction.reply({ content: 'Pong!' });
      if (interaction.guildId === constants.GUILDS.KAKUNINYOU_TEST_GUILD_ID && payload !== null) {
        await interaction.followUp(`${payload}`);
      }
      // https://discord.js.org/#/docs/main/stable/class/CommandInteraction?scrollTo=followUp
      // interaction.followUp
      // interaction.channel.send();
    } else if (interaction.commandName === 'nyanpass') {
      await interaction.reply('にゃんぱすー！');
      await interaction.client.users.fetch('310413442760572929')
        .then((user) => user.send(`${interaction.user.username} さんが ${interaction.channel.name}(${interaction.inGuild() ? interaction.channel.guild.name : 'DM'}) でにゃんぱすーしたのん！`));
    } else if (interaction.commandName === 'neko') {
      const CHOSEN_CAT = selectCat();
      await interaction.reply(CHOSEN_CAT);
    } else if (interaction.commandName === 'signal') {
      if (interaction.options.getSubcommand() === 'register') {
        await interaction.reply({ content: 'Register pong!', ephemeral: true });
      } else if (interaction.options.getSubcommand() === 'unregister') {
        await interaction.reply({ content: 'Unregister pong!', ephemeral: true });
      } else if (interaction.options.getSubcommand() === 'list') {
        await interaction.reply({ content: 'List pong!', ephemeral: true });
      }
    } else if (interaction.commandName === 'mine') {
      if (interaction.options.getSubcommand() === 'register') {
        await interaction.reply({ content: 'Register pong!', ephemeral: true });
      } else if (interaction.options.getSubcommand() === 'unregister') {
        await interaction.reply({ content: 'Unregister pong!', ephemeral: true });
      } else if (interaction.options.getSubcommand() === 'list') {
        await interaction.reply({ content: 'List pong!', ephemeral: true });
      }
    } else if (interaction.commandName === 'omikuji') {
      if (interaction.inGuild()
        && interaction.guildId === constants.GUILDS.FARM_PUBLIC_SERVER_GUILD_ID
        && interaction.channelId !== constants.CHANNELS.FARM_PUBLIC_SERVER_OMIKUJI_CHANNEL_ID) {
        await interaction.reply({
          content: `${interaction.user}の運勢は……\n${omikuji()}`,
          ephemeral: true,
        });
      } else {
        await interaction.reply(`${interaction.user}の運勢は……\n${omikuji()}`);
      }
    } else if (interaction.commandName === 'pumpkin') {
      // 反省を促す
      await interaction.reply({ content: '<:hansei:940458171309383710>', ephemeral: true });
    } else if (interaction.commandName === 'shout') {
      const voice = interaction.options.getString('voice', true);
      if (voice !== null && voice.length > 0) {
        await interaction.channel.send(voice);
        await interaction.reply({ content: 'Done.', ephemeral: true });
      } else if (voice === null) {
        await interaction.reply({ content: '空のメッセージを送信することはできません。引数voiceを使ってメッセージを指定してください', ephemeral: true });
      } else {
        await interaction.reply({ content: '空のメッセージを送信することはできません(voice\'s length is zero)', ephemeral: true });
      }
    }
  } else if (interaction.isContextMenuCommand()) {
    logger.debug('This is context menu command.');
  } else if (interaction.isMessageContextMenuCommand()) {
    logger.debug('This is message context menu command.');
  } else if (interaction.isUserContextMenuCommand()) {
    logger.debug('This is user context menu command.');
  } else if (interaction.isAutocomplete()) {
    logger.debug('This is autocomplete.');
  }
});

const YOUBI = ['日', '月', '火', '水', '木', '金', '土'];
const YATTAZE_PATTERN = /^や(ったぜ|りましたわ|ったわ)。$/g;
const SEX_PATTERN = /(SE|ＳＥ|[せセｾ])([XＸ]|[ッっｯ]([くクｸ][すスｽ]|久))/i;
const MINE_ROLE_ID = '844886159984558121';
const EXPLOSION_GIF_URL = 'https://tenor.com/view/radiation-atomic-bomb-bomb-boom-nuclear-bomb-gif-13364178';
const EXPLOSION_GIF_URL_2 = 'https://tenor.com/view/house-explosion-explode-boom-kaboom-gif-19506150';

client.on(Events.MessageCreate, async (msg) => {
  function sendMessage(message) {
    return (user) => user.send(`${message.author.username}さんが${message.channel}で地雷を踏みました。 ${message.url}`);
  }
  // 他のBOTのメッセージには反応しない
  if (msg.author.bot) {
    if (!msg.author.equals(client.user)) {
      if (msg.content.includes(EXPLOSION_GIF_URL)) {
        // TODO: use server/bot administrators
        await msg.client.users.fetch('310413442760572929')
          .then(sendMessage(msg), logger.error);
      }
    }
  } else {
    if (msg.inGuild() && msg.guildId === constants.GUILDS.TAMOKUTEKI_TOIRE_GUILD_ID) {
      if (random.nextFloat() < 0.00001) {
        await msg.reply('ｽｲ₍₍(ง˘ω˘)ว⁾⁾ｽｲ');
      }
      if (random.nextInt(16777216) < 17) {
        await msg.reply('<a:capoo_prpr:1043858275575267438>');
      }
    }

    // https://tenor.com/view/house-explosion-explode-boom-kaboom-gif-19506150
    if (/ここで自爆です/.test(msg.content)) {
      logger.info('bomb!');
      await msg.channel.send(EXPLOSION_GIF_URL_2);
    }
    if (MINES.test(msg.content)) {
      await msg.channel.send('https://tenor.com/view/radiation-atomic-bomb-bomb-boom-nuclear-bomb-gif-13364178');
      // 多目的トイレサーバーに参加している
      // サーバーの外での発言でも地雷ロール割当は無慈悲すぎるからやらない
      if (msg.inGuild() && msg.guildId === constants.GUILDS.TAMOKUTEKI_TOIRE_GUILD_ID
        && !msg.member.roles.cache.has(MINE_ROLE_ID)) {
        // 便器民かつ地雷ロールを割り当てられていない
        // await msg.member.roles.add(msg.guild.roles.cache.get(MINE_ROLE_ID));
        // await msg.guild.roles.fetch(MINE_ROLE_ID).then((role) => msg.member.roles.add(role));
        await msg.member.roles.add(MINE_ROLE_ID);
      }
      await msg.client.users.fetch('310413442760572929')
        .then(sendMessage(msg), logger.error);
    }
    if (SEX_PATTERN.test(msg.content)) {
      await msg.reply(random.nextInt(100) < 2 ? 'やらないか！' : 'やめないか！');
    }
    // やったぜ。 : o
    // やったわ。 : o
    // やりましたわ。 : o
    // やりましたぜ。 : x
    if (YATTAZE_PATTERN.test(msg.content)) {
      // https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97#JST%20%E3%81%8C%E9%81%B8%E6%8A%9E%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%E3%83%9E%E3%82%B7%E3%83%B3%E3%81%AE%E5%A0%B4%E5%90%88
      // https://web.archive.org/web/20211114034218/https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97
      const now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
      await msg.channel.send(`投稿者：${msg.member.displayName} （${now.getMonth() + 1}月${now.getDate()}日（${YOUBI[now.getDay()]}）${now.getHours().toString().padStart(2, '0')}時${now.getMinutes().toString().padStart(2, '0')}分${now.getSeconds().toString().padStart(2, '0')}秒）`);
    }
  }
});

const SIGNAL_SCHEDULES = [];
const timezoneconfig = { timezone: 'Asia/Tokyo' };
// 時報セットアップ
SIGNAL_SCHEDULES.push(cron.schedule('0 */5 * * * *', () => {
  const a = random.nextInt(16777216);
  if (a < 167772) {
    client.user.setActivity('You', { type: ActivityType.Watching });
  } else {
    client.user.setActivity(MINE_STATUS_TXT, { type: ActivityType.Watching });
  }
}, timezoneconfig));
// cron.schedule('22 22 22 22 2 *', signal2, timezoneconfig);
// crypto.getCiphers().forEach((cipher, i, a) => logger.info(cipher));
function yattaze() {
  client.channels.fetch(constants.CHANNELS.TAMOKUTEKI_TOIRE_TEXT_CHANNEL_ID).then((channel) => {
    if (channel.type === ChannelType.GuildText) {
      return channel.send('やったぜ。\nhttps://www.nicovideo.jp/watch/sm9248590')
        .then((reason) => reason, (reason) => logger.error(reason));
    }
    return Promise.resolve();
  });
}
// 8月16日（水）07時14分22秒
// SIGNAL_SCHEDULES.push(cron.schedule('22 14 7 16 8 3', yattaze, timezoneconfig));
SIGNAL_SCHEDULES.push(cron.schedule('22 14 7 16 8 *', yattaze, timezoneconfig));
if (global.gc) {
  SIGNAL_SCHEDULES.push(cron.schedule('*/5 * * * *', async () => { logger.debug('do auto garbage collect'); global.gc(); }, timezoneconfig));
  logger.debug('auto garbage collect scheduled');
} else {
  logger.warning('定期GCが有効化されませんでした。');
}
logger.debug('Done client ready event');

// process.env.DISCORD_TOKEN が設定されている場合、client.tokenはclientをインスタンス化したときにデフォルトで設定される。
// https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=login
client.login();
