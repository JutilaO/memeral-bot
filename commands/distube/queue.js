const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("View song queue"),
    async execute(interaction){
        try {

            var guild_id = interaction.member.guild.id
            var channel_id = interaction.channelId
            
            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild) return interaction.reply({content: "You must set up a bot channel", ephemeral: true})
                if(!guild.botchannel) guild.botchannel = []
                if(!guild.botchannel.length) return interaction.reply({content: "You must set up a bot channel", ephemeral: true})
                if(guild.botchannel.length){
                if(!guild.botchannel.includes(channel_id)) return interaction.reply({content: "This command is limited to bot channels", ephemeral: true})
                    queue()
                }
            })
        
            
            function queue(){
                if(!interaction.member.voice) return interaction.reply({content: "You are not in a voice channel", ephemeral: true})
                if(interaction.member.guild.me.voice.channel){
                    if(interaction.member.voice.channel.id !== interaction.member.guild.me.voice.channel.id) return interaction.reply({content: "You are not in the same voice channel", ephemeral: true})
                }
                const embed = new Discord.MessageEmbed()
                .setTitle(`Memeral's current playlist`)
                .setColor(0xff1493)
                var queue = bot.DisTube.getQueue(interaction.guild)
                if(!queue) return interaction.reply("I am not playing anything")
                for(i = 0; i < 10; i++){
                    if(queue.songs[i]){
                        embed.addField(queue.songs[i].name, "Length: " + queue.songs[i].formattedDuration)
                    }
                }
                embed.setFooter({text:`${queue.songs.length} songs in queue`})
                interaction.reply({embeds: [embed]})
            }
    } catch(err) {
        if(err) console.log(err)
}
},
category: "distube"
}