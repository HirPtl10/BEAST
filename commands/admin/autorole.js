const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const mongoose = require('mongoose')
const db = require('../../models/autorole')


module.exports = {
   name: 'autorole',
   description: 'Join role',
   aliases: '',
   usage: '',
   timeout: '',
   cooldown: '',
   run: async (client, message, args) => {
    const Autorole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(' ') || r.name === args[0]) || message.guild.roles.cache.find(r => r.id.toLowerCase()=== args.slice(0).join(" ") || r.id === args[0])
    await db.findOne({
        guildId: message.guild.id
    }, async (err, db) => {
        if (err) console.error(err);
        if (!db) {
            const newDb = new db({
               guildId: message.guild.id,
               roleId: Autorole.id
            });

            await newDb.save()
            .then(result => console.log(result))
            .catch(err => console.error(err));

            return message.channel.send(`Auto join role updated`);
        } else {
            db.updateOne({
                roleId: Autorole.id
            })
            .then(result => console.log(result))
            .catch(err => console.error(err));

            return message.channel.send(`Auto role updated}`);
        };
    });
    }
}