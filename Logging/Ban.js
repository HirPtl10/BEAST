const Discord = require('discord.js')
module.exports = async (user, guild) => {
  const Guild = require('../models/guild');
        const guildDB = await Guild.findOne({
            guildID: user.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: user.guild.id,
                    guildName: user.guild.name,
                    prefix: process.env.PREFIX,
                    logChannelID: null
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        const logChannel = user.guild.channels.cache.get(guildDB.logChannelID);

          if (!logChannel) {
            return
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor('REDs')
                .setTitle('Ban Case')
                .setDescription(`${user} was Banned from This guild`)
           

            return logChannel.send(embed);
          }
  
}
