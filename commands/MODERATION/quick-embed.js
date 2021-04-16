module.exports = {
  // Do this according to your command handler
  name: "quick-embed",
  aliases: ['make-embed'],
  run: async (client, message, args) => {
    // Code Begin
    let embed = null;
    const channel = message.mentions.channels.first(); // Take first channel mention from the message
    if (!channel) return message.channel.send('Specify a channel to send embed!')
    args.shift(); // Shifting argument because args[0] is channel mention!
    const arg = args.join(" "); // Joining args to split it by '^' Symbol!
    const title = arg.split('^')[1];
    if (!title) return message.channel.send('Specify a title for the embed!')
    const description = arg.split('^')[2];
    if (!description) return message.channel.send('Specify a description for the embed!')
    const footer = arg.split('^')[3];
    if (!footer) return message.channel.send('Specify a footer for the embed!')

    // As Color, Thumbnail and Image is optional, We check if the user has specified it and make our move.

    const color = `#${arg.split('^')[4]}`
    const thumbnail = arg.split('^')[5]
    const image = arg.split('^')[6]

    if (![color, thumbnail, image]) {
      let embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setFooter(footer);
      channel.send(embed);
    } else if (![thumbnail, image]) {
      let embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setFooter(footer)
      .setColor(color);
      channel.send(embed);
    } else if (!image) {
      let embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setFooter(footer)
      .setColor(color)
      .setThumbnail(thumbnail);
      channel.send(embed);
    } else if ([color, thumbnail, image]) {
      let embed = new Discord.MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setFooter(footer)
      .setColor(color)
      .setThumbnail(thumbnail)
      .setImage(image);
     let MessageEmbed = await channel.send(embed);
    }
  }
}
