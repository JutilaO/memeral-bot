const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mod")
        .setDescription("Add/remove user from the Moderators")
        .addUserOption(option => 
            option.setName("user")
            .setDescription("User to be modded/unmodded")
            .setRequired(true)),
    async execute(interaction){
        try {
            var user_id = interaction.user.id
            var guild_id = interaction.member.guild.id
            var user = interaction.options.getUser("user")
            
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
            if(user_id !== interaction.guild.ownerID && !interaction.member.permissions.has("ADMINISTRATOR")){
                return interaction.reply({content: "You must be the owner, an administrator or a moderator to use this command!", ephemeral: true})
            } else addModerator()
            
            
            function addModerator(){

            if(!guild.moderators.includes(user.id)){
                guild.moderators.push(user.id)
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Successfully set ${user} as Moderator!`)
            } else {
                guild.moderators = guild.moderators.filter(user => user !== user.id)
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Successfully removed ${user} from Moderators!`)
            }
            }
            })
    } catch(err) {
        if(err) console.log(err)
}
},
category: "guild"
}