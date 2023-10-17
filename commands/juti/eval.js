const Discord = require("discord.js")
const {prefix, botname, logchannel, ownerID} = require('../../config.json');
module.exports.run = async (bot, message, args) => {

if(message.author.id !== ownerID) return

var code = args.join(" ")
var evaled = eval(code)
evaled = require("util").inspect(evaled)

message.channel.send(evaled)

}

module.exports.help = {
    name: "eval"
 }