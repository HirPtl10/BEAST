const Discord = require('discord.js')
module.exports = async (role) => {
  const Guild = require('../models/guild');
        const guildDB = await Guild.findOne({
            guildID: role.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: role.guild.id,
                    guildName: role.guild.name,
                    prefix: process.env.PREFIX,
                    logChannelID: null
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        const logChannel = role.guild.channels.cache.get(guildDB.logChannelID);

          if (!logChannel) {
            return
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(15158332)
                .setTitle('New Role Created')
                .setDescription(`New role created`)
                .addField(`Role Name`, role.name)


            return logChannel.send(embed);
          }
  
}
