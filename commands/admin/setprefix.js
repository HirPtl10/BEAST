const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
module.exports = {
    name : 'prefix',
    
    run : async(client, message, args) => {
        const res = await args.join(" ")
        if(!res) return message.channel.send('Please specify a prefix to change to.')
           let data;
    try {
        data = await PrefixSchema.findOne({
            Guild: message.guild.id
        })
        if(!data) {
            let newdata = await PrefixSchema.create({
                Guild: message.guild.id,
                Prefix: res
            })
            newdata.save()
        } else {
            await PrefixSchema.findOneAndUpdate({
                Guild: message.guild.id,
                Prefix: res
            })
        }
        message.channel.send(`The Prefix has Been set to ${res}`)
    } catch (err) {
        console.log(err)
    }
    }
}
