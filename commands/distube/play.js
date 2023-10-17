const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song")
        .addStringOption(option => 
            option.setName("song")
            .setDescription("Song searchword(s) or URL")
            .setRequired(true)),
    async execute(interaction){
        try {
            var user_id = interaction.user.id
            var guild_id = interaction.member.guild.id
            var channel_id = interaction.channelId
            
            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild) return interaction.reply({content: "You must set up a bot channel", ephemeral: true})
                if(!guild.botchannel) guild.botchannel = []
                if(!guild.botchannel.length) return interaction.reply({content: "You must set up a bot channel", ephemeral: true})
                if(!guild.music) guild.music = ""
                if(!guild.dj) guild.dj = []
                if(!guild.moderators) guild.moderators = []
                if(!guild.admins) guild.admins = []
                if(guild.music.includes("all")){
                    if(!guild.dj.includes(user_id) && !guild.moderators.includes(user_id) && !guild.admins.includes(user_id)){
                        if(user_id !== interaction.guild.ownerID && !interaction.member.permissions.has("ADMINISTRATOR")){
                            return interaction.reply({content: "You must be a DJ or a staff member to use this command!", ephemeral: true})
                        }
                    }
                }
                if(guild.botchannel.length){
                    if(!guild.botchannel.includes(channel_id)) return interaction.reply(`This command is limited to bot channels!`)
                    play()
                }
            })
            
            function play(){
                if(!interaction.member.voice ) return interaction.reply({content: "You are not in a voice channel", ephemeral: true})
                if(interaction.member.guild.me.voice.channel && interaction.member.guild.me.voice){
                    if(interaction.member.voice.channel.id !== interaction.member.guild.me.voice.channel.id) return interaction.reply({content: "You are not in the same voice channel", ephemeral: true})
                }
                interaction.reply({content: "Song request received", ephemeral: true})
                song = interaction.options.getString("song")
                bot.DisTube.play(interaction.member.voice.channel, song, {
                    member: interaction.member,
                    textChannel: interaction.channel,
                    interaction
                })
            }
    } catch(err) {
        if(err) console.log(err)
}
},
category: "distube"
}