const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Memeral = require("../../models/memeral.js")
const guildSettings = require("../../models/guildSettings.js")
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Get your daily coins"),
    async execute(interaction){
        try {
            const currentDay = new Date()
            var memeralServer = bot.guilds.cache.get("")
            var user_id = interaction.user.id
            var guild_id = interaction.guild.id
            var user_name = interaction.user
            var memeralMember = memeralServer.members.cache.get(user_id)
            if(!memeralMember)  memeralServer.members.fetch()
            var memeralMember = memeralServer.members.cache.get(user_id)
            
            var baseValue = 200
            var baseStreak = 20
            
            let embed = new Discord.MessageEmbed()
            .setColor(0xff1493)
            
            if(memeralMember){
                if(memeralMember.roles.cache.some(role => role.name === 'Contributor')){
                    var baseValue = 400
                    var baseStreak = 40
                    embed.setColor(0x098dff)
                } else {
                    var baseValue = 220
                    var baseStreak = 30
                }
            } else {
                embed.setFooter({text: "Join Memeral community server using 'discord' command for more coins!"})
            }

            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild) return interaction.reply({content: `You must set up a bot channel`, ephemeral: true})
                if(!guild.botchannel) guild.botchannel = []
                if(guild.botchannel.length){
                    if(!guild.botchannel.includes(interaction.channelId)) return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
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

                            if(!memeral.dailyHighest) memeral.dailyHighest = 0
                            if(!memeral.daily){
                                memeral.daily = currentDay
                                memeral.dailystreak = 0
                                memeral.money = memeral.money + baseValue
                                memeral.save().catch(err => console.log(err))
                                embed.addField("Daily coins received!", `${user_name} received ${baseValue} coins!`)
                                return interaction.reply({embeds: [embed]})
                            }
                            if(!memeral.dailystreak) memeral.dailystreak = 0
                            if(memeral.daily){
                                targetDate = memeral.daily
                                differenceNegative = new Date(targetDate) - new Date(currentDay)
                                difference1 = Math.abs(differenceNegative)
                                dayInMS = 1000 * 60 * 60 * 24
                                difference = dayInMS - difference1
                                hoursMs = 1000 * 60 * 60
                                hours = parseInt(difference / hoursMs)
                                reduce = hours * hoursMs
                                minutesMs = difference - reduce
                                minutesMs2 = 1000 * 60
                                minutes = parseInt(minutesMs / minutesMs2)
                                if(!memeral.commands) memeral.commands = ""
                                if(memeral.commands.includes("p04")){
                                    baseValue = baseValue + 40
                                    baseStreak = baseStreak + 20
                                }
            
            
                        if(difference1 > dayInMS){
                            if(Math.abs(difference) > (dayInMS * 2)) memeral.dailystreak = 0 
                                moneyToAdd = baseValue + (memeral.dailystreak * baseStreak)
                                memeral.money = memeral.money + moneyToAdd
                                memeral.dailystreak = memeral.dailystreak + 1
                                if(memeral.dailystreak > memeral.dailyHighest) memeral.dailyHighest = memeral.dailystreak
                                if(!memeral.achievements) memeral.achievements = ""
                                if(memeral.dailystreak >= 7){
                                    if(!memeral.achievements.includes("a05")){
                                        memeral.achievements = memeral.achievements + "a05 "
                                    }
                                } 
                                memeral.daily = currentDay
                                memeral.save().catch(err => console.log(err))
                            if(memeral.dailystreak <= 1){
                                embed.addField("Daily coins received!", `${user_name} received ${moneyToAdd} coins!`)

                            } else {
                                embed.addField("Daily coins received!", `${user_name} is on ${memeral.dailystreak} day streak & received ${moneyToAdd} coins!`)
                            }
                            return interaction.reply({embeds: [embed]})
                            } else {
                                embed.addField("Daily coins timer", `${user_name}, you have to wait ${hours} hours ${minutes} minutes!`)
                                return interaction.reply({embeds: [embed]})
                        }
                    }
                
            })
            })
    } catch(err) {
        if(err) console.log(err)
}
},
category: "currency"
}
