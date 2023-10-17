const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Memeral = require("../../models/memeral.js")
const guildSettings = require("../../models/guildSettings.js")
const fs = require("fs")
const cooldown = new Set()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hack")
        .setDescription("Hack the bank to get coins (or fail and get jailed)"),
    async execute(interaction){
        try {
         

var letters = []
var shuffledWord = []
var guild_id = interaction.guild.id
var user_id = interaction.user.id
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


if(cooldown.has(user_id)) return interaction.reply("You are still in jail!")

var number = 173
var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;
var lineReader = require('readline').createInterface({
input: require('fs').createReadStream('./commands/currency/hackWords.txt')
});
lineReader.on('line', function (line) {
wordNumber = parseInt(line.slice(0, 4).trim())
if(wordNumber === random) {
wordIndex = line.indexOf(":")
wordIndex = wordIndex + 2
var word = line.slice(wordIndex, line.length)
letters = word.split("")

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
    
shuffledWord = shuffle(letters).join("")
letter1 = word.charAt(0)
letter2 = word.charAt(1)
letter3 = word.charAt(2)
letter4 = word.charAt(3)
if(word.length < 4) hint = `-`
if(word.length > 4) hint = `${letter1}`
if(word.length > 7) hint = `${letter1}${letter2}`
if(word.length > 9) hint = `${letter1}${letter2}${letter3}`
if(word.length > 12) hint = `${letter1}${letter2}${letter3}${letter4}`
         
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
if(!memeral.commands) memeral.commands = ""
if(memeral.commands.includes("p07 ")){
    cooldownLength = 15000
    hintLength = 10000
    timeMessage = "15 seconds"
} else {
    cooldownLength = 30000
    hintLength = 20000
    timeMessage = "30 seconds"
}
        

var answered = ["no"]
const embed = new Discord.MessageEmbed()
.setTitle(`Hacking the bank`)
.setAuthor({name: interaction.user.username, icon: interaction.user.displayAvatarURL()})
.setColor(0xff1493)
.setTimestamp()
.setFooter({text: "Pentagon level cryptographer"})
.setURL()
.setDescription("In order to hack the bank you must crack their password! Create a word from these letters below and send it in the chat!")
.addField("Letters:", `${shuffledWord}`, true)
interaction.reply({embeds: [embed]})
filter = m => m.author.id === user_id
channel.awaitMessages({filter, max: 1, time: 30000, errors:["time"]})
.then((collected) => {
    answer = collected.first().content.toLowerCase()
        if(answer === word){
            moneyToAdd = 15 + parseInt(word.length)
            memeral.money = memeral.money + moneyToAdd
            memeral.save().catch(err => console.log(err))
            embed.addField("Correct! Password is:", word)
            embed.addField("Successfully hacked!", `You gained ${moneyToAdd} coins! Your balance is now ${memeral.money} coins!`)
            interaction.editReply({embeds: [embed]})
            answered = ["yes"]
            return
            
        } else { 
            embed.addField("Correct answer:", word)
            embed.addField("Mission failed", `You got caught by police and got jailed for ${timeMessage}!`)
            cooldown.add(user_id)
            setTimeout(() => {
                cooldown.delete(user_id)
            }, cooldownLength);
            interaction.editReply({embeds: [embed]})
            answered = ["yes"]
            return
            
        }
  
})
.catch(() => {
    embed.addField("Correct answer", word)
    embed.addField("Mission failed", `You got caught by police and got jailed for ${timeMessage}!`)
    cooldown.add(user_id)
    setTimeout(() => {
        cooldown.delete(user_id)
    }, cooldownLength);
    interaction.editReply({embeds: [embed]})
    return
})

setTimeout(() => {
    if(answered[0] === "yes") return
    embed.addField("Hint! The password starts with:", hint, true)
    interaction.editReply({embeds: [embed]})
}, hintLength);

        
})
}})
})
    } catch(err) {
        if(err) console.log(err)
}
},
category: "currency"
}