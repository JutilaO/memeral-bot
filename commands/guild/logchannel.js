const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("logchannel")
        .setDescription("Add/remove logchannel")
        .addChannelOption(option => 
            option.setName("channel")
            .setDescription("Channel to be added/removed")
            .setRequired(true)),
    async execute(interaction){
        try {
            var user_id = interaction.user.id
            var guild_id = interaction.member.guild.id
            var channel = interaction.options.getChannel("channel")
            
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
                if(!guild.logchannel) guild.logchannel = ""
                if(guild.moderators.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR")){
                    manageLogChannel()
                } else return interaction.reply({content: "You must be the owner, an administrator or a moderator to use this command!", ephemeral: true})
            
            function manageLogChannel(){
            

            if(guild.logchannel !== channel.id){
                guild.logchannel = channel.id
                guild.save().catch(err => console.log(err))
                interaction.reply(`Added ${channel} as the log channel`)
            } else {
                guild.logchannel = ``
                guild.save().catch(err => console.log(err))
                interaction.reply(`${channel} is no longer the log channel`)
            }
            }
        })
    } catch(err) {
        if(err) console.log(err)
}
},
category: "guild"
}