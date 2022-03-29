module.exports = async(client, message) => {
    const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
    console.log(message.author)
    if (message.author.bot) return;

    if (message.content.indexOf(client.config.commandstart) !== 0) return;

    const args = message.content.slice(client.config.commandstart).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command.substring(1));
    if (cmd == undefined) {
        return;
    }

    message.content = message.content.substring(message.content.indexOf(' ') + 1)

    if (message.member.roles.cache.has(cmd.authRole) || !cmd.authRole) {
        cmd.execute(client, message, args);
    } else {
        message.reply("You dont have perms to do that fucker")
    }
}
