const {google} = require('googleapis')
const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")
const Memeral = require("../../models/memeral.js")
const {MessageActionRow, MessageButton} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("View inventory")
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
    if(!guild.community) guild.community = ""
    var sheetID = ""
    if(guild.community === "saur") var sheetID = ""
    if(guild_id === "38") var sheetID = ""
    if(!guild.botchannel.length) ephemeral = true
    if(!guild.botchannel.includes(interaction.channelId)){
        ephemeral = true
    }

Memeral.findOne({
    userID: user_id,
    guildID: guild_id
}, (err, memeral) => {
if(!memeral){
var memeral = new Memeral({
    userID: user_id,
    guildID: guild_id
})
} 
if(err) console.log(err)
if(!memeral.inventoryvalue) memeral.inventoryvalue = 0
if(!memeral.inv) memeral.inv = []
if(!memeral.inv.length) return interaction.reply({content: `${username} has no items`, ephemeral: true})

var rarities = ["Common", "Rare", "Extraordinary", "Legendary", "Mythic", "Blackmarket"]
var blackmarketAll = []
var mythicAll = []
var legendaryAll = []
var extraordinaryAll = []
var rareAll = []
var commonAll = []
var items = memeral.inv

var userItems = {
    blackmarket: {
        value: 0,
        amount: 0,
        items: []
    },
    mythic: {
        value: 0,
        amount: 0,
        items: []
    },
    legendary: {
        value: 0,
        amount: 0,
        items: []
    },
    extraordinary: {
        value: 0,
        amount: 0,
        items: []
    },
    rare: {
        value: 0,
        amount: 0,
        items: []
    },
    common: {
        value: 0,
        amount: 0,
        items: []
    }
}

authorize();

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(})
    callback(oAuth2Client);
}


function statistics(auth) {
const sheets = google.sheets({version: 'v4', auth})
sheets.spreadsheets.values.get({
spreadsheetId: sheetID,
range: '',
}, (err, res) => {
if (err) return console.log('The API returned an error: ' + err);
const rows = res.data.values;
if (rows.length) {
rows.map((row) => {
    if(row[2] !== undefined && row[2].includes("Blackmarket")) blackmarketAll.push({id: row[1], name: row[2].toString()})
    if(row[2] !== undefined && row[2].includes("Mythic")) mythicAll.push({id: row[1], name: row[2]})
    if(row[2] !== undefined && row[2].includes("Legendary")) legendaryAll.push({id: row[1], name: row[2]})
    if(row[2] !== undefined && row[2].includes("Extraordinary")) extraordinaryAll.push({id: row[1], name: row[2]})
    if(row[2] !== undefined && row[2].includes("Rare")) rareAll.push({id: row[1], name: row[2]})
    if(row[2] !== undefined && row[2].includes("Common")) commonAll.push({id: row[1], name: row[2]})
})
post()
} else {
console.log('No data found.')
}
})
}

