const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")
var utils = require("../../utilities/notifications.js")
const Memeral = require("../../models/memeral.js")
const memeral = require("../../models/memeral.js")
module.exports.run = async (bot, botname) => {


    // User joined
bot.on("guildMemberAdd", (member) => {
    return
    var commandFile = require("./announcements.js")
    commandFile.run(bot, member, "join")
    var fieldTitle = "User joined"
    var fieldText = `Name: ${member.user.tag} ID: ${member.id}`
    utils.memberActionLog(member, fieldTitle, fieldText)
  
})


bot.on('guildBanAdd', async ban => {
    return
    if(member.guild.id !== "") return
    var commandFile = require("./announcements.js")
    console.log(1)
    commandFile.run(bot, member, "ban", guild)
    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });
    const banLog = fetchedLogs.entries.first();
    if(!banLog) return
    console.log(2)
    const { executor, target } = banLog;
    if (target.id === member.id) {
    var fieldTitle = "User banned"
    var fieldText = `Name: ${member.tag}\nBanned by: ${executor.tag}`
    utils.memberActionLog2(member, guild, fieldTitle, fieldText)
    } else {
    var fieldTitle = "User banned"
    var fieldText = `Name: ${member.tag}\nBanned by: Failed to retrieve username`
    utils.memberActionLog2(member, guild, fieldTitle, fieldText)
    }
})


return
// User left or was kicked
bot.on("guildMemberRemove", async (member) => {
      guildSettings.findOne({
        guildID: member.guild.id
      }, (err, guild) => {
        if(err) console.log(err)
        if(!guild) return
        if(guild){
          if(!guild.moderators) guild.moderators = []
          if(!guild.admins) guild.admins = []
          if(!guild.dj) guild.dj = []
          if(guild.moderators.includes(member.id)){
            guild.moderators = guild.moderators.filter(user => user !== member.id)
          }
          if(guild.admins.includes(member.id)){
            guild.admins = guild.admins.filter(user => user !== member.id)
          }
          if(guild.dj.includes(member.id)){
              guild.dj = guild.dj.filter(user => user !== member.id)
          }
          guild.save().catch(err => console.log(err))
        }
      })

      Memeral.findOneAndDelete({
        userID: member.id,
        guildID: member.guild.id
      }, (err, memeral) => {
        if(err) console.log(err)
    })
    
var commandFile = require("./announcements.js")
var fetchedLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_KICK',
});
var kickLog = fetchedLogs.entries.first()

var banLogs = await member.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_BAN_ADD',
});
var banLog = banLogs.entries.first()

if(!kickLog || kickLog.createdTimestamp < (Date.now() - 10000)){
    if(banLog && banLog.target.id === member.id && banLog.createdTimestamp > (Date.now() - 10000)) return
        commandFile.run(bot, member, "leave")
        var fieldTitle = "User left"
        var fieldText = `Name: ${member.user.tag} ID: ${member.id}`
        return utils.memberActionLog(member, fieldTitle, fieldText)
} else {
var { executor, target } = kickLog
if (target.id === member.id) {
    if(banLog && banLog.target.id === member.id && banLog.createdTimestamp > (Date.now() - 10000)) return
    commandFile.run(bot, member, "kick")
    var fieldTitle = "User kicked"
    var fieldText = `Name: ${member.user.tag}\nKicked by: ${executor.tag}`
    utils.memberActionLog2(member, member.guild, fieldTitle, fieldText)
    
}
}


})


// Role added or removed
bot.on("guildMemberUpdate", (oldMember, newMember) => {

    oldMemberRoles = oldMember.roles.cache.map(r => r.id)
    userRoles = newMember.roles.cache.map(r => r.id)
    newRole = ""
    oldRole = ""

    if(oldMemberRoles.length < userRoles.length){
        for(i = 0; i < userRoles.length; i++){
            if(!oldMemberRoles.includes(userRoles[i])) newRole = userRoles[i]
        }
        var roleName = bot.guilds.cache.get(oldMember.guild.id).roles.cache.get(newRole)
        var mute = bot.guilds.cache.get(oldMember.guild.id).roles.cache.find(r => r.name === "Muted")
        if(roleName === mute) return
        var fieldTitle = "Role added"
        var fieldText = `Name: ${newMember.user.tag}\n Role: ${roleName}`
        if(newRole) utils.memberActionLog(newMember, fieldTitle, fieldText)

    } else {
        for(i = 0; i < userRoles.length; i++){
            if(!userRoles.includes(oldMemberRoles[i])) oldRole = oldMemberRoles[i]
        }
        var roleName = bot.guilds.cache.get(oldMember.guild.id).roles.cache.get(oldRole)
        var mute = bot.guilds.cache.get(oldMember.guild.id).roles.cache.find(r => r.name === "Muted")
        if(roleName === mute) return
        var fieldTitle = "Role removed"
        var fieldText = `Name: ${newMember.user.tag}\n Role: ${roleName}`
        if(oldRole.length > 10) utils.memberActionLog(newMember, fieldTitle, fieldText)
    }

    var commandFile = require("../other/roleUpdate.js")
    commandFile.run(bot, oldMember, newMember)
    })
}
