const Discord = require('discord.js')
module.exports = async (message) => {
  const Guild = require('../models/guild');
        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                    logChannelID: null
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

          if (!logChannel) {
            return
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(15158332)
                .setTitle('Message Delete Case')
                .setDescription(`A message by ${message.author} has been deleted in <#${message.channel.id}>`)
            .addField(`Content`, message.content, true)
            
            if (message.author.bot) return;
            return logChannel.send(embed);
            
          }
  
}
