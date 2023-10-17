const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args, ops, userObj) => {

casinoChannels = []
if(message.author.id !==  && !casinoChannels.includes(message.channel.id)) return

async function findUser(){
    var callingFile = "casino/balance.js"
    var commandFile = require("../../auto/findUser.js")
    return await commandFile.run(bot, message, args, ops, callingFile)
}

var taggedUser = message.mentions.users.first()

if(args[0] && !taggedUser){
    if(!userObj) return findUser()
} else {
    if(!taggedUser){
        var player = message.author
        var user = "You have"
    }
}
if(taggedUser){
    var player = taggedUser
    var user = `${player.username} has`
}
if(userObj){
    var player = userObj.user
    var user = `${player.username} has`
}

var embed = new Discord.MessageEmbed()
.setAuthor(`${player.username}'s balance`, player.displayAvatarURL())
.setColor(0xff1493)


Casino.findOne({
    userID: player.id
}, (err, casino) => {
    if(err) console.log(err)
    if(!casino) casino = {}
    if(!casino.balance) casino.balance = 0
    if(!casino.wager) casino.wager = 0
    if(casino.bonusmoney > 0){
        embed.setDescription(`${user} ${casino.balance} credits\nBonus: ${casino.bonusmoney} credits\nWager left: ${casino.wager} credits`)
    } else {
        embed.setDescription(`${user} ${casino.balance} credits`)
    }
    message.channel.send(embed)
})

}

module.exports.help = {
    name: "balance",
    description: "Check your balance",
    availability: ""
}
