module.exports = {
    name: 'cr',
    description: 'Creates Role In A Server',
    permissions: 'MANAGE ROLES',
    usage: 'RED MEMBERS',

    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You can\'t use this`)

        let Rcolor = args[0]
        let Rrole = args.slice(1).join(' ')
        let muterole = await message.guild.roles.create({
            data: {
                name: (Rrole),
                color: (Rcolor)
            }
        }
 
        )
        message.channel.send(`Role Has Been Created`)
    }





}
