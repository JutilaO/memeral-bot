const Discord = require("discord.js")
const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Memeral invite link"),
    async execute(interaction){
        try {
            var embed = new Discord.MessageEmbed()
            .setTitle("Memeral invite links")
            .setColor(0xff1493)
            .setDescription("Click on the link with the permissions you prefer.")
            .addField("1. Administrator", "")
            .addField("2. Required (recommended)", "")
            .addField("3. No permissions", "")
            .setFooter({text: "You can also click on Memeral to invite it into a server"})
            return interaction.reply({embeds: [embed]})
    } catch(err) {
        if(err) console.log(err)
}
},
category: "help"
}
