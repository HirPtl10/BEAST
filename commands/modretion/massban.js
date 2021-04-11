module.exports = {
  name: 'massban',
  description: 'Bans Mentioned users',

run: async (client, message, args) => {
 

const banList = message.mentions.users.first().map(user => {
   banList.ban()	
  });

	message.channel.send(`Banned Users`);

  }
}
