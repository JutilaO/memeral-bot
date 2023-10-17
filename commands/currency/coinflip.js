const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Memeral = require("../../models/memeral.js")
const alreadyPlaying = new Set()
const guildSettings = require("../../models/guildSettings.js")
const {MessageActionRow, MessageButton} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coinflip")
        .setDescription("Challenge another user to a coinflip for Memeral coins")
        .addUserOption(option =>
            option.setName("user")
            .setDescription("User to be challenged")
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName("amount")
            .setDescription("Amount of Memeral coins to bet")
            .setRequired(true)),
    async execute(interaction){
        try {


            var guild_id = interaction.member.guild.id
            var channel_id = interaction.channelId
            var challenger = interaction.user
            var targetUser = interaction.options.getUser("user")
            var amount = interaction.options.getInteger("amount")

            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild) return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
                if(!guild.botchannel) guild.botchannel = []
                if(guild.botchannel.length){
                    if(!guild.botchannel.includes(channel_id)) return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
                } else return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
            
            if(targetUser.bot === true) return interaction.reply("You cannot challenge bots!")
            
            
            var betAmount = parseInt(amount)
            var check = 0
            
            if(!betAmount) return interaction.reply("Please input bet amount")
            if(betAmount < 0) return interaction.reply("Bet amount cannot be a negative number")
            if(isNaN(betAmount)){
                return interaction.reply("Please enter a number as bet amount. Correct usage: 'coinflip [user] [bet]'")
            }
            if(challenger.id === targetUser.id){
                return interaction.reply("You cannot challenge yourself. Correct usage: 'coinflip [user] [bet]'")
            }
            if(alreadyPlaying.has(challenger.id)){
                return interaction.reply(`${challenger.username}: You have a coinflip or a request to one in progress.`)
            }
            if(alreadyPlaying.has(targetUser.id)){
                return interaction.reply(`${targetUser.username} has a coinflip or a request to one in progress.`)
            }
            
            
            function checkBalance(user){
                Memeral.findOne({
                    userID: user.id,
                    guildID: guild_id
                }, (err, memeral) => {
                if(err) console.log(err)
                if(!memeral) memeral = {}
                if(!memeral.money) memeral.money = 0
                if(memeral.money < betAmount){
                    needMoney = betAmount - memeral.money
                    if(user === challenger) return interaction.reply(`You don't have ${betAmount} coins. You need ${needMoney} more!`)
                    if(user === targetUser) return interaction.reply(`${user.username} doesn't have ${betAmount} coins. ${user.username} needs ${needMoney} more!`)
                } else {
                    check++
                    if(check === 2) play()
                }
            })  
            }
            
            checkBalance(challenger)
            checkBalance(targetUser)
            
            
            function playerLost(loserID){
                Memeral.findOne({
                    userID: loserID,
                    guildID: guild_id
                }, (err, memeral) => {
                if(err) console.log(err)
                if(!memeral) return
                if(!memeral.money) memeral.money = 0
                let moneyToRemove = betAmount
                memeral.money = memeral.money - moneyToRemove
                memeral.save().catch(err => console.log(err))
            })
            }
            
            function playerWon(winnerID){
                Memeral.findOne({
                    userID: winnerID,
                    guildID: guild_id
                }, (err, memeral) => {
                if(err) console.log(err)
                if(!memeral.achievements) memeral.achievements = ""
                    memeral.achievements = "a03 "
                    memeral.money = memeral.money + betAmount
                    memeral.save().catch(err => console.log(err))
                })
            }
                
            
            function play(){
            
            alreadyPlaying.add(challenger.id && targetUser.id)
            setTimeout(() => {
                alreadyPlaying.delete(challenger.id && targetUser.id)
            }, 180000)
            
            const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('deny')
                .setLabel('Deny')
                .setStyle('DANGER'),
            )
            .addComponents(
                new MessageButton()
                .setCustomId('accept')
                .setLabel('Accept')
                .setStyle('SUCCESS'),
            )
            interaction.reply({content: `${challenger.username} challenged ${targetUser.username} to a coinflip for ${amount} coins!\n`, components: [buttons]})
            const deny = b => b.customId === 'deny' && b.user.id === targetUser.id
            const accept = b => b.customId === 'accept' && b.user.id === targetUser.id
            const denyCollector = interaction.channel.createMessageComponentCollector({deny, time: 180000})
            const acceptCollector = interaction.channel.createMessageComponentCollector({accept, time: 180000})
            var accepted = false
            var rejected = false

            acceptCollector.on('collect', async int => {
                if(int.customId === "accept" && int.message.interaction.id === interaction.id && int.user.id === targetUser.id){
                    if(accepted === true || rejected === true) return
                    accepted = true
                    Memeral.findOne({
                        userID: challenger.id,
                        guildID: guild_id
                    }, (err, challengerMemeral) => {
                    if(err) console.log(err)
                    if(!challengerMemeral) challengerMemeral = {}
                    if(!challengerMemeral.money) challengerMemeral.money = 0
                    if(challengerMemeral.money < betAmount){
                        needMoney = betAmount - challengerMemeral.money
                        alreadyPlaying.delete(challenger.id && targetUser.id)
                       return interaction.editReply(`${challenger.username} challenged ${targetUser.username} to a coinflip!\n${challenger.username} lacks ${needMoney} coins!`)
                    } else {
                        Memeral.findOne({
                            userID: targetUser.id,
                            guildID: guild_id
                        }, (err, targetUserMemeral) => {
                        if(err) console.log(err)
                        if(!targetUserMemeral) targetUserMemeral = {}
                        if(!targetUserMemeral.money) targetUserMemeral.money = 0
                        if(targetUserMemeral.money < betAmount){
                            needMoney = betAmount - targetUserMemeral.money
                            alreadyPlaying.delete(challenger.id && targetUser.id)
                           return interaction.editReply(`${challenger.username} challenged ${targetUser.username} to a coinflip!\n${targetUser.username} lacks ${needMoney} coins!`)
                        } else {
                            number = Math.floor (Math.random() * (2 - 1 + 1)) + 1
                            if(number === 1){
                                playerLost(targetUser.id)
                                playerWon(challenger.id)
                                var winner = challenger.username
                            } else
                            if(number === 2){
                                playerLost(challenger.id)
                                playerWon(targetUser.id)
                                var winner = targetUser.username
                            }
                            interaction.editReply(`${challenger.username} challenged ${targetUser.username} to a coinflip!\nFlipping the coin in 3 seconds!`)
                            setTimeout(t3, 1000)
                            function t3() {
                            interaction.editReply(`${challenger.username} challenged ${targetUser.username} to a coinflip!\nFlipping the coin in 2 seconds!`)
                            setTimeout(t4, 1000)
                            function t4() {
                            interaction.editReply(`${challenger.username} challenged ${targetUser.username} to a coinflip!\nFlipping the coin in 1 seconds!`)
                            setTimeout(t5, 1000)
                            function t5(){
                            interaction.editReply(`${challenger.username} challenged ${targetUser.username} to a coinflip!\n${winner} won ${betAmount}!`)
                            alreadyPlaying.delete(challenger.id && targetUser.id) 
                        }}}
                        }
                    })  
                    }
                })  
                }
            })

           denyCollector.on('collect', async int => {
                if(int.customId === "deny" && int.message.interaction.id === interaction.id && int.user.id === targetUser.id){
                    if(accepted === true || rejected === true) return
                    rejected = true
                    interaction.editReply(`${challenger.username} challenged ${targetUser.username} to a coinflip, which ${targetUser.username} cowardly rejected.`)
                    alreadyPlaying.delete(challenger.id && targetUser.id)
                }
            })
            
                
      
        }
            
            
            })
    } catch(err) {
        if(err) console.log(err)
}
},
category: "currency"
}