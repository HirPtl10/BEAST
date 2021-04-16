const { MessageEmbed } = require('discord.js');
           
module.exports = {
 
  name: "quick-embed",
  aliases: ['make-embed'],
  run: async (client, message, args) => {
  
    let embed = null;
    const Tochannel = message.mentions.channels.first(); 
    if (!Tochannel) return message.channel.send('Specify a channel to send embed!')
    args.shift(); 
    const arg = args.join(" ");
    const title = arg.split('^')[0];
    if (!title) return message.channel.send('Specify a title for the embed!')
    const description = arg.split('^')[1];
    if (!description) return message.channel.send('Specify a description for the embed!')
    const footer = arg.split('^')[2];
    if (!footer) return message.channel.send('Specify a footer for the embed!')

 
const embed = new MessageEmbed();
    embed.setTitle(title)
    embed.setDescription(description)
    embed.setFooter(footer)
   Tochannel.send(embed)
  }
}

