const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const items = require('../../events/shopitems')

module.exports = {
   name: 'shop',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
      if (items.length === 0) return message.channel.send('There is no item for sale')

      const shopList = items
      .map((value, index)=>{
         return `**${index + 1}** ${value.item} -> ${value.price} coins`
      })
      message.channel.send(shopList)
   }
}