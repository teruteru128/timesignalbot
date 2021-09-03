const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log('${client.user.tag} でログインしています。')
})

client.on('message', async msg => {
  if (msg.content === '!ping') {
    msg.channel.send('Pong!')
  }
})

client.login(process.env.DiscordToken)
