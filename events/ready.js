const client = require('../index')
const fs = require('fs')
const Discord = require('discord.js')
const path = require('path');

client.on('ready', () => {
 console.log(`Bot is online`)
    client.user.setActivity("Developer Using DJS", {type: "PLAYING"});

    const clientDetails = {
        guilds: client.guilds.cache.size,
        users: client.users.cache.size
    }
    const express = require('express')
    const app = express();
    const port = process.env.PORT || 5001
    app.set("view engine", "ejs")
    app.get("/", (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "..", "pages", "landingPage.html"))
    })
    app.get("/info", (req, res) => {
        res.status(200).send(clientDetails)
    })
    app.listen(port)
});
