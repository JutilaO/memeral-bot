const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("autoplay")
        .setDescription("Toggle autoplay on/off"),
    async execute(interaction){
        try {
            var user_id = interaction.user.id
            var guild_id = interaction.member.guild.id

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
                if(!guild.admins) guild.admins = []
                if(!guild.moderators) guild.moderators = []
                if(guild.music.includes("none")) return autoplay()
                if(guild.dj.includes(user_id) || guild.moderators.includes(user_id) || guild.admins.includes(user_id)){
                  autoplay()
                } else {
                    if(user_id !== interaction.guild.ownerID && !interaction.member.permissions.has("ADMINISTRATOR")){
                        return interaction.reply({content: "You must be a DJ or a staff member to use this command!", ephemeral: true})
                    } else autoplay()
                }
            })
            
            function autoplay(){
                if(!interaction.member.voice ) return interaction.reply({content: "You are not in a voice channel", ephemeral: true})
                if(interaction.member.guild.me.voice.channel){
                    if(interaction.member.voice.channel.id !== interaction.member.guild.me.voice.channel.id) return interaction.reply({content: "You are not in the same voice channel", ephemeral: true})
                }
                var queue = bot.DisTube.getQueue(interaction.guild)
                if(!queue) interaction.reply("I am not playing anything")
                if(queue.autoplay === false){
                    bot.DisTube.toggleAutoplay(interaction.guild)
                    interaction.reply("Autoplay has been enabled")
                } else {
                    bot.DisTube.toggleAutoplay(interaction.guild)
                    interaction.reply(`Autoplay has been disabled`)
                }
            }
    } catch(err) {
        if(err) console.log(err)
}
},
category: "distube"
}