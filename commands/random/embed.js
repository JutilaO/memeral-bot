const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Create an embed message")
        .addStringOption(option => 
            option
                .setName("title")
                .setDescription("Title of the embed")
                .setRequired(true))
        .addStringOption(option =>  
            option
                .setName("message")
                .setDescription("Message of the embed")
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

            var title = interaction.options.getString("title")
            var message = interaction.options.getString("message")
            var colortext = interaction.options.getString("color")
            
            if(colortext === "pink"){var color = 0xff1493}
            if(colortext === "red"){var color = 0xFF2D00}
            if(colortext === "orange"){var color = 0xFF8F00}
            if(colortext === "yellow"){var color = 0xFFE400}
            if(colortext === "green"){var color = 0x17FF00}
            if(colortext === "darkgreen"){var color = 0x247C05}
            if(colortext === "cyan"){var color = 0x04FADC}
            if(colortext === "blue"){var color = 0x0468FA}
            if(colortext === "darkblue"){var color = 0x0235B2}
            if(colortext === "black"){var color = 0x000000}
                
            const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTimestamp()
           .addField(title, message)
            return interaction.reply({embeds: [embed]})

    } catch(err) {
        if(err) console.log(err)
}
},
category: "random"
}