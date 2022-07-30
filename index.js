const Discord = require('discord.js');
const fs = require("fs");
const fuckIntents = new Discord.Intents(32767);
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const Logger = require('./utils/logger');
const client = new Discord.Client({ intents: fuckIntents })
require('dotenv').config()
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

client.once('ready', () => {
    Logger.success(`[Discord] Connected! You're in as ${client.user.username}`)
    client.user.setActivity("Something creative");
});

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
    Logger.info(`[Events] Attempting to load ${file}`)
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    try {
        client.on(eventName, event.bind(null, client));
        Logger.success(`[Events] Successfully loaded ${eventName}`)
    } catch (error) {
        Logger.warn(`[Events] Unable to load ${file}`)
        console.error(error)
    }
}

client.commands = new Discord.Collection();

const commands = fs.readdirSync("./coms").filter(file => file.endsWith(".js"));
for (const file of commands) {
    Logger.info(`[Commands] Attempting to load ${file}`)
    const command = require(`./coms/${file}`)
    try {
        client.commands.set(command.name, command)
        Logger.success(`[Commands] Successfully loaded ${command.name}`)
    } catch (error) {
        Logger.warn(`[Commands] Unable to load ${file}`)
        console.error(error)
    }
}

client.slash_commands = new Discord.Collection();

let command_register_collect = []

const shlash_commands = fs.readdirSync("./slash_coms").filter(file => file.endsWith(".js"));
for (const file of shlash_commands) {
    const commandName = file.split(".")[0];
    const command = require(`./slash_coms/${file}`);
    Logger.info(`[Commands] Attempting to load slash command ${commandName}`)
    client.slash_commands.set(command.name, command);
    command_register_collect.push(command.register_command)
}

(async() => {
    try {
        Logger.info(`[REST] Registering ${command_register_collect.length} commands`)

        await rest.put(
            Routes.applicationCommands("978007266915663912"), { body: command_register_collect },
        );

        Logger.success('[REST] Successfully registered all commands')
    } catch (error) {
        Logger.error('[REST] Failed to register commands')
    }
})();

process.on('uncaughtException', error => {
    Logger.error('[Process] Uncaught exception:')
    console.error(error);
    process.exit(1)
})

client.login(process.env.TOKEN);