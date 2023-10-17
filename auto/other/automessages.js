const Discord = require("discord.js")
const schedule = require("node-schedule")
const guildSettings = require("../../models/guildSettings.js")
module.exports.run = async (bot, message, args) => {
    return
var date = new Date().toString()
var dateArray = date.split(" ")
var dateDay = dateArray[0]
var dateTime = dateArray[4].split(":")
var monthDay = dateArray[2]

if(dateDay === "Mon") today = 1
if(dateDay === "Tue") today = 2
if(dateDay === "Wed") today = 3
if(dateDay === "Thu") today = 4
if(dateDay === "Fri") today = 5
if(dateDay === "Sat") today = 6
if(dateDay === "Sun") today = 7

guildSettings.find({
}, (err, guild) => {
    if(err) console.log(err)
        for(i in guild){
            if(guild[i].automessage){
                for(x = 0; x < guild[i].automessage.length; x++){
                    if(guild[i].automessage[x].postChannel && guild[i].automessage[x].dayInterval && guild[i].automessage[x].hourInterval && guild[i].automessage[x].messageText){
                        guild[i].automessage[x].guildID = guild[i].guildID
                        if(guild[i].automessage[x].intervalType === "w"){
                            if(today === parseInt(guild[i].automessage[x].dayInterval) && parseInt(dateTime[0]) === parseInt(guild[i].automessage[x].hourInterval) && parseInt(dateTime[1]) === parseInt(guild[i].automessage[x].minuteInterval)){
                                server = bot.guilds.cache.get(guild[i].guildID)
                                server.channels.cache.get(guild[i].automessage[x].postChannel).send(guild[i].automessage[x].messageText)
                            }
                        }
                        if(guild[i].automessage[x].intervalType === "m"){
                            if(parseInt(monthDay) === parseInt(guild[i].automessage[x].dayInterval) && parseInt(dateTime[0]) === parseInt(guild[i].automessage[x].hourInterval) && parseInt(dateTime[1]) === parseInt(guild[i].automessage[x].minuteInterval)){
                                server = bot.guilds.cache.get(guild[i].guildID)
                                server.channels.cache.get(guild[i].automessage[x].postChannel).send(guild[i].automessage[x].messageText)
                            }
                        }
                    }
                }
            }
        }
})
}