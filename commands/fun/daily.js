const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: "daily",
    description: "Receive a daily award of money",

    async run (client, message, args) {
        let user = message.author;
        let timeout = 86400000;
        let amount = 500;

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if(daily !== null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Daily Income Alredy Collected`)
            embed.setDescription(`You have already collected your daily coins \n Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s`)
            return message.reply(embed)
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
            const embed = new Discord.MessageEmbed();
            embed.setTitle(`Daily Income`);
            embed.setDescription(`Successfully added ${amount} coins to your account`)
            embed.setColor(`Green`)
            message.reply(embed)
        }
    }
}
