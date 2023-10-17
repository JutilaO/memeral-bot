const Discord = require("discord.js")
const botSettings = require("../../models/botSettings.js")
module.exports.run = async (bot, message) => {
return
guilds = []

if(guilds.include(message.guild.id) && message.content.toLowerCase().includes("teemo")){
    botSettings.findOne({
        ownerID: ownerID
    }, (err, botSet) => {
        if(err) console.log(err)
        if(!botSet.teemos) botSet.teemos = 0
        botSet.teemos = botSet.teemos + 1
        botSet.save().catch(err => console.log(err))

        switch(Math.floor (Math.random() * (13 - 1 + 1)) + 1){
            case 1: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/3/3b/Teemo_OriginalSkin.jpg/revision/latest?cb=20181021055924"; break
            case 2: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/2/2c/Teemo_AstronautSkin.jpg/revision/latest?cb=20181021114351"; break
            case 3: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/a/a8/Teemo_CottontailSkin.jpg/revision/latest?cb=20181021114408"; break
            case 4: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/d/d2/Teemo_SuperSkin.jpg/revision/latest?cb=20181021103231"; break
            case 5: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/d/d5/Teemo_PandaSkin.jpg/revision/latest?cb=20181021074146"; break
            case 6: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/4/46/Teemo_OmegaSquadSkin.jpg/revision/latest?cb=20181021071035"; break
            case 7: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/c/c1/Teemo_BeemoSkin.jpg/revision/latest?cb=20181021035835"; break
            case 8: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/5/54/Teemo_HappyElfSkin.jpg/revision/latest?cb=20181021084324"; break
            case 9: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/4/4c/Teemo_ReconSkin.jpg/revision/latest?cb=20181021110340"; break
            case 10: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/1/1f/Teemo_BadgerSkin.jpg/revision/latest?cb=20181021032126"; break
            case 11: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/a/ab/Teemo_LittleDevilSkin.jpg/revision/latest?cb=20181021114429"; break
            case 12: image = "https://vignette.wikia.nocookie.net/leagueoflegends/images/6/62/Teemo_SpiritBlossomSkin.jpg/revision/latest?cb=20200707202018"; break
            case 13: image = "https://cdn.discordapp.com/attachments/692403151789359204/886277356166193202/spirit-blossom-teemo-prestige-lol-splash-art-uhdpaper.com-8K-3.2283.png"; break
        }

        const embed = new Discord.MessageEmbed()
        .setTitle("Teemo")
        .setColor(0xff1493)
        .setFooter(`Teemo counter: ${botSet.teemos}`)
        .setTimestamp()
        .setImage(image)

        
        message.channel.send(embed)
    })
}

}
