const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const {MessageAttachment} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("privacypolicy")
        .setDescription("Memeral's privacy policy"),
    async execute(interaction){
        try {
         const attachment = new MessageAttachment("privacypolicy.txt")
        interaction.reply({files: [attachment], ephemeral: true})
            
    } catch(err) {
        if(err) console.log(err)
}
},
category: "help"
}