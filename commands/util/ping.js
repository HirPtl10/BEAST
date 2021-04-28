const Discord = require('discord.js');
require("../../ExtendedMessage");



module.exports = {
  
  name: 'ping',
  description: 'ping command',
  
  run: async (client, message, args) => {
   const embed = new Discord.MessageEmbed()
   .setDescription('Pinging....')
   message.channel.send(embed)
   .then(embed => embed.edit(new Discord.MessageEmbed().setTitle('🏓 Ping').setDescription(`➣ \`${client.ws.ping}\`ms`)))
    
  },
}


