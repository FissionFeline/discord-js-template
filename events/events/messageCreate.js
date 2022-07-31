module.exports = async (client, message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(client.config.commandstart)) return;

  const args = message.content.slice(client.config.commandstart).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commandManager.textCommands.get(command.substring(1));
  if (!cmd) return;

  if (message.member.roles.cache.has(cmd.authRole) || !cmd.authRole) {
    cmd.execute(client, message, args);
  } else {
    message.reply('You do not have permission to do that!');
  }
};
