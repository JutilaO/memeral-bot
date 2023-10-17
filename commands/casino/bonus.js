const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args) => {

if(message.author.id === "" || message.member.roles.cache.some(role => role.id === "")){
    giveBonus()
}
    

function giveBonus(){

var user = args[0]
var person = message.mentions.users.first()
if(!user) return message.channel.send("Correct usage: bonus [name] [amount] [wager]")
if(!person) return message.channel.send("Correct usage: bonus [name] [amount] [wager]")
if(!args[2]) return message.channel.send("Correct usage: bonus [name] [amount] [wager]")
if(isNaN(args[2])) return message.channel.send("Amount must be a number")
if(!args[2]) return message.channel.send("Correct usage: bonus [name] [amount] [wager]")
if(isNaN(args[2])) return message.channel.send("Amount must be a number")

var amount = parseInt(args[1])
var date = new Date().toString().split(" ")

Casino.findOne({
    userID: person.id
}, (err, casino) => {
if(err) console.log(err)
if(!casino){
    var casino = new Casino({
    userID: person.id
    })
}
if(!casino.bonus) casino.bonus = 0
if(!casino.wagerFactor) casino.wagerx = 0
casino.bonus = amount
casino.wagerx = args[2]
casino.save().catch(err => console.log(err))
return message.channel.send(`Added **${casino.bonus}% with ${casino.wagerx}x wager** bonus to ${user}`)
})
}
}

module.exports.help = {
    name: "bonus",
    description: "",
    availability: ""
}
