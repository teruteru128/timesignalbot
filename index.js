
const { Client, Intents } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
/* 
const data1 = new SlashCommandBuilder().setName().setDescription()
  .addStringOption(opt => opt.setName('').setDescription().setRequired(true));
 */
const data = [{
  name: "ping",
  description: "Replies with Pong!",
  options: [{ name: 'payload', description: 'The message returned with the pong.', type: 'STRING', /* required: true */ }]
}];

client.on('ready', async c => {
  await c.application.commands.set(data, '879315010218774528');
  console.log(`${c.user.tag} でログインしています。`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.on('messageCreate', async msg => {
  if (msg.author.bot) return; //BOTのメッセージには反応しない

  if (msg.content === '#ping') {
    msg.channel.send('Pong!');
  }
});

client.on('guildMemberAdd', c => {
  console.log(c);
});

client.on('guildMemberAvailable', c => {
  console.log(c);
});

client.login(process.env.DISCORD_TOKEN_V2);
