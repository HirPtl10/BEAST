module.exports = {
  name: 'skip',
  run: async (client, message, args) => {
    await client.player.skip(message)
  }
}
