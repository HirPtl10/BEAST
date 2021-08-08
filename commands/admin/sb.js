const sb = require('sourcebin');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'sourcebin',
    aliases: ['sourcecode', 'sb'],
    run: async (client, message, args) => {
        if(message.author.id !== '827793921144913971') return;
        let content = args.join(' ');
        if (!content)
            return message.reply(
                new MessageEmbed({
                    title: 'Error Usage',
                    description: `Usage: ${client.prefix}sourcebin <code>`
                })
            );

        const value = await sb.create([
            {
                name: 'Random Code',
                content,
                language: 'javascript'
            }
        ]);
        await message.reply(
            new MessageEmbed()
                .setTitle('Sourcebin')
                .setDescription(`Here is your code: ${value.url}`)
                .setColor(client.color)
                .setFooter(`Created By ${client.user.tag}`)
        );
    }
};
