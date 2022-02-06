
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const data = [{
  name : "ping",
  description: "Replies with Pong!",
}];

client.on('ready', async c => {
  console.log(`${client.user.tag} でログインしています。`);
  await c.application.commands.set(data, '879315010218774528');
  console.log("Ready!");
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.on('message', async msg => {
  if(msg.author.bot) return; //BOTのメッセージには反応しない

  if (msg.content === '!ping') {
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
