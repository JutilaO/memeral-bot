const Discord = require("discord.js")
const botSettings = require("../../models/botSettings.js");
const Memeral = require("../../models/memeral.js");
const {prefix, botname, logchannel, ownerID} = require('../../config.json');
module.exports.run = async (bot, message, args) => {

if(message.author.id !== ownerID) return

const embed = new Discord.MessageEmbed()
.setTitle(`${botname} statistics`)
.setColor(0xff1493)

botSettings.findOne({
    ownerID: ownerID
}, (err, botSet) => {
    if(err) console.log(err)

Memeral.find({
}, (err, memeral) => {
    if(err) console.log(err)


restricted = botSet.restricted
blacklist = botSet.blacklist.split(" ").length - 1
activity = botSet.activity
guilds = bot.guilds.cache.size
activeUsers = memeral.length

var guildIDs = bot.guilds.cache.map(g => g.id)
totalUsers = 0
for(i = 0; i < guildIDs.length; i++){
    totalUsers = totalUsers + bot.guilds.cache.get(guildIDs[i]).memberCount
}
    

var page = 1
var commands = [
    ["Restricted commands", "Blacklisted users", "Activity", "Guilds", "Reg. users", "Total users", "Total command uses"],
    ["Buy", "Chest", "Coinflip", "Daily", "Math", "Sell", "Slotty", "Trivia", "Shoot"], 
    ["Admin", "Mod", "Announcement", "Botchannel", "Community", "Msgmoney", "Prefix", "Role", "Logchannel", "Music", "Dj", "Automessage", "Command"],
    ["Help", "Report", "Suggest"],
    ["Del", "Mute"],
    ["Clear", "Forceskip", "Pause", "Play", "Queue", "Resume", "Shuffle", "Skip", "Volume", "Repeat", "Playlist"],
    ["Choose", "Discord", "Embed", "Pfp", "Rep", "Sign", "Vote"],
    ["Achievements", "Coins", "Inventory", "Leaderboards", "Perks", "Profile", "Serverstats", "Staff", "Settings"],
    ["Egyptify", "Events", "Nickname", "Random", "Vehicles", "Online"],
]
var uses = [
    [restricted, blacklist, activity, guilds, activeUsers, totalUsers, botSet.total],
    [botSet.buy, botSet.chest, botSet.coinflip, botSet.daily, botSet.math, botSet.sell, botSet.slotty, botSet.trivia, botSet.shoot],
    [botSet.admin, botSet.mod, botSet.announcement, botSet.botchannel, botSet.community, botSet.msgmoney, botSet.prefix, botSet.role, botSet.logchannel, botSet.music, botSet.dj, botSet.automessage, botSet.command],
    [botSet.help, botSet.report, botSet.suggest],
    [botSet.del, botSet.mute],
    [botSet.clear, botSet.forceskip, botSet.pause, botSet.play, botSet.queue, botSet.resume, botSet.shuffle, botSet.skip, botSet.volume, botSet.repeat, botSet.playlist],
    [botSet.choose, botSet.discord, botSet.embed, botSet.pfp, botSet.rep, botSet.sign, botSet.vote],
    [botSet.achievements, botSet.coins, botSet.inventory, botSet.leaderboards, botSet.perks, botSet.profile, botSet.serverstats, botSet.staff, botSet.settings],
    [botSet.egyptify, botSet.events, botSet.nickname, botSet.random, botSet.vehicles, botSet.online]
]
var titles = [
    "Other", "Currency", "Guild", "Help", "Moderator", "Music", "Public", "Statistics", "SAUR"
]

embed.addField(`${titles[page - 1]} category`, commands[page - 1].join("\n"), true)
if(page === 1){
    embed.addField(`Data`, uses[page - 1].join("\n"), true)
} else embed.addField(`Uses`, uses[page - 1].join("\n"), true)
embed.setFooter(`Page ${page} of ${uses.length}`)

message.channel.send({embed}).then(message => {
message.react(`⬅`).then(r => {
message.react(`➡`)
        
const lastFilter = (reaction, reactionUser) => reaction.emoji.name === `⬅` && reactionUser.id === ownerID;
const nextFilter = (reaction, reactionUser) => reaction.emoji.name === `➡` && reactionUser.id === ownerID;
const back = message.createReactionCollector(lastFilter, {time: 180000})
const next = message.createReactionCollector(nextFilter, {time: 180000})



next.on("collect", r => {
if(page === uses.length) page = 0
page++
embed.fields = []
embed.addField(`${titles[page - 1]} category`, commands[page - 1].join("\n"), true)
if(page === 1){
    embed.addField(`Data`, uses[page - 1].join("\n"), true)
} else embed.addField(`Uses`, uses[page - 1].join("\n"), true)
embed.setFooter(`Page ${page} of ${uses.length}`)
message.edit({embed})
})
            
        
back.on("collect", r => {
if(page === 1) page = uses.length + 1
page--
embed.fields = []
embed.addField(`${titles[page - 1]} category`, commands[page - 1].join("\n"), true)
if(page === 1){
    embed.addField(`Data`, uses[page - 1].join("\n"), true)
} else embed.addField(`Uses`, uses[page - 1].join("\n"), true)
embed.setFooter(`Page ${page} of ${uses.length}`)
message.edit({embed})
})
})
})
})

})

}


module.exports.help = {
    name: "botstats"
}