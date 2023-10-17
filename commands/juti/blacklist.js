const Discord = require("discord.js")
const botSettings = require("../../models/botSettings.js");
const {prefix, botname, logchannel, ownerID} = require('../../config.json');
module.exports.run = async (bot, message, args) => {

if(message.author.id !== ownerID) return

if(!args[1]) return message.channel.send("Enter ID")
if(args[0] !== "add"){
    if(args[0] !== "remove"){
        return message.channel.send("Correct usage: >blacklist add/remove ID")
    }
}

if(isNaN(args[1])) return message.channel.send("ID must be a set of numbers")
if(args[1].length > 18) return message.channel.send("ID must be 18 numbers, no more or less")

botSettings.findOne({
    ownerID: ownerID
}, (err, botSet) => {
    if(err) console.log(err)
    if(!botSet){
        const newbotSettings = new botSettings({
            ownerID: ownerID,
            blacklist: ""
        })
        newbotSettings.save().catch(console.log(err))
    } else { 
    if(!botSet.blacklist) botSet.blacklist = ""
    if(args[0] === "add"){
        if(botSet.blacklist.includes(args[1])) return message.channel.send(args[1] + " is already blacklisted")
        botSet.blacklist = botSet.blacklist + `${args[1]} `
        botSet.save().catch(err => console.log(err))
        message.channel.send(`Added **${args[1]}** to blacklist`)
    } 
    if(args[0] === "remove"){
        if(!botSet.blacklist.includes(args[1])) return message.channel.send(args[1] + " isn't blacklisted")
        bl = botSet.blacklist.split(" ")
        var counts = {};
        blCheck = bl.filter(bld => bld !== `${args[1]}`)
        blCheck.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
        var res = Object.keys(counts)
        .map(function(k) {
        return [k, counts[k]];
        });
        botSet.blacklist = `${blCheck.join(" ")}`
        botSet.save().catch(err => console.log(err))
        message.channel.send(`Successfully removed ${args[1]} from blacklist!`)
    }
    }

})

}


module.exports.help = {
    name: "blacklist"
 }