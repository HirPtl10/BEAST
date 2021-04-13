const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
module.exports = {
    name : 'setprefix',
   
    run : async(client, message, args) => {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        const res = await args.join(" ")
        if(!res) return message.channel.send('Please specify a prefix to change to.')
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(!data) {
                prefixSchema.findOneAndDelete({ Guild : message.guild.id })
               const data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Your prefix has been updated to **${res}**`)
            } else {
               data.findOneAndDelete({
                   Prefix: res
               })
               
                message.channel.send(`Your prefix has been updated to **${res}**`)
            }
        })
    }
}
