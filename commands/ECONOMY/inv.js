const mongoose = require('mongoose')
const inventory = require('../../models/inventory')
const discord = require('discord.js');

module.exports = {
  name: 'inv',
  run: async(client, message, args) => {
    inventory.findOne({ Guild: message.guild.id, User: message.author.id }, async(err, data) => {
      if (!data) return message.reply('You have nothing')
      const mappedData = Object.keys(data.Inventory)
      .map((key) => {
        return `${key}(${data.Inventory[key]})`;
      })
      .join("\n\n")
      const embed = new Discord.MessageEmbed();
      .setTitle(`${message.author.username} Inventory`)
      .setDescription(mappedData)
      message.channel.send(embed)
    }
   );
  },
};
