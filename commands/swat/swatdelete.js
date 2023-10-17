const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
var SWAT = require("../../models/swat.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("swatdel")
        .setDescription("Vanish an officer from the database")
            .addStringOption(option =>
                option
                    .setName("name")
                    .setDescription("Officer name")
                    .setRequired(true)),
    async execute(interaction){
        try {

var name = interaction.options.getString("name")
var user_id = interaction.user.id

if(user_id !== "") return interaction.reply("You don't have access to this command")

SWAT.findOneAndDelete({
    name: name
}, (err, swat) => {
    if(err) console.log(err)
    if(!swat) return interaction.reply(`I couldn't find ${name} in the SWAT database`)
    return interaction.reply(`Deleted ${name} from SWAT database`)
})
    } catch(err) {
        if(err) console.log(err)
}
},
category: "swat"
}
