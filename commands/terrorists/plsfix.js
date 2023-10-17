const Discord = require("discord.js")
const Terrorists = require("../../models/terrorists.js")
module.exports.run = async (bot, message, args) => {

if(message.guild.id !== "") return

if(message.author.id !== "" && !message.member.roles.cache.some(role => role.id === "")) return message.channel.send("You do not have access to this command!")

var name = args[0]
var type = args[1]
if(type) type = type.toLowerCase()
var amount = parseInt(args[2])
var activityArray = [
    ["wzj", "Warzone joined"],
    ["wzl", "Warzone led"],
    ["ddj", "Doomsday joined"],
    ["ddl", "Doomsday led"],
    ["at", "Ammo Transport attacked"],
    ["trl", "Trainings led"],
    ["trj", "Trainings joined"],
    ["scj", "Securicar attacked"],
    ["androj", "Andromada joined"],
    ["androl", "Andromada led"],
    ["r", "Robbery joined"],
    ["ctam", "Andromada attacked"],
    ["amj", "Assault Mission joined"],
    ["aml", "Assault Mission led"]
]


var activityShort = []
var activityDetail = []
var activityType = ""

for(i = 0; i < activityArray.length; i++){
    console.log(activityArray[i])
    activityShort.push(activityArray[i][0])
    activityDetail.push(activityArray[i][1])
    if(activityArray[i][0] === type) activityType = activityArray[i][1]
}


var embed = new Discord.MessageEmbed()
.setColor(0x137515)
.setTitle(`Terrorists weekly statistics editor`)
.setDescription(`Usage: plsfix Name activity amount\nTo remove, use "-" before amount`)
.addField("Activities", activityShort.join("\n"), true)
.addField("Explanation", activityDetail.join("\n"), true)

if(!name) return message.channel.send(embed)
if(!type) return message.channel.send(embed)
if(!amount) return message.channel.send(embed)
if(!activityShort.includes(type)) return message.channel.send(embed)






Terrorists.findOne({
    name: name
}, (err, terrorist) => {
    if(err) console.log(err)
    if(!terrorist) return message.channel.send("Member not found")
    if(!terrorist.name) terrorist.name = "Al Qaida"
    if(!terrorist.wz) terrorist.wz = {joined: 0, hosted: 0}
    if(!terrorist.dd) terrorist.dd = {joined: 0, hosted: 0}
    if(!terrorist.trainings) terrorist.trainings = {joined: 0, hosted: 0}
    if(!terrorist.robberies) terrorist.robberies = 0
    if(!terrorist.am) terrorist.am = {joined: 0, hosted: 0}
    if(!terrorist.andro) terrorist.andro = {counter: 0, joined: 0, hosted: 0}
    if(!terrorist.sc) terrorist.sc = 0
    if(!terrorist.at) terrorist.at = 0

    if(type === "wzj") terrorist.wz.joined += amount, terrorist.markModified('wz')
    if(type === "wzl") terrorist.wz.hosted += amount, terrorist.markModified('wz')
    if(type === "ddj") terrorist.dd.joined += amount, terrorist.markModified('dd')
    if(type === "ddl") terrorist.dd.led += amount, terrorist.markModified('dd')
    if(type === "at") terrorist.at += amount
    if(type === "trl") terrorist.trainings.hosted += amount, terrorist.markModified('trainings')
    if(type === "trj") terrorist.trainings.joined += amount, terrorist.markModified('trainings')
    if(type === "sc") terrorist.sc += amount
    if(type === "androj") terrorist.andro.joined += amount, terrorist.markModified('andro')
    if(type === "androl") terrorist.andro.hosted += amount, terrorist.markModified('andro')
    if(type === "r") terrorist.robberies += amount
    if(type === "ctam") terrorist.andro.counter += amount, terrorist.markModified('andro')
    if(type === "amj") terrorist.am.joined += amount, terrorist.markModified('am')
    if(type === "aml") terrorist.am.hosted += amount, terrorist.markModified('am')
    
    terrorist.save().catch(err => console.log(err))

    if(amount >= 1){
        return message.channel.send(`Added ${amount} ${activityType} to ${name}!`)
    } else {
        return message.channel.send(`Removed ${Math.abs(amount)} ${activityType} from ${name}!`)
    }
})

}


module.exports.help = {
    name: "plsfix",
    description: "Edit weekly statistics",
    availability: ""
}
