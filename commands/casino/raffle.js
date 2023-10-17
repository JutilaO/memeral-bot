const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args, userObj) => {

casinoChannels = ["]
if(message.author.id !== "" && message.guild.id !== "" && !casinoChannels.includes(message.channel.id)) return

var total = 20000
var formed = ""
var participant = "No"

Casino.find({
}, (err, casino) => {
if(err) console.log(err)

for(i = 0; i < casino.length; i++){
if(!casino[i]) console.log("?")
if(!casino[i]) casino[i] = {}
if(!casino[i].rafflecredits) casino[i].rafflecredits = 0
if(!casino[i].raffle) casino[i].raffle = false
if(casino[i].raffle === true && casino[i].userID === message.author.id) participant = "Yes"
total += casino[i].rafflecredits
if(i === casino.length - 1) send()
}
function send(){
total = total * 1000
array = total.toString()
if(array.length >= 9){
    formed = `${array[0]}${array[1]}${array[2]},${array[3]}${array[4]}${array[5]},${array[6]}${array[7]}${array[8]}$`
} else {
    formed = `${array[0]}${array[1]},${array[2]}${array[3]}${array[4]},${array[5]}${array[6]}${array[7]}$`
}

var embed = new Discord.MessageEmbed()
.setAuthor("Christmas raffle", message.author.displayAvatarURL())
.setColor(0xff1493)
.setDescription(`**Total amount:** ${formed}`)
if(participant === "Yes") embed.setFooter("You have participated in this raffle")
return message.channel.send(embed)
}
})

}

module.exports.help = {
    name: "raffle",
    description: "",
    availability: ""
}
