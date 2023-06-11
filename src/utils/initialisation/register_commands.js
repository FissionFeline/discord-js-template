const { REST, Routes } = require('discord.js');

module.exports = async (client, commands) => {
    const rest = new REST().setToken(process.env.TOKEN);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}