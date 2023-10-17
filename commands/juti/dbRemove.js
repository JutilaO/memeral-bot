let Memeral = require("../../models/memeral.js");
const Discord = require("discord.js")
const utils = require("../../utilities/notifications.js")
const {prefix, botname, logchannel, ownerID} = require('../../config.json');
module.exports.run = async (bot, message, args) => {

if(message.author.id !== ownerID) return



member = message.mentions.members.first()
if(!member){
    message.channel.send("User not found.")
    return
} else {
    deleteFromDb()
}


function deleteFromDb(){
Memeral.findOneAndDelete({
    userID: member.id,
    guildID: message.guild.id
}, (err, res) => {
    if(err) console.log(err)
    var fieldTitle = `Database deletion`
    var fieldText = `${message.author} removed ${member} from the database!`
    utils.actionLog(message, fieldTitle, fieldText)
    message.channel.send(`Deleted user ${member}`)
})
}
}


module.exports.help = {
    name: "dbremove",
    description: "Removes user from database",
    availability: "admin"
 }