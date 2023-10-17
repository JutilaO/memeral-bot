const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botchannel")
        .setDescription("Add/remove bot channels")
        .addChannelOption(option => 
            option.setName("channel")
            .setDescription("Channel to be added/removed from the bot channel pool")
            .setRequired(true)),
    async execute(interaction){
        try {

            var guild_id = interaction.member.guild.id
            var user_id = interaction.user.id

            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
            if(err) console.log(err)
            if(!guild){
                var guild = new guildSettings({
                    guildID: guild_id
                })
            }
            if(!guild.moderators) guild.moderators = []
            if(!guild.botchannel) guild.botchannel = []
            if(guild.moderators.includes(user_id)){
                manageBotchannel()
            } else {
                if(user_id !== interaction.guild.ownerID && !interaction.member.permissions.has("ADMINISTRATOR")){
                    return interaction.reply({content: "You must be the owner, an administrator or a moderator to use this command!", ephemeral: true})
                } else manageBotchannel()
            }
            
            function manageBotchannel(){
            
            var channel = interaction.options.getChannel("channel")
            if(!channel) return interaction.reply("Channel not found")
            
            if(!guild.botchannel.includes(channel.id)){
                guild.botchannel.push(channel.id)
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Added <#${channel.id}> as bot channel!`)
            } else {
                guild.botchannel = guild.botchannel.filter(channel => channel !== channel.id)
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Removed <#${channel.id}> from bot channels!`)
            }            
            }})
    } catch(err) {
        if(err) console.log(err)
}
},
category: "guild"
}