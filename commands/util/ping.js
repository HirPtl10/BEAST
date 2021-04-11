const Discord = require('discord.js');
require("../../ExtendedMessage");



module.exports = {
  
  name: 'ping',
  description: 'ping command',
  
  run: async (client, message, args) => {
    message.channel.startTyping(1);

    message.inlineReply("Calculating Ping....", { allowedMentions: { repliedUser: false } }).then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp

      resultMessage.edit(`Bot latency: ${ping} \nAPI Latency: ${client.ws.ping}`)
      message.channel.stopTyping(2)
    })
  },
}
