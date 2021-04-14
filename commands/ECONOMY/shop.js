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
      const embed = new MessageEmbed();
      embed.setTitle(`SHOP LIST`)
      embed.setDescription(
      shopList.map((value, index)=>{
          `**${index + 1}** ${value.item} -> ${value.price} coins`
      
      })
      )
      message.channel.send(embed)
   }
}