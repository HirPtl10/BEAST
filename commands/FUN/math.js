const { Client, Message, MessageEmbed } = require('discord.js');
const math = require('mathjs')
module.exports = {
    name: 'math',
    description: 'Want to calculate questions? Use this command... / = Divided + = Addition * = Times',


    run: async(client, message, args) => {
        const foundMath = new MessageEmbed()
        .setTitle(`Mathematics!`)
        .addField(`Question:`, args.join(" "))
        .addField(`Question:`, math.evaluate(args.join(" ")))
        .setColor("RANDOM")
        
        const errr = new MessageEmbed()
        .setTitle('Invalid Question!')
        .setColor("RED")

        try {

     message.channel.send(foundMath)
} catch (error) {
    
    message.channel.send(errr)
    
}
    }
}