
module.exports = {
	name: 'ping',
	description: 'Ping!',
	commandOptions: null,
	global: true,
	run: async (interaction) => {
		
		client.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
					content: `Pong!`
				}
			}
		})
	},
};
