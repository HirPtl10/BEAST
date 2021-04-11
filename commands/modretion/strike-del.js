const db = require('../../models/warns')

module.exports = {
    name : 'strike-del',
   description: 'removes a particular strike from a user',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You do not have permission to use this command.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send('Successfully removed strike')
                data.save()
            } else {
                message.channel.send('This user does not have any warns in this server!')
            }
        })
    }
}
