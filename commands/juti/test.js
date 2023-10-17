const {SlashCommandBuilder} = require("@discordjs/builders")
const token = ""
const fetch = require("node-fetch")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("league")
        .setDescription("test"),
    async execute(interaction){
        try {
            var topscore = []
        var linkByName = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/J?api_key=${token}`
        fetch(linkByName)
        .then(user => user.json())
        .then(json => get(json))
        
        function get(user){
            var linkByID = `https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${user.id}?api_key=${token}`
            fetch(linkByID)
            .then(res => res.json())
            .then(json => champions(json))
        }

        async function champions(json){
            for(i = 0; i < 3; i++){
                topscore.push({id: json[i].championId, level: json[i].championLevel, score: json[i].championPoints, chest: json[i].chestGranted})
            }

            var linkByID = `http://ddragon.leagueoflegends.com/cdn/12.4.1/data/en_US/champion.json`
            await fetch(linkByID)
            .then(res => res.json())
            .then(json => kakone(json))

        }
        function kakone(json){
            return console.log(json)
            for(i in topscore){
                dis = json.filter(champion => champion.id === topscore[i].id)
                topscore[i].name = dis.name
            }
            const embed = new Discord.MessageEmbed()
            .setColor(0xff1493)
            .setTimestamp()
            .addField(`1. ${topscore[0].name}`, `${topscore[0].score}`)
            .addField(`2. ${topscore[1].name}`, `${topscore[1].score}`)
            .addField(`3. ${topscore[2].name}`, `${topscore[2].score}`)
            interaction.reply({embeds: [embed]})
        }
        

    } catch(err) {
        if(err) console.log(err)
}
},
category: "juti"
}
