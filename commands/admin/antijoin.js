const { Collection, Client, Discord } = require("discord.js")
const { antijoin } = require('../../Collection/index')

module.exports = {
  name: 'antijoin',
  description: 'Kick member on join',
  run: async (client, message, args) => {
      if (!message.member.hasPermission('ADMINISTRATOR')) return;
    
    const query = args[0];
    if (!query) return message.reply(`please specify a query`)
    
    const getCollection = antijoin.get(message.guild.id)
    if (query === "on") {
      if (getCollection)
        return message.reply(`AntiJoin is alredy enabled`)
       
      antijoin.set(message.guild.id, []);
      message.reply(`Turned On AntiJoin`);
    
    } else if (query === "off"){
      if (!getCollection)
        return message.reply(`AntiJoin is alredy disabled`)
    
        antijoin.delete(message.guild.id)
        message.reply(`Turned Off AntiJoin`)
    
    } else if (query === "list") {
      if (!getCollection) return message.reply(`AntiJoin is alredy disabled`)
    message.reply(`Kicked Members: ${getCollection.map((value) => {
        return `${value.tag} (${value.id})`;
    
    })}`
        
      );
    }
  },
};
