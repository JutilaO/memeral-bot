const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("Manage music command restrictions")
        .addStringOption(option => 
            option.setName("action")
            .setDescription("Action")
                .addChoice("All", "all")
                .addChoice("Some", "some")
                .addChoice("None", "none")
                .addChoice("Help", "help")
            .setRequired(true)),
    async execute(interaction){
        try {
            var user_id = interaction.user.id
            var guild_id = interaction.member.guild.id
            var action = interaction.options.getString("action")
            
            if(action === "help"){
                var embed = new Discord.MessageEmbed()
                .setTitle(`Memeral music command restrictions`)
                .setDescription(`In case there's a bunch of trolls ruining your music experience, you can restrict the commands by using this command.`)
                .addField("All", `Limits all music commands excluding lists to DJs and staff members.\nUsage: 'music all'`)
                .addField("Some", `Limits commands that can be used to troll to DJs and staff members.\nUsage: 'music some'`)
                .addField("None", `Unrestricted.\nUsage: 'music none'`)
                .setColor(0xff1493)
                return interaction.reply({embeds: [embed]})
            }
            
            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild){
                    var guild = new guildSettings({
                        guildID: guild_id
                    })
                }
                if(!guild.music) guild.music = ""
                if(!guild.moderators) guild.moderators = []
                if(guild.moderators.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR")){
                    manageMusicSettings()
                }

                function manageMusicSettings(){
                    guild.music = action
                    guild.save().catch(err => console.log(err))
                    return interaction.reply(`Music command restrictions changed to **${action}**`)
                }
            })
            
    } catch(err) {
        if(err) console.log(err)
}
},
category: "guild"
}