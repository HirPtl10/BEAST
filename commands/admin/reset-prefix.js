const prefixSchema = require('../../models/prefix')
const prefix = require('../../config.json').prefix

module.exports = {
    name : 'reset-prefix',
    run : async(client, message) => {
       
          
                await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                message.channel.send(`The prefix has been reset to ${prefix}`)
       

    }
}
