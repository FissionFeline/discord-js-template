const Discord = require("discord.js")

module.exports = {
    event: Discord.Events.ClientReady,
    type: "once",
    async call() {
        console.log("hi")
    }
}