const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

module.exports = {
  name: 'dropdown',
  run: async (client, message, args) => {
    const directories = [...new Set(client.commands.map(cmd => cmd.directory)),

    ];

    const formatString = (str) =>
    `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = client.commands.filter(
        (cmd) => cmd.directory === dir
      ).map(cmd => {
        return {
          name: cmd.name || "No name",
          description:
              cmd.description || "no desc",
        };
      });

        return {
          directory: formatString(dir),
          commands: getCommands,
        };
    });

    const embed = new MessageEmbed().setDescription(
      "Please choose"
    );
      const components = (state) => []
        new MessageActionRow().addComponents(
          .setCustomId("help")
          .setPlaceholder("please select")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Commands from ${cmd.directory} category`,
              }
            })
          )
        )
      ]
      const initialMessage = await message.channel.send({
        embeds: [embed],
        components: components(false),
      })
      const filter = (interaction) => interaction.user.id === message.author.id;
      const collector = message.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU' })

      collector.on('collect', (interaction) => {
        const [directory] = interaction.values;
        const category = category.find(
          (x) => x.directory.toLowerCase() === directory
        )
        const categoryEmbed = new MessageEmbed()
        .setTitle(`${directory}commands`)
        .setDescription(`all cmds`)
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `\`${cmd.name}\``,
              value: cmd.description,
              inline: true,
            }
          })
        )
        interaction.update({ embeds: [categoryEmbed] })
      })
      collector.on('end', () => {
        initialMessage.edit({ components: components(true) })
      })
  }
}
