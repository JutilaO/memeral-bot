const Discord = require("discord.js")
const botSettings = require("../../models/botSettings.js");
const {prefix, botname, logchannel, ownerID} = require('../../config.json');
module.exports.run = async (bot, message, args) => {

if(message.author.id !== ownerID) return

if(!args[1]) return message.channel.send("Enter command")
if(args[0] !== "add"){
    if(args[0] !== "remove"){
        return message.channel.send("Correct usage: >restrict add/remove command")
    }
}



botSettings.findOne({
    ownerID: ownerID
}, (err, botSet) => {
    if(err) console.log(err)
    if(!botSet){
        const newbotSettings = new botSettings({
            ownerID: ownerID,
            restricted: ""
        })
        newbotSettings.save().catch(console.log(err))
    } else { 
    if(!botSet.restricted) botSet.restricted = ""
    if(args[0] === "add"){
        if(botSet.restricted.includes(args[1])) return message.channel.send(args[1] + " is already restricted")
        botSet.restricted = botSet.restricted + `${args[1]} `
        botSet.save().catch(err => console.log(err))
        message.channel.send(`Disabled **${args[1]}** command`)
    } 
    if(args[0] === "remove"){
        if(!botSet.restricted.includes(args[1])) return message.channel.send(args[1] + " isn't restricted")
        bl = botSet.restricted.split(" ")
        var counts = {};
        blCheck = bl.filter(bld => bld !== `${args[1]}`)
        blCheck.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
        var res = Object.keys(counts)
        .map(function(k) {
        return [k, counts[k]];
        });
        botSet.restricted = `${blCheck.join(" ")}`
        botSet.save().catch(err => console.log(err))
        message.channel.send(`Enabled ${args[1]} command`)
    }
    }

})

}


module.exports.help = {
    name: "restrict"
 }