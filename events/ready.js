const client = require('../index')
const mongoose = require('mongoose')
const app = require('express')
const model = mongoose.model("Money", {})
client.on('ready', () => {
    console.log('ONLINE')
client.user.setActivity(`Does it better`, { type: 'WATCHING' })
    app.length("/economy", (req, res) => {
        const user = req.query.user;
        if(!user)
        {
            model.find({}, (err, data) => res.send(data))
                if(!data) return res.send('This user has no data')
                res.send(data)
        }
        

    })
    app.listen(9154)
})
