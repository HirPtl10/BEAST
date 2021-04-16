module.exports = {
  // Do this according to your command handler
  name: "quick-embed",
  aliases: ['make-embed'],
  run: async (client, message, args) => {
    // Code Begin
    let embed = null;
    const Tochannel = message.mentions.channels.first(); // Take first channel mention from the message
    if (!Tochannel) return message.channel.send('Specify a channel to send embed!')
    args.shift(); // Shifting argument because args[0] is channel mention!
    const arg = args.join(" "); // Joining args to split it by '^' Symbol!
    const title = arg.split('^')[0];
    if (!title) return message.channel.send('Specify a title for the embed!')
    const description = arg.split('^')[1];
    if (!description) return message.channel.send('Specify a description for the embed!')
    const footer = arg.split('^')[2];
    if (!footer) return message.channel.send('Specify a footer for the embed!')

 
const embed = new Discord.MessageEmbed();
    .setTitle(title)
    .setDescription(description)
    .setFooter(footer)
   Tochannel.send(embed)
  }
}
