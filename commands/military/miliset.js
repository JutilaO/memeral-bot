const {SlashCommandBuilder} = require("@discordjs/builders")
const Military = require(`../../models/military.js`)
const bot = require("../../index.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("miliset")
        .setDescription("Add or reduce soldier's activity counts")
        .addUserOption(option =>
            option.setName("name")
            .setDescription("Name of the soldier")
            .setRequired(true))
        .addStringOption(option =>
            option.setName("type")
            .setDescription("Type of activity")
            .setRequired(true)
            .addChoice("Warzone joined", "wzj")
            .addChoice("Warzone joined late/left early", "wzjl")
            .addChoice("Warzone led", "wzl")
            .addChoice("Doomsday joined", "ddj")
            .addChoice("Doomsday joined late/left early", "ddjl")
            .addChoice("Doomsday led", "ddl")
            .addChoice("Ammo Transport joined", "atj")
            .addChoice("Ammo Transport hosted", "ath")
            .addChoice("Training hosted", "trh")
            .addChoice("Training joined", "trj")
            .addChoice("Securicar joined", "scj")
            .addChoice("Andromada joined", "amj")
            .addChoice("Bank robbery joined", "br")
            .addChoice("Casino robbery joined", "cr")
            .addChoice("Andromada attacked", "ctam")
            .addChoice("Assault Mission attacked", "ctasm"))
        .addIntegerOption(option =>
            option.setName("amount")
            .setDescription("Amount to be added or reduced")
            .setRequired(true)),

    async execute(interaction){
        try {
            if(!interaction.member.roles.cache.some(role => role.id === "") && !interaction.member.roles.cache.some(role => role.id === "") && !interaction.member.roles.cache.some(role => role.id === ") && !interaction.member.roles.cache.some(role => role.id === "")){
                return interaction.reply("You don't have access to this command")
            }

            var user = interaction.options.getUser("name")
            var type = interaction.options.getString("type")
            var amount = parseInt(interaction.options.getInteger("amount"))
            
            Military.findOne({
                userID: user.id
            }, (err, military) => {
                if(err) console.log(err)
                if(!military) return interaction.reply("Member not found")
                if(!military.miliWZJ) military.miliWZJ = 0
                if(!military.miliWZJL) military.miliWZJL = 0
                if(!military.miliWZL) military.miliWZL = 0
                if(!military.miliDDJ) military.miliDDJ = 0
                if(!military.miliDDJL) military.miliDDJL = 0
                if(!military.miliDDL) military.miliDDL = 0
                if(!military.miliATJ) military.miliATJ = 0
                if(!military.miliATH) military.miliATH = 0
                if(!military.miliTRH) military.miliTRH = 0
                if(!military.miliTRJ) military.miliTRJ = 0
                if(!military.miliSCJ) military.miliSCJ = 0
                if(!military.miliAMJ) military.miliAMJ = 0
                if(!military.miliBR) military.miliBR = 0
                if(!military.miliCR) military.miliCR = 0
                if(!military.miliCTAM) military.miliCTAM = 0
                if(!military.miliCTASM) military.miliCTASM = 0
                
                if(type === "wzj") military.miliWZJ += amount
                if(type === "wzjl") military.miliWZJL += amount
                if(type === "wzl") military.miliWZL += amount
                if(type === "ddj") military.miliDDJ += amount
                if(type === "ddjl") military.miliDDJL += amount
                if(type === "ddl") military.miliDDL += amount
                if(type === "atj") military.miliATJ += amount
                if(type === "ath") military.miliATH += amount
                if(type === "trh") military.miliTRH += amount
                if(type === "trj") military.miliTRJ += amount
                if(type === "scj") military.miliSCJ += amount
                if(type === "amj") military.miliAMJ += amount
                if(type === "br") military.miliBR += amount
                if(type === "cr") military.miliCR += amount
                if(type === "ctam") military.miliCTAM += amount
                if(type === "ctasm") military.miliCTASM += amount

                var activityArray = [
                    ["wzj", "Warzone joined"],
                    ["wzjl", "Warzone joined late/left early"],
                    ["wzl", "Warzone led"],
                    ["ddj", "Doomsday joined"],
                    ["ddjl", "Doomsday joined late/left early"],
                    ["ddl", "Doomsday led"],
                    ["atj", "Ammo Transport joined"],
                    ["ath", "Ammo Transport hosted"],
                    ["trh", "Trainings hosted"],
                    ["trj", "Trainings joined"],
                    ["scj", "Securicar joined"],
                    ["amj", "Andromada joined"],
                    ["br", "Bank Robbery joined"],
                    ["cr", "Casino Robbery joined"],
                    ["ctam", "Andromada attacked"],
                    ["ctasm", "Assault Mission attacked"]
                ]

                typefull = type
                for(i in activityArray){
                    if(activityArray[i][0] === type) typefull = activityArray[i][1]
                }
            
            
                military.save().catch(err => console.log(err))
                if(amount >= 1){
                    bot.guilds.cache.get("").channels.cache.get("").send(`${interaction.user} added ${amount} ${typefull} to ${user}!`)
                    return interaction.reply(`Added ${amount} ${typefull} to ${user}!`)
                } else {
                    bot.guilds.cache.get("").channels.cache.get("").send(`${interaction.user} reduced ${Math.abs(amount)} ${typefull} from ${user}!`)
                    return interaction.reply(`Reduced ${Math.abs(amount)} ${typefull} from ${user}!`)
                }
            })
                    
    } catch(err) {
        if(err) console.log(err)
}
},
category: "military"
}
