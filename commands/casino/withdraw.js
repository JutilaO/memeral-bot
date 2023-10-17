const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args) => {

casinoChannels = []
if(message.author.id !==  && message.guild.id !== " && !casinoChannels.includes(message.channel.id)) return

var amount = Math.floor(args[0])
if(!amount) return message.channel.send("Correct usage: withdraw [amount]")
if(isNaN(amount)) return message.channel.send("Amount must be a number")

amount = parseInt(amount)
if(amount < 10) return message.channel.send("Minimum withdraw is 10 credits (10.000$)")
var date = new Date().toString().split(" ")
var day = `${date[1]} ${date[2]} ${date[3]} ${date[4]}`

Casino.findOne({
    userID: message.author.id
}, (err, casino) => {
if(err) console.log(err)
if(!casino) return message.channel.send("You don't have anything to withdraw.")
if(!casino.balance) casino.balance = 0
if(!casino.withdrawals) casino.withdrawals = []
if(!casino.account) return message.channel.send("You need to register first. Use 'register [SAUR account name]' to do that.")
if(casino.balance >= amount){
    casino.balance = casino.balance - amount
    casino.withdrawals.push({
        value: amount,
        date: day
    })
    message.channel.send(`Withdrawed ${amount}. Contact Juti in-game to get your money.`)
    bot.guilds.cache.get(").channels.cache.get(").send(`${message.author} withdrawed ${amount} money. Account name: ${casino.account}`).then(message => {
        message.react(`✅`)
    })
    casino.save().catch(err => console.log(err))
} else return message.channel.send(`Your balance is less than ${amount}`)
    
})

}

module.exports.help = {
    name: "withdraw",
    description: "",
    availability: ""
}
