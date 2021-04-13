const Discord = require('discord.js')
module.exports = {
  name: 'invisible',
  description: 'no text channel on user',
  
    run: async (client, message, args) => {
      if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You can\'t use this`)
             let inv = await message.guild.roles.create({
                    data : {
                        name : 'Invisible',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(inv, {
                        VIEW_CHANNEL: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Inv has been created')
           }
}
