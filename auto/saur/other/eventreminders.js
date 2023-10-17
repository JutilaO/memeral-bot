const Discord = require("discord.js")
const schedule = require("node-schedule")
const guildSettings = require("../../../models/guildSettings.js")
module.exports.run = async (bot, message, args) => {
return
var rule = new schedule.RecurrenceRule()
rule.hour = [5, 17]
rule.minute = 45
rule.dayOfWeek = [0, 2, 4, 6]

var j = schedule.scheduleJob(rule, function(){

guildSettings.find({
    community: "saur"
}, (err, guild) => {
    if(err) console.log(err)

    for(i = 0; i < guild.length; i++){

    if(!guild[i].guildID) guild[i].guildID = ""
    if(!guild[i].reminder) guild[i].reminder = []
    if(!guild[i].community) guild[i].community = ""
    if(guild[i].community === "saur"){
        var searchIndex = guild[i].reminder.map(function(item){return item.type}).indexOf("warzone")
        if(searchIndex !== -1){
            channel = bot.channels.cache.get(guild[i].reminder[searchIndex].channel)
            console.log(channel)
            if(channel) channel.send(`Warzones are starting soon, get ready @everyone!`)
        }
    }
}
})
})

var rule = new schedule.RecurrenceRule()
rule.hour = [5, 17]
rule.minute = 45
rule.dayOfWeek = [1, 3, 5]

var j = schedule.scheduleJob(rule, function(){
    guildSettings.find({
        community: "saur"
    }, (err, guild) => {
        if(err) console.log(err)
    
        for(i = 0; i < guild.length; i++){
    
        if(!guild[i].guildID) guild[i].guildID = ""
        if(!guild[i].reminder) guild[i].reminder = []
        if(!guild[i].community) guild[i].community = ""
        if(guild[i].community === "saur"){
            var searchIndex = guild[i].reminder.map(function(item){return item.type}).indexOf("doomsday")
            if(searchIndex !== -1){
                channel = bot.channels.cache.get(guild[i].reminder[searchIndex].channel)
                console.log(channel)
                if(channel) channel.send(`Doomsday is starting soon, get ready @everyone!`)
            }
        }
    }
    
    })
    
    })


}


  