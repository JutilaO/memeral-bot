const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverstats")
        .setDescription("View server statistics"),
    async execute(interaction){
        try {


var guild_id = interaction.guild.id
var ephemeral = false

guildSettings.findOne({
    guildID: guild_id
}, async (err, guild) => {
    if(err) console.log(err)
    if(!guild){
        var guild = new guildSettings({
            guildID: guild_id
        })
    } 
    if(!guild.botchannel) guild.botchannel = []
    if(!guild.botchannel.length) ephemeral = true
    if(!guild.botchannel.includes(interaction.channelId)) ephemeral = true

var guildObject = bot.guilds.cache.get(guild_id)

var name = guildObject.name
memberAmount = guildObject.memberCount
createdTime = guildObject.createdAt.toString().split(" ")
currentDay = new Date()
createdDay = new Date(guildObject.createdAt)
timeSinceMs = currentDay - createdDay
timeSince = Math.round(timeSinceMs / 1000 / 60 / 60 / 24)
created = `${createdTime[0]} ${createdTime[1]} ${createdTime[2]} ${createdTime[3]} ${createdTime[4]}` 
owner1 = await guildObject.members.fetch()
owner2 = guildObject.members.cache.get(guildObject.ownerId)
verified = guildObject.verified
id = guildObject.id
thumbnail = guildObject.iconURL()

const embed = new Discord.MessageEmbed()
.setTitle(`${name} statistics`)
.setColor(0xff1493)
.setTimestamp()
.setFooter({text:"ID: " + id})
.setThumbnail(thumbnail)
.addField("Name:", name, true)
.addField("Owner:", owner2.user.tag, true)
.addField("Created at:", created.toString(), true)
.addField("Days since:", timeSince.toString(), true)
.addField("Member amount:", memberAmount.toString(), true)
.addField("Verified?", verified.toString(), true)
return interaction.reply({embeds: [embed], ephemeral: ephemeral})
})
 

    } catch(err) {
        if(err) console.log(err)
}
},
category: "statistics"
}