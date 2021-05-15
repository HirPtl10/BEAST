const { readdirSync, read } = require('fs')

function getCommands() {
    let categories = []

    readdirSync('./commands/').forEach((dir) => {
        const directories = readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('.js'))

        const value = []

        const commands = directories.map((command) => {
            const file = require(`../${dir}/${command}`)

            value.push({
                name: file.name ? file.name : 'no command name',
                description: file.description ? file.description : 'no description',
                aliases: file.aliases ? file.aliases : 'no aliases'
            })
        })
        let data = new Object()

        data = {
            name: dir.toUpperCase(),
            value,
        }

        categories.push(data)
    })
    return categories
}

module.exports = { getCommands }
