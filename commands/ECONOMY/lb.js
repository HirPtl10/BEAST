const schema = require("../../models/schema.js")
module.exports = {
  name: 'lb',
run: async (client, message, args) => {
    let i = 1
    let schema_find = await schema.find({ Guild: message.guild.id })
    let sorT = schema_find.sort((a, b) => b.coins - a.coins)
    let maP = sorT.map(v => client.users.fetch(v.id).then(y => `**${i++}.** ${y.tag} • ${v.coins.toLocaleString()}`))
    let maP_await = await Promise.all(maP)

    let page = parseInt(args[0]);
    if (!page) page = 1;

    let pages = [];
    let lot = 10;
    while (maP_await.length > 0) {
      pages.push(maP_await.splice(0, lot));
    }

    if (page > pages.length) {
      page = pages.length
    } else if (page < 1) {
      page = 1
    }
    const top_embed = new Discord.MessageEmbed()
      .setAuthor("Leaderboard in " + message.guild.name, "https://cdn.discordapp.com/attachments/822225367372660806/834502527704760320/Jumbo.png")
      .setDescription(pages[page - 1])
      .setColor("BLUE")
      .setFooter("Page " + page + "/" + pages.length)

    message.channel.send(top_embed)
  }
}
