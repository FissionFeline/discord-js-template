const Discord = require("discord.js")

module.exports = {
    event: Discord.Events.ClientReady,
    type: "once",
    async call(client) {
        console.log(`Connected ! You're in as ${client.user.username} currently serving ${client.guilds.cache.size} Server(s)`)
    }
}