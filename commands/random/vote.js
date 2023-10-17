const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("Give another user a reputation point")
        .addStringOption(option => 
            option
                .setName("title")
                .setDescription("Vote title")
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName("content")
                .setDescription("Vote content")
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName("color")
                .setDescription("Color of the embed")
                    .addChoice("Pink", "pink")
                    .addChoice("Red", "red")
                    .addChoice("Orange", "orange")
                    .addChoice("Yellow", "yellow")
                    .addChoice("Green", "green")
                    .addChoice("Darkgreen", "darkgreen")
                    .addChoice("Cyan", "cyan")
                    .addChoice("Blue", "blue")
                    .addChoice("Darkblue", "darkblue")
                    .addChoice("Black", "black")
                .setRequired(true)),
    async execute(interaction){
        try {

           var user_id = interaction.user.id
           var guild_id = interaction.guild.id
           var target = interaction.options.getUser("tag")

           guildSettings.findOne({
            guildID: guild_id
        }, (err, guild) => {
            if(err) console.log(err)
            if(!guild){
                var guild = new guildSettings({
                    guildID: guild_id
                })
            }
            if(!guild.moderators) guild.moderators = []
            if(guild.moderators.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR") || interaction.member.permissions.has("MANAGE_CHANNELS")){
                vote()
            } else return interaction.reply({content: "You don't have the permissions to do this", ephemeral: true})
        })
        
        async function vote(){
        
        var title = interaction.options.getString("title")
        var content = interaction.options.getString("content")
        var colorChosen = interaction.options.getString("color")
        var color = 0xff1493
        if(colorChosen === "pink") var color = 0xff1493; 
        if(colorChosen === "red") var color = 0xFF2D00;
        if(colorChosen === "orange") var color = 0xFF8F00; 
        if(colorChosen === "yellow") var color = 0xFFE400; 
        if(colorChosen === "green") var color = 0x17FF00; 
        if(colorChosen === "darkgreen") var color = 0x247C05; 
        if(colorChosen === "cyan") var color = 0x04FADC; 
        if(colorChosen === "blue") var color = 0x0468FA; 
        if(colorChosen === "darkblue") var color = 0x0235B2; 
        if(colorChosen === "black") var color = 0x000000; 
        
        const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(content)
        .setColor(color)
        .setFooter({text: `Vote started by ${interaction.user.tag}`})
        .setTimestamp()
        int = await interaction.reply({embeds: [embed], fetchReply: true})
        int.react("❎").then(i => {
            int.react("✅")
        })
        }

    } catch(err) {
        if(err) console.log(err)
}
},
category: "random"
}