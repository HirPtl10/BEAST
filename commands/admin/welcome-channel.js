const wlc = require('../../models/welcum')
const mongoose = require("mongoose")

module.exports = {
  name: 'welcome-channel',
  description: 'Sets a welcome channel to send welcome user',
  run: async (client, message, args) => {
    const channel = message.mentions.channels.first();
     await wlc.findOne({
            guildid: message.guild.id
        }, async (err, wlc) => {
            if (err) console.error(err);
            if (!wlc) {
                const newWlc = new Guild({
                    
                    guildid: message.guild.id,
                  
                    
                    wlcid: channel.id
                });

                await newWlc.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(`The welcome message channel has been set to ${channel}`);
            } else {
                wlc.updateOne({
                    wlcid: channel.id
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send(`The welcome message has been set to ${channel}`);
            };
        });
  }
}
