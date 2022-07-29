const { SlashCommandBuilder } = require('@discordjs/builders');
const PermissionFlagsBits = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: "banid",
    description: "displays the bots current uptime",
    register_command: new SlashCommandBuilder()
        .setName('banid')
        .setDescription("Use this command to ban multiple user ID's seperate them with a space")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName('targets').setDescription("User ID's to ban").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason you wanna ban these members')),
    async execute(client, interaction) {
        const no_perm = new Discord.MessageEmbed()
            .setColor("#eb4c34")
            .setTitle(`Error`)
            .setAuthor({ name: interaction.user.tag + ' ', iconURL: interaction.user.avatarURL() })
            .setDescription(`You dont have permissions to execute this command ${interaction.user.username}`)
            .setTimestamp()

        if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({ embeds: [no_perm], ephemeral: true })

        const ban_ids = interaction.options.getString('targets');
        if (ban_ids.length < 8) return interaction.reply("Please check your input")

        const memebers = []

        await interaction.reply("We got your command please await ...")

        await ban_ids.split(" ").forEach(item => {
            const test = interaction.guild.members.ban(item, { days: 7, reason: interaction.options.getString('reason') || "not specified" })
                .then((ban) => {
                    const ban_embed = new Discord.MessageEmbed()
                        .setColor("#eb4c34")
                        .setTitle(`Successfully banned ${ban.username}#${ban.discriminator}`)
                        .setThumbnail(ban.avatarURL())
                        .setAuthor({ name: interaction.user.tag + ' ', iconURL: interaction.user.avatarURL() })
                        .setDescription(interaction.options.getString('reason') || "Reason Not specified")
                        .setTimestamp()
                    interaction.followUp({ embeds: [ban_embed] })
                })
                .catch((err) => {
                    const ban_embed = new Discord.MessageEmbed()
                        .setColor("#eb4c34")
                        .setTitle(`Error`)
                        .setAuthor({ name: interaction.user.tag + ' ', iconURL: interaction.user.avatarURL() })
                        .setDescription(`Warning we couldnt ban user: ${item}`)
                        .setTimestamp()
                    interaction.followUp({ embeds: [ban_embed] })
                })
        })

    }
}