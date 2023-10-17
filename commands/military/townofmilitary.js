const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const data = require("./townofmilitary.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("townofmilitary")
        .setDescription("What is love?")
        .addUserOption(option =>
             option.setName("player1")
             .setDescription("Player1")
             .setRequired(true))
        .addUserOption(option =>
            option.setName("player2")
            .setDescription("Player2")
            .setRequired(true))
        .addUserOption(option =>
            option.setName("player3")
            .setDescription("Player3")
            .setRequired(true))
        .addUserOption(option =>
            option.setName("player4")
            .setDescription("Player4")
            .setRequired(true))
        .addUserOption(option =>
            option.setName("player5")
            .setDescription("Player5")
            .setRequired(true))
        .addUserOption(option =>
            option.setName("player6")
            .setDescription("Player6")
            .setRequired(true))
        .addUserOption(option =>
            option.setName("player7")
            .setDescription("Player7"))
        .addUserOption(option =>
            option.setName("player8")
            .setDescription("Player8"))
        .addUserOption(option =>
            option.setName("player9")
            .setDescription("Player9")) 
        .addUserOption(option =>
            option.setName("player10")
            .setDescription("Player10"))
        .addUserOption(option =>
            option.setName("player11")
            .setDescription("Player11"))
        .addUserOption(option =>
            option.setName("player12")
            .setDescription("Player12")),

    async execute(interaction){
        try {

            function randomNumber(min, max) {
                return Math.floor(min + Math.random()*(max + 1 - min))
            }

            players = []
            for(i = 1; i <= 12; i++){
                user = interaction.options.getUser(`player${i}`)
                if(user) players.push({id: user.id})
            }
            console.log(players)
            if(players.length < 6) return interaction.reply("In the name of god I won't allow less than 6 players, how did you even make that happen you dirty criminal")
            let shuffled = players
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
            switch(players.length){
                case 6: 
                    shuffled[0].role = data.variants.six.mafia.types[0]
                    shuffled[1].role = data.variants.six.neutral.types[randomNumber(0, data.variants.six.neutral.types.length - 1)]
                    shuffled[2].role = data.variants.six.town.types[randomNumber(0, data.variants.six.town.types.length - 1)]
                    shuffled[3].role = data.variants.six.town.types[randomNumber(0, data.variants.six.town.types.length - 1)]
                    shuffled[4].role = data.variants.six.town.types[randomNumber(0, data.variants.six.town.types.length - 1)]
                    shuffled[5].role = data.variants.six.town.types[randomNumber(0, data.variants.six.town.types.length - 1)]

                    for(i = 0; i < 6; i++){
                        if(shuffled[i].role.includes("/")){
                            arr = shuffled[i].role.split("/")
                            switch(randomNumber(1, 2)){
                                case 1: shuffled[i].role = arr[0]; break;
                                case 2: shuffled[i].role = arr[1]; break;
                            }
                        }
                    }
                    
                    console.log(shuffled)
            }
    } catch(err) {
        if(err) console.log(err)
}
},
category: "military"
}