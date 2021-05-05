const { MessageEmbed } = require('discord.js');

module.exports = {
  
        name: 'spotify',
       
    run: async (bot, message, args) => {
        let user = message.mentions.users.first() || message.author;

        if(user.presence.game !== null && user.presence.game.type === 2 && user.presence.game.name === 'Spotify' && user.presence.game.assets !== null) {

            let trackIMG = `https://i.scdn.co/image/${user.presence.activities.assets.largeImage.slice(8)}`;
            let trackURL = `https://open.spotify.com/track/${user.presence.activities.syncID}`;
            let trackName = user.presence.activities.details;
            let trackAuthor = user.presence.activities.state;
            let trackAlbum = user.presence.activities.assets.largeText;

            const embed = new MessageEmbed()
     
                .setColor("GREEN")
                .setThumbnail(trackIMG)
                .addField('Song Name', trackName, true)
                .addField('Album', trackAlbum, true)
                .addField('Author', trackAuthor, false)
                .addField('Listen to Track', `${trackURL}`, false)
              
                .setTimestamp()

            message.channel.send(embed);
        } else {
            message.channel.send('**This user isn\'t listening to Spotify!**');
        }
    }
}
