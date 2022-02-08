
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

const YOUBI = ['月', '火', '水', '木', '金', '土', '日'];

client.on('messageCreate', async msg => {
  if (msg.author.bot) return; //BOTのメッセージには反応しない

  if (msg.content === '#ping') {
    msg.channel.send('Pong?');
  }
  if (msg.content.includes('SEックス')) {
    msg.channel.send('やめないか！');
  }
  if (msg.content === 'やったぜ。' || msg.content === 'やりましたわ。' || msg.content === 'やったわ。') {
    // https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97#JST%20%E3%81%8C%E9%81%B8%E6%8A%9E%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%E3%83%9E%E3%82%B7%E3%83%B3%E3%81%AE%E5%A0%B4%E5%90%88
    // https://web.archive.org/web/20211114034218/https://nju33.com/notes/javascript/articles/%E6%97%A5%E6%9C%AC%E6%99%82%E9%96%93%E3%82%92%E5%8F%96%E5%BE%97
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
