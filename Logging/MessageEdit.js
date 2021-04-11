const Discord = require('discord.js')
module.exports = async (oldMessage, newMessage) => {
  const Guild = require('../models/guild');
        const guildDB = await Guild.findOne({
            guildID: oldMessage.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: oldMessage.guild.id,
                    guildName: oldMessage.guild.name,
                    prefix: process.env.PREFIX,
                    logChannelID: null
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        const logChannel = oldMessage.guild.channels.cache.get(guildDB.logChannelID);

          if (!logChannel) {
            return
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(15158332)
                .setTitle('Message Edit Case')
                .setDescription(`A message by ${oldMessage.author} has been edited in <#${oldMessage.channel.id}>`)
                .addField(`Old Message`, oldMessage.content)
                .addField(`New Message`, newMessage.content)


            return logChannel.send(embed);
          }
  
}
