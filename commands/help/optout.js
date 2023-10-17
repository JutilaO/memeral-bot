const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const {MessageActionRow, MessageButton} = require("discord.js")
const Memeral = require("../../models/memeral.js")
const botSettings = require("../../models/botSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("optout")
        .setDescription("Opt out of Memeral and delete your data"),
    async execute(interaction){
        try {
            var user_id = interaction.user.id
            const buttons = new MessageActionRow()
            .addComponents(
				new MessageButton()
                .setCustomId('decline')
                .setLabel('Decline')
                .setStyle('DANGER'),
			)
            .addComponents(
				new MessageButton()
                .setCustomId('confirm')
                .setLabel('Confirm')
                .setStyle('SUCCESS'),
			)

            var collected = false
            interaction.reply({content: "Your data will be removed and you will be blocked from using Memeral in the future. Are you sure?", components: [buttons], ephemeral: true})
            const decline = b => b.customId === 'decline' && b.user.id === user_id
            const confirm = b => b.customId === 'confirm' && b.user.id === user_id
            const declineCollector = interaction.channel.createMessageComponentCollector({decline, time: 300000})
            const confirmCollector = interaction.channel.createMessageComponentCollector({confirm, time: 300000})

            declineCollector.on('collect', async int => {
                if(int.customId === "decline" && int.message.interaction.id === interaction.id && collected === false){
                    collected = true
                    interaction.editReply({content: "You declined being opted out and having your data removed. You can continue using Memeral.", ephemeral: true})
                }
            })

            confirmCollector.on('collect', async int => {
                if(int.customId === "confirm" && int.message.interaction.id === interaction.id && collected === false){
                    collected = true
                    Memeral.deleteMany({
                        userID: user_id
                      }, (err, memeral) => {
                        if(err) console.log(err)
                        console.log(memeral)
                    })
                    botSettings.findOne({
                        ownerID: ""
                      }, (err, bot) => {
                        if(err) console.log(err)
                        if(!bot) return
                        if(!bot.optedout) bot.optedout = []
                        bot.optedout.push(user_id)
                        bot.save().catch(err => console.log(err))
                    })
                    interaction.editReply({content: "Your data has been deleted and you will no longer be able to use Memeral.", ephemeral: true})
                }
            })
        
            
    } catch(err) {
        if(err) console.log(err)
}
},
category: "help"
}
