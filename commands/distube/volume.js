const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("volume")
        .setDescription("Manage song volume")
        .addIntegerOption(option => 
            option.setName("number")
            .setDescription("Volume number")
            .setMaxValue(100)
            .setMinValue(10)
            .setRequired(true)),
    async execute(interaction){
        try {

            var guild_id = interaction.member.guild.id
            var user_id = interaction.user.id
            var amount = interaction.options.getInteger("number")

            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild) guild = {}
                if(!guild.music) guild.music = ""
                if(!guild.dj) guild.dj = []
                if(!guild.moderators) guild.moderators = []
                if(!guild.admins) guild.admins = []
                if(guild.music.includes("none")) return volume()
                if(guild.dj.includes(user_id) || guild.moderators.includes(user_id) || guild.admins.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR")){
                    return volume()
                } else return interaction.reply({content: "You must be a DJ or a staff member to use this command!", ephemeral: true})
            })
            
            function volume(){
                    if(!interaction.member.voice ) return interaction.reply({content: "You are not in a voice channel", ephemeral: true})
                    if(interaction.member.guild.me.voice.channel){
                        if(interaction.member.voice.channel.id !== interaction.member.guild.me.voice.channel.id) return interaction.reply({content: "You are not in the same voice channel", ephemeral: true})
                    }
                    var queue = bot.DisTube.getQueue(interaction.guild)
                    if(!queue) return interaction.reply({content: "There is no queue to shuffle", ephemeral: true})
                    var volume = parseInt(number)
                    if(isNaN(volume)) return interaction.reply({content: "Amount must be a number", ephemeral: true})
                    if(volume < 1 || volume > 100){
                        if(user_id !== "189387598928674816") return interaction.reply({content: "Please input a number between 1 and 100", ephemeral: true})
                    }
                    bot.DisTube.setVolume(interaction.guild, volume * 2)
                    interaction.reply(`Volume set to ${volume}`)
                }

    } catch(err) {
        if(err) console.log(err)
}
},
category: "distube"
}