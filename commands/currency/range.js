const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Memeral = require("../../models/memeral.js")
const guildSettings = require("../../models/guildSettings.js")
const cooldown = new Set()
const randomEventCooldown = new Set()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("range")
        .setDescription("Shooting range. For coins."),
    async execute(interaction){
        try {

            function randomNumber(min, max) {
                return Math.floor(min + Math.random()*(max + 1 - min))
            }
            
            var user_id = interaction.user.id
            var guild_id = interaction.guild.id
            var channel_id = interaction.channelId

            
            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild) return interaction.reply({content: `You must set up a bot channel`, ephemeral: true})
                if(!guild.botchannel) guild.botchannel = []
                if(guild.botchannel.length){
                    if(!guild.botchannel.includes(channel_id)) return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
                } else return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
            
            
            Memeral.findOne({
                userID: user_id,
                guildID: guild_id
            }, (err, memeral) => {
                if(err) console.log(err)
                if(!memeral){
                    var memeral = new Memeral({
                        userID: user_id,
                        guildID: guild_id
                    })
                }
            
                var shots = 3
                if(!memeral.money) memeral.money = 0
                if(!memeral.shot) memeral.shot = 0
                if(!memeral.commands) memeral.commands = ""
                if(memeral.commands.includes("p05")) shots = shots + 1
                memeral.shot = memeral.shot + 1
                
                var numbers = []
                var levels = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
                var userLevel = 1
                var userCooldownLength = 10
            
                for(i = 0; i < levels.length; i++){
                    if(memeral.shot >= levels[i] && levels[i] <= 700) userLevel = userLevel + 1
                    if(memeral.shot >= levels[i] && levels[i] >= 800) userCooldownLength = userCooldownLength - 1
                }
            
                if(!randomEventCooldown.has(user_id) && cooldown.has(user_id)) return interaction.reply(`You are reloading, wait ${userCooldownLength} seconds!`)
                if(randomEventCooldown.has(user_id)) return interaction.reply(`Lt. Stonebridge still has your weapon. You must wait 30 seconds.`)
            
                for(i = 0; i < shots; i++){
                    numbers.push(randomNumber(userLevel, 10))
                }
            
                var randomEvent = Math.random()
                if(randomEvent < 0.05){
                    interaction.reply(`You accidently emptied your magazine in the sky because you had full-auto on. Lt. Stonebridge confiscates your weapon for 30 seconds.`)
                    userCooldownLength = 30
                    return handleEventCooldown(user_id, userCooldownLength)
                } else
                if(randomEvent < 0.1){
                    interaction.reply(`You go check your target with Sgt. Shoutsalot. You missed all shots. Sgt. says a monkey could shoot better than you.`)
                    return handleCooldown(user_id, userCooldownLength)
                } else 
                if(randomEvent < 0.15){
                    interaction.reply(`You see a bird flying above your target. You aim at it, and pull the trigger. Cpt. Boomer sees you drop the bird and rewards you with 100 coins.`)
                    memeral.money = memeral.money + 100
                    return memeral.save().catch(err => console.log(err))
                }
                moneyToAdd = parseInt(numbers[0] + numbers[1] + numbers[2])
                if(numbers.length === 4) moneyToAdd = parseInt(numbers[0] + numbers[1] + numbers[2] + numbers[3])
                memeral.money = memeral.money + moneyToAdd
                memeral.save().catch(err => console.log(err))
                handleCooldown(user_id, userCooldownLength)
                if(numbers.length === 4){
                    return interaction.reply(`You fired ${shots} bullets and hit ${numbers[0]}, ${numbers[1]}, ${numbers[2]} and ${numbers[3]}! You have been rewarded with ${moneyToAdd} coins!`)
                } else return interaction.reply(`You fired ${shots} bullets and hit ${numbers[0]}, ${numbers[1]} and ${numbers[2]}! You have been rewarded with ${moneyToAdd} coins!`)
            })
            
            function handleCooldown(user, length){
                cooldown.add(user)
                setTimeout(() => {
                    cooldown.delete(user)
                }, length * 1000)
            }
            function handleEventCooldown(user, length){
                randomEventCooldown.add(user)
                setTimeout(() => {
                    randomEventCooldown.delete(user)
                }, length * 1000)
            }
            })

    } catch(err) {
        if(err) console.log(err)
}
},
category: "currency"
}