const client = require("../index");

client.ws.on('INTERACTION_CREATE', async interaction => {
    client.api.applications(client.user.id).commands.post({data: {
        name: 'hey',
        description: 'hello command'
    }})
})