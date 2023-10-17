const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Memeral = require("../../models/memeral.js")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("math")
        .setDescription("A random math question. You might even get some coins."),
    async execute(interaction){
        try {


var user_id = interaction.user.id
var guild_id = interaction.guild.id
var channel_id = interaction.channelId
var channel = interaction.guild.channels.cache.get(channel_id)

guildSettings.findOne({
    guildID: guild_id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild) return interaction.reply({content: `You must set up a bot channel`, ephemeral: true})
    if(!guild.botchannel) guild.botchannel = []
    if(guild.botchannel.length){
        if(!guild.botchannel.includes(channel_id)) return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
    } else return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})


randomAmn4 = 2
random4 = Math.floor(Math.random() * (randomAmn4 - 1 + 1)) + 1 
switch(random4){
    case 1: var firstOperator = "+"; break
    case 2: var firstOperator = "-"; break
}

randomAmn5 = 2
random5 = Math.floor(Math.random() * (randomAmn5 - 1 + 1)) + 1 
switch(random5){
    case 1: var secondOperator = "+"; break
    case 2: var secondOperator = "-"; break
}

var firstNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1 
var secondNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1 
var thirdNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1 
var fourthNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1 
var fifthNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1 
var sixthNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1 

var firstCoupleString = `${firstNumber}${secondNumber}`
var secondCoupleString = `${thirdNumber}${fourthNumber}`
var thirdCoupleString = `${fifthNumber}${sixthNumber}`
var firstCouple = parseInt(firstCoupleString)
var secondCouple = parseInt(secondCoupleString)
var thirdCouple = parseInt(thirdCoupleString)

if(firstOperator === "-"){
    part1 = firstCouple - secondCouple
    var part1Num = parseInt(part1)
} else {
    part1 = firstCouple + secondCouple
    var part1Num = parseInt(part1)
}
if(secondOperator === "-"){
    part2 = part1Num - thirdCouple
    part2Num = parseInt(part2)
} else {
    part2 = part1Num + thirdCouple
    part2Num = parseInt(part2)
}

var trueAnswer = part2Num
var fullQString = `${firstCouple} ${firstOperator} ${secondCouple} ${secondOperator} ${thirdCouple}`
var stringAnswer = trueAnswer.toString()


Memeral.findOne({
    userID: user_id,
    guildID: guild_id
    
}, (err, memeral) => {
if(err) console.log(err)
if(!memeral){
    var memeral = new Memeral({
        userID: user_id,
        guildID: guild_id
    })
}
if(!memeral.money) memeral.money = 0
if(!memeral.maths) memeral.maths = 0
if(!memeral.mathStreak) memeral.mathStreak = 0

interaction.reply(fullQString)
filter = m => m.author.id === user_id
channel.awaitMessages({filter, max: 1, time: 10000, errors:["time"]})
.then((collected) => {

answer = collected.first().content.toLowerCase()
if(answer === stringAnswer) {   

function randomNumber(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min))
}

let moneyToAdd =  randomNumber(15, 25)

    memeral.mathStreak = memeral.mathStreak + 1

    memeral.money = memeral.money + moneyToAdd + (memeral.mathStreak * 3)
    interaction.editReply(`${fullQString}\nCorrect! Your balance is now ${memeral.money}. Win streak: ${memeral.mathStreak}`)
    memeral.save().catch(err => console.log(err))

} else {
    memeral.mathStreak = 0
    memeral.save().catch(err => console.log(err))
    interaction.editReply(`${fullQString}\nNot quite. Correct answer is: ${trueAnswer}`)
}
})
.catch((err) => {
    console.log(err)
    memeral.mathStreak = 0
    memeral.save().catch(err => console.log(err))
    interaction.editReply(`${fullQString}\nYou didn't answer in time.`)
})
})
})

    } catch(err) {
        if(err) console.log(err)
}
},
category: "currency"
}