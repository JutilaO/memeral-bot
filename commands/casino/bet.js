const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args) => {

var casinoChannels = []
if(message.author.id !==  && !casinoChannels.includes(message.channel.id)) return

var side = args[0]
var amount = parseInt(args[1])
if(!side) return message.channel.send("Correct usage: 'bet [military-terrorists-draw] [amount]'")
if(!amount) return message.channel.send("Correct usage: 'bet [military-terrorists-draw] [amount]'")
side = side.toLowerCase()
if(side !== "military" && side !== "terrorists" && side !== "draw") return message.channel.send("Correct usage: 'bet [military-terrorists-draw] [amount]'")
if(isNaN(amount)) return message.channel.send("Amount must be a number")
var date = new Date().toString().split(" ")
var day = `${date[1]} ${date[2]} ${date[3]} ${date[4]}`
if(amount < 50) return message.channel.send("You must bet at least 50 credits")
if(side === "military") side = "Military"
if(side === "terrorists") side = "Terrorists"
if(side === "draw") side = "Draw"
if(amount < 0) return message.channel.send("Amount must be a positive number")
if(amount > 1000) return message.channel.send("You cannot bet above 1000 credits")

Casino.findOne({
    userID: message.author.id
}, (err, casino) => {
    if(err) console.log(err)
    if(!casino) casino = {}
    if(!casino.bets) casino.bets = []
    if(!casino.balance) casino.balance = 0
    if(casino.balance < amount){
        return message.channel.send(`You don't have enough credits. You need ${amount - casino.balance} credits more!`)
    }
    var searchIndex = casino.bets.map(function(item){return item.active}).indexOf(true)
    if(searchIndex !== -1) return message.channel.send("You already have an active bet! You cannot bet again until the event has concluded!")

    casino.bets.push({
        side: side,
        amount: amount,
        created: day,
        active: true
    })
    casino.balance = casino.balance - amount
    casino.save().catch(err => console.log(err))
    return message.channel.send(`You have successfully placed a bet of ${amount} credits on ${side}!`)
})


}

module.exports.help = {
    name: "bet",
    description: "",
    availability: ""
}
