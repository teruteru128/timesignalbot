
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
}, {
  name: 'nyanpass',
  description: 'get nyanpass count from nyanpass.com',
  optins: []
}];

client.on('ready', async c => {
  await c.application.commands.set(data, '879315010218774528');
  console.log(`${c.user.tag} でログインしています。`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
    const payload = interaction.options.getString('payload', false);
    if (payload !== null)
      await interaction.followUp(payload);
  }
  if (interaction.commandName === 'nyanpass') {
    await interaction.reply('まだ実装してないのん……');
  }
});

var YOUBI = ['月', '火', '水', '木', '金', '土', '日'];

client.on('messageCreate', async msg => {
  if (msg.author.bot) return; //BOTのメッセージには反応しない

  if (msg.content === '#ping') {
    msg.channel.send('Pong?');
  }
  if (msg.content.includes('SEックス')) {
    msg.channel.send('やめないか！');
  }
  if (msg.content === 'やったぜ。' || msg.content === 'やりましたわ。' || msg.content === 'やったわ。') {
    var now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    msg.channel.send(`投稿者：${msg.member.nickname} （${now.getMonth()+1}月${now.getDate()}日（${YOUBI[now.getDay()]}）${now.getHours().toString().padStart(2, '0')}時${now.getMinutes().toString().padStart(2, '0')}分${now.getSeconds().toString().padStart(2, '0')}秒）`);
  }
});

client.on('guildMemberAdd', c => {
  console.log(c);
});

client.on('guildMemberAvailable', c => {
  console.log(c);
});

// process.env.DISCORD_TOKEN が設定されている場合、client.tokenはclientをインスタンス化したときにデフォルトで設定される。
// https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=login
client.login();
