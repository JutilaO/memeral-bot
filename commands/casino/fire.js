const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
const Cooldown = new Set()
module.exports.run = async (bot, message, args) => {

casinoChannels = ["", "", ""]
if(message.author.id !== "" && message.guild.id !== "" && !casinoChannels.includes(message.channel.id)) return



//Slotmachine
var moneybag = ":moneybag:"
var gem  = ":gem:"
var heart  = ":heart:"
var zap  = ":zap:"
var euro  = ":euro:"
var star = ":star:"
var wild = ":fire:"


var betAmount = Math.round(args[0])
var player = message.author.id


if(!betAmount){
    message.channel.send("Please input a bet amount.")
    return
}
if(isNaN(betAmount)){
    message.channel.send("Bet amount must be a number.")
    return
}
if(betAmount > 10) return message.channel.send("Bet amount must be less than 10")
if(betAmount < 0) return message.channel.send("Bet amount cannot be a negative number")
 
if(Cooldown.has(player)){
    message.channel.send(`You have to wait 1 seconds before doing this again.`)
    return
}
Cooldown.add(player)
setTimeout(cdRemove, 1000)
function cdRemove(){
    Cooldown.delete(player)
}

Casino.findOne({
    userID: player
}, (err, casino) => {
if(err) console.log(err)
if(!casino) casino = {}
if(!casino.bonusmoney) casino.bonusmoney = 0
if(!casino.wager) casino.wager = 0
if(!casino.balance) casino.balance = 0
if(!casino.stats) casino.stats = []
if(casino.bonusmoney >= betAmount){
    slot()
    casino.bonusmoney = casino.bonusmoney - betAmount
    if(casino.wager > 0){
        casino.wager = casino.wager - betAmount
    }
    return
} else
var needed = betAmount - casino.bonusmoney
if(casino.balance >= needed){
    slot()
    casino.bonusmoney = casino.bonusmoney - (betAmount - needed)
    if(casino.wager > 0){
        casino.wager = casino.wager - (betAmount - needed)
    }
    casino.balance = casino.balance - needed
    return
} else
if(casino.balance >= betAmount){
    slot()
    casino.balance = casino.balance - betAmount
    return
} else {
    balanceNeed = betAmount - casino.balance
    return message.channel.send(`You do not have enough credits. You need ${balanceNeed} more!`)
}

function slot(){


async function transaction(message, winAmount, betAmount){
    var command = "fire"
    var commandFile = require("../../auto/saur/casino/casino.js")
    return await commandFile.run(message, winAmount, betAmount, command)
}

reel1 = []
reel2 = []
reel3 = []

var symbolAmount = 7; //Amount of symbols

for(i = 0; i < 3; i++){
    var symbol = Math.floor (Math.random() * (symbolAmount - 1 + 1)) + 1; 
    switch(symbol) {
        case 1: reel1.push(euro); break;
        case 2: reel1.push(moneybag); break;
        case 3: reel1.push(gem); break;
        case 4: reel1.push(heart); break;
        case 5: reel1.push(zap); break;
        case 6: reel1.push(star); break;
        case 7: reel1.push(wild); break;
    }
    var symbol2 = Math.floor (Math.random() * (symbolAmount - 1 + 1)) + 1; 
    switch(symbol2) {
        case 1: reel2.push(euro); break;
        case 2: reel2.push(moneybag); break;
        case 3: reel2.push(gem); break;
        case 4: reel2.push(heart); break;
        case 5: reel2.push(zap); break;
        case 6: reel2.push(star); break;
        case 7: reel2.push(wild); break;
    }
    var symbol3 = Math.floor (Math.random() * (symbolAmount - 1 + 1)) + 1; 
    switch(symbol3) {
        case 1: reel3.push(euro); break;
        case 2: reel3.push(moneybag); break;
        case 3: reel3.push(gem); break;
        case 4: reel3.push(heart); break;
        case 5: reel3.push(zap); break;
        case 6: reel3.push(star); break;
        case 7: reel3.push(wild); break;
    }
}



//Random event
var startRandomEvent = Math.random()
if(startRandomEvent < 0.0067){
chosenSymbol = ""

//Choosing symbol for 2 reels
var symbols = 11
var symbol4 = Math.floor (Math.random() * (symbols - 1 + 1)) + 1;
switch(symbol4) {
    case 1: chosenSymbol = euro; chooseReels(chosenSymbol); break;
    case 2: chosenSymbol = moneybag; chooseReels(chosenSymbol); break;
    case 3: chosenSymbol = gem; chooseReels(chosenSymbol); break;
    case 4: chosenSymbol = heart; chooseReels(chosenSymbol); break;
    case 5: chosenSymbol = zap; chooseReels(chosenSymbol); break;
    case 6: chosenSymbol = star; chooseReels(chosenSymbol); break;
    case 7: chosenSymbol = wild; chooseReels(chosenSymbol); break;
    case 8: chosenSymbol = moneybag; chooseReels(chosenSymbol); break;
    case 9: chosenSymbol = heart; chooseReels(chosenSymbol); break;
    case 10: chosenSymbol = zap; chooseReels(chosenSymbol); break;
    case 11: chosenSymbol = euro; chooseReels(chosenSymbol); break;
}

//Choosing reels
function chooseReels(chosenSymbol){
    for(i = 0; i < 2; i++){
        var reels = Math.floor (Math.random() * (3 - 1 + 1)) + 1; 
        switch(reels){
            case 1:
                reel1 = []
                reel2 = []
                for(i = 0; i < 3; i++){
                    reel1.push(chosenSymbol)
                    reel2.push(chosenSymbol)
                }
            case 2:
                reel1 = []
                reel3 = []
                for(i = 0; i < 3; i++){
                    reel1.push(chosenSymbol)
                    reel3.push(chosenSymbol)
                }
            case 3:
                reel2 = []
                reel3 = []
                for(i = 0; i < 3; i++){
                    reel2.push(chosenSymbol)
                    reel3.push(chosenSymbol)
                }
        }   
    }
}
}
    

winningLines = []
winline = ""
winSymbol = ""
line = "\n"
title = "[**Fire Memeral**]"
createMsg = title + line + "  |" + reel1[0] + reel2[0] + reel3[0] + "|" + line + "  |" + reel1[1] + reel2[1] + reel3[1] + "|" + line + "  |" + reel1[2] + reel2[2] + reel3[2] + "|"
message.channel.send(createMsg).then(msg => {

switch(1){
    case 1: if(reel1[0] === reel2[0] && reel1[0] === reel3[0]) winningLines.push({winLine: "1", winSymbol: reel1[0]}) //Line 1
    case 2: if(reel1[1] === reel2[1] && reel1[1] === reel3[1]) winningLines.push({winLine: "2", winSymbol: reel1[1]}) //Line 2
    case 3: if(reel1[2] === reel2[2] && reel1[2] === reel3[2]) winningLines.push({winLine: "3", winSymbol: reel1[2]}) //Line 3
    case 4: if(reel1[0] === reel2[1] && reel1[0] === reel3[2]) winningLines.push({winLine: "4", winSymbol: reel1[0]}) //Line 4
    case 5: if(reel1[2] === reel2[1] && reel1[2] === reel3[0]) winningLines.push({winLine: "5", winSymbol: reel1[2]}) //Line 5
}

var winAmount = 0
var moneybagX = 3
var gemX  = 7
var heartX  = 2
var zapX  = 4
var euroX  = 4
var starX = 6
var wildX = 8
var winX = 0

for(i = 0; i < winningLines.length; i++){
    if(winningLines[i].winSymbol === moneybag) winAmount = winAmount + betAmount * moneybagX
    if(winningLines[i].winSymbol === gem) winAmount = winAmount + betAmount * gemX
    if(winningLines[i].winSymbol === heart) winAmount = winAmount + betAmount * heartX
    if(winningLines[i].winSymbol === zap) winAmount = winAmount + betAmount * zapX
    if(winningLines[i].winSymbol === euro) winAmount = winAmount + betAmount * euroX
    if(winningLines[i].winSymbol === star) winAmount = winAmount + betAmount * starX
    if(winningLines[i].winSymbol === wild) winAmount = winAmount + betAmount * wildX
}
if(winningLines.length - 1 === 4){
    if(winningLines[0].winSymbol === winningLines[1].winSymbol && winningLines[0].winSymbol === winningLines[2].winSymbol && winningLines[0].winSymbol === winningLines[3].winSymbol && winningLines[0].winSymbol === winningLines[4].winSymbol){
        var multiplier = Math.floor (Math.random() * (12 - 1 + 1)) + 1;
        switch(multiplier){
            case 1: winX = 2; break
            case 2: winX = 2; break
            case 3: winX = 2; break
            case 4: winX = 2; break
            case 5: winX = 3; break
            case 6: winX = 3; break
            case 7: winX = 3; break
            case 8: winX = 4; break
            case 9: winX = 4; break
            case 10: winX = 5; break
            case 11: winX = 5; break
            case 12: winX = 10; break
        }
        winAmount = winAmount * winX
    }
}
if(winAmount > 0){
    transaction(message, winAmount, betAmount)
    if(winX > 0){
        msg.edit(`${createMsg}\n${message.author.username} won ${winAmount} credits!]\nCongratulations, your win was factored by ${winX}!`)
    } else msg.edit(`${createMsg}\n[${message.author.username} won ${winAmount} credits!]`)
} else {
    transaction(message, winAmount, betAmount)
    msg.edit(`${createMsg}\n[${message.author.username} lost ${betAmount} credits!]`)
}
})
}

})
}
                   

module.exports.help = {
    name: "fire",
    description: "",
    availability: ""
}
