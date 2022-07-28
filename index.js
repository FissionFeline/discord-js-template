const Discord = require('discord.js');
const fs = require("fs");
const fuckIntents = new Discord.Intents(32767);
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const client = new Discord.Client({ intents: fuckIntents })
require('dotenv').config()
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

client.once('ready', () => {
    console.log('\x1b[35m%s\x1b[0m', `Connected! You're in as ${client.user.username}`);
    client.user.setActivity("Something creative");
});

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
    console.log('\x1b[33m%s\x1b[0m', `Event: Attempting to load ${file}`)
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    try {
        client.on(eventName, event.bind(null, client));
        console.log('\x1b[32m%s\x1b[0m', `Event: Successfully loaded ${eventName}`)
    } catch (errro) {
        console.log('\x1b[31m%s\x1b[0m', `Unable to load Event:${file}`)
        console.error(error)
    }
}

client.commands = new Discord.Collection();

const commands = fs.readdirSync("./coms").filter(file => file.endsWith(".js"));
for (const file of commands) {
    console.log('\x1b[33m%s\x1b[0m', `Attempting to load command ${file}`)
    const command = require(`./coms/${file}`)
    try {
        client.commands.set(command.name, command)
        console.log('\x1b[32m%s\x1b[0m', `Successfully loaded command ${command.name}`)
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `Unable to load command:${file}`)
        console.error(error)
    }
}

client.slash_commands = new Discord.Collection();

let command_register_collect = []

const shlash_commands = fs.readdirSync("./slash_coms").filter(file => file.endsWith(".js"));
for (const file of shlash_commands) {
    const commandName = file.split(".")[0];
    const command = require(`./slash_coms/${file}`);
    console.log('\x1b[35m%s\x1b[0m', `Attempting to load slash command ${commandName}`);
    client.slash_commands.set(command.name, command);
    command_register_collect.push(command.register_command)
}

(async() => {
    try {
        console.log('\x1b[33m%s\x1b[0m', 'Registering commands to the Discord API ...');

        await rest.put(
            Routes.applicationCommands("978007266915663912"), { body: command_register_collect },
        );

        console.log('\x1b[32m%s\x1b[0m', 'Successfully registered client commands!!!');
    } catch (error) {
        console.error(error);
    }
})();

process.on('uncaughtException', error => {
    console.error('There was an uncaught error', error)
    process.exit(1)
})

client.login(process.env.TOKEN);