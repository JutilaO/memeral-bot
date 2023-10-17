const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("egyptify")
        .setDescription("Egyptifies your input")
        .addStringOption(option =>
            option
                .setName("input")
                .setDescription("Your input")
                .setRequired(true)),
    async execute(interaction){
        try {

           var user_id = interaction.user.id
           var guild_id = interaction.guild.id
           var input = interaction.options.getString("input")



                var args = input.split(" ")
                function randomNumber(min, max) {
                    return Math.floor(min + Math.random()*(max + 1 - min))
                }
                
                egyEnds = [
                    ". . . .",
                    "xD",
                    "...",
                    "-_-",
                    "-.-",
                    ":D",
                    "xDDD",
                    "hhh",
                    "hhhhhh",
                    "HHHH",
                    "omggg",
                    "el fast",
                    "ana mommm",
                    "ffa?"
                ]

                egyInsults = [
                    "fuck you're mother!!",
                    "nooobsssssss",
                    "fck youuu",
                    "bitchhhhhhh",
                    "1v1 tdm 10m",
                    "hhhh u noob :D",
                    "ahah u Suck xD",
                    "your mom",
                    "son off a bitchg",
                    "your noob :D",
                    "your noob xD",
                    "lol nice noob xD",
                    "shotgun bot",
                    "m4 bot",
                    "minigun bot",
                    "lol kid",
                    "a7a",
                    "ksmk",
                    "kosmk",
                    "kosomak",
                    "kid",
                ]

                var insults = ["fck you", "ur mom", "asshole", "bastard", "chicken", "clown", "cock", "sucker", "faker", "fuck u", "cunt", "dick", "dickhead", "retard", "egy", "noob", "kid", "faggot",  "shit", "pussy", "idiot", "gay", "jerk", "loser", "nerd", "scumbag", "snowflake", "crybaby", "baby", "whore", "nigga", "nigger", "motherfucker", "stupid", "egys", "bitch", "fak u", "fuk u", "fuck you"];
                var stupidShit = ["give", "inactive"];
                for(i = 0; i < args.length; i++){
                    if(args[i]){
                        args[i] = args[i].toLowerCase()
                        if(args[i] === stupidShit[0]) args[i] = "back"
                        if(args[i] === stupidShit[1]) args[i] = "exam"
                        for(x = 0; x < insults.length; x++){
                            if(args[i] === insults[x]){
                                args[i] = egyInsults[randomNumber(0, egyInsults.length - 1)]
                            }
                        }
                        if(randomNumber(1, 3) === 1){
                            if(args[i]){
                                letter = args[i].slice(0, 1)
                                letter = letter.toUpperCase()
                                args[i] = letter + args[i].slice(1, args[i].length)
                            }
                        }
                        if(i === args.length - 1){
                            if(randomNumber(1, 2) === 1){
                                args.push(egyEnds[randomNumber(0, egyEnds.length - 1)])
                            }
                        return interaction.reply(`${interaction.user.tag}: ${args.join(" ")}`)
                        }
                    }
                }
            

    } catch(err) {
        if(err) console.log(err)
}
},
category: "saur"
}