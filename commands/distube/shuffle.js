const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffle the song queue"),
    async execute(interaction){
        try {

var guild_id = interaction.member.guild.id
var user_id = interaction.user.id

guildSettings.findOne({
    guildID: guild_id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild) guild = {}
    if(!guild.music) guild.music = ""
    if(!guild.dj) guild.dj = []
    if(!guild.moderators) guild.moderators = []
    if(!guild.admins) guild.admins = []
    if(guild.music.includes("none") || guild.dj.includes(user_id) || guild.moderators.includes(user_id) || guild.admins.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR")){
    
    if(!interaction.member.voice ) return interaction.reply({content: "You are not in a voice channel", ephemeral: true})
    if(interaction.member.guild.me.voice.channel){
        if(interaction.member.voice.channel.id !== interaction.member.guild.me.voice.channel.id) return interaction.reply({content: "You are not in the same voice channel", ephemeral: true})
    }
    var queue = bot.DisTube.getQueue(interaction.guild)
    if(!queue) return interaction.reply({content: "There is no queue to shuffle", ephemeral: true})
    bot.DisTube.shuffle(interaction.guild)
    return interaction.reply("Queue shuffled")
} else return interaction.reply({content: "You must be a DJ or a staff member to use this command!", ephemeral: true})
})

    } catch(err) {
        if(err) console.log(err)
}
},
category: "distube"
}