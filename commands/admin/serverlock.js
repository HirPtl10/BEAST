const Dicord = require('discord.js')
const safeChannels = new Set(['805096499897565205'])

module.exports = {
    name: "serverlock",
    description: "locks the server (only affects members, not moderators)",
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('ERROR: You don\'t have the required permissions to use this command.');

        let reason = "No reason specified"
        if(args[1]) reason = args.splice(1).join(" ");
        if(!args[0]) return message.channel.send('ERROR: Couldn\'t determine whether you wanted to turn the server lock **on** or **off**.\n Use "on" or "off" as your first argument. ')

        if(args[0] === 'on') { //  if the first args is equal to on
            const channels = message.guild.channels.cache.filter(channel => channel.type !== 'category'); // filters out channels from categories 
        channels.forEach(channel => { // do the following for each channel 
            if(!safeChannels.has(channel.id)) { // if a channel id isn't in the "safeChannels" set, do the following. we add this if statement because we don't want the safeChannels set to be affected by the lockdown so they can stay the same
                channel.updateOverwrite('role id thats going to be affected', { // updates the role's overwrite 
                    SEND_MESSAGES: false

                })

            } 

        })

        const serverLockEmbed = new Dicord.MessageEmbed()
        .setTitle('SERVER LOCK HAS BEEN ENABLED')
        .setDescription('This server has been locked! No, you have not been muted.')
        .addField('Reason:', `${reason}`)
        .addField('Responsible Moderator:', `${message.author}`)
        .setFooter('This server has been locked for a reason. Please do not DM staff regarding the lockdown.')
        message.channel.send(serverLockEmbed)



        } else if(args[0] === 'off') { // same thing with this
            const channels = message.guild.channels.cache.filter(channel => channel.type !== 'category');
        channels.forEach(channel => {
            if(!safeChannels.has(channel.id)) {
                channel.updateOverwrite('723581427836256376', {
                    SEND_MESSAGES: null

                })

            } 
            
        })

        const serverLockEmbed2 = new Dicord.MessageEmbed()
        .setTitle('SERVER LOCK HAS BEEN DISABLED')
        .setDescription('This server is no longer locked')
        .addField('Responsible Moderator:', `${message.author}`)
        .setFooter('Thank you for patiently waiting for the lockdown to end. You may proceed to chat.')
        message.channel.send(serverLockEmbed2)


        }


    }
}
