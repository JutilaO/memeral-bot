const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("repeat")
        .setDescription("Repeat song or queue")
        .addStringOption(option => 
            option.setName("type")
            .setDescription("Repeat type")
                .addChoice("Song", "1")
                .addChoice("Queue", "2")
                .addChoice("Off", "0")
            .setRequired(true)),
    async execute(interaction){
        try {

var guild_id = interaction.member.guild.id
var channel_id = interaction.channelId
var user_id = interaction.user.id

var access = []

guildSettings.findOne({
    guildID: guild_id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild){
        var guild = new guildSettings({
            guildID: guild_id
        })
    }
    if(!guild.music) guild.music = ""
    if(!guild.dj) guild.dj = []
    if(!guild.moderators) guild.moderators = []
    if(!guild.admins) guild.admins = []
    if(guild.music.includes("none")) return repeat()
    if(guild.dj.includes(user_id) || guild.moderators.includes(user_id) || guild.admins.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR")){
        return repeat()
    } else return interaction.reply({content: "You must be a DJ or a staff member to use this command!", ephemeral: true})
})

function repeat(){
    if(!interaction.member.voice ) return interaction.reply({content: "You are not in a voice channel", ephemeral: true})
    if(interaction.member.guild.me.voice.channel){
        if(interaction.member.voice.channel.id !== interaction.member.guild.me.voice.channel.id) return interaction.reply({content: "You are not in the same voice channel", ephemeral: true})
    }
    var queue = bot.DisTube.getQueue(interaction.guild)
    if(!queue) return interaction.reply("I am not playing anything")
    var mode = interaction.options.getString("type")
    bot.DisTube.setRepeatMode(interaction.guild, parseInt(mode))
    if(mode === "1"){
        return interaction.reply("Now repeating the current song")
    }
    if(mode === "2"){
        return interaction.reply("Now repeating the queue")
    }
    if(mode === "0"){
        return interaction.reply("Repeat mode has been disabled")
    }
}
    } catch(err) {
        if(err) console.log(err)
}
},
category: "distube"
}