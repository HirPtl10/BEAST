const { Client, Message, MessageEmbed, Discord } = require('discord.js');

module.exports = {
   name: 'uptime',
   description: 'owner only command',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {

 
        let id = '827793921144913971';
        if(message.author.id !== id){
            return;
        } else {
            let days = Math.floor(Client.uptime / 86400000);
    let hours = Math.floor(Client.uptime / 3600000) % 24;
    let minutes = Math.floor(Client.uptime / 60000) % 60;
    let seconds = Math.floor(Client.uptime / 1000) % 60;

    let uptimeE = new Discord.MessageEmbed()
    .setTitle("UPTIME")
    .setColor("WHITE")
    .setDescription(`\nDay(S) Online: ${days}\n\nHour(S) Online: ${hours}\n\nMinute(S) Online: ${minutes}\n\nSecond(S) Online: ${seconds}`)
     .setFooter(`Requested By : ${message.author.username}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
    message.channel.send(uptimeE)
    return;
        }
    }
}