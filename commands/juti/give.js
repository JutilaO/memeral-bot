const Discord = require("discord.js")
const Memeral = require("../../models/memeral.js")
module.exports.run = async (bot, message, args) => {

if(message.author.id === ""){
    giveCoins()
}

function giveCoins(){

var user = args[0]
var person = message.mentions.users.first()
if(!user) return message.channel.send("Tag someone idiot")
if(!person) return message.channel.send("Tag user idiot")
if(!args[1]) return message.channel.send("Input money idiot")
if(isNaN(args[1])) return message.channel.send("Money = number idiot")

var amount = parseInt(args[1])

Memeral.findOne({
    userID: person.id,
    guildID: message.guild.id
}, (err, memeral) => {
    if(err) console.log(err)
        if(!memeral){
            var memeral = new Memeral({
            userID: person.id,
            guildID: message.guild.id,
            money: amount
            })
        memeral.save().catch(err => console.log(err))
        return message.channel.send(`Added ${amount} coins to some idiot`)
    } else {
        if(!memeral.money) memeral.money = 0
        memeral.money = memeral.money + amount
        memeral.save().catch(err => console.log(err))
        return message.channel.send(`Added ${amount} coins to some idiot`)
    }
})
}
}

module.exports.help = {
    name: "give",
    description: "Give money",
    availability: ""
 }
