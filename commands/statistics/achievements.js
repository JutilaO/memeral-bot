const {SlashCommandBuilder} = require("@discordjs/builders")
const {MessageActionRow, MessageButton} = require("discord.js")
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")
const Memeral = require("../../models/memeral.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("achievements")
        .setDescription("View achievements")
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
    if(!guild.botchannel.length) ephemeral = true
    if(!guild.botchannel.includes(interaction.channelId)) ephemeral = true



Memeral.findOne({
    userID: user_id,
    guildID: guild_id
}, async (err, memeral) => {
if(err) console.log(err)
if(!memeral){
    var memeral = new Memeral({
        userID: user_id,
        guildID: guild_id
    })
}
if(!memeral.achievements) memeral.achievements = ""
if(!memeral.cases) memeral.cases = 0
if(!memeral.dailystreak) memeral.dailystreak = 0
if(!memeral.dailyHighest) memeral.dailyHighest = 0
if(!memeral.messages) memeral.messages = 0
if(!memeral.trivias) memeral.trivias = 0
if(!memeral.triviaHighest) memeral.triviaHighest = 0
if(!memeral.shot) memeral.shot = 0
if(!memeral.commands) memeral.commands = ""
   

var guild = bot.guilds.cache.get(guild_id)
var members = guild.members.fetch()
var guildStats = guild.members.cache.get(user_id)

var day = new Date()
var guildTimeDif = day - guildStats.joinedAt
var guildSinceMs = guildTimeDif / 1000 / 60 / 60 / 24
var guildSince = Math.round(guildSinceMs)
var currentDay = new Date()
var createdDay = new Date(guild.createdAt)
var timeSinceMs = currentDay - createdDay
var guildTimeSince = Math.round(timeSinceMs / 1000 / 60 / 60 / 24)

var memeralServer = bot.guilds.cache.get("")
if(!memeralMember) memeralServer.members.fetch()
var memeralMember = memeralServer.members.cache.get(user_id)

var achievements = []
var categories = ["Perks", "Gambling", "Random", "Chests", "Messages", "Trivia", "Loyalty"]



if(memeral.achievements.includes("a01")) achievements.push({name: "Money well spent", description: "Buy a perk", category: "Perks"})
if(memeral.achievements.includes("a02")) achievements.push({name: "Economic professor", description: "Buy all perks", category: "Perks"})
if(memeral.achievements.includes("a03")) achievements.push({name: "Gambler", description: "Win a coinflip", category: "Gambling"})
if(memeral.achievements.includes("a04")) achievements.push({name: "Lucky 7", description: "Win in slotty", category: "Gambling"})
if(memeral.achievements.includes("a05")) achievements.push({name: "Daily task", description: "Daily streak of 7", category: "Random"})
if(memeral.achievements.includes("a06")) achievements.push({name: "Merchant", description: "Sell an item worth over 1000 coins", category: "Random"})
if(memeral.achievements.includes("a07")) achievements.push({name: "Scrooge McDuck", description: "Own over 5000 coins", category: "Random"})
if(memeral.shot > 100) achievements.push({name: "Rookie", description: "Visit shooting range 50 times", category: "Random"})
if(memeral.shot > 500) achievements.push({name: "Sniper", description: "Visit shooting range 250 times", category: "Random"})
if(memeral.shot > 1000) achievements.push({name: "Veteran", description: "Visit shooting range 500 times", category: "Random"})
if(memeralMember){
    if(memeralMember.roles.cache.some(role => role.name === 'Contributor')){
        achievements.push({name: "Contributor", description: "Contribute to Memeral", category: "Random"})
    }
}
if(memeral.cases > 50) achievements.push({name: "Unboxer", description: "Unbox 50 chests", category: "Chests"})
if(memeral.cases > 100) achievements.push({name: "Anomaly", description: "Unbox 100 chests", category: "Chests"})
if(memeral.cases > 200) achievements.push({name: "Chest addict", description: "Unbox 200 chests", category: "Chests"})
if(memeral.cases > 500) achievements.push({name: "Chestmania", description: "Unbox 500 chests", category: "Chests"})
if(memeral.messages > 1000) achievements.push({name: "Social", description: "Send 1000 messages", category: "Messages"})
if(memeral.messages > 5000) achievements.push({name: "Time waster", description: "Send 5000 messages", category: "Messages"})
if(memeral.messages > 10000) achievements.push({name: "Politician", description: "Send 10000 messages", category: "Messages"})
if(memeral.messages > 30000) achievements.push({name: "I've been here for too long", description: "Send 30000 messages", category: "Messages"})
if(memeral.triviaHighest >= 20) achievements.push({name: "On a spree", description: "Be on a trivia streak higher than 20", category: "Trivia"})
if(memeral.trivias > 100) achievements.push({name: "Bored", description: "Answer 100 trivias correctly", category: "Trivia"})
if(memeral.trivias > 500) achievements.push({name: "New questions pls", description: "Answer 500 trivias correctly", category: "Trivia"})
if(memeral.trivias > 1000) achievements.push({name: "Endless knowledge", description: "Answer 1000 trivias correctly", category: "Trivia"})
if(memeral.trivias > 2000) achievements.push({name: "The Wizard", description: "Answer 2000 trivias correctly", category: "Trivia"})
if(guildSince > 365) achievements.push({name: "Loyal", description: "Spend a year in this server", category: "Loyalty"})
if(guildSince > 730) achievements.push({name: "Time flies", description: "Spend 2 years in this server", category: "Loyalty"})
if(guildSince > 1095) achievements.push({name: "It's been a while", description: "Spend 3 years in this server", category: "Loyalty"})
if(guildSince > 1825) achievements.push({name: "Oldman", description: "Spend 4 years in this server", category: "Loyalty"})
if(guildSince === guildTimeSince) achievements.push({name: "Always been here", description: "Founder", category: "Loyalty"})


const embed = new Discord.MessageEmbed()
.setTitle("Achievements")
.setDescription(`${username}'s achievements`)
.setColor(0xff1493)
.setTimestamp()
.setFooter({text: "Page 1 of 2"})

function achievementData(){

for(i = 0; i < categories.length; i++){
    var array = achievements.filter(achievement => achievement.category === categories[i])
    var name = ""
    var desc = ""
    for(x = 0; x < array.length; x++){
        name = name + array[x].name + "\n"
        desc = desc + array[x].description + "\n"
    }
    if(name.length > 2){
        embed.addField(categories[i], name, true)
        embed.addField("Description", desc, true)
        embed.addField("\u200b", "\u200b", true)
    }
}

if(!embed.fields.length) embed.addField("User has no achievements", "Go to the next page to view achievements")
}
achievementData()

const buttons = new MessageActionRow()
.addComponents(
    new MessageButton()
    .setCustomId('last')
    .setLabel('Last page')
    .setStyle('DANGER'),
)
.addComponents(
    new MessageButton()
    .setCustomId('next')
    .setLabel('Next page')
    .setStyle('SUCCESS'),
)

interaction.reply({embeds: [embed], components: [buttons], ephemeral: ephemeral})

const last = b => b.customId === 'last' && b.user.id === user_id
const next = b => b.customId === 'next' && b.user.id === user_id
const lastCollector = interaction.channel.createMessageComponentCollector({last, time: 300000})
const nextCollector = interaction.channel.createMessageComponentCollector({next, time: 300000})

let page = 1

lastCollector.on("collect", async int => {
    if(int.customId === "last"){
        if(page === 1) return
        page--
        embed.fields = []
        achievementData()
        embed.setDescription(`${username}'s achievements`)
        embed.setFooter({text:`Page ${page} of 2`})
        interaction.editReply({embeds: [embed], components: [buttons], ephemeral: ephemeral})
    }
})

nextCollector.on("collect", async int => {
    if(int.customId === "next"){
        if(page === 2) return;
        page++
        embed.fields = []
        embed.setDescription("Note: Trivias must be answered correctly!")
        embed.setTitle("Achievement list")

        embed.addField("Perks", "Money well spent \n Economic professor", true)
        embed.addField("Description", "Buy a perk \n Buy all perks", true)
        embed.addField("\u200b", "\u200b", true)
        embed.addField("Gambling", "Gambler \n Lucky 7", true)
        embed.addField("Description", "Win a coinflip \n Win once in slotmachine", true)
        embed.addField("\u200b", "\u200b", true)
        embed.addField("Random", "Contributor \n Daily task \n Merchant \n Scrooge McDuck \n Rookie \n Sniper \n Veteran", true)
        embed.addField("Description", "Contribute to Memeral \n Daily streak of 7 \n Sell item worth over 1000 coins \n Own over 5000 coins \n Visit shooting range 50 times \n Visit shooting range 250 times \n Visit shooting range 500 times", true)
        embed.addField("\u200b", "\u200b", true)
        embed.addField("Chests", "Unboxer \n Anomaly \n Chest addict \n Chestmania", true)
        embed.addField("Description", "Unbox 50 chest \n Unbox 100 chests \n Unbox 200 chests \n Unbox 500 chests", true)
        embed.addField("\u200b", "\u200b", true)
        embed.addField("Messages", "Social \n Time waster \n Politician \n I've been here for too long", true)
        embed.addField("Description", "Send 1000 messages \n Send 5000 messages \n Send 10000 messages \n Send 30000 messages", true)
        embed.addField("\u200b", "\u200b", true)
        embed.addField("Trivia", "On a spree \n Bored \n New questions pls \n Endless knowledge \n The Wizard", true)
        embed.addField("Description", "Be on a trivia streak higher than 20 \n Answer 100 trivias  \n Answer 500 trivias \n Answer 1000 trivias \n Answer 2000 trivias", true)
        embed.addField("\u200b", "\u200b", true)
        embed.addField("Loyalty", "Loyal \n Time flies \n It's been a while \n Oldman \n Always been here", true)
        embed.addField("Description", "Spend a year on this server  \n Spend 2 years on this server \n Spend 3 years on this server \n Spend 4 years on this server \n Founder", true)
        embed.addField("\u200b", "\u200b", true)
        embed.setFooter({text:`Page ${page} of 2`})
        interaction.editReply({embeds: [embed], components: [buttons], ephemeral: ephemeral})
    }
})

})
})
   
         

    } catch(err) {
        if(err) console.log(err)
}
},
category: "statistics"
}
