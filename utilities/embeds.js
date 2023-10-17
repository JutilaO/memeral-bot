const Discord = require("discord.js")
const fs = require("fs")
const {botname} = require("../config.json")
module.exports.embed = (message, title, fieldTitle, fieldText, footer) => {

    
const embed = new Discord.MessageEmbed()
.setTitle(`${title} \n -----------------------------------------------------------------------------`)
.setAuthor("Ju8", "https://i.imgur..jpg")
.setColor(0xff1493)
.setImage("")
.setTimestamp()
.setFooter(footer)
.setURL()
.addField(fieldTitle, fieldText)


message.channel.send(embed)

}

module.exports.embedLongInline = (message, title, fieldTitle, fieldText, fieldTitle2, fieldText2, footer) => {

    
const embed = new Discord.MessageEmbed()
.setTitle(`${title} \n -----------------------------------------------------------------------------`)
.setAuthor("J5", "https://i.imgur.com/.jpg")
.setColor(0xff1493)
.setImage("")
.setTimestamp()
.setFooter(footer)
.setURL()
.addField(fieldTitle, fieldText, true)
.addField(fieldTitle2, fieldText2, true)
    
    
message.channel.send(embed)

}

module.exports.serverStats = (message, name, memberAmount, created, timeSince, owner, verified, id, thumbnail) => {


const embed = new Discord.MessageEmbed()
.setTitle(`${name} statistics`)
.setColor(0xff1493)
.setTimestamp()
.setFooter("ID: " + id)
.setThumbnail(thumbnail)
.addField("Name:", name, true)
.addField("Owner:", owner, true)
.addField("Created at:", created, true)
.addField("Days since:", timeSince, true)
.addField("Member amount:", memberAmount, true)
.addField("Verified?", verified, true)
    
    
message.channel.send(embed)

}


module.exports.urbanSearch = (message, word, definition, example, url, up, down, author) => {


    const embed = new Discord.MessageEmbed()
    .setTitle(`Urban dictionary search`)
    .setURL(url)
    .setColor(0xff1493)
    .setImage("")
    .setTimestamp()
    .setFooter("Author: " + author)
    .setURL()
    .addField("Word:", word)
    .addField("Definition:", definition)
    .addField("Example:", example)
    .addField("Upvotes:", up, true)
    .addField("Downvotes:", down, true)

    message.channel.send(embed)
    
}
