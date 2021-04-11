const client = require('../index')
const express = require('express')
const mongoose = require('mongoose')
const model = mongoose.model(('warns', {}))

client.on('ready', () => {
    console.log('Im online')
    app.get("/warns", (req, res)=>{
       const user = req.query.user;
       if(!user){
           model.findOne({}, async (err, data) => res.send(data));
           return;
       }
       model.findOne({ user: user }, async (err, data)=>{
           if(!data)return res.send(`No data exist`)
           res.send(data)
       })
    })
    app.listen(5500);
})