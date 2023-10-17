const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args, ops, userObj) => {

casinoChannels = ["", ""]
if(message.author.id !== "" && message.guild.id !== "" && !casinoChannels.includes(message.channel.id)) return

if(message.author.id === "" || message.member.roles.cache.some(role => role.id === "")){
async function findUser(){
    var callingFile = "casino/mystats.js"
    var commandFile = require("../../auto/findUser.js")
    return await commandFile.run(bot, message, args, ops, callingFile)
}

var taggedUser = message.mentions.users.first()

if(args[0] && !taggedUser){
    if(!userObj) return findUser()
} else {
    if(!taggedUser){
        var player = message.author
    }
}
if(taggedUser){
    var player = taggedUser
}
if(userObj){
    var player = userObj.user
}
} else {
    var player = message.author
}

Casino.findOne({
    userID: player.id
}, (err, casino) => {
if(err) console.log(err)
if(!casino) casino = {}
if(!casino.balance) casino.balance = 0
if(!casino.withdrawals) casino.withdrawals = []
if(!casino.deposits) casino.deposits = []
if(!casino.stats) casino.stats = []

var deposits = []
var withdrawals = []
var totalDeposits = 0
var totalWithdrawals = 0
var commands = ["boom", "croulette", "cf", "fire"]


for(i = casino.deposits.length - 1; i >= 0; i--){
    totalDeposits = totalDeposits + casino.deposits[i].value
    if(deposits.length <= 9) deposits.push(casino.deposits[i])
}

for(i = casino.withdrawals.length - 1; i >= 0; i--){
    totalWithdrawals = totalWithdrawals + casino.withdrawals[i].value
    if(withdrawals.length <= 9) withdrawals.push(casino.withdrawals[i])
}

if(!withdrawals.length){
    withdrawals.push({date: "None", value: "None"})
}
if(!deposits.length){
    deposits.push({date: "None", value: "None"})
}


var embed = new Discord.MessageEmbed()
.setAuthor(`${player.username}'s casino statistics`, player.displayAvatarURL())
.setColor(0xff1493)
.setDescription(`**Total deposits:** ${totalDeposits}\n**Total withdrawals:** ${totalWithdrawals}`)
.addField("Deposits - date (last 10)", `${deposits.map(d => d.date).join("\n")}`, true)
.addField("Deposits - amount (last 10)", `${deposits.map(d => d.value).join("\n")}`, true)
.addField("\u200b", `\u200b`, true)
.addField("Withdrawals - date (last 10)", `${withdrawals.map(w => w.date).join("\n")}`, true)
.addField("Withdrawals - amount (last 10)", `${withdrawals.map(w => w.value).join("\n")}`, true)
.addField("\u200b", `\u200b`, true)
var n = 0
for(i = 0; i < commands.length; i++){
    var searchIndex = casino.stats.map(function(item){return item.command}).indexOf(commands[i])
    if(searchIndex !== -1){
        embed.addField("Command", `Name: ${casino.stats[searchIndex].command}\nUsed: ${casino.stats[searchIndex].uses} times\nWon: ${casino.stats[searchIndex].won} coins\nLost: ${casino.stats[searchIndex].lost} coins`, true)
        n++
    }
    if(casino.stats.length > 1 && n / 2 === Math.floor(n/2)){
        embed.addField("\u200b", `\u200b`, true)
    }
}

return message.channel.send(embed)
})

}

module.exports.help = {
    name: "mystats",
    description: "",
    availability: ""
}
