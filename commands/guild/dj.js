const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dj")
        .setDescription("Add/remove DJs")
        .addUserOption(option => 
            option.setName("user")
            .setDescription("User to be added/removed")
            .setRequired(true)),
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
            if(!guild.moderators) guild.moderators = []
            if(!guild.dj) guild.dj = []
            if(guild.moderators.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR")){
                addDJ()
            } else return interaction.reply({content: "You must be the owner, an administrator or a moderator to use this command!", ephemeral: true})
            
            
            function addDJ(){
            
            var user = interaction.options.getUser("user")

            if(!guild.dj.includes(user_id)){
                guild.dj.push(user_id)
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Added ${user} to DJs!`)
            } else {
                guild.dj = guild.dj.filter(user => user !== user_id)
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Removed ${user} from DJs!`)
            }
            }
            })
            
    } catch(err) {
        if(err) console.log(err)
}
},
category: "guild"
}