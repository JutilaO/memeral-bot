const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Memeral = require("../../models/memeral.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reputation")
        .setDescription("Give another user a reputation point")
        .addUserOption(option => 
            option
                .setName("tag")
                .setDescription("Tag the user")
                .setRequired(true)),
    async execute(interaction){
        try {

           var user_id = interaction.user.id
           var guild_id = interaction.guild.id
           var target = interaction.options.getUser("tag")
           var username = interaction.user.username
           var currentDay = new Date()
           if(target.bot) return interaction.reply({content: "You cannot give a reputation point to a bot", ephemeral: true})
            
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
            if(!memeral.repday){
                memeral.repday = currentDay
                memeral.save().catch(err => console.log(err))
                giveRep()
            } else
            if(memeral.repday){
                targetDate = memeral.repday
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
            if(difference1 > dayInMS){
                memeral.repday = currentDay
                memeral.save().catch(err => console.log(err))
                giveRep()
            } else return interaction.reply({content: `You must wait ${hours} hours and ${minutes} minutes!`, ephemeral: true})
            }   
            })
            
            function giveRep(){
            let embed = new Discord.MessageEmbed()
            .setColor(0xff1493)
            
            Memeral.findOne({
                userID: target.id,
                guildID: guild_id
            }, (err, memeral) => {
                if(err) console.log(err)
                    if(!memeral){
                        var memeral = new Memeral({
                            userID: target.id,
                            guildID: guild_id
                        })
                    }
                    if(!memeral.reputation) memeral.reputation = 0
                    if(memeral.reputation){
                        memeral.reputation = memeral.reputation + 1
                        memeral.save().catch(err => console.log(err))
                        embed.addField("Reputation point given!", `${username} gave ${target.username} a reputation point! ${target.username} now has ${memeral.reputation} reputation points!`)
                        return interaction.reply({embeds: [embed]})
                    }
            })
            
            }

    } catch(err) {
        if(err) console.log(err)
}
},
category: "random"
}