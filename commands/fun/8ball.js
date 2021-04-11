const Discord = require('discord.js');
require("../../ExtendedMessage");
module.exports = {
  name: '8ball',
  description: '8ball command',
	run: async (client, message, args) => {
	const answers = [
		'It is certain.',
		'It is decidedly so.',
		'Without a doubt.',
		'Yes - definitely.',
		'You may rely on it.',
		'As I see it, yes.',
		'Most likely.',
		'Outlook good.',
		'Yes.',
		'Signs point to yes.',
		'Reply hazy, try again.',
		'Ask again later.',
		'Better not tell you now.',
		'Cannot predict now.',
		'Concentrate and ask again.',
		'Don\'t count on it.',
		'My reply is no.',
		'My sources say no.',
		'Outlook not so good.',
		'Very doubtful.',
	];
	if (!args[0]) {return message.inlineReply('Please provide a question to ask', { allowedMentions: { repliedUser: true } });}

	const question = args.join(' ');
	const embed = new Discord.MessageEmbed()
		.setTitle('🎱  The Magic 8-Ball  🎱')
		.addField('Question', question)
		.addField('Answer', `${answers[Math.floor(Math.random() * answers.length)]}`)
		.setColor('RANDOM');
message.inlineReply({ embed: embed, allowedMentions: { repliedUser: true } });	}
}

