module.exports = {
    name: 'drag',
    description: 'Moves member in your voice channel',
    aliases: ['move', 'pull'],
    timeout: '5000',
    run: async (client, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return;
        const member = message.mentions.members.first();
        const helpembed = require("../test/test");
        if(!member) return message.channel.send(helpembed);
        member.voice.setChannel(message.member.voice.channel) 
        message.reply('Member Moved Successfully')
    }
}