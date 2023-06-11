const Discord = require('discord.js')
require('dotenv').config()
const assert = require('assert')
const find_events = require('./utils/initialisation/find_events')
const find_commands = require('./utils/initialisation/find_commands')

assert(process.env.TOKEN, "A Discord Token for your bot is required ! Please go to your application page to get it! Set your token then as an enviormental variable with the TOKEN variable name!")

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Discord.Partials.Message,
        Discord.Partials.Channel,
        Discord.Partials.Reaction
    ]
});

find_events(client)

find_commands(client)

client.login(process.env.TOKEN)