const Discord = require("discord.js")

module.exports = client => { 
    console.log(`${client.user.username} is online`)
    client.user.setActivity("Wut", {type: "PLAYING"});

    const clientDetails = {
        guilds: client.guilds.cache.size,
        users: client.users.cache.size
    }
    const express = require('express')
    const app = express();
    const port = process.env.PORT
    app.set("view engine", "ejs")
    app.get("/", (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "..", "pages", "landingPage.html"))
    })
    app.get("/info", (req, res) => {
        res.status(200).send(clientDetails)
    })
    app.listen(port)
   
}
