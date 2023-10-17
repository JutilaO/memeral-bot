const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args) => {

if(message.author.id !== "") return

function randomNumber(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min))
}
total = 20000
data = []
Casino.find({
}, (err, casino) => {
if(err) console.log(err)
for(i = 0; i < casino.length; i++){
    if(casino[i].rafflecredits) total += casino[i].rafflecredits
    if(casino[i].account !== "NeonOG" && casino[i].raffle === true) data.push({id: casino[i].userID, name: casino[i].account, raffle: casino[i].raffle})
}
total = total * 1000
array = total.toString()
winner = data[randomNumber(0, data.length - 1)]
if(array.length >= 9){
    formed = `${array[0]}${array[1]}${array[2]},${array[3]}${array[4]}${array[5]},${array[6]}${array[7]}${array[8]}$`
} else {
    formed = `${array[0]}${array[1]},${array[2]}${array[3]}${array[4]},${array[5]}${array[6]}${array[7]}$`
}
return message.channel.send(`Congratulations to <@${winner.id}> (${winner.name}) for winning ${formed}!\nContact Juti in game to redeem your prize!`)
})

}

module.exports.help = {
    name: "roll",
    description: "",
    availability: ""
}
