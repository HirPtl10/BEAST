const Discord = require('discord.js')
require("../../ExtendedMessage");
module.exports = {
  name: 'invite',
  description: 'Invite Bot To Your Server',
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed();
    embed.setDescription("[Click Here To Invite](https://discord.com/api/oauth2/authorize?client_id=793714123702927360&permissions=8&scope=bot)");
message.inlineReply({
embed: embed,
allowedMentions: { repliedUser: true }
});
			
  }
}
