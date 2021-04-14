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
        const mappedData = Object.keys(data.Inventory).map((key)=> {
            return `${key} (${data.Inventory[key]})`
        })
        .join("\n");
        message.channel.send(mappedData)
        }
      )
   },
};