const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
const mongoose = require('mongoose')
module.exports = {
    name : 'setprefix',
   
    run : async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        const res = await args.join(" ")
        
        if(!res) return message.channel.send('Please specify a prefix to change to.')
        
        const data = await prefixSchema.findOne({
            Guild: message.guild.id
        });
        if (data) {
            message.channel.send(`Your prefix is now ${res}`)
            
            let newData = new prefixSchema({
                Guild: message.guild.id,
                Prefix: res
            })
            newData.save();
        } else if (!data) {
            await prefixSchema.findOneAndRemove({
                Guild: message.guild.id
            })
            message.channel.send(`Your prefix is now ${res}`)
            let newData = new prefixSchema({
                Guild: message.guild.id,
                Prefix: res
            })
            
            newData.save();
        }


    }
}
