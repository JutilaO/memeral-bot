const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")
const Memeral = require("../../models/memeral.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coins")
        .setDescription("View user's coins")
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

var embed = new Discord.MessageEmbed()
.setAuthor({name: username})
.setColor(0xff1493)

Memeral.findOne({
    userID: user_id,
    guildID: guild_id
}, (err, memeral) => {
    if(err) console.log(err)
    if(!memeral) memeral = {}
    if(!memeral.money) memeral.money = 0
    embed.addField("💰", `${username} ${memeral.money} coins! `)
    interaction.reply({embeds: [embed], ephemeral: ephemeral})
})
})
   
         

    } catch(err) {
        if(err) console.log(err)
}
},
category: "statistics"
}