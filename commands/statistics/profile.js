const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")
const Memeral = require("../../models/memeral.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("View profile")
            .addUserOption(option =>
                option
                    .setName("tag")
                    .setDescription("Tag an user")),
    async execute(interaction){
        try {


var guild_id = interaction.guild.id
var input = interaction.options.getUser("tag")
var user_id = interaction.user.id
if(input) var user_id = input.id
var username = interaction.user.username
if(input) var username = input.username
var user = interaction.user
if(input) var user = input
var ephemeral = false
            

guildSettings.findOne({
    guildID: guild_id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild){
        var guild = new guildSettings({
            guildID: guild_id
        })
    } 
    if(!guild.botchannel) guild.botchannel = []
    if(!guild.moderators) guild.moderators = []
    if(!guild.botchannel.length) ephemeral = true
    if(!guild.botchannel.includes(interaction.channelId)) ephemeral = true



var userstats = bot.users.cache.get(user_id)
var userCreated = userstats.createdAt.toString().split(" ")
var day = new Date()
var timeDif = day - userstats.createdAt
var userSinceMs = timeDif / 1000 / 60 / 60 / 24
var userSince = Math.round(userSinceMs)

var guildObj = bot.guilds.cache.get(guild_id)
var guildStats = guildObj.members.cache.get(user_id)

var joinedGuild = guildStats.joinedAt.toString().split(" ")
var guildName = guildObj.name

Memeral.findOne({
    userID: user_id,
    guildID: guild_id
}, (err, memeral) => {
    if(err) console.log(err)
    if(!memeral){
        var memeral = new Memeral({
            userID: user_id
        })
    }
if(!memeral.money) memeral.money = 0
if(!memeral.messages) memeral.messages = 0
if(!memeral.cases) memeral.cases = 0
if(!memeral.trivias) memeral.trivias = 0
if(!memeral.achievements) memeral.achievements = ""
if(!memeral.inventoryvalue) memeral.inventoryvalue = 0
if(!memeral.reputation) memeral.reputation = 0
if(!memeral.commands) memeral.commands = ""
if(!memeral.triviaHighest) memeral.triviaHighest = 0
if(!memeral.dailyHighest) memeral.dailyHighest = 0
if(!memeral.mathStreak) memeral.mathStreak = 0
if(!memeral.shot) memeral.shot = 0
if(!memeral.pftext) memeral.pftext = ""
if(!memeral.inv) memeral.inv = []

var rank = "None"
if(guild.moderators.includes(user_id)) var rank = "Moderator"


var guildTimeDif = day - guildStats.joinedAt
var guildSinceMs = guildTimeDif / 1000 / 60 / 60 / 24
var guildSince = Math.round(guildSinceMs)
var currentDay = new Date()
var createdDay = new Date(guild.createdAt)
var timeSinceMs = currentDay - createdDay
var guildTimeSince = Math.round(timeSinceMs / 1000 / 60 / 60 / 24)
    
achievements = 0
if(memeral.achievements.includes("Buy a perk")) achievements = achievements + 1
if(memeral.achievements.includes("Buy all perks")) achievements = achievements + 1
if(memeral.achievements.includes("Win a coinflip")) achievements = achievements + 1
if(memeral.achievements.includes("Win slots")) achievements = achievements + 1
if(memeral.achievements.includes("7 day streak")) achievements = achievements + 1
if(memeral.achievements.includes("Sell for 1000")) achievements = achievements + 1
if(memeral.achievements.includes("Over 5000")) achievements = achievements + 1
if(memeral.cases > 50) achievements = achievements + 1
if(memeral.cases > 100) achievements = achievements + 1
if(memeral.cases > 200) achievements = achievements + 1
if(memeral.cases > 500) achievements = achievements + 1
if(memeral.messages > 1000) achievements = achievements + 1
if(memeral.messages > 5000) achievements = achievements + 1
if(memeral.messages > 10000) achievements = achievements + 1
if(memeral.messages > 30000) achievements = achievements + 1
if(memeral.trivias > 100) achievements = achievements + 1
if(memeral.trivias > 500) achievements = achievements + 1
if(memeral.trivias > 1000) achievements = achievements + 1
if(memeral.trivias > 2000) achievements = achievements + 1
if(guildSince > 365) achievements = achievements + 1
if(guildSince > 730) achievements = achievements + 1
if(guildSince > 1095) achievements = achievements + 1
if(guildSince > 1825) achievements = achievements + 1
if(guildSince === guildTimeSince) achievements = achievements + 1
if(user.username.length > 18) user.username = user.username.slice(0, 18)

var embed = new Discord.MessageEmbed()
.setTitle(`${username}'s profile`)
.setColor(0xff1493)
.setTimestamp()
.setFooter({text:`ID: ${user_id}`})
.addField("Name", username, true)
.addField("Tag", user.tag.slice((user.tag.length - 5), user.tag.length), true)
.addField("Staff rank", rank, true)
.addField("Coins", memeral.money.toString(), true)
.addField("Messages sent", memeral.messages.toString(), true)
.addField("Chests opened", memeral.cases.toString(), true)
.addField("Trivias answered", memeral.trivias.toString(), true)
.addField("Highest trivia streak", memeral.triviaHighest.toString(), true)
.addField("Highest daily streak", memeral.dailyHighest.toString(), true)
.addField("Achievements", achievements.toString(), true)
.addField("Items", memeral.inv.length.toString(), true)
.addField("Inventory value", memeral.inventoryvalue.toString(), true)
.addField("Reputation", memeral.reputation.toString(), true)
.addField("Perks", (memeral.commands.split(" ").length - 1).toString(), true)
.addField("Shooting range", memeral.shot.toString(), true)
.addField("Joined Discord on", `${userSince} days ago at ${userCreated[1]} ${userCreated[2]} ${userCreated[3]} ${userCreated[4]}`)
.addField(`Joined ${guildName} on`, ` ${guildSince} days ago at ${joinedGuild[1]} ${joinedGuild[2]} ${joinedGuild[3]} ${joinedGuild[4]}`)
if(memeral.pftext){
    embed.setDescription(memeral.pftext)
}

return interaction.reply({embeds: [embed], ephemeral: ephemeral})


})
})
   
         

    } catch(err) {
        if(err) console.log(err)
}
},
category: "statistics"
}