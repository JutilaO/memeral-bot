const Discord = require("discord.js")
const botSettings = require("../../models/botSettings.js");
const {prefix, botname, logchannel, ownerID} = require('../../config.json');
module.exports.run = async (bot, message, args) => {

if(message.author.id !== ownerID) return

var blackmarket = 0
var mythic = 0
var legendary = 0
var extraordinary = 0
var rare = 0
var common = 0
 
var rolls = args[1]
var toBeSimulated = args[0]

var lost = 0
var won = 0
var amount = 0

var bonus = 0
var bonusMoney = 0



if(!rolls) return message.channel.send("Enter amount of simulations idiot")
if(isNaN(rolls)) return message.channel.send("Amount of simulations must be a number idiot")
if(!toBeSimulated) return message.channel.send("Enter command to be simulated idiot")

if(toBeSimulated === "chests"){
    for(i = 0; i < rolls; i++){
        var percentageRandom = Math.random()
    
        if(percentageRandom < 0.004){
           blackmarket = blackmarket + 1
        } else
        if(percentageRandom < 0.01){
            mythic = mythic + 1
               
        } else 
        if(percentageRandom < 0.02){
           legendary = legendary + 1
             
        } else 
        if(percentageRandom < 0.12){
           extraordinary = extraordinary + 1
        } else 
        if(percentageRandom < 0.40){
           rare = rare + 1
               
        } else 
        if(percentageRandom < 1.00){
            common = common + 1
        }
        if(i === rolls - 1){
            console.log("Blackmarket: " + blackmarket)
            console.log("Mythic: " + mythic)
            console.log("Legendary: " + legendary)
            console.log("Extraordinary: " + extraordinary)
            console.log("Rare: " + rare)
            console.log("Common: " + common)
            message.channel.send("```" + `Chests simulated: ${rolls}\nBlackmarket: ${blackmarket} - ${blackmarket * 100 / rolls}%\nMythic: ${mythic} - ${mythic * 100 / rolls}%\nLegendary: ${legendary} - ${legendary * 100 / rolls}%\nExtraordinary: ${extraordinary} - ${extraordinary * 100 / rolls}%\nRare: ${rare} - ${rare * 100 / rolls}%\nCommon ${common} - ${common * 100 / rolls}%`+  "```")
        }
    }
}

if(toBeSimulated === "slotty"){

message.channel.send(`Simulating: 0/${rolls} spins (0%)`).then(msg => {

var betAmount = args[2]
if(!betAmount) return message.channel.send("Enter bet amount idiot")

for(x = 0; x < rolls; x++){

d(x, rolls)

async function d(x, rolls){
    if(x === (rolls / 4)){
        await msg.edit(`Simulating: ${x}/${rolls} spins (25%)`)
        console.log(x)
    
    }
    if(x === (rolls / 4 * 2)){
        await msg.edit(`Simulating: ${x}/${rolls} spins (50%)`)
        console.log(x)
    }
    
    if(x === (rolls / 4 * 3)){
        await msg.edit(`Simulating: ${x}/${rolls} spins (75%)`)
    }
    
}

var moneybag = ":moneybag:"
var gem  = ":gem:"
var heart  = ":heart:"
var zap  = ":zap:"
var euro  = ":euro:"
var star = ":star:"
var wild = ":boom:"

var reel1 = []
var reel2 = []
var reel3 = []

var winningLines = []

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
    if(startRandomEvent < 0.01){
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
    

switch(1){
    case 1: if(reel1[0] === reel2[0] && reel1[0] === reel3[0]) winningLines.push({winLine: "1", winSymbol: reel1[0]}) //Line 1
    case 2: if(reel1[1] === reel2[1] && reel1[1] === reel3[1]) winningLines.push({winLine: "2", winSymbol: reel1[1]}) //Line 2
    case 3: if(reel1[2] === reel2[2] && reel1[2] === reel3[2]) winningLines.push({winLine: "3", winSymbol: reel1[2]}) //Line 3
    case 4: if(reel1[0] === reel2[1] && reel1[0] === reel3[2]) winningLines.push({winLine: "4", winSymbol: reel1[0]}) //Line 4
    case 5: if(reel1[2] === reel2[1] && reel1[2] === reel3[0]) winningLines.push({winLine: "5", winSymbol: reel1[2]}) //Line 5
}

var winAmount = 0
var moneybagX = 3
var gemX  = 6
var heartX  = 2
var zapX  = 4
var euroX  = 4
var starX = 5
var wildX = 7


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
        bonus = bonus + 1
        bonusMoney = bonusMoney + winAmount
    }
}

if(winAmount > 0){
   won = won + 1
   amount = amount + winAmount
} else {
    lost = lost + 1
}

if(x === rolls - 1){
    msg.edit("```" + `Slot spins simulated: ${rolls}\nMoney spent: ${betAmount * rolls}\nMoney won: ${amount}\nTimes won: ${won}\nTimes lost: ${lost}\nReturn %: ${amount * 100 / (betAmount * rolls)}\nBonuses: ${bonus} \nBonus %: ${bonus * 100 / rolls} \nMoney from bonus: ${bonusMoney} \n% of total won: ${bonusMoney * 100 / amount}`+  "```")
}

}
    
})

}

if(toBeSimulated === "boom"){



message.channel.send(`Simulating: 0/${rolls} spins (0%)`).then(msg => {

var betAmount = parseInt(args[2])
var rolls = parseInt(args[1])

if(!betAmount) return message.channel.send("Enter bet amount idiot")

for(x = 0; x < rolls; x++){

d(x, rolls)

async function d(x, rolls){
    if(x === (rolls / 4)){
        await msg.edit(`Simulating: ${x}/${rolls} spins (25%)`)
    
    }
    if(x === (rolls / 4 * 2)){
        await msg.edit(`Simulating: ${x}/${rolls} spins (50%)`)
    }
    
    if(x === (rolls / 4 * 3)){
        await msg.edit(`Simulating: ${x}/${rolls} spins (75%)`)
    }
    
}
        

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

bonus = bonus + 1


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
if(number >= 0.7){
    chosenSymbol = heart
}
           
spinNumber = 1
winAmount = 0
winline = ""
winSymbol = ""
winSymbolAmount = 0
line = "\n"

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
    
    }

    for(y = 0; y < 10; y++){
        if(y === 9){
            amount += winAmount
            won += 1
            bonusMoney += winAmount
        } else {
        getSymbols()
        spin()
        }
    }
}
    
                
        
    
    winningLines = []
    winline = ""
    winSymbol = ""
    winSymbolAmount = 0

    
    
    
    
    
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
    won += 1
    amount = amount + winAmount
} else {
    lost = lost + 1
}
     


if(x === rolls - 1){
    msg.edit("```" + `Boom of Memeral spins simulated: ${rolls}\nMoney spent: ${betAmount * rolls}\nMoney won: ${amount}\nTimes won: ${won}\nTimes lost: ${lost}\nReturn %: ${amount * 100 / (betAmount * rolls)}\nBonuses: ${bonus} \nBonus %: ${bonus * 100 / rolls} \nMoney from bonus: ${bonusMoney} \n% of total won: ${bonusMoney * 100 / amount}`+  "```")
}
}
})
                   


}

}


module.exports.help = {
    name: "simulate"
 }