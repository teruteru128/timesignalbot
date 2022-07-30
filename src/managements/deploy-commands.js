/* */
/* 
https://discordjs.guide/creating-your-bot/creating-commands.html#registering-commands
https://discordjs.guide/interactions/slash-commands.html#guild-commands
 */
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Routes,
  SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');

// スラッシュコマンド登録用データ
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('The message returned with the pong.')
    .addStringOption(
      option => option.setName('payload')
        .setDescription('The message returned with the pong.')
        .setRequired(false)),
  new SlashCommandBuilder()
    .setName('nyanpass')
    .setDescription('get nyanpass count from nyanpass.com'),
  new SlashCommandBuilder()
    .setName('neko')
    .setDescription('show cats face'),
]
  .map(command => command.toJSON());
const KAKUNINYOU_TEST_GUILD_ID = '879315010218774528';
const TAMOKUTEKI_TOIRE_GUILD_ID = '795353457996595200';
const FARM_SERVER_GUILD_ID = '572150608283566090';
const SIGNAL_GUILD_ID_LIST = [KAKUNINYOU_TEST_GUILD_ID, TAMOKUTEKI_TOIRE_GUILD_ID, FARM_SERVER_GUILD_ID];

const clientId = '749274949348229150';

// スラッシュコマンドをギルドに登録
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


(async () => {
  const promises = [];
  SIGNAL_GUILD_ID_LIST.reduce((promises, guildId, i, a) => {
    promises.push(rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    ));
    return promises;
  }, promises);
  try {
    await new Promise.allSettled(promises);
  } catch (error) {
    console.error(error);
  }
})();
