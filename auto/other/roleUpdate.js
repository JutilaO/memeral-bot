const Discord = require("discord.js")
const schedule = require("node-schedule")
const guildSettings = require("../../models/guildSettings.js")
module.exports.run = async (bot, oldUser, newUser) => {
return
guildSettings.findOne({
    guildID: newUser.guild.id
}, (err, guild) => {

if(err) console.log(err)
if(!guild) return
if(!guild.moderators) guild.moderators = []
if(!guild.admins) guild.admins = []
if(!guild.modroles) guild.modroles = []
if(!guild.adminroles) guild.adminroles = []
if(!guild.modroles.length && !guild.adminroles.length) return

var oldUserRoles = oldUser.roles.cache.map(r => r.id)
var userRoles = newUser.roles.cache.map(r => r.id)
if(!oldUserRoles) return
if(!userRoles) return
var removeOrAdd = ""
var newRole = ""

if(oldUserRoles.length < userRoles.length){
    removeOrAdd = "add"
    for(i = 0; i < userRoles.length; i++){
        if(!oldUserRoles.includes(userRoles[i])) newRole = userRoles[i]
    }
} else {
    removeOrAdd = "remove"
    for(i = 0; i < userRoles.length; i++){
        if(!userRoles.includes(oldUserRoles[i])) newRole = oldUserRoles[i]
    }
}


if(removeOrAdd === "add"){
    if(guild.adminroles.includes(newRole)){
        if(!guild.admins.includes(newUser.user.id)){
            guild.admins.push(newUser.user.id)
            guild.save().catch(err => console.log(err))
        }
    } else
    if(guild.modroles.includes(newRole)){
        if(!guild.moderators.includes(newUser.user.id)){
            guild.moderators.push(newUser.user.id)
            guild.save().catch(err => console.log(err))
        }
    }
}

if(removeOrAdd === "remove"){
if(!guild.moderators.includes(newUser.user.id) && !guild.admins.includes(newUser.user.id)) return
    if(guild.modroles.includes(newRole)){
        if(guild.moderators.includes(newUser.user.id)){
            guild.moderators = guild.moderators.filter(user => user !== newUser.user.id)
            guild.save().catch(err => console.log(err))
        }
    }
    if(guild.adminroles.includes(newRole)){
        if(guild.admins.includes(newUser.user.id)){
            guild.admins = guild.admins.filter(user => user !== newUser.user.id)
            guild.save().catch(err => console.log(err))
        }
    }

}
})
}
