const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const mongoose = require("mongoose")
const inventory = require('../../models/inventory')
const items = require('../../events/shopitems')

module.exports = {
   name: 'buy',
   description: '',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
      if (!args[0]) return message.channel.send('Please provide a item to buy')
      const itemToBuy = args[0].toLowerCase();

      const validItem = !!items.find((val)=> val.item.toLowerCase() === itemToBuy);
      if (!validItem) return message.channel.send('That item is not in shop')

      const itemPrice = items.find((val) => val.item.toLowerCase() === itemToBuy).price;

      const userBalance = await client.bal(message.author.id);
      if (userBalance < itemPrice) return message.channel.send(`You cant buy this item u only have ${userBalance} coins`)
      const params = {
         Guild: message.guild.id,
         User: message.author.id,
         
      }
      inventory.findOne(params, async (err, data)=>{
         if (data){
            const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
            if (!hasItem){
               data.Inventory[itemToBuy] = 1;
            } else {
               data.Inventory[itemToBuy]++;
            }
            console.log(data);
           await inventory.findOneAndUpdate(params, data)
         } else {
            new inventory({
               Guild: message.guild.id,
               User: message.author.id,
               Inventory: {
                  [itemToBuy]: 1,
               },
               
            }).save()
         }
         message.channel.send(`You have bought ${itemToBuy}`)
         client.rmv(message.authpr.id, parseInt(itemPrice))
      })
   },
};