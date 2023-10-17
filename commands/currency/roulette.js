const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Memeral = require("../../models/memeral.js")
const guildSettings = require("../../models/guildSettings.js")
const cooldown = new Set()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roulette")
        .setDescription("Play roulette for coins. Win or lose.")
        .addStringOption(option =>
            option.setName("colour")
            .setDescription("Red, black or white")
                .addChoice("Red (2x bet)", "red")
                .addChoice("Black (2x bet)", "black")
                .addChoice("White (14x bet)", "white")
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName("amount")
            .setDescription("Amount of coins to bet")
            .setRequired(true)),
    async execute(interaction){
        try {


var guild_id = interaction.guild.id
var user_id = interaction.user.id
var user_name = interaction.user.username
var channel_id = interaction.channelId
         
guildSettings.findOne({
    guildID: guild_id
}, (err, guild) => {
if(err) console.log(err)
if(!guild) return interaction.reply({content: `You must set up a bot channel`, ephemeral: true})
if(!guild.botchannel) guild.botchannel = []
if(guild.botchannel.length){
    if(!guild.botchannel.includes(channel_id)) return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
} else return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})


var betColour = interaction.options.getString("colour").toLowerCase()
var betAmount = parseInt(interaction.options.getInteger("amount"))

if(betAmount > 10000) return interaction.reply("Max bet is 10000 coins!")
if(cooldown.has(user_id)) return interaction.reply(`${user_name}: You must wait 5 seconds before playing again!`)
if(betAmount < 0) return interaction.reply("Bet amount cannot be a negative number")

var black = ":black_circle: "
var red = ":red_circle: "
var white = ":white_circle: "
var colorArray = []


Memeral.findOne({
    userID: user_id,
    guildID: guild_id
}, async (err, memeral) => {
if(err) console.log(err)
if(!memeral){
    var memeral = new Memeral({
        userID: user_id,
        guildID: guild_id
    })
}
if(!memeral.money) return interaction.reply(`${user_name}: You do not have any money!`)
if(!memeral.commands) memeral.commands = ""
if(!memeral.money) memeral.money = 0
if(memeral.money < betAmount) return interaction.reply(`${user_name}: You do not have enough money! You need ${betAmount - memeral.money} more!`)


cooldown.add(user_id)

setTimeout(() => {
    cooldown.delete(user_id)
}, 5000)

function randomNumber(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min))
}

for(i = 0; i < 12; i++){
    random = Math.random()
    if(random <= 0.1){
        if(colorArray.includes(white)){
            if(randomNumber(1,2) === 1) colorArray.push(red)
            if(randomNumber(1,2) === 2) colorArray.push(black)
        } else {
            colorArray.push(white)
        }
    } else 
    if(random <= 0.5491564){
        colorArray.push(red)
    } else 
    if(random <= 1){
        colorArray.push(black)
    }
}

box = ":black_large_square:"
arrow = ":arrow_down:"
top = "---------------------------|V|-----------------------------" + "\n"
bottom = "\n" + "-----------------------------------------------------------"
await interaction.reply(top + colorArray.join("")  + bottom)
    winningColor = colorArray[6]
    if(betColour === "red" && winningColor === red){
        if(memeral.commands.includes("p07")){
            moneyTransfer(2)
        } else moneyTransfer(2)
    } else
    if(betColour === "black" && winningColor === black){
        if(memeral.commands.includes("p07")){
            moneyTransfer(2)
        } else moneyTransfer(2)
    } else 
    if(betColour === "white" && winningColor === white){
        if(memeral.commands.includes("p07")){
            moneyTransfer(14)
        } else moneyTransfer(14)
    } else {
        memeral.money = memeral.money - betAmount
        memeral.save().catch(err => console.log(err))
        return interaction.editReply(top + colorArray.join("")  + bottom + `\n ${user_name}: You lost ${betAmount} coins!`)
    } 
    function moneyTransfer(factor){
        memeral.money = memeral.money + (betAmount * factor) - betAmount
        memeral.save().catch(err => console.log(err))
        return interaction.editReply(top + colorArray.join("")  + bottom + `\n ${user_name}: You won ${betAmount * factor} coins!`)
    }

})
  
})

    } catch(err) {
        if(err) console.log(err)
}
},
category: "currency"
}