const Discord = require("discord.js")
module.exports.run = async (interaction, name, file) => {

guildMemberObject = await interaction.guild.members.cache.find(member => member.user.username.toLowerCase().includes(name))
if(!guildMemberObject){
    guildMemberObject = await interaction.guild.members.fetch()
    guildMemberObject = await interaction.guild.members.cache.find(member => member.user.username.toLowerCase().includes(name))
}

if(!guildMemberObject) return interaction.reply("User not found")
var commandFile = require(`../commands/${file}`)
return commandFile.run(interaction, name, file)
}