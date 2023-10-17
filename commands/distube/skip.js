const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Vote to skip the current song"),
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
                if(guild.music.includes("all")){
                    if(guild.dj.includes(user_id) || guild.moderators.includes(user_id) || guild.admins.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR")){
                        vote()
                    } else return interaction.reply({content: "You must be a DJ or a staff member to use this command!", ephemeral: true})
                } else vote()
            })
            
            
            function vote(){
                if(!interaction.member.voice ) return interaction.reply({content: "You are not in a voice channel", ephemeral: true})
                if(interaction.member.guild.me.voice.channel){
                    if(interaction.member.voice.channel.id !== interaction.member.guild.me.voice.channel.id) return interaction.reply({content: "You are not in the same voice channel", ephemeral: true})
                }
                var queue = bot.DisTube.getQueue(interaction.guild)
                if(!queue) return interaction.reply({content: "There is no songs in queue", ephemeral: true})
                if(!queue.songs[0]) return interaction.reply({content: "There is no songs in queue", ephemeral: true})
                if(!queue.songs[0].voteSkips) queue.songs[0].voteSkips = []
                var vcUserAmn = interaction.guild.channels.cache.get(interaction.member.voice.channel.id).members.size
                var votesNeeded = Math.ceil(vcUserAmn/2)
                if(queue.songs[0].voteSkips.includes(interaction.member.id)) return interaction.reply(`You have already voted! ${queue.songs[0].voteSkips.length}/${votesNeeded}`)
                queue.songs[0].voteSkips.push(interaction.member.id)
                if(queue.songs[0].voteSkips.length >= votesNeeded){
                    if(queue.songs.length > 1){
                        bot.DisTube.skip(queue)
                        return interaction.reply(`Skipped the song!`)
                    } else {
                        bot.DisTube.stop(queue)
                        return interaction.reply(`Skipped the song!`)
                    }
                }
                interaction.reply(`You voted to skip this song! ${queue.songs[0].voteSkips.length}/${votesNeeded}`)
            }

    } catch(err) {
        if(err) console.log(err)
}
},
category: "distube"
}