const {SlashCommandBuilder} = require("@discordjs/builders")
const Terrorists = require("../../models/terrorists.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tlink")
        .setDescription("Link a player to their Discord account")
        .addStringOption(option =>
            option.setName("name")
            .setDescription("Player name")
            .setRequired(true))
        .addUserOption(option =>
            option.setName("user")
            .setDescription("Discord name")
            .setRequired(true)),
    async execute(interaction){
        try {

            var name = interaction.options.getString("name")
            var user = interaction.options.getUser("user")
            
            Terrorists.findOne({
                name: name
            }, (err, terrorist) => {
                if(err) console.log(err)
                if(!terrorist) return interaction.reply("Member not found")
                if(!terrorist.id){
                    terrorist.id = user.id
                    interaction.reply(`${terrorist.name} has been linked as ${user.tag}`)
                } else {
                    terrorist.id = ""
                    interaction.reply(`${terrorist.name} is no longer linked as ${user.tag}`)
                }
                terrorist.save().catch(err => console.log(err))
            })

    } catch(err) {
        if(err) console.log(err)
}
},
category: "saur"
}