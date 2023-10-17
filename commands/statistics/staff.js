const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("staff")
        .setDescription("View server staff"),
    async execute(interaction){
        try {


var guild_id = interaction.guild.id
var channel_id = interaction.channelId
var guild_thumbnail = interaction.guild.iconURL()
var ephemeral = false


guildSettings.findOne({
    guildID: guild_id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild){
        var guild = new guildSettings({
            guildID: guild_id
        })
    } 
    if(!guild.botchannel) guild.botchannel = []
    if(!guild.botchannel.length) ephemeral = true
    if(!guild.botchannel.includes(channel_id)) ephemeral = true
    if(!guild.admins) guild.admins = []
    if(!guild.moderators) guild.moderators = []
    if(!guild.dj) guild.dj = []



const embed = new Discord.MessageEmbed()
.setTitle(`Guild staff \n --------------------------------------------------------------------`)
.setColor(0xff1493)
.setThumbnail(guild_thumbnail)
.setTimestamp()

if(guild.moderators.length){
    text = ""
    for(i = 0; i < guild.moderators.length; i++){
        text = text + `<@${guild.moderators[i]}>\n`
    }
    embed.addField(`Moderators:`, text)
} else  embed.addField(`Moderators:`, `None`)

if(guild.dj.length){
    text = ""
    for(i = 0; i < guild.dj.length; i++){
        text = text + `<@${guild.dj[i]}>\n`
    }
    embed.addField(`DJs:`, text)
} else  embed.addField(`DJs:`, `None`)
    return interaction.reply({embeds: [embed], ephemeral: ephemeral})
})


    } catch(err) {
        if(err) console.log(err)
}
},
category: "statistics"
}