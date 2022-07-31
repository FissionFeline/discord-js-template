const Logger = require('../../utils/logger');

module.exports = async (client, interaction) => {
  if (!interaction.commandName || !client.commandManager.slashCommands.has(interaction.commandName)) return;
  try {
    client.commandManager.slashCommands.get(interaction.commandName).execute(client, interaction);
  } catch (error) {
    Logger.warn(`We had an error executing ${interaction.commandName}:\n${error.stack}\n`);
    interaction.reply('Failed to execute command');
  }
};
