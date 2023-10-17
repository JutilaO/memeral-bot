const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
const Lottery = require("../../models/lottery.js")
module.exports.run = async (bot, message, args) => {

var casinoChannels = ["", "", "]
if(message.author.id !== "" && message.guild.id !== "" && !casinoChannels.includes(message.channel.id)) return

var amount = parseInt(args[0])
if(!amount) return message.channel.send("Correct usage: 'lottery [amount-of-tickets]'")
if(isNaN(amount)) return message.channel.send("Amount must be a number")
if(amount < 0) return message.channel.send("Amount must be a positive number")

var ticketPrice = 10 //10k
var date = new Date().toString().split(" ")
var day = `${date[1]} ${date[2]} ${date[3]} ${date[4]}`

Casino.findOne({
    userID: message.author.id
}, (err, casino) => {
if(err) console.log(err)
if(!casino){
    var casino = new Casino({
    userID: message.author.id
    })
}
if(!casino.balance){
    return message.channel.send(`You don't have enough money. You need ${amount * ticketPrice} more!`)
}
if(casino.balance < amount * ticketPrice){
    return message.channel.send(`You don't have enough money. You need ${amount * ticketPrice - casino.balance} more!`)
}
casino.balance = casino.balance - amount * ticketPrice

Lottery.findOne({
    drawed: "Active"
}, (err, lottery) => {
if(err) console.log(err)
if(!lottery){
    var lottery = new Lottery({
        id: 1,
        prize: 500,
        participants: [],
        created: day,
        drawed: "Active"
    })
}
lottery.prize = lottery.prize + amount * ticketPrice * 0.80
var searchIndex = lottery.participants.map(function(item){return item.id}).indexOf(message.author.id)
if(searchIndex === -1){
    lottery.participants.push({
        id: message.author.id,
        tickets: [{amount: amount, date: day}]
    })
} else {
    lottery.participants[searchIndex].tickets.push({amount: amount, date: day})
    lottery.markModified('participants')
}
lottery.save().catch(err => console.log(err))
casino.save().catch(err => console.log(err))
return message.channel.send(`You bought ${amount} tickets for ${amount * ticketPrice} credits! Good luck!`)
})
})



}

module.exports.help = {
    name: "lottery",
    description: "",
    availability: ""
}
