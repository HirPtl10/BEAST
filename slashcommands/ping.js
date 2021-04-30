
module.exports = {
	name: 'ping',
	description: 'Ping!',
	commandOptions: null,
	global: true,
	execute (interaction, client) {
		
		client.api.applications(client.user.id).commands.post({
            data: {
                type: 4,
                data: {
                    content: "hello world!!!"
                }
            }
		})
	}
}

