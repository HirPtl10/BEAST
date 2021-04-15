const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const mongoose = require("mongoose")
const inventory = require('../../models/inventory')


module.exports = {
   name: 'inventory',
   description: '',
   aliases: ["inv"],
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
      inventory.findOne({ Guild: message.guild.id, User: message.author.id}, async(err, data)=>{
        if (!data) return message.channel.send(`${message.author} You have no items in your inventory`)  
       
       const mapd = Object.keys(data.Inventory).map((key)=>
        `${key} (${data.Inventory[key]})`
        );
       })
      const embed = new MessageEmbed()
      embed.setTitle(`ok`)
       embed.setDescription(mapd)
        message.channel.send(embed);
        
   },

};
