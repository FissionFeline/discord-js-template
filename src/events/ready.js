const Discord = require("discord.js")
const log = new require('../utils/logger.js')
const logger = new log("ready") 
module.exports = {
    event: Discord.Events.ClientReady,
    type: "once",
    async call(client) {
        logger.success(`Connected ! You're in as ${client.user.username} currently serving ${client.guilds.cache.size} Server(s)`)
    }
}