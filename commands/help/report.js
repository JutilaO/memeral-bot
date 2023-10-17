const {SlashCommandBuilder} = require("@discordjs/builders")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("Report a bug")
        .addStringOption(option => 
            option.setName("description")
            .setDescription("Bug description")
            .setRequired(true)),
    async execute(interaction){
        try {
            var text = interaction.options.getString("description")
            if(text.length > 1800) return interaction.reply({content:"Text length is too high, please make it smaller", ephemeral: true})
            bot.channels.cache.get("").send(`**Name:** ${interaction.user.username} **ID:** ${interaction.user.id} \n**Guild:** ${interaction.guild.name} **ID:** ${interaction.guild.id}\n**Subject:**` + text)
            return interaction.reply({content: text, ephemeral: true})
    } catch(err) {
        if(err) console.log(err)
}
},
category: "help"
}
