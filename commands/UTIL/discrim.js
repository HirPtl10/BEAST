const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'discrim',
  run: async (client, message, args) => {
const discrim = args[0] ?? message.author.discriminator;
        if (isNaN(discrim) || discrim.length !== 4) return message.reply("❌ | Invalid discriminator");

        const embed = new MessageEmbed()

            embed.setTitle(`Users with discriminator #${discrim}`)
            embed.setDescription(this.client.users.cache.filter(u => u.discriminator == discrim).array().slice(0, 10).map((m, i) => `${i+1}. ${m.tag}`).join("\n"))
           
            embed.setTimestamp()
            embed.setColor("RANDOM");

        return message.channel.send(embed);
    }

}


