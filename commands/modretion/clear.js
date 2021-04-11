const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clears messages in a channel (between 1 & 100)',
    timeout: '5000',
    cooldown: '5 seconds',
    aliases: ['purge'],
    usage: '*clear 50 or *purge 50',
   run: async (client, message, args) => {
       if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('Lack of Perms!');
    
    let deleteAmount;
    const helpembed = require('../test/test')
    if (isNaN(args[0]) || parseInt(args[0]) <= 0) return message.channel.send(helpembed)

    if (parseInt(args[0]) > 100) {
        return message.reply('You can only delete 100 messages at a time!')
    } else {
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount + 1, true);
    message.reply(`**Successfully** Deleted ***${deleteAmount}*** Messages.`)
   }

}
