const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("modrole")
        .setDescription("Add/remove moderator role")
        .addRoleOption(option => 
            option.setName("role")
                .setDescription("Role to be added/removed")
                .setRequired(true)),
    async execute(interaction){
        try {
            var user_id = interaction.user.id
            var guild_id = interaction.member.guild.id
            var role = interaction.options.getRole("role")
            
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
                if(!guild.modroles) guild.modroles = []
                if(user_id === "189387598928674816" || guild.moderators.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR")){
                    modrole()
                } else return interaction.reply({content: "You must be the owner, an administrator or a moderator to use this command!", ephemeral: true})
            
            
            async function modrole(){
            
            var guildMembers = await interaction.guild.members.fetch()
            guildMembers = guildMembers.map(u => u)
            
            if(!guild.modroles.includes(role.id)){
                guild.modroles.push(role.id)
                for(i = 0; i < guildMembers.length; i++){
                    var hasRole = guildMembers[i].roles.cache.some(r => r.id === role.id)
                    if(hasRole === true){
                        guild.moderators.push(guildMembers[i].user.id)
                    }
                }
                guild.save().catch(err => console.log(err))
                interaction.reply(`Added ${role} as a moderator role`)
            } else {
                guild.modroles = guild.modroles.filter(u => u !== role.id)
            
                for(i = 0; i < guildMembers.length; i++){
                    var hasRole = guildMembers[i].roles.cache.some(r => r.id === role.id)
                    if(hasRole === true){
                        if(guild.moderators.includes(guildMembers[i].user.id)){
                            guild.moderators = guild.moderators.filter(u => u !== guildMembers[i].user.id)
                        }
                    }
                }
                guild.save().catch(err => console.log(err))
                interaction.reply(`Role ${role} is no longer a moderator role`)
            }
            }
            })
            
    } catch(err) {
        if(err) console.log(err)
}
},
category: "guild"
}