
module.exports = {
    name: 'cc',
    description: 'creates channel',

 run: async (client, message, args) => {
     let Ctype = args[0]
     let Cname = args.slice(1).join(' ');
        guild.channels.create((Cname), {
            type: (Ctype)
        })
        message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
            await channel.createOverwrite({
                SEND_MESSAGES: true,
                
            })
        });
        message.channel.send(`channel created`)
    }
}