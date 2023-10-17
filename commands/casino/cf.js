const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
const alreadyPlaying = new Set()
module.exports.run = async (bot, message, args) => {


casinoChannels = []
if(message.author.id !==  && message.guild.id !== "" && !casinoChannels.includes(message.channel.id)) return

   
var challenger = message.author

var targetUser = message.mentions.users.first()

if(!targetUser) return message.channel.send("Please tag someone!")
if(message.guild.members.cache.get(targetUser.id).user.bot === true) return message.channel.send("You cannot challenge bots!")


var betAmount = parseInt(Math.floor(args[1]))
var check = 0

if(!betAmount) return message.channel.send("Please input bet amount")
if(betAmount < 0) return message.channel.send("Bet amount cannot be a negative number")
if(isNaN(betAmount)){
    return message.channel.send("Please enter a number as bet amount. Correct usage: 'coinflip [user] [bet]'")
}
if(challenger.id === targetUser.id){
    return message.channel.send("You cannot challenge yourself. Correct usage: 'coinflip [user] [bet]'")
}
if(alreadyPlaying.has(challenger.id)){
    return message.channel.send(`${message.author}: You have a coinflip or a request to one in progress.`)
}
if(alreadyPlaying.has(targetUser.id)){
    return message.channel.send(`${targetUser.username} has a coinflip or a request to one in progress.`)
}

function checkBalance(thisUser){
    Casino.findOne({
        userID: thisUser.id
    }, (err, casino) => {
    if(err) console.log(err)
    if(!casino) casino = {}
    if(!casino.balance) casino.balance = 0
    if(casino.balance < betAmount){
        needBalance = betAmount - casino.balance
        if(thisUser === challenger) return message.channel.send(`You don't have ${betAmount} credits. You need ${needBalance} more!`)
        if(thisUser === targetUser) return message.channel.send(`${thisUser.username} doesn't have ${betAmount} credits. ${thisUser.username} needs ${needBalance} more!`)
    } else {
        check++
        if(check === 2) play()
    }
})  
}

checkBalance(challenger)
checkBalance(targetUser)


function playerLost(loserID){
    Casino.findOne({
        userID: loserID
    }, (err, casino) => {
    if(err) console.log(err)
    if(!casino) return
    if(!casino.balance) casino.balance = 0
    let balanceToRemove = betAmount
    casino.balance = casino.balance - balanceToRemove
    var searchIndex= casino.stats.map(function(item){return item.command}).indexOf("cf")
    if(searchIndex === -1){
        casino.stats.push({
            command: "cf",
            uses: 1,
            won: 0,
            lost: betAmount
        })
    } else {
        casino.stats[searchIndex].uses += 1
        casino.stats[searchIndex].lost += betAmount
        casino.markModified("stats")
    }
    casino.save().catch(err => console.log(err))
})
}

function playerWon(winnerID){
    Casino.findOne({
        userID: winnerID
    }, (err, casino) => {
    if(err) console.log(err)
        casino.balance = casino.balance + betAmount
        var searchIndex= casino.stats.map(function(item){return item.command}).indexOf("cf")
        if(searchIndex === -1){
            casino.stats.push({
                command: "cf",
                uses: 1,
                won: betAmount,
                lost: 0
            })
        } else {
            casino.stats[searchIndex].uses += 1
            casino.stats[searchIndex].won += betAmount
            casino.markModified("stats")
        }
        casino.save().catch(err => console.log(err))
    })
}
    

function play(){

alreadyPlaying.add(challenger.id && targetUser.id)

setTimeout(() => {
    alreadyPlaying.delete(challenger.id && targetUser.id)
}, 180000);

message.channel.send(`${challenger.username} challenged ${targetUser.username} to a coinflip!\nAccept the challenge by reacting with a check mark.`).then(message => {

message.react(`✅`).then(r => {
message.react(`❌`)

const acceptFilter = (reaction, reactionUser) => reaction.emoji.name === `✅` && reactionUser.id === targetUser.id;
const rejectFilter = (reaction, reactionUser) => reaction.emoji.name === `❌` && reactionUser.id === targetUser.id;
const accept = message.createReactionCollector(acceptFilter, {time: 180000})
const reject = message.createReactionCollector(rejectFilter, {time: 180000})
var accepted = false
var rejected = false
accept.on("collect", r => {
if(accepted === true || rejected === true) return
accepted = true

Casino.findOne({
    userID: challenger.id
}, (err, challengerCasino) => {
if(err) console.log(err)
if(!challengerCasino) challengerCasino = {}
if(!challengerCasino.balance) challengerCasino.balance = 0
if(challengerCasino.balance < betAmount){
    needbalance = betAmount - challengerCasino.balance
    alreadyPlaying.delete(challenger.id && targetUser.id)
   return message.edit(`${challenger.username} challenged ${targetUser.username} to a coinflip!\n${challenger.username} lacks ${needbalance} credits!`)
} else {
    Casino.findOne({
        userID: targetUser.id
    }, (err, targetUserCasino) => {
    if(err) console.log(err)
    if(!targetUserCasino) targetUserCasino = {}
    if(!targetUserCasino.balance) targetUserCasino.balance = 0
    if(targetUserCasino.balance < betAmount){
        needbalance = betAmount - targetUserCasino.balance
        alreadyPlaying.delete(challenger.id && targetUser.id)
       return message.edit(`${challenger.username} challenged ${targetUser.username} to a coinflip!\n${targetUser.username} lacks ${needbalance} credits!`)
    } else {
        number = Math.floor (Math.random() * (2 - 1 + 1)) + 1
        if(number === 1){
            playerLost(targetUser.id)
            playerWon(challenger.id)
            var winner = challenger.username
        } else
        if(number === 2){
            playerLost(challenger.id)
            playerWon(targetUser.id)
            var winner = targetUser.username
        }
        message.edit(`${challenger.username} challenged ${targetUser.username} to a coinflip!\nFlipping the coin in 3 seconds!`)
        setTimeout(t3, 1000)
        function t3() {
        message.edit(`${challenger.username} challenged ${targetUser.username} to a coinflip!\nFlipping the coin in 2 seconds!`)
        setTimeout(t4, 1000)
        function t4() {
        message.edit(`${challenger.username} challenged ${targetUser.username} to a coinflip!\nFlipping the coin in 1 seconds!`)
        setTimeout(t5, 1000)
        function t5(){
        message.edit(`${challenger.username} challenged ${targetUser.username} to a coinflip!\n${winner} won ${betAmount}!`)
        alreadyPlaying.delete(challenger.id && targetUser.id) 
    }}}
    }
})  
}
}) 
})
        
    
reject.on("collect", r => {
    if(accepted === true || rejected === true) return
    rejected = true
    message.edit(`${challenger.username} challenged ${targetUser.username} to a coinflip, which ${targetUser.username} cowardly rejected.`)
    alreadyPlaying.delete(challenger.id && targetUser.id)
})
})
})
}
}

module.exports.help = {
    name: "cf",
    description: "",
    availability: ""
}
