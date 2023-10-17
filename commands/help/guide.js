const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("guide")
        .setDescription("Tiny guide about Memeral"),
    async execute(interaction){
        try {
        var embed = new Discord.MessageEmbed()
        .setTitle(`Memeral - quickstart`)
        .setColor(0xff1493)
        .setTimestamp()
        .addField("1.", "Most of Memeral’s command require a “bot channel”, which you can set by using >botchannel add #channel-name")
        .addField("2.", "2. Browse the commands using the help command, in which you can change the page by clicking on the arrow reactions!")
        return interaction.reply({embeds: [embed], ephemeral: true})
            
    } catch(err) {
        if(err) console.log(err)
}
},
category: "help"
}