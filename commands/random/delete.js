const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const utils = require("../../utilities/notifications.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Delete multiple messages")
        .addIntegerOption(option => 
            option
                .setName("amount")
                .setDescription("Amount of messages to be deleted")
                .setMinValue(1)
                .setMaxValue(99)
                .setRequired(true)),
    async execute(interaction){
        try {

            var guild_id = interaction.guild.id
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
                if(guild.moderators.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR") || interaction.member.permissions.has("MANAGE_MESSAGES")){
                    deleteMessages()
                } else return interaction.reply("You need to be the owner, an administrator, a moderator or have the Manage Messages permission to do this")
            })
            
            
            function deleteMessages(){
                var amount = parseInt(interaction.options.getInteger("amount"))
                if(!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) interaction.reply({content: "I must be given **Manage messages** permission to do this.", ephemeral: true})
                interaction.channel.bulkDelete(amount, true).catch(err => {
                    console.error(err)
                    return interaction.reply("Error: couldn't delete messages")
                })
                interaction.reply({content: `Deleted ${amount} messages`, ephemeral: true})

                }
    } catch(err) {
        if(err) console.log(err)
}
},
category: "random"
}