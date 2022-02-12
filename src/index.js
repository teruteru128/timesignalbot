
const { Client, Intents } = require('discord.js');
// const { SlashCommandBuilder } = require('@discordjs/builders');
const client = new Client({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING
  ]
});

/* 
const data1 = new SlashCommandBuilder().setName().setDescription()
  .addStringOption(opt => opt.setName('').setDescription().setRequired(true));
 */

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

client.on('apiRequest', async request => { });
client.on('apiResponse', async (request, response) => { });
client.on('channelCreate', async channel => { });
client.on('channelDelete', async channel => { });
client.on('channelPinsUpdate', async (channel, time) => { });
client.on('channelUpdate', async (oldChannel, newChannel) => { });
client.on('debug', async debug => { });
client.on('emojiCreate', async emoji => { });
client.on('emojiDelete', async emoji => { });
client.on('emojiUpdate', async (oldEmoji, newEmoji) => { });
client.on('error', async error => { });
client.on('guildBanAdd', async ban => { });
client.on('guildBanRemove', async ban => { });
client.on('guildCreate', async guild => { });
client.on('guildDelete', async guild => { });
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
client.on('invalidated', async () => { });
client.on('invalidRequestWarning', async invalidRequestWarningData => { });
client.on('inviteCreate', async invite => { });
client.on('inviteDelete', async invite => { });
client.on('messageDelete', async message => { console.log(`削除されました : ${message.content}`); });
client.on('messageDeleteBulk', async messages => { });
client.on('messageReactionAdd', async (messageReaction, user) => { });
client.on('messageReactionRemove', async (messageReaction, user) => { });
client.on('messageReactionRemoveAll', async (message, reactions) => { });
client.on('messageReactionRemoveEmoji', async reaction => { });
client.on('messageUpdate', async (oldMessage, newMessage) => { });
client.on('presenceUpdate', async (oldPresence, newPresence) => { });
client.on('rateLimit', async rateLimitData => { });
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
client.on('warn', async info => { });
client.on('webhookUpdate', async channel => { });

client.on('ready', async client => {
  // スラッシュコマンドをギルドに登録
  await client.application.commands.set(data, '879315010218774528');
  console.log(`${client.user.tag} でログインしています。`);
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

client.on('messageCreate', async msg => {
  if (msg.author.bot) return; //BOTのメッセージには反応しない

  if (msg.content === '#ping') {
    await msg.channel.send('Pong?');
  }
  if (msg.content.startsWith('!test')) {
    console.info(msg.content);
  }
  if (msg.guildId === '879315010218774528' && msg.content.startsWith('!pumpkin')) {
    // 反省を促す
    msg.reply('<:hansei:940458171309383710>');
  }
  if (msg.guildId === '879315010218774528' && msg.content.includes('<:hansei:940458171309383710>')) {
    // 反省を促す
    msg.reply('||https://www.nicovideo.jp/watch/sm38736861||');
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
    await msg.channel.send(`投稿者：${msg.member.nickname} （${now.getMonth() + 1}月${now.getDate()}日（${YOUBI[now.getDay()]}）` +
      `${now.getHours().toString().padStart(2, '0')}時${now.getMinutes().toString().padStart(2, '0')}分${now.getSeconds().toString().padStart(2, '0')}秒）`);
  }
});

client.on('guildMemberAdd', c => {
  console.log(`guildMemberAdd : ${c}`);
});

client.on('guildMemberAvailable', c => {
  console.log(`guildMemberAvailable : ${c}`);
});

// process.env.DISCORD_TOKEN が設定されている場合、client.tokenはclientをインスタンス化したときにデフォルトで設定される。
// https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=login
client.login();
