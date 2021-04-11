const db = require('../../models/profileSchema')
const mongoose = require('mongoose')
module.exports = {
    name: "bal",
    aliases: ["balance"],
     description: "Check the user balance",

    run: async(client, message, args) => {
        const user = message.author || message.mentions.members.first();
        const coins = db.findByIdAndUpdate({
            userID: message.author.id,
            serverID: message.guild.id,
            coins: 1000,
            bank: 0
        })
      message.channel.send(`Your wallet bal is ${user.coins}, you banks bal is ${user.bank}`);
    
    },

  };

  