const Discord = require("discord.js")
const Casino = require("../../../models/casino.js")
const Lottery = require("../../../models/lottery.js")
const schedule = require("node-schedule")
module.exports.run = async (bot) => {
return
var rule = new schedule.RecurrenceRule()
rule.hour = 20
rule.minute = 0

var j = schedule.scheduleJob(rule, function(){

var date = new Date().toString().split(" ")
var day = `${date[1]} ${date[2]} ${date[3]} ${date[4]}`
var channel = bot.guilds.cache.get("")
channel = channel.channels.cache.get("")
var lotteryAmount = 0
var winners = ["189387598928674816"]
var winnersString = ""
if(!channel) return console.log("Casino lottery - text channel not found")


Lottery.find({
}, (err, lotteries) => {
if(err) console.log(err)
if(!lotteries) lotteryAmount = 0
if(lotteries) lotteryAmount = lotteries.length
})

Lottery.findOne({
    drawed: "Active"
}, (err, lottery) => {
if(err) console.log(err)
if(!lottery) return channel.send("No active lottery was found")
var winningNumber = 0.0035
for(i = 0; i < lottery.participants.length; i++){
    for(y = 0; y < lottery.participants[i].tickets.length; y++){
        number = Math.random()
        if(number <= winningNumber) winners.push(lottery.participants[i].id)
    }
}
if(!winners.length){
    return channel.send(`Nobody won the lottery. Prize is now ${Math.round(lottery.prize)} credits!`)
}
if(winners.length === 1){
    Casino.findOne({
        userID: winners[0].id
    }, (err, casino) => {
    if(err) console.log(err)
    if(!casino){
        var casino = new Casino({
            userID: winners[0].id
        })
    }
    if(!casino.balance) casino.balance = 0
    amount = Math.round(lottery.prize)
    casino.balance = casino.balance + amount
    casino.save().catch(err => console.log(err))
    })
    lottery.drawed = day
    if(!lottery.winners) lottery.winners = []
    lottery.winners.push(winners[0])
    lottery.save().catch(err => console.log(err))
    return channel.send(`**Winner!**\nCongratulations to <@${winners[0]}> for winning ${Math.round(lottery.prize)} credits!`)
}
if(winners.length >= 2){
    for(i = 0; i < winners.length; i++){
        Casino.findOne({
            userID: winners[i]
        }, (err, casino) => {
        if(err) console.log(err)
        if(!casino){
            var casino = new Casino({
                userID: winners[i]
            })
        }
        if(!casino.balance) casino.balance = 0
        amount = Math.round(lottery.prize / winners.length)
        casino.balance = casino.balance + amount
        casino.save().catch(err => console.log(err))
        })
        if(!lottery.winners) lottery.winners = []
        lottery.winners.push(winners[i])
    }
    lottery.drawed = day
    lottery.save().catch(err => console.log(err))
    for(i = 0; i < winners.length; i++){
        winnersString = winnersString + `<@${winners[i]}>\n`
    }
    return channel.send(`**Multiple winners!**\nCongratulations to:\n${winnersString}Each of the winners received ${Math.round(lottery.prize / winners.length)} credits.`)
}

})
})
}
