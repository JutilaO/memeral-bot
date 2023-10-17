const Discord = require("discord.js")
const Casino = require("../../../models/casino.js")
module.exports.run = async (message, winAmount, betAmount, command) => {
return
Casino.findOne({
    userID: message.author.id
}, (err, casino) => {
if(err) console.log(err)
if(!casino){
    var casino = new Casino({
        userID: message.author.id
    })
}

if(!casino.bonusmoney) casino.bonusmoney = 0
if(!casino.wager) casino.wager = 0
if(!casino.balance) casino.balance = 0
if(!casino.stats) casino.stats = []

if(casino.bonusmoney >= betAmount){
    casino.bonusmoney = casino.bonusmoney - betAmount
    if(casino.wager > 0){
        casino.wager = casino.wager - betAmount
    }
} else {
var needed = betAmount - casino.bonusmoney
if(casino.balance >= needed){
    casino.bonusmoney = casino.bonusmoney - (betAmount - needed)
    if(casino.wager > 0){
        casino.wager = casino.wager - (betAmount - needed)
    }
    casino.balance = casino.balance - needed
} else {
if(casino.balance >= betAmount){
    casino.balance = casino.balance - betAmount
}
}
}

if(winAmount > 0){
    if(casino.wager > 0){
        casino.bonusmoney = casino.bonusmoney + winAmount
        console.log(1)
    } else casino.balance = casino.balance + winAmount
    if(casino.wager <= 0 && casino.bonusmoney > 0){
        casino.balance = casino.balance + casino.bonusmoney
        casino.bonusmoney = 0
        message.channel.send("Congratulations! You successfully wagered your bonus money!")
    }
    var searchIndex= casino.stats.map(function(item){return item.command}).indexOf(command)
    if(searchIndex === -1){
        casino.stats.push({
            command: command,
            uses: 1,
            won: winAmount - betAmount,
            lost: 0
        })
    } else {
        casino.stats[searchIndex].uses += 1
        casino.stats[searchIndex].won += winAmount - betAmount
        casino.markModified("stats")
    }
    casino.save().catch(err => console.log(err))
} else {
    if(casino.wager <= 0 && casino.bonusmoney > 0){
        casino.balance = casino.balance + casino.bonusmoney
        casino.bonusmoney = 0
        message.channel.send("Congratulations! You successfully wagered your bonus money!")
    }   
    if(casino.bonusmoney === 0) casino.wager = 0
    var searchIndex= casino.stats.map(function(item){return item.command}).indexOf(command)
    if(searchIndex === -1){
        casino.stats.push({
            command: command,
            uses: 1,
            won: 0,
            lost: betAmount
        })
    } else {
        casino.stats[searchIndex].uses += 1
        casino.stats[searchIndex].lost += betAmount
        casino.markModified("stats")
    }
    casino.save().catch(err => console.log(err))
}
})


}