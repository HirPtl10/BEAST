
const reqEvent = (event) => require(`../events/${event}`)

module.exports = bot => {
    client.on("ready", function() {reqEvent("ready") (client) });
 }

