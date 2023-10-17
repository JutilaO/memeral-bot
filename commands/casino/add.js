const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Add casino credits")
        .addUserOption(option =>
            option.setName("name")
            .setDescription("User name")
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName("amount")
            .setDescription("Amount of credits")
            .setRequired(true)),
    async execute(interaction){
        try {

            if(message.author.id === "" || message.member.roles.cache.some(role => role.id === "")){
                giveCoins()
            }
            
            
            var user = args[0]
            var person = message.mentions.users.first()
            if(!user) return message.channel.send("Correct usage: give [name] [amount]")
            if(!person) return message.channel.send("Correct usage: give [name] [amount]")
            if(!args[1]) return message.channel.send("Correct usage: give [name] [amount]")
            if(isNaN(args[1])) return message.channel.send("Amount must be a number")
            
            var amount = parseInt(args[1])
            var date = new Date().toString().split(" ")
            var day = `${date[1]} ${date[2]} ${date[3]} ${date[4]}`
            
            Casino.findOne({
                userID: person.id
            }, (err, casino) => {
            if(err) console.log(err)
            if(!casino){
                var casino = new Casino({
                userID: person.id
                })
            }
            if(!casino.deposits) casino.deposits = []
            if(!casino.balance) casino.balance = 0
            if(!casino.bonus) casino.bonus = 0
            if(!casino.wagerx) casino.wagerx = 0
            if(!casino.raffle) casino.raffle = false
            if(!casino.rafflecredits) casino.rafflecredits = 0
            if(!casino.deposits.length){
                casino.bonus = 100
                casino.wagerx = 2
            }
            if(!casino.bonusmoney) casino.bonusmoney = amount * casino.bonus / 100
            if(!casino.wager) casino.wager = amount * casino.bonus / 100 * casino.wagerx
            if(casino.bonus > 0 && amount > 250) return message.channel.send("Maximum deposit with this bonus is 250 credits!") 
            casino.balance = casino.balance + amount
            casino.deposits.push({
                value: amount,
                date: day,
                bonus: casino.bonus,
                bonusmoney: amount * casino.bonus / 100,
                wager: casino.wager
            })
            if(casino.bonus > 0){
                message.channel.send(`Added ${amount} credits to ${user}. User has ${casino.bonus}% bonus granting him ${casino.bonusmoney} bonus credits.`)
            } else {
                message.channel.send(`Added ${amount} credits to ${user}`)
            }
            bot.guilds.cache.get("").channels.cache.get("").send(`${message.author} added ${amount} credits to ${person}`).then(message => {
                message.react(`✅`)
            })
            casino.save
            if(amount >= 1000){
                casino.raffle = true
            }
            casino.bonus = 0
            casino.save().catch(err => console.log(err))
                
            })
            
          
    } catch(err) {
        if(err) console.log(err)
}
},
category: "currency"
}
