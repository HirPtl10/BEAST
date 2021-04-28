const Discord = require('discord.js');
module.exports = {
  name: 'dlch',
  description: 'Deletes A channel',
    
    run: async (client, message, args) => {
   
      if (!message.member.hasPermission('MANAGE_CHANNELS')) return; 
      
      message.channel.delete()
    }
}
