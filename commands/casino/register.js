const Discord = require("discord.js")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args) => {


casinoChannels = ["]
if(message.author.id !== "6" && message.guild.id !== "" && !casinoChannels.includes(message.channel.id)) return


var accountname = args[0]
if(!accountname) return message.channel.send("Input your SAUR account name")


Casino.findOne({
    userID: message.author.id
}, (err, casino) => {
if(err) console.log(err)
if(!casino){
    var casino = new Casino({
    userID: message.author.id
    })
}
if(casino.account) return message.channel.send("You have already set up your account name")
if(!casino.account) casino.account = ""
casino.account = accountname
casino.save().catch(err => console.log(err))
return message.channel.send(`Account name is now set to ${accountname}`)
    
})

}

module.exports.help = {
    name: "register",
    description: "",
    availability: ""
}
