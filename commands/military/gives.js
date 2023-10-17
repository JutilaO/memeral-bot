const {SlashCommandBuilder} = require("@discordjs/builders")
const Military = require(`../../models/military.js`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gives")
        .setDescription("Give Military spins")
        .addUserOption(option =>
            option.setName("name")
            .setDescription("Name of the soldier")
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName("amount")
            .setDescription("Amount")
            .setRequired(true)),
    async execute(interaction){
        try {
            if(!interaction.member.roles.cache.some(role => role.id === "") && !interaction.member.roles.cache.some(role => role.id === "") && !interaction.member.roles.cache.some(role => role.id === "")){
                return interaction.reply("You don't have access to this command")
            }
            var targetUser = interaction.options.getUser("name")
            var amount = parseInt(interaction.options.getInteger("amount"))
            Military.findOne({
                userID: targetUser.id,
                guildID: interaction.guild.id
            }, (err, military) => {
                if(err) console.log(err)
                if(!military){
                    var military = new Military({
                        userID: targetUser.id,
                        guildID: interaction.guild.id
                    })
                } 
                if(!military.miliSpins) military.miliSpins = 0
                military.miliSpins = military.miliSpins + parseInt(amount)
                military.save().catch(err => console.log(err))
                return interaction.reply(`**${amount}** Military spins given to ${targetUser.username}`)
                
             })
    } catch(err) {
        if(err) console.log(err)
}
},
category: "military"
}
