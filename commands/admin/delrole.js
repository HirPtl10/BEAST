const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'delrole',
   description: 'deletes a role',
   aliases: ["dr"],
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    const dlrole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(' ') || r.name === args[0]) || message.guild.roles.cache.find(r => r.id.toLowerCase()=== args.slice(0).join(" ") || r.id === args[0])
   role.delete(dlrole);
    }
}
