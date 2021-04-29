const { MessageEmbed, MessageCollector } = require('discord.js');

module.exports = {
    name: 'reportbug',
    aliases: ['bug'],
    run: async (client, message, args) => {
        message.reply('Check dms!');
        const questions = [
            'What is your username and tag?',
            'What is the bug title?',
            'What is the bug?',
            'What is the command',
            "Do you have any idea, How can we fix the bug? (If you don't, Respond with (no))"
        ];

        let collectCounter = 0;
        let endCounter = 0;

        const filter = m => m.author.id === message.author.id;
        const appStart = await message.author.send(questions[collectCounter++])
        .catch(console.error)
        const channel = appStart.channel;
   
        const collector = channel.createMessageCollector(filter);

        collector.on('collect', () => {
            if (collectCounter < questions.length) {
                channel.send(questions[collectCounter++]);
            } else {
                channel.send(`Thanks For Your Feedback`);
                collector.stop('fulfilled');
            }
        });
    
        const appChannel = client.users.cache.get('837019385234587678');
        collector.on('end', (collected, reason) => {
            if (reason === 'fulfilled') {
                let index = 1;
                const mapped = collected
                    .map(msg => {
                        return `**${index++})** | ${questions[endCounter++]}\n-> ${
                            msg.content
                        }`;
                    })
                    .join('\n\n');
                appChannel.send(
                    new MessageEmbed().setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL({ dynamic: true })
                    ).setTitle`New Bug Reported`
                        .setDescription(mapped)
                        .setColor(client.color)
                        .setTimestamp()
                );
            }
        });
    }
};
