const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'pp',
   description: 'Shos your pp size',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    let choices = [
        "8D",
            "8=D",
            "8==D",
            "8===D",
            "8====D",
            "8=====D",
            "8======D",
            "8=======D",
            "8========D",
            "8=========D",
            "8==========D",
            "8===========D",
            "8============D",
            "8=============D",
            "8==============D",    
            "8===============D",    
            "8================D",
        ]
        let pp = choices[Math.floor(Math.random * choices.length)];
        const embed = new MessageEmbed() 
        .setColor("RANDOM") 
        .setTitle("peepee size machine")
        .setDescription(`${user.toString()}\'s pp\n${pp}`)
        message.channel.send(embed);
        
   }
}