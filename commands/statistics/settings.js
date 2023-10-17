const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("settings")
        .setDescription("View server settings"),
    async execute(interaction){
        try {


var guild_id = interaction.guild.id
var channel_id = interaction.channelId
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
    if(!guild.modroles) guild.modroles = []
    if(!guild.adminroles) guild.adminroles = []
    if(!guild.moderators) guild.moderators = []
    if(!guild.music) guild.music = ""


guildObject = bot.guilds.cache.get(guild_id)
const embed = new Discord.MessageEmbed()
.setTitle(`Guild settings \n --------------------------------------------------------------------`)
.setColor(0xff1493)
.setThumbnail(guildObject.iconURL())
.setTimestamp()


    if(guild.logchannel){
        embed.addField(`Log channel:`, `<#${guild.logchannel}>`)
    } else embed.addField(`Log channel:`, `None`)
    if(guild.botchannel.length){
        botchannels = ""
        for(i = 0; i < guild.botchannel.length; i++){
           botchannels = botchannels + ` <#${guild.botchannel[i]}>\n`
        }
        embed.addField("Bot channel:", botchannels)
    } else embed.addField(`Bot channel:`, "None")
    if(guild.moderators.length){
        embed.addField(`Moderators:`, `${guild.moderators.length}`, true)
    } else  embed.addField(`Moderators:`, `None`, true)
    if(guild.music){
        embed.addField(`Music restriction:`, guild.music)
    }
    if(guild.modroles.length){
        var modRoles = ""
        for(i = 0; i < guild.modroles.length; i++){
            modRoles = modRoles + `<@&${guild.modroles[i]}>\n`
        }
        embed.addField("Moderator roles:", modRoles)
    }
    return interaction.reply({embeds: [embed], ephemeral: ephemeral})
})
    } catch(err) {
        if(err) console.log(err)
}
},
category: "statistics"
}