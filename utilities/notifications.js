const Discord = require("discord.js")
const {botname, logchannel} = require("../config.json")
const guildSettings = require("../models/guildSettings.js");
module.exports.actionLog = (message, fieldTitle, fieldText) => {


let embed = new Discord.MessageEmbed()
.setColor(0xff1493)
.setTitle(`${botname} notifications`)
.setTimestamp()
.addField(fieldTitle, fieldText)
if(!message) return
guildSettings.findOne({
    guildID: message.guild.id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild) return
    if(!guild.logchannel) return
    if(guild.logchannel){
        logChannel = message.guild.channels.cache.get(guild.logchannel)
        if(!logChannel) return
        logChannel.send(embed)
    }
})
}

module.exports.memberActionLog = (member, fieldTitle, fieldText) => {
let embed = new Discord.MessageEmbed()
.setColor(0xff1493)
.setTitle(`${botname} notifications`)
.setTimestamp()
.addField(fieldTitle, fieldText)

if(!member) return
guildSettings.findOne({
    guildID: member.guild.id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild) return
    if(!guild.logchannel) return
    if(guild.logchannel){
        logChannel = member.guild.channels.cache.get(guild.logchannel)
        if(!logChannel) return
        logChannel.send(embed)
    }
})
}

module.exports.memberActionLog2 = (member, thisGuild, fieldTitle, fieldText) => {
let embed = new Discord.MessageEmbed()
.setColor(0xff1493)
.setTitle(`${botname} notifications`)
.setTimestamp()
.addField(fieldTitle, fieldText)

if(!member) return
guildSettings.findOne({
    guildID: thisGuild.id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild) return
    if(!guild.logchannel) return
    if(guild.logchannel){
        logChannel = thisGuild.channels.cache.get(guild.logchannel)
        if(!logChannel) return
        logChannel.send(embed)
    }
})

}

module.exports.muteEmbed = (member, user, targetUser, length, reason) => {
    let embed = new Discord.MessageEmbed()
    .setColor(0xff1493)
    .setTitle(`${botname} notifications`)
    .setTimestamp()
    .setDescription(`User muted for ${length} minute(s)!`)
    .addField("Staff member", user, true)
    .addField("Target user", targetUser, true)
    .addField("Reason", reason)
    
    if(!member) return
    guildSettings.findOne({
        guildID: member.guild.id
    }, (err, guild) => {
        if(err) console.log(err)
        if(!guild) return
        if(!guild.logchannel) return
        if(guild.logchannel){
            logChannel = member.guild.channels.cache.get(guild.logchannel)
            if(!logChannel) return
            logChannel.send(embed)
        }
    })
    
}
    
    

