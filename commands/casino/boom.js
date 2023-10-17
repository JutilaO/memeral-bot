const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
const Cooldown = new Set()
const onBonus = new Set()
module.exports.run = async (bot, message, args) => {

casinoChannels = ["]
if(message.author.id !==  && message.guild.id !==  && !casinoChannels.includes(message.channel.id)) return
 


var betAmount = Math.floor(args[0])
var player = message.author.id
if(betAmount > 10) return message.channel.send("Bet amount must be less than 10")
if(betAmount < 0) return message.channel.send("Bet amount cannot be a negative number")

if(!betAmount){
    message.channel.send("Please input a bet amount.")
    return
}
if(isNaN(betAmount)){
    message.channel.send("Bet amount must be a number.")
    return
}
if(betAmount > 10) return message.channel.send("Bet amount must be less than 10")

  
if(Cooldown.has(player)){
    message.channel.send(`You have to wait 1 seconds before doing this again.`)
    return
}

if(onBonus.has(player)) return message.channel.send("Please wait until your bonus game ends")

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
    var command = "boom"
    var commandFile = require("../../auto/saur/casino/casino.js")
    return await commandFile.run(message, winAmount, betAmount, command)
}


Cooldown.add(player)

var wild = ":boom:"
var star = ":star:"
var gem  = ":gem:"
var euro  = ":euro:"
var zap  = ":zap:"
var moneybag = ":moneybag:"
var heart  = ":heart:"
var reels = []

getSymbols()

function getSymbols(){

reels = []
for(i = 0; i < 15; i++){
    number = Math.random()
    if(number < 0.05){
        reels.push(wild)
    } else
    if(number < 0.178){
        reels.push(star)
    } else
    if(number < 0.35){
        reels.push(gem)
    } else
    if(number < 0.487){
        reels.push(zap)
    } else
    if(number < 0.64){
        reels.push(moneybag)
    } else
    if(number < 0.78){
        reels.push(euro)
    } else
    if(number >= 0.78){
        reels.push(heart)
    }
}


}


//Bonus
wildAmount = reels.filter(wildSym => wildSym === wild)

if(wildAmount.length >= 4){

onBonus.add(player)
Cooldown.delete(player)

chosenSymbol = ""
number = Math.random()
if(number < 0.004){
    chosenSymbol = wild
} else
if(number < 0.06){
    chosenSymbol = star
} else
if(number < 0.1){
    chosenSymbol = gem
} else
if(number < 0.2){
    chosenSymbol = zap
} else
if(number < 0.55){
    chosenSymbol = moneybag
} else
if(number < 0.7){
    chosenSymbol = euro
} else
if(number > 0.7){
    chosenSymbol = heart
}
       
spinNumber = 1
winAmount = 0
winline = ""
winSymbol = ""
winSymbolAmount = 0
line = "\n"
const embed = new Discord.MessageEmbed()
.setTitle("Bonus game")
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setColor(0xff1493)
.setDescription("Expanding symbol: " + chosenSymbol)
.setFooter("Congratulations, you won 10 free spins", "")
.setTimestamp()
.addField("[Meme slots]", reels[0] + reels[1] + reels[2] + reels[3] + reels[4]+ line + "  " + reels[5] + reels[6] + reels[7] + reels[8] + reels[9] + line + "  " + reels[10] + reels[11] + reels[12] + reels[13] + reels[14] + line)
.addField("Bonus win ", winAmount)

message.channel.send(embed).then(msg => {
spin()
function spin(){
winningLines = 0
if(reels[0] === chosenSymbol || reels[5] === chosenSymbol || reels[10] === chosenSymbol){
    reels[0] = chosenSymbol
    reels[5] = chosenSymbol
    reels[10] = chosenSymbol
    winningLines = winningLines + 1
}
if(reels[1] === chosenSymbol || reels[6] === chosenSymbol || reels[11] === chosenSymbol){
    reels[1] = chosenSymbol
    reels[6] = chosenSymbol
    reels[11] = chosenSymbol
    winningLines = winningLines + 1
}
if(reels[2] === chosenSymbol || reels[7] === chosenSymbol || reels[12] === chosenSymbol){
    reels[2] = chosenSymbol
    reels[7] = chosenSymbol
    reels[12] = chosenSymbol
    winningLines = winningLines + 1
}
if(reels[3] === chosenSymbol || reels[8] === chosenSymbol || reels[13] === chosenSymbol){
    reels[3] = chosenSymbol
    reels[8] = chosenSymbol
    reels[13] = chosenSymbol
    winningLines = winningLines + 1
}
if(reels[4] === chosenSymbol || reels[9] === chosenSymbol || reels[14] === chosenSymbol){
    reels[4] = chosenSymbol
    reels[9] = chosenSymbol
    reels[14] = chosenSymbol
    winningLines = winningLines + 1
}

var heartX  = 0
var moneybagX = 0
var zapX  = 0
var euroX  = 0
var starX = 0
var gemX  = 0
var wildX = 0


if(winningLines >= 2){
    if(chosenSymbol === heart){
        if(winningLines === 2) heartX = 2
        if(winningLines === 3) heartX = 4
        if(winningLines === 4) heartX = 6
        if(winningLines === 5) heartX = 8
    }
    if(chosenSymbol === moneybag){
        if(winningLines === 2) moneybagX = 2
        if(winningLines === 3) moneybagX = 4
        if(winningLines === 4) moneybagX = 6
        if(winningLines === 5) moneybagX = 10
    }
    if(chosenSymbol === zap){
        if(winningLines === 2) zapX = 3
        if(winningLines === 3) zapX = 5
        if(winningLines === 4) zapX = 10
        if(winningLines === 5) zapX = 15
    }
    if(chosenSymbol === euro){
        if(winningLines === 2) euroX = 3
        if(winningLines === 3) euroX = 5
        if(winningLines === 4) euroX = 10
        if(winningLines === 5) euroX = 20
    }
    if(chosenSymbol === gem){
        if(winningLines === 2) gemX = 10
        if(winningLines === 3) gemX = 30
        if(winningLines === 4) gemX = 40
        if(winningLines === 5) gemX = 100
    }
    if(chosenSymbol === star){
        if(winningLines === 2) starX = 20
        if(winningLines === 3) starX = 35
        if(winningLines === 4) starX = 45
        if(winningLines === 5) starX = 500
    }
    if(chosenSymbol === wild){
        if(winningLines === 2) wildX = 25
        if(winningLines === 3) wildX = 40
        if(winningLines === 4) wildX = 60
        if(winningLines === 5) wildX = 4000
    }
}

if(chosenSymbol === heart) winAmount = winAmount + betAmount * heartX
if(chosenSymbol === moneybag) winAmount = winAmount + betAmount * moneybagX
if(chosenSymbol === zap) winAmount = winAmount + betAmount * zapX
if(chosenSymbol === euro) winAmount = winAmount + betAmount * euroX
if(chosenSymbol === star) winAmount = winAmount + betAmount * starX
if(chosenSymbol === gem) winAmount = winAmount + betAmount * gemX
if(chosenSymbol === wild) winAmount = winAmount + betAmount * wildX


embed.fields = []
embed.addField("[Meme slots]", reels[0] + reels[1] + reels[2] + reels[3] + reels[4]+ line + "  " + reels[5] + reels[6] + reels[7] + reels[8] + reels[9] + line + "  " + reels[10] + reels[11] + reels[12] + reels[13] + reels[14] + line)
embed.addField("Bonus win ", winAmount)
embed.setFooter("Congratulations, you won 10 free spins " + `(${spinNumber}/10)`, "")
setTimeout(() => {
    msg.edit(embed)
}, 1200);
}
var spinInterval = setInterval(() => {
    spinNumber = spinNumber + 1
    if(spinNumber === 11){
        clearInterval(spinInterval)
        onBonus.delete(player)
        embed.fields = []
        embed.addField("[Meme slots]", reels[0] + reels[1] + reels[2] + reels[3] + reels[4]+ line + "  " + reels[5] + reels[6] + reels[7] + reels[8] + reels[9] + line + "  " + reels[10] + reels[11] + reels[12] + reels[13] + reels[14] + line)
        embed.addField("Bonus win ", "You won " + winAmount + " credits during the bonus!")
        msg.edit(embed)
        transaction(message, winAmount, betAmount)
        return
    } else {
    getSymbols()
    spin()
    }
}, 3000);
})
}

            
    

winningLines = []
winline = ""
winSymbol = ""
winSymbolAmount = 0
line = "\n"
title = "[**__Boom of Memeral__**]"
createMsg = title + line + "  |" + reels[0] + reels[1] + reels[2] + reels[3] + reels[4] + "|" + line + "  |" + reels[5] + reels[6] + reels[7] + reels[8] + reels[9] + "|" + line + "  |" + reels[10] + reels[11] + reels[12] + reels[13] + reels[14] + "|"
if(!onBonus.has(player)) message.channel.send(createMsg).then(msg => {





line1 = []
line1.push(reels[0], reels[1], reels[2], reels[3], reels[4])
for(i = 0; i < line1.length; i++){
    if(line1[0] === line1[i]){
        if(i > 1){
            if(winningLines[0]) winningLines[0] = {}
            winningLines[0] = {winLine: "1", winSymbol: reels[0], winSymbolAmount: i + 1}
            
        } 
    } else {
        line1 = []
    }
}


line2 = []
line2.push(reels[5], reels[6], reels[7], reels[8], reels[9])
for(i = 0; i < line2.length; i++){
    if(line2[0] === line2[i]){
        if(i > 1){
            if(winningLines[1]) winningLines[1] = {}
            winningLines[1] = {winLine: "2", winSymbol: line2[0], winSymbolAmount: i + 1}
        } 
    } else {
        line2 = []
    }
}


line3 = []
line3.push(reels[10], reels[11], reels[12], reels[13], reels[14])
for(i = 0; i < line3.length; i++){
    if(line3[0] === line3[i]){
        if(i > 1){
            if(winningLines[2]) winningLines[2] = {}
            winningLines[2] = {winLine: "3", winSymbol: line3[0], winSymbolAmount: i + 1}
        } 
    } else {
        line3 = []
    }
}


line4 = []
line4.push(reels[0], reels[6], reels[12], reels[8], reels[4])
for(i = 0; i < line4.length; i++){
    if(line4[0] === line4[i]){
        if(i > 1){
            if(winningLines[3]) winningLines[3] = {}
            winningLines[3] = {winLine: "4", winSymbol: line4[0], winSymbolAmount: i + 1}
        } 
    } else {
        line4 = []
    }
}


line5 = []
line5.push(reels[10], reels[6], reels[2], reels[8], reels[14])
for(i = 0; i < line5.length; i++){
    if(line5[0] === line5[i]){
        if(i > 1){
            if(winningLines[4]) winningLines[4] = {}
            winningLines[4] = {winLine: "5", winSymbol: line5[0], winSymbolAmount: i + 1}
        } 
    } else {
        line5 = []
    }
}


line6 = []
line6.push(reels[5], reels[1], reels[2], reels[3], reels[9])
for(i = 0; i < line6.length; i++){
    if(line6[0] === line6[i]){
        if(i > 1){
            if(winningLines[5]) winningLines[5] = {}
            winningLines[5] = {winLine: "6", winSymbol: line6[0], winSymbolAmount: i + 1}
        } 
    } else {
        line6 = []
    }
}


line7 = []
line7.push(reels[5], reels[11], reels[12], reels[13], reels[9])
for(i = 0; i < line7.length; i++){
    if(line7[0] === line7[i]){
        if(i > 1){
            if(winningLines[6]) winningLines[6] = {}
            winningLines[6] = {winLine: "7", winSymbol: line7[0], winSymbolAmount: i + 1}
        } 
    } else {
        line7 = []
    }
}


line8 = []
line8.push(reels[0], reels[1], reels[7], reels[13], reels[14])
for(i = 0; i < line8.length; i++){
    if(line8[0] === line8[i]){
        if(i > 1){
            if(winningLines[7]) winningLines[7] = {}
            winningLines[7] = {winLine: "8", winSymbol: line8[0], winSymbolAmount: i + 1}
        } 
    } else {
        line8 = []
    }
}


line9 = []
line9.push(reels[10], reels[11], reels[7], reels[3], reels[4])
for(i = 0; i < line9.length; i++){
    if(line9[0] === line9[i]){
        if(i > 1){
            if(winningLines[8]) winningLines[8] = {}
            winningLines[8] = {winLine: "9", winSymbol: line9[0], winSymbolAmount: i + 1}
        } 
    } else {
        line9 = []
    }
}
line10 = []
line10.push(reels[5], reels[11], reels[7], reels[3], reels[9])
for(i = 0; i < line10.length; i++){
    if(line10[0] === line10[i]){
        if(i > 1){
            if(winningLines[9]) winningLines[9] = {}
            winningLines[9] = {winLine: "10", winSymbol: line10[0], winSymbolAmount: i + 1}
        } 
    } else {
        line10 = []
    }
}


var winAmount = 0
var moneybagX = 2
var gemX  = 4
var heartX  = 2
var zapX  = 2
var euroX  = 2
var starX = 4
var wildX = 5

for(i = 0; i < winningLines.length; i++){


    if(!winningLines[i]) winningLines[i] = {winSymbol: "", winSymbolAmount: 0}
    if(winningLines[i].winSymbol === heart){
            if(winningLines[i].winSymbolAmount === 3) heartX = 1
            if(winningLines[i].winSymbolAmount === 4) heartX = 3
            if(winningLines[i].winSymbolAmount === 5) heartX = 4
            winAmount = winAmount + betAmount * heartX
    }
    if(winningLines[i].winSymbol === moneybag){
            if(winningLines[i].winSymbolAmount === 3) moneybagX = 3
            if(winningLines[i].winSymbolAmount === 4) moneybagX = 4
            if(winningLines[i].winSymbolAmount === 5) moneybagX = 5
            winAmount = winAmount + betAmount * moneybagX
    }
    if(winningLines[i].winSymbol === zap){
            if(winningLines[i].winSymbolAmount === 3) zapX = 3
            if(winningLines[i].winSymbolAmount === 4) zapX = 5
            if(winningLines[i].winSymbolAmount === 5) zapX = 6
            winAmount = winAmount + betAmount * zapX
    }
    if(winningLines[i].winSymbol === euro){
            if(winningLines[i].winSymbolAmount === 3) euroX = 3
            if(winningLines[i].winSymbolAmount === 4) euroX = 4
            if(winningLines[i].winSymbolAmount === 5) euroX = 6
            winAmount = winAmount + betAmount * euroX
    }
    if(winningLines[i].winSymbol === gem){
            if(winningLines[i].winSymbolAmount === 3) gemX = 4
            if(winningLines[i].winSymbolAmount === 4) gemX = 8
            if(winningLines[i].winSymbolAmount === 5) gemX = 10
            winAmount = winAmount + betAmount * gemX
    }
    if(winningLines[i].winSymbol === star){
            if(winningLines[i].winSymbolAmount === 3) starX = 4
            if(winningLines[i].winSymbolAmount === 4) starX = 20
            if(winningLines[i].winSymbolAmount === 5) starX = 30
            winAmount = winAmount + betAmount * starX
    }
    if(winningLines[i].winSymbol === wild){
            if(winningLines[i].winSymbolAmount === 3) wildX = 6
            if(winningLines[i].winSymbolAmount === 4) wildX = 30
            if(winningLines[i].winSymbolAmount === 5) wildX = 400
            winAmount = winAmount + betAmount * wildX
    }   
}


if(winAmount > 0){
    transaction(message, winAmount, betAmount)
    if(!onBonus.has(player)) msg.edit(`${createMsg}\n  [${message.author.username} won ${winAmount} credits!]`)
    Cooldown.delete(player)
} else {
    transaction(message, winAmount, betAmount)
    if(!onBonus.has(player)) msg.edit(`${createMsg}\n  [${message.author.username} lost ${betAmount} credits!]`)
    Cooldown.delete(player)
}
})
}   
})


}
                   

module.exports.help = {
    name: "boom",
    description: "",
    availability: ""
}
