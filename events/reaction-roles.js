const client = require('../index')
const Schema = require("../models/reaction-roles")

client.on('messageReactionAdd', async (reaction, user)=>{
    if(reaction.message.partial) await message.reaction.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    Schema.findOne({ Message: reaction.message.id }, async (err, data) => {
        if (!data) return;
        if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
        await reaction.message.guild.members.cache.get(user.id).roles.add(roleid)

    })
})


client.on('messageReactionRemove', async (reaction, user)=>{
    if(reaction.message.partial) await message.reaction.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    Schema.findOne({ Message: reaction.message.id }, async (err, data) => {
        if (!data) return;
        if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

        const [ roleid ] = data.Roles[reaction.emoji.name];
       await  reaction.message.guild.members.cache.get(user.id).roles.remove(roleid)

    })
})