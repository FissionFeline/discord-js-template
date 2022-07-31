const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  name: 'uptime',
  description: 'displays the bots current uptime',
  register_command: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Displays bot uptime!'),
  execute(client, interaction) {
    const uptimeEmbed = new MessageEmbed()
      .setColor('#dac188')
      .setTitle(`${client.user.username} uptime!`)
      .setAuthor({ name: `${interaction.user.tag} `, iconURL: interaction.user.avatarURL() })
      .setDescription(`This is the current uptime of ${client.user.username}!\n**${client.uptime / 1000 / 60} Minutes!**`)
      .setTimestamp();

    interaction.reply({ embeds: [uptimeEmbed] });
  },
};
