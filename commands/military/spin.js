const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Military = require("../../models/military.js")
const cooldown = new Set()

module.exports = {
    data: new SlashCommandBuilder()
        .setName("spin")
        .setDescription("Spin the Military wheel"),
    async execute(interaction){
        try {
            let embed = new Discord.MessageEmbed()
            .setColor(0x137515)
            .setTitle("Military wheel")
            .setAuthor({name: interaction.user.username, icon: interaction.user.displayAvatarURL()})
            if(interaction.user.id === "") embed.setFooter({text: "Where'd you get that spin, General?"})
            if(interaction.user.id === "1896") embed.setFooter({text: "Totally legit spin"})
            if(interaction.user.id === "3115") embed.setFooter({text: "Aerion cheats!!"})
            if(interaction.user.id === "30") embed.setFooter({text: "MaxDiego used Rabeez' Discord account :O"})
            
            var money100 = "https://cdn.discordapp.com/attachments/70038062504566955307028/spin1.png"
            var armours = "https://cdn.discordapp.com/attachments/70038062504309577466101841/spin2.png"
            var akm4 = "https://cdn.discordapp.com/attachments/7003806250430585464770630/spin3.png"
            var wrenches = "https://cdn.discordapp.com/attachments/70038062509606155272202/spin5.png"
            var minigun = "https://cdn.discordapp.com/attachments/70038062504306285869018268/spin6.png"
            var coin = "https://cdn.discordapp.com/attachments/70038062504670235848754/spin8.png"
            var rpg = "https://cdn.discordapp.com/attachments/7003806250430629679496609904/spin9.png"
            var shotgun = "https://cdn.discordapp.com/attachments/70038062504889697574322356/spin11.png"
            var smg = "https://cdn.discordapp.com/attachments/70038062504305283321926/spin12.png"
            var sniper = "https://cdn.discordapp.com/attachments/700380622337779638272/spin13.png"
            var money1m = "https://cdn.discordapp.com/attachments/70038062502/spin7.png"
            
            var imageArray = []
            
            Military.findOne({
                userID: interaction.user.id,
                guildID: interaction.guild.id
            }, (err, military) => {
                if(err) console.log(err)
                if(!military){
                    return interaction.reply("You don't have any spins")
                } else {
                    if(!military.miliSpins) return interaction.reply("You don't have any spins")
                    if(military.miliSpins >= 1){
                        if(cooldown.has(interaction.user.id)) return interaction.reply("We are not in a hurry soldier. Please wait for your other spin to finish.")
                        cooldown.add(interaction.user.id)
                        military.miliSpins = military.miliSpins - 1
                        var percentageRandom = Math.random()
                        if(percentageRandom < 0.1){
                            var item = "1 million"
                            var image = money1m
                        } else
                        if(percentageRandom < 0.2){
                            var item = "5 RPGs"
                            var image = rpg
                        } else
                        if(percentageRandom < 0.4){
                            var random = Math.floor (Math.random() * (7 - 1 + 1)) + 1;
                            switch(random){
                                case 1: var image = armours; var item = "30 armours"; break
                                case 2: var image = akm4; var item = "10k AK/M4"; break
                                case 3: var image = minigun; var item = "5k Minigun"; break
                                case 4: var image = shotgun; var item = "10k Shotgun"; break
                                case 5: var image = smg; var item = "10k SMG"; break
                                case 6: var image = sniper; var item = "10k Sniper"; break
                                case 7: var image = wrenches; var item = "50 wrenches"; break
                            }
                        } else
                        if(percentageRandom < 0.6){
                            var item = "100k money"
                            var image = money100
                        } else
                        if(percentageRandom < 1.0){
                            var item = "1 Military coin"
                            var image = coin
                            if(!military.miliCoins) military.miliCoins = 0
                            military.miliCoins = military.miliCoins + 1
                        }
                        for(i = 0; i < 3; i++){
                            var random2 = Math.floor (Math.random() * (11 - 1 + 1)) + 1;
                            switch(random2){
                                case 1: imageArray.push(money100); break
                                case 2: imageArray.push(armours); break
                                case 3: imageArray.push(akm4); break
                                case 4: imageArray.push(wrenches); break
                                case 5: imageArray.push(minigun); break
                                case 6: imageArray.push(coin); break
                                case 7: imageArray.push(rpg); break
                                case 8: imageArray.push(shotgun); break
                                case 9: imageArray.push(smg); break
                                case 10: imageArray.push(sniper); break
                                case 11: imageArray.push(money1m); break
                            }
                        }
                        embed.setImage(imageArray[0])
                        interaction.reply({embeds: [embed]}).then(msg => {
                            setTimeout(part2, 1000)
                            function part2() {
                                embed.setImage(imageArray[1])
                                interaction.editReply({embeds: [embed]})
                            setTimeout(part3, 1000)
                            function part3() {
                                embed.setImage(imageArray[2])
                                interaction.editReply({embeds: [embed]})
                            setTimeout(part4, 1000)
                            function part4(){
                                embed.setImage(image)
                                embed.setDescription(`Congratulations! You won ${item}!`)
                                interaction.editReply({embeds: [embed]})
                                military.save().catch(err => console.log(err))
                                cooldown.delete(interaction.user.id)
                            }
                        }}
                        })
                }
                }
             })
    } catch(err) {
        if(err) console.log(err)
}
},
category: "military"
}
