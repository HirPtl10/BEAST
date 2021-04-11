const Discord = require('discord.js');
module.exports = {
  name: 'dlch',
  description: 'Deletes A channel',
    
    run: async (client, message, args) => {
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('I M MISSING PERMISSION')
      if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('YOU DONT HAVE PERMISSION TO USE THIS')
      
      message.channel.delete()
    }
}
