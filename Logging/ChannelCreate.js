
const Discord = require('discord.js')
module.exports = async (channel) => {
  const Guild = require('../models/guild');
        const guildDB = await Guild.findOne({
            guildID: channel.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: channel.guild.id,
                    guildName: channel.guild.name,
                    prefix: process.env.PREFIX,
                    logChannelID: null
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        const logChannel = channel.guild.channels.cache.get(guildDB.logChannelID);

          if (!logChannel) {
            return
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(15158332)
                .setTitle('Channel Created')
                .setDescription(`Channel Has been created`)
           


            return logChannel.send(embed);
          }
  
}
