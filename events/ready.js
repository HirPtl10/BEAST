const Discord = require("discord.js")

module.exports = client => { 
    console.log(`${client.user.username} is online`)
    client.user.setActivity("Wut", {type: "PLAYING"});
}
