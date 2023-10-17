const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args, userObj) => {

if(message.author.id !== "" && message.member.roles.cache.some(role => role.id !== "")) return

var totalDeposits = 0
var totalWithdrawals = 0
var statsArray = [{}, {}, {}, {}]
var totalBalance = 0

Casino.find({
}, (err, casino) => {
if(err) console.log(err)

for(i = 0; i < casino.length; i++){
if(!casino[i]) console.log("?")
if(!casino[i]) casino[i] = {}
if(!casino[i].balance) casino[i].balance = 0
if(!casino[i].withdrawals) casino[i].withdrawals = []
if(!casino[i].deposits) casino[i].deposits = []
if(!casino[i].stats) casino[i].stats = []
totalBalance += casino[i].balance

for(y = 0; y < casino[i].deposits.length; y++){
    totalDeposits += casino[i].deposits[y].value
}

for(y = 0; y < casino[i].withdrawals.length; y++){
    totalWithdrawals += casino[i].withdrawals[y].value
}


for(y = 0; y < casino[i].stats.length; y++){
    if(casino[i].stats[y].command === "boom"){
        if(!statsArray[0].uses) statsArray[0].uses = 0
        if(!statsArray[0].won) statsArray[0].won = 0
        if(!statsArray[0].lost) statsArray[0].lost = 0
        statsArray[0] = {
            uses: statsArray[0].uses + casino[i].stats[y].uses,
            won: statsArray[0].won + casino[i].stats[y].won,
            lost: statsArray[0].lost + casino[i].stats[y].lost
        }
    }
    if(casino[i].stats[y].command === "croulette"){
        if(!statsArray[1].uses) statsArray[1].uses = 0
        if(!statsArray[1].won) statsArray[1].won = 0
        if(!statsArray[1].lost) statsArray[1].lost = 0
        statsArray[1] = {
            uses: statsArray[1].uses + casino[i].stats[y].uses,
            won: statsArray[1].won + casino[i].stats[y].won,
            lost: statsArray[1].lost + casino[i].stats[y].lost
        }
    }
    if(casino[i].stats[y].command === "cf"){
        if(!statsArray[2].uses) statsArray[2].uses = 0
        if(!statsArray[2].won) statsArray[2].won = 0
        if(!statsArray[2].lost) statsArray[2].lost = 0
        statsArray[2] = {
            uses: statsArray[2].uses + casino[i].stats[y].uses,
            won: statsArray[2].won + casino[i].stats[y].won,
            lost: statsArray[2].lost + casino[i].stats[y].lost
        }
    }
    if(casino[i].stats[y].command === "fire"){
        if(!statsArray[3].uses) statsArray[3].uses = 0
        if(!statsArray[3].won) statsArray[3].won = 0
        if(!statsArray[3].lost) statsArray[3].lost = 0
        statsArray[3] = {
            uses: statsArray[3].uses + casino[i].stats[y].uses,
            won: statsArray[3].won + casino[i].stats[y].won,
            lost: statsArray[3].lost + casino[i].stats[y].lost
        }
    }
}

if(i === casino.length - 1) send()
}
function send(){
var embed = new Discord.MessageEmbed()
.setTitle(`Casino statistics`)
.setColor(0xff1493)
.setDescription(`**Total deposits:** ${totalDeposits}\n**Total withdrawals:** ${totalWithdrawals}\n**Total players:** ${casino.length}\n**Total balance:** ${totalBalance}`)
.addField("Command", `Name: Boom\nUsed: ${statsArray[0].uses} times\nWon: ${statsArray[0].won} coins\nLost: ${statsArray[0].lost} coins`, true)
.addField("Command", `Name: Roulette\nUsed: ${statsArray[1].uses} times\nWon: ${statsArray[1].won} coins\nLost: ${statsArray[1].lost} coins`, true)
.addField("Command", `Name: Coinflip\nUsed: ${statsArray[2].uses} times\nWon: ${statsArray[2].won} coins\nLost: ${statsArray[2].lost} coins`, true)
.addField("Command", `Name: Fire\nUsed: ${statsArray[3].uses} times\nWon: ${statsArray[3].won} coins\nLost: ${statsArray[3].lost} coins`, true)

return message.channel.send(embed)
}
})

}

module.exports.help = {
    name: "astats",
    description: "",
    availability: ""
}
