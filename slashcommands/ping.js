
module.exports = {
	name: 'ping',
	description: 'Ping!',
	commandOptions: null,
	global: true,
	execute (interaction, client) {
		
		client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "hello world!!!"
                }
            }
		})
	}
}

