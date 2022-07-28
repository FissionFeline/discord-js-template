module.exports = async(client, interaction) => {
    if (interaction.commandName) {
        if (client.slash_commands.has(interaction.commandName)) {
            const command = await require(`../slash_coms/${interaction.commandName}.js`)
            try {
                return command.execute(client, interaction)
            } catch (error) {
                console.log('\x1b[31m%s\x1b[0m', `We had an error executing ${interaction.commandName}`)
                console.log(error)
            }
        } else {
            console.log('\x1b[31m%s\x1b[0m', `Warning interaction command not found or loaded ${interaction.commandName}`)
            return interaction.reply("Warning something went wrong on the backend")
        }
    }
}