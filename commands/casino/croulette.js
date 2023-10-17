const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
const alreadyPlaying = new Set()
module.exports.run = async (bot, message, args) => {

var casinoChannels = ["", "", ""]
if(message.author.id !== "" && message.guild.id !== "" && !casinoChannels.includes(message.channel.id)) return

var author = message.author
var betColour = args[0]
var betAmount = Math.floor(args[1])

if(betColour) betColour.toString().toLowerCase()
if(betAmount) parseInt(betAmount)
if(betColour !== "red" && betColour !== "black" && betColour !== "white") return message.channel.send("Please enter colour! Correct usage: !croulette [red/black/white] [bet]")
if(!betAmount) return message.channel.send("Please enter bet amount! Correct usage: !croulette [red/black/white] [bet]")
if(isNaN(betAmount)) return message.channel.send("Bet amount must be a number!")
if(betAmount > 1000) return message.channel.send("Bet amount must be less than 1000")
if(betAmount < 0) return message.channel.send("Bet amount cannot be a negative number")


var black = ":black_circle: "
var red = ":red_circle: "
var white = ":white_circle: "
var rouletteArray = [
    white,
    red, black, red, black,
    red, black, red, black,
    red, black, red, black,
    red, black, red, black,
    red, black, red, black,
    red, black, red, black,
    red, black, red, black,
    red, black, red, black,
    red, black, red, black
]
var display = []
var number = Math.floor(0 + Math.random()*(36 + 1 - 0))
var reverse = 0
if(number < 5){
    if(number === 0) reverse = 36
    if(number === 1) reverse = 35
    if(number === 2) reverse = 34
    if(number === 3) reverse = 33
}
if(number > 31){
    if(number === 32) reverse = 35
    if(number === 33) reverse = 35
    if(number === 34) reverse = 35
    if(number === 35) reverse = 35
    if(number === 36) reverse = 35
}


Casino.findOne({
    userID: author.id
}, (err, casino) => {
if(err) console.log(err)
if(!casino) casino = {}
if(!casino.bonusmoney) casino.bonusmoney = 0
if(!casino.wager) casino.wager = 0
if(!casino.balance) casino.balance = 0
if(casino.bonusmoney >= betAmount){
    roulette()
    casino.bonusmoney = casino.bonusmoney - betAmount
    if(casino.wager > 0){
        casino.wager = casino.wager - betAmount
    }
    return
} else
var needed = betAmount - casino.bonusmoney
if(casino.balance >= needed){
    roulette()
    casino.bonusmoney = casino.bonusmoney - (betAmount - needed)
    if(casino.wager > 0){
        casino.wager = casino.wager - (betAmount - needed)
    }
    casino.balance = casino.balance - needed
    return
} else
if(casino.balance >= betAmount){
    roulette()
    casino.balance = casino.balance - betAmount
    return
} else {
    balanceNeed = betAmount - casino.balance
    return message.channel.send(`You do not have enough credits. You need ${balanceNeed} more!`)
}


function roulette(){

if(alreadyPlaying.has(author.id)) return message.channel.send(`${author.username}: You must wait for your on going roulette to finish!`)

alreadyPlaying.add(author.id)

async function transaction(message, winAmount, betAmount){
    var command = "croulette"
    var commandFile = require("../../auto/saur/casino/casino.js")
    return await commandFile.run(message, winAmount, betAmount, command)
}



start = rouletteArray[number-6] + rouletteArray[number-5] + rouletteArray[number-4] + rouletteArray[number-3] + rouletteArray[number-2] + rouletteArray[number-1]
end = rouletteArray[number+1] + rouletteArray[number+2] + rouletteArray[number+3] + rouletteArray[number+4] + rouletteArray[number+5] + rouletteArray[number+6]
top = "---------------------------|V|-----------------------------" + "\n"
bottom = "\n" + "-----------------------------------------------------------"
message.channel.send(top + start + rouletteArray[number] + end  + bottom).then(msg => {
    winningColor = rouletteArray[number]
    if(betColour === "red" && winningColor === red){
        moneyTransfer(2)
    } else
    if(betColour === "black" && winningColor === black){
        moneyTransfer(2)
    } else 
    if(betColour === "white" && winningColor === white){
        moneyTransfer(14)
    } else {
        winAmount = 0
        transaction(message, winAmount, betAmount)
        alreadyPlaying.delete(author.id)
        return msg.edit(top + colorArray.join("")  + bottom + `\n ${author.username}: You lost ${betAmount} credits!`)
    } 
    function moneyTransfer(factor){
        winAmount = betAmount * factor
        transaction(message, winAmount, betAmount)
        alreadyPlaying.delete(author.id)
        return msg.edit(top + colorArray.join("")  + bottom + `\n ${author.username}: You won ${betAmount * factor} credits!`)
    }
})
}
})
  

}

module.exports.help = {
    name: "croulette",
    description: "Roulette",
    availability: ""
}
