const client = require('../index')

client.on('ready', () => {
  console.log(`Bot is Online`)
  client.user.setActivity(`Developed Using DJS`, { type: 'PLAYING' })
})
