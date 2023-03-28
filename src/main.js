const Discord = require('discord.js')
require('dotenv').config()

const client = new Client({ intent: [] })

client.login(process.env.TOKEN)