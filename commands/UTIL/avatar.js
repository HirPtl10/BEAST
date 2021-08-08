const Discord = require('discord.js');

const usedCommand = new Set();
module.exports = {
    name: 'avatar',
    description: 'returns a users avatar',
    run: async (client, message, args)=> {
        

if(usedCommand.has(message.author.id)){
        message.reply('You cannot use the command beacuse of the cooldown.')
    } else {

        const embed = new Discord.MessageEmbed()
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<a:opa5:797429643245387797> You cant use this")
        
    



        if (!message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0])) {
            embed.setTitle("Your Avatar")
            embed.setImage(message.author.displayAvatarURL({ size: 4096, dynamic: true }));
            embed.setDescription("<a:opa2:793001684149862400> APKA AVATAR")
            embed.setColor("RANDOM")
            embed.setFooter('*helpfor more commands')
            return message.channel.send(embed)
           
            
        } else {
            const user = message.mentions.users.first()
            embed.setTitle(`${user.tag}'s Avatar:`)
            embed.setImage(user.displayAvatarURL({ size: 4096, dynamic: true }));
            embed.setDescription(`<a:opa2:793001684149862400> ${user.tag} APKA AVATAR`)
            embed.setColor('RANDOM')
            embed.setFooter('-help for more commands')
            return message.channel.send(embed)
                  usedCommand.add(message.author.id);
        setTimeout(() => {
            usedCommand.delete(message.author.id);
        }, 5000); 
    }
        }
    }
}
