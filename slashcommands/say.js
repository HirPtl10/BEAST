const Discord = require('discord.js')

module.exports = {
	name: 'say',
	description: 'say command',
	commandOptions: [
		{
			type: 3,
            name: "say",
            description: "Say command",
            required: true
		}
    ],
	execute (client, interaction) {
	const embed = new Discord.MessageEmbed()
		.setDescription(args[0].value)
		.setAuthor(`${interaction.member.user.username}`, new Discord.User(client, interaction.member.user).displayAvatarURL())
		.setTimestamp()
		.setColor('RANDOM');
	client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: 3,
			data: {
				embeds: [embed],
			},
		},
		});
	},
};
