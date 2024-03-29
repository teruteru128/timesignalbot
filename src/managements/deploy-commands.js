/* */
/*
https://discordjs.guide/creating-your-bot/creating-commands.html#registering-commands
https://discordjs.guide/interactions/slash-commands.html#guild-commands
 */
const {
  ChannelType,
  PermissionFlagsBits,
  REST,
  Routes,
  SlashCommandBuilder,
} = require('discord.js');
const { pino } = require('pino');

// スラッシュコマンド登録用データ
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('The message returned with the pong.')
    .addStringOption(
      (option) => option.setName('payload')
        .setDescription('The message returned with the pong.')
        .setRequired(false),
    ),
  new SlashCommandBuilder()
    .setName('nyanpass')
    .setDescription('get nyanpass count from nyanpass.com'),
  new SlashCommandBuilder()
    .setName('neko')
    .setDescription('show cats face'),
  new SlashCommandBuilder()
    .setName('omikuji')
    .setDescription('Draw a fortune')
    .setDescriptionLocalizations({
      ja: 'おみくじを引きます',
    }),
  new SlashCommandBuilder()
    .setName('signal')
    .setDescription('managements time signals')
    /* eslint no-bitwise: ["error", {"allow":["|"]}] */
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator
      | PermissionFlagsBits.ManageChannels
      | PermissionFlagsBits.ManageThreads)
    .addSubcommand((sub) => sub.setName('register')
      .setDescription('register to timesignal')
      .addChannelOption((opt) => opt.setName('channel')
        .setDescription('The channel to send time signal')
        .addChannelTypes(ChannelType.GuildText)))
    .addSubcommand((sub) => sub.setName('unregister')
      .setDescription('unregister from timesignal')
      .addChannelOption((opt) => opt.setName('channel')
        .setDescription('The channel to send time signal')
        .addChannelTypes(ChannelType.GuildText)))
    .addSubcommand((sub) => sub.setName('list')
      .setDescription('list channels to send time signal')),
  new SlashCommandBuilder()
    .setName('mine')
    .setDescription('It\'s mine!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((sub) => sub.setName('register')
      .setDescription('register to timesignal')
      .addStringOption((opt) => opt.setName('channel')
        .setDescription('The channel to send time signal')))
    .addSubcommand((sub) => sub.setName('unregister')
      .setDescription('unregister from timesignal')
      .addStringOption((opt) => opt.setName('channel')
        .setDescription('The channel to send time signal')))
    .addSubcommand((sub) => sub.setName('list')
      .setDescription('list channels to send time signal')),
  new SlashCommandBuilder().setName('shout').setDescription('Shout in this channel')
    .addStringOption((opt) => opt.setName('voice').setDescription('The content of shout')
      .setRequired(true)),
]
  .map((command) => command.toJSON());
const constants = require('../constants');
// list
const SIGNAL_GUILD_ID_LIST = [
  constants.GUILDS.KAKUNINYOU_TEST_GUILD_ID,
  constants.GUILDS.TAMOKUTEKI_TOIRE_GUILD_ID,
  constants.GUILDS.FARM_SERVER_GUILD_ID,
  constants.GUILDS.FARM_PUBLIC_SERVER_GUILD_ID,
];

const clientId = '749274949348229150';
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// スラッシュコマンドをギルドに登録
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
  try {
    logger.info('Started refreshing application (/) commands.');

    SIGNAL_GUILD_ID_LIST.forEach(async (guild) => {
      await rest.put(
        Routes.applicationGuildCommands(clientId, guild),
        { body: commands },
      ).catch((error) => logger.error(error));
    });

    logger.info('Successfully reloaded application (/) commands.');
  } catch (error) {
    logger.error(error);
  }
})();

/*
(async () => {
  const promises = [];
  SIGNAL_GUILD_ID_LIST.reduce((p, guildId) => {
    p.push(rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    ));
    return p;
  }, promises);
  try {
    await Promise.allSettled(promises);
  } catch (error) {
    logger.error(error);
  }
})();
 */
