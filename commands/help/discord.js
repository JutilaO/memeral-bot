const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("discord")
        .setDescription("Memeral Discord server invite link"),
    async execute(interaction){
        try {
            interaction.reply("")
    } catch(err) {
        if(err) console.log(err)
}
},
category: "help"
}
