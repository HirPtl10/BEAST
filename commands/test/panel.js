const Discord = require('discord.js');
const reactionrolesSchema = require('../../models/reaction-roles');

module.exports = {
  name: 'panel',
 
  run: async (client, message, args) => {
    const noPermissionEmbed = new Discord.MessageEmbed()
      .setColor('#f54842')
      .setTitle('❗ INVALID PERMISSION')
      .setDescription(`You don't have that permission !`)
      .addField('Permission Required', '`ADMINISTRATOR`')
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp();

    const clientNoPermissionEmbed = new Discord.MessageEmbed()
      .setColor('#f54842')
      .setTitle('❗ INVALID PERMISSION')
      .setDescription(`The client doesn't have that permission !`)
      .addField('Permission Required', 'ADMINISTRATOR')
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp();

    if (!message.member.hasPermission('ADMINISTRATOR'))
      return message.channel.send(noPermissionEmbed);
    if (!message.guild.me.hasPermission('ADMINISTRATOR'))
      return message.channel.send(clientNoPermissionEmbed);

    const channel = message.mentions.channels.first() || message.channel;

    reactionrolesSchema.findOne({ GuildID: message.guild.id }, async (err, data) => {
      const noDataEmbed = new Discord.MessageEmbed()
        .setColor('#f54842')
        .setTitle('❗ ERROR')
        .setDescription(`No data saved in this server !`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
      if (!data) return message.channel.send(noDataEmbed);

      const mapped = Object.keys(data.Roles)
        .map((value, index) => {
          const role = message.guild.roles.cache.get(data.Roles[value][0]);
          return `${index + 1} ${data.Roles[value][1].raw} - ${role}`;
        })
        .join('\n\n');

      const rolesPanelEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Reaction Roles Panel')
        .setDescription(mapped)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();

      channel.send(rolesPanelEmbed).then((msg) => {
        data.MessageID = msg.id;
        data.save();

        const reactions = Object.values(data.Roles).map((val) => val[1].id);
        reactions.map((emoji) => msg.react(emoji));
      });
    });
  },
};
