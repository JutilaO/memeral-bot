const {SlashCommandBuilder} = require("@discordjs/builders")
const Memeral = require("../../models/memeral.js")
const guildSettings = require("../../models/guildSettings.js")
const Cooldown = new Set();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trivia")
        .setDescription("Random trivia question"),
    async execute(interaction){
        try {

            var user_id = interaction.user.id
            var guild_id = interaction.guild.id
            var user_name = interaction.user.username
            var channel_id = interaction.channelId
            var channel = interaction.guild.channels.cache.get(channel_id)


            if(guild_id === "" && channel_id !== ""){
                return interaction.reply(`is dedicated to trivia, please use it`)
            }
            
            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild) return interaction.reply({content: `You must set up a bot channel`, ephemeral: true})
                if(!guild.botchannel) guild.botchannel = []
                if(guild.botchannel.length){
                    if(!guild.botchannel.includes(channel_id)) return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
                } else return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
                if(!guild.community) guild.community = ""
            
                   
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
                        if(!memeral.trivias) memeral.trivias = 0
                        if(!memeral.triviastreak) memeral.triviastreak = 0
                        if(!memeral.triviaHighest) memeral.triviaHighest = 0
                        if(!memeral.money) memeral.money = 0
                        if(memeral){
                            if(!memeral.commands){
                                var cooldown = 10
                                var moneyToAdd = 20
                            } else {
                        if(memeral.commands.includes("p02")){
                            var cooldown = 6
                            var moneyToAdd = 30
                        } else {
                            var cooldown = 10
                            var moneyToAdd = 20
                        }
                    }
                }
            
            
            
            if (Cooldown.has(user_id)) {
                interaction.reply(`You must wait ${cooldown} seconds before doing this again - ${user_name}`);
            } else {
            
            if(guild.community === "saur"){
                var number = 235; 
                var questionFile = './commands/currency/triviaSaur.txt'
            } else {
                var number = 79; 
                var questionFile = './commands/currency/triviaPublic.txt'
            }
            if(guild_id === ""){
                var fileNumber = Math.floor(Math.random() * 3) + 1
                    if(fileNumber === 1){
                        var number = 127; 
                        var questionFile = './commands/currency/triviaMili.txt'
                    }
                    if(fileNumber === 2){
                        var number = 79; 
                        var questionFile = './commands/currency/triviaPublic.txt'
                    } else {
                        var number = 235; 
                        var questionFile = './commands/currency/triviaSaur.txt'
                }
            }
            if(guild_id === "" && message.channel.id === ""){
                var number = 79; 
                var questionFile = './commands/currency/triviaPublic.txt'
            }
            if(guild_id === "" && message.channel.id === ""){
                var number = 235; 
                var questionFile = './commands/currency/triviaSaur.txt'
            }
            
            
            
            var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;
            var lineReader = require('readline').createInterface({
                input: require('fs').createReadStream(questionFile)
                });
                lineReader.on('line', function (line) {
                    questionNumber = parseInt(line.slice(0, 4).trim())
                if(questionNumber === random) {
            
                    answerLocation = line.indexOf("tAns")
                    answerString = line.slice(answerLocation, line.length)
                    answerStartLocation = answerString.indexOf('"') + 1
                    answerEndLocation = answerString.lastIndexOf('"')
            
                    correctAnswer = answerString.slice(answerStartLocation, answerEndLocation)
            
                    questionWithoutAnswer = line.slice(0, answerLocation)
                    questionStartlocation = questionWithoutAnswer.indexOf('"') + 1
                    questionEndLocation = questionWithoutAnswer.lastIndexOf('"')
            
                    question = questionWithoutAnswer.slice(questionStartlocation, questionEndLocation)
            
                    if(correctAnswer === "false") var alias = "no"
                    if(correctAnswer === "true") var alias = "yes"
            
                    interaction.reply(`${user_name}: ` + question)
                    filter = m => m.author.id === user_id
                    channel.awaitMessages({filter, max: 1, time: 12000, errors:["time"]})
                            .then((collected) => {
                                answer = collected.first().content.toLowerCase();
                                if(answer === correctAnswer || answer === alias) {
                                
                                memeral.triviastreak = memeral.triviastreak + 1
                                memeral.trivias = memeral.trivias + 1
                                memeral.money = memeral.money + (moneyToAdd + (memeral.triviastreak * 2))
                                if(memeral.triviastreak > memeral.triviaHighest) memeral.triviaHighest = memeral.triviastreak
                                
                                var friend = "my friend"
                                if(guild_id === "331365076348960768") friend = "soldier"
                                ansAmn = 5; //Amount of cases
                                var rndm = Math.floor (Math.random() * (ansAmn - 1 + 1)) + 1;
                                switch(rndm) {
                                    case 1:  interaction.followUp(`${user_name}: Indeed a wise choice! You now have ${memeral.money} coins! Win streak: ${memeral.triviastreak}`); break;
                                    case 2:  interaction.followUp(`${user_name}: That is correct ${friend}! You now have ${memeral.money} coins! Win streak: ${memeral.triviastreak}`); break;
                                    case 3:  interaction.followUp(`${user_name}: You are getting good at this! You now have ${memeral.money} coins! Win streak: ${memeral.triviastreak}`); break;
                                    case 4:  interaction.followUp(`${user_name}: That is... true! You now have ${memeral.money} coins! Win streak: ${memeral.triviastreak}`); break;
                                    case 5:  interaction.followUp(`${user_name}: Are you a fucking wizard or what? You now have ${memeral.money} coins! Win streak: ${memeral.triviastreak}`); break;
                                }
                    
            
                                } else {
                                    memeral.triviastreak = 0
                                    fAnsAmn = 5
                                    var faa = Math.floor (Math.random() * (fAnsAmn - 1 + 1)) + 1;
                                    switch(faa) {
                                    case 1:  interaction.followUp(`${user_name}: Yeah that's not correct`); break;
                                    case 2:  interaction.followUp(`${user_name}: Nope`); break;
                                    case 3:  interaction.followUp(`${user_name}: Yeahh.. no`); break;
                                    case 4:  interaction.followUp(`${user_name}: Close, but no cigar`); break;
                                    case 5:  interaction.followUp(`${user_name}: Not quite`); break;
                                }
                                }
                            
                                
                            memeral.save().catch(err => console.log(err))
            
                            })
                            .catch((err) => {
                                console.log(err)
                                    memeral.triviastreak = 0
                                    memeral.save().catch(err => console.log(err))
                                    nAnsAmn = 3; //Amount of cases
                                    var kid = Math.floor (Math.random() * (nAnsAmn - 1 + 1)) + 1;
                                    switch(kid) {
                                        case 1: interaction.followUp(`${user_name}: That took a little bit too long`); break;
                                        case 2: interaction.followUp(`${user_name}: Yeah no, you are too slow mate`); break;
                                        case 3: interaction.followUp(`${user_name}: You have ran out of time`); break; 
                                }     
                            })
        
                    
                    Cooldown.add(user_id);
                    setTimeout(() => {
                        Cooldown.delete(user_id);
                    }, cooldown * 1000);
            
            
                }
            
            })
            
            }
            })
            })
    } catch(err) {
        if(err) console.log(err)
}
},
category: "currency"
}
