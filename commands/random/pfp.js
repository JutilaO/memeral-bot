const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pfp")
        .setDescription("Large profile picture")
        .addSubcommand(subcommand => 
            subcommand
                .setName("user")
                .setDescription("@User whose pfp you would like to view")
                .addUserOption(option => 
                    option
                        .setName("tag")
                        .setDescription("Tag the user")
                        .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand
                .setName("me")
                .setDescription("Your profile picture")),
    async execute(interaction){
        try {

            var action = interaction.options.getSubcommand()
            if(action === "me"){
                var user = interaction.user
            }
            if(action === "user"){
                var user = interaction.options.getUser("tag")
            }

            const embed = new Discord.MessageEmbed()
            .setAuthor({name: user.username, icon: user.displayAvatarURL()})
            .setTitle(`Profile picture`)
            .setColor(0xff1493)
            .setImage(user.displayAvatarURL({size: 2048}))
            .setTimestamp()
            return interaction.reply({embeds: [embed]})

    } catch(err) {
        if(err) console.log(err)
}
},
category: "random"
}