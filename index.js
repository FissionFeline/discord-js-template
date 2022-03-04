const Discord = require('discord.js');
const fs = require("fs");
const fuckIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: fuckIntents })
require('dotenv').config()

client.config = require("./config.json")

const TmpUserBS = new Map();

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity("SMO Instance 1.3");
});

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
}

client.commands = new Discord.Collection();

const commands = fs.readdirSync("./coms").filter(file => file.endsWith(".js"));
for (const file of commands) {
    const command = require(`./coms/${file}`)
    try {
        client.commands.set(command.name, command)
        console.log(`Successfully loaded command ${command.name}`)
    } catch (error) {
        console.log(`Warning command ${file} failed to load`)
    }
}

process.on('uncaughtException', error => {
    console.error('There was an uncaught error', error)
    process.exit(1)
})

client.login(process.env.TOKEN);