function post(){
var all = false
while(all === false){
    if(items.length > 0){
    rarity = items[0].slice(0, 1)
    condition = items[0].slice(1, 2)
    id = items[0].slice(2, items[0].length)
    if(condition === "A") conditionFactor = 6, conditionName = "(Black foil)"
    if(condition === "B") conditionFactor = 4, conditionName = "(Holographic foil)"
    if(condition === "C") conditionFactor = 3, conditionName = "(Chrome)"
    if(condition === "D") conditionFactor = 2, conditionName = "(Platinum)"
    if(condition === "E") conditionFactor = 1, conditionName = ""
    if(rarity === "A"){
        var searchIndex = blackmarketAll.map(function(item){return item.id}).indexOf(id)
        stack = items.filter(item => item === items[0])
        items = items.filter(item => item !== items[0])
        if(searchIndex !== -1){
        if(stack.length > 0){
            userItems.blackmarket.amount += stack.length
            userItems.blackmarket.items.push(`${stack.length}x ${blackmarketAll[searchIndex].name} ${conditionName}\n`)
        } else {
            userItems.blackmarket.amount += 1
            userItems.blackmarket.items.push(`1x ${blackmarketAll[searchIndex].name} ${conditionName}\n`)
        }
        userItems.blackmarket.value += 7500 * conditionFactor * stack.length
    }
    }
    if(rarity === "B"){
        var searchIndex = mythicAll.map(function(item){return item.id}).indexOf(id)
        stack = items.filter(item => item === items[0])
        items = items.filter(item => item !== items[0])
        if(searchIndex !== -1){
        if(stack.length > 0){
            userItems.mythic.amount += stack.length
            userItems.mythic.items.push(`${stack.length}x ${mythicAll[searchIndex].name} ${conditionName}\n`)
        } else {
            userItems.mythic.amount += 1
            userItems.mythic.items.push(`1x ${mythicAll[searchIndex].name} ${conditionName}\n`)
        }
        userItems.mythic.value += 3250 * conditionFactor * stack.length
    }
    }
    if(rarity === "C"){
        var searchIndex = legendaryAll.map(function(item){return item.id}).indexOf(id)
        stack = items.filter(item => item === items[0])
        items = items.filter(item => item !== items[0])
        if(searchIndex !== -1){
        if(stack.length > 0){
            userItems.legendary.amount += stack.length
            userItems.legendary.items.push(`${stack.length}x ${legendaryAll[searchIndex].name} ${conditionName}\n`)
        } else {
            userItems.legendary.amount += 1
            userItems.legendary.items.push(`1x ${legendaryAll[searchIndex].name} ${conditionName}\n`)
        }
        userItems.legendary.value += 1200 * conditionFactor * stack.length
    }
    }
    if(rarity === "D"){
        var searchIndex = extraordinaryAll.map(function(item){return item.id}).indexOf(id)
        stack = items.filter(item => item === items[0])
        items = items.filter(item => item !== items[0])
        if(searchIndex !== -1){
            if(stack.length > 0){
                userItems.extraordinary.amount += stack.length
                userItems.extraordinary.items.push(`${stack.length}x ${extraordinaryAll[searchIndex].name} ${conditionName}\n`)
            } else {
                userItems.extraordinary.amount += 1
                userItems.extraordinary.items.push(`1x ${extraordinaryAll[searchIndex].name} ${conditionName}\n`)
            }
            userItems.extraordinary.value += 500 * conditionFactor * stack.length
        }
    }
    if(rarity === "E"){
        var searchIndex = rareAll.map(function(item){return item.id}).indexOf(id)
        stack = items.filter(item => item === items[0])
        items = items.filter(item => item !== items[0])
        if(searchIndex !== -1){
        if(stack.length > 0){
            userItems.rare.amount += stack.length
            userItems.rare.items.push(`${stack.length}x ${rareAll[searchIndex].name} ${conditionName}\n`)
        } else {
            userItems.rare.amount += 1
            userItems.rare.items.push(`1x ${rareAll[searchIndex].name} ${conditionName}\n`)
        }
        userItems.rare.value += 100 * conditionFactor * stack.length
    }
    }
    if(rarity === "F"){
        var searchIndex = commonAll.map(function(item){return item.id}).indexOf(id)
        stack = items.filter(item => item === items[0])
        items = items.filter(item => item !== items[0])
        if(searchIndex !== -1){
        if(stack.length > 0){
            userItems.common.amount += stack.length
            userItems.common.items.push(`${stack.length}x ${commonAll[searchIndex].name} ${conditionName}\n`)
        } else {
            userItems.common.amount += 1
            userItems.common.items.push(`1x ${commonAll[searchIndex].name} ${conditionName}\n`)
        }
        userItems.common.value += 50 * conditionFactor * stack.length
    }
    }
} else all = true
}



inventoryEstimated = userItems.blackmarket.value + userItems.mythic.value + userItems.legendary.value + userItems.extraordinary.value + userItems.rare.value + userItems.common.value
memeral.inventoryvalue = inventoryEstimated
memeral.save().catch(err => console.log(err))

const embed = new Discord.MessageEmbed()
.setTitle(" ")
.setAuthor({name: username, icon: interaction.user.displayAvatarURL()})
.setTitle(`${username}'s inventory`)
.setDescription(`Price of ${username}'s inventory is ${inventoryEstimated} coins`)
.setThumbnail()
.setColor(0xDCAC08)

if(user_id === "211351774450286593"){
    embed.setFooter({text: "TheDon is kinda hot tbh"})
}

//Check if pages should be enabled
var withPages = 0
var itemLengthSum = userItems.blackmarket.items.join(" ").length + userItems.mythic.items.join(" ").length + userItems.legendary.items.join(" ").length + userItems.extraordinary.items.join(" ").length + userItems.rare.items.join(" ").length + userItems.common.items.join(" ").length
if(userItems.blackmarket.items.join(" ").length >= 1000) var withPages = 1
if(userItems.mythic.items.join(" ").length >= 1000) var withPages = 1
if(userItems.legendary.items.join(" ").length >= 1000) var withPages = 1
if(userItems.extraordinary.items.join(" ").length >= 1000) var withPages = 1
if(userItems.rare.items.join(" ").length >= 1000) var withPages = 1
if(userItems.common.items.join(" ").length >= 1000) var withPages = 1
if(itemLengthSum >= 1500) var withPages = 1


//Without pages
if(withPages === 0){
    if(!userItems.blackmarket.items.length) userItems.blackmarket.items = ["None"] 
        embed.addField(`Blackmarket - ${userItems.blackmarket.amount} items - ${userItems.blackmarket.value} coins`, userItems.blackmarket.items.join(""))
    if(!userItems.mythic.items.length) userItems.mythic.items = ["None"] 
        embed.addField(`Mythic - ${userItems.mythic.amount} items - ${userItems.mythic.value} coins`, userItems.mythic.items.join(""))
    if(!userItems.legendary.items.length) userItems.legendary.items = ["None"] 
        embed.addField(`Legendary - ${userItems.legendary.amount} items - ${userItems.legendary.value} coins`, userItems.legendary.items.join(""))
    if(!userItems.extraordinary.items.length) userItems.extraordinary.items = ["None"] 
        embed.addField(`Extraordinary - ${userItems.extraordinary.amount} items - ${userItems.extraordinary.value} coins`, userItems.extraordinary.items.join(""))
    if(!userItems.rare.items.length) userItems.rare.items = ["None"] 
        embed.addField(`Rare - ${userItems.rare.amount} items - ${userItems.rare.value} coins`, userItems.rare.items.join(""))
    if(!userItems.common.items.length) userItems.common.items = ["None"] 
        embed.addField(`Common - ${userItems.common.amount} items - ${userItems.common.value} coins`, userItems.common.items.join(""))
    return interaction.reply({embeds: [embed], ephemeral: ephemeral})
}


//With pages
if(withPages === 1){

var newArray = []

for(i = 0; i < rarities.length; i++){
if(!userItems.blackmarket.items.length) userItems.blackmarket.items = ["No Blackmarket items"]
if(!userItems.mythic.items.length) userItems.mythic.items = ["No Mythic items"]
if(!userItems.legendary.items.length) userItems.legendary.items = ["No Legendary items"]
if(!userItems.extraordinary.items.length) userItems.extraordinary.items = ["No Extraordinary items"]
if(!userItems.rare.items.length) userItems.rare.items = ["No Rare items"]
if(!userItems.common.items.length) userItems.common.items = ["No Common items"]
if(rarities[i] === "Blackmarket") array = userItems.blackmarket.items
if(rarities[i] === "Mythic") array = userItems.mythic.items
if(rarities[i] === "Legendary") array = userItems.legendary.items
if(rarities[i] === "Extraordinary") array = userItems.extraordinary.items
if(rarities[i] === "Rare") array = userItems.rare.items
if(rarities[i] === "Common") array = userItems.common.items
getNewArray(array)
}

function getNewArray(array){
    var string = ""
    var oldArray = array
    var rarityLocation = 0
    for(x = 0; x < oldArray.length + 1; x++){
        if(!string.length) string.length = 0
        if(x === oldArray.length || (string.length + oldArray[x].length) > 1000){
            if(x === oldArray.length){
                newArray.splice(rarityLocation, 0, string)
                string = ""
            } else
            newArray.unshift(string)
            rarityLocation = rarityLocation + 1
            string = ""
        }
        string = string + oldArray[x]
    }
}

var page = 1
var pages = newArray

embed.addField(`Blackmarket - ${userItems.blackmarket.amount} items - ${userItems.blackmarket.value} coins`, userItems.blackmarket.items.join(""))
embed.setFooter({text: `Page ${page} of ${newArray.length}`})
allowedUser = user_id
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

const last = b => b.customId === 'last' && b.user_id === user_id
const next = b => b.customId === 'next' && b.user_id === user_id
const lastCollector = interaction.channel.createMessageComponentCollector({last, time: 300000})
const nextCollector = interaction.channel.createMessageComponentCollector({next, time: 300000})
    

function fields(){
    var itemAmount = 0
    var estimated = 0
    var color = 0
    if(pages[page - 1].includes("Blackmarket")) desc = "Blackmarket", itemAmount = userItems.blackmarket.amount, estimated = userItems.blackmarket.value, color = 0xFFF00B
    if(pages[page - 1].includes("Mythic")) desc = "Mythic", itemAmount = userItems.mythic.amount, estimated = userItems.mythic.value, color = 0x952ECD
    if(pages[page - 1].includes("Legendary")) desc = "Legendary", itemAmount = userItems.legendary.amount, estimated = userItems.legendary.value, color = 0xE9A410
    if(pages[page - 1].includes("Extraordinary")) desc = "Extraordinary", itemAmount = userItems.extraordinary.amount, estimated = userItems.extraordinary.value, color = 0x31C601
    if(pages[page - 1].includes("Rare")) desc = "Rare", itemAmount = userItems.rare.amount, estimated = userItems.rare.value, color = 0x0ED0E4
    if(pages[page - 1].includes("Common")) desc = "Common", itemAmount = userItems.common.amount, estimated = userItems.common.value, color = 0x1E2CFF
    if(newArray[page - 1]){
        embed.addField(`${desc} - ${itemAmount} items - ${estimated} coins`, newArray[page - 1])
        embed.setColor(color)
    }
}


nextCollector.on("collect", async int => {
    if(int.customId === "next"){
        if(page === pages.length) page = 0
        page++
        embed.fields = []
        fields()
        embed.setFooter({text:`Page ${page} of ${pages.length}`})
        interaction.editReply({embeds: [embed], ephemeral: ephemeral})
    }
})

lastCollector.on("collect", async int => {
    if(int.customId === "last"){
        if(page === 1) page = pages.length + 1
        page--
        embed.fields = []
        fields()
        embed.setFooter({text:`Page ${page} of ${pages.length}`})
        interaction.editReply({embeds: [embed], ephemeral: ephemeral})
    }
})
}
}})
})

    } catch(err) {
        if(err) console.log(err)
}
},
category: "statistics"
}
