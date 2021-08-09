const client = require('../index')
const fs = require('fs')
const Discord = require('discord.js')
const path = require('path');
const { getCommands } = require('../utils')
 
client.on('ready', () => {
 console.log(process.version)
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
    app.get("/commands", (req, res) => {
     const commands = getCommands()
     res.status(200).render('commands', { commands })
    })
    app.get("/info", (req, res) => {
        res.status(200).send(clientDetails)
    })
    app.listen(port)
});
