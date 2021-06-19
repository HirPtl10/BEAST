module.exports = {
    name: 'play',
    run: async (client, message, args) => {

        const query = args.join(" ")
        await client.player.play(message, query)
    }
}

