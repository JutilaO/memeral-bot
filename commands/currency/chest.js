const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Memeral = require("../../models/memeral.js")
const alreadyUnboxing = new Set()
const guildSettings = require("../../models/guildSettings.js")
const {google} = require('googleapis')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chest")
        .setDescription("Open a chest to obtain a random item")
        .addIntegerOption(option =>
            option.setName("amount")
            .setDescription("Amount of chests to open (optional) (between 2-10)")),
    async execute(interaction){
        try {

            var blackmarketArray = []
            var mythicArray = []
            var legendaryArray = []
            var extraordinaryArray = []
            var rareArray = []
            var commonArray = []
            var unboxedArray = []
            var wonItem = ""
            var formed = ""
            var user_id = interaction.user.id
            var guild_id = interaction.member.guild.id
            var channel_id = interaction.channelId
            var name = interaction.user.username
            var amount = parseInt(interaction.options.getInteger("amount"))


            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild){
                    var guild = new guildSettings({
                        guildID: guild_id
                    })
                } 
                if(!guild.community) guild.community = ""
                if(!guild.botchannel) guild.botchannel = []
                if(guild.botchannel.length){
                    if(!guild.botchannel.includes(channel_id)) return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
                } else return interaction.reply({content: `This command is limited to bot channels`, ephemeral: true})
                if(guild.community.includes(`saur`)){
                   var sheetID = ""
                   if(guild_id === ""){
                    var sheetID = ""
                }
                } else {
                    var sheetID = ""
                }
                if(guild_id === "" && channel_id === ""){
                    var sheetID = ""
                }
                if(guild_id === "" && channel_id === ""){
                    var sheetID = ""
                }
            
                    
            function randomNumber(min, max) {
                return Math.floor(min + Math.random()*(max + 1 - min))
            }
            
            
            if(alreadyUnboxing.has(user_id)) return interaction.reply("Please wait until your other chest opens.")
            
            
            if(amount){
                if(amount && amount >= 2 && amount <= 10){
                } else return interaction.reply("Amount must be between 2 and 10")
            }
            
            if(!amount) amount = 1
            
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
            if(!memeral.money) memeral.money = 0
            if(!memeral.inv) memeral.inv = []
            var chestPrice = 200 * amount
            if(memeral.money < chestPrice){
                needMoney = chestPrice - memeral.money
                return interaction.reply(`You do not have ${chestPrice} coins. You need ${needMoney} more!`)
            }
            if(memeral.inv.length >= 4294967295) return interaction.reply("You have reached the maximum length of items, what the actual fuck.")
            
            alreadyUnboxing.add(user_id)
            authorize();
            
            function authorize(credentials, callback) {
                const {client_secret, client_id, redirect_uris} = credentials.installed;
                const oAuth2Client = new google.auth.OAuth2(
                client_id, client_secret, redirect_uris[0]);
                oAuth2Client.setCredentials(})
                callback(oAuth2Client);
            }
            
            
            function statistics(auth) {
            const sheets = google.sheets({version: 'v4', auth})
            sheets.spreadsheets.values.get({
            spreadsheetId: sheetID,
            range: 'Sheet1!A1:I300',
            }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
            rows.map((row) => {
                if(row[2] !== undefined && row[2].includes("Blackmarket")) blackmarketArray.push({id: row[1], name: row[2]})
                if(row[2] !== undefined && row[2].includes("Mythic")) mythicArray.push({id: row[1], name: row[2]})
                if(row[2] !== undefined && row[2].includes("Legendary")) legendaryArray.push({id: row[1], name: row[2]})
                if(row[2] !== undefined && row[2].includes("Extraordinary")) extraordinaryArray.push({id: row[1], name: row[2]})
                if(row[2] !== undefined && row[2].includes("Rare")) rareArray.push({id: row[1], name: row[2]})
                if(row[2] !== undefined && row[2].includes("Common")) commonArray.push({id: row[1], name: row[2]})
            })
               
            openChest()
            
            } else {
            console.log('No data found.')
            }
            })
            }
            
            function openChest(){
            
            
            for(i = 0; i <= amount; i++){
                getItem(i)
            }
            
            
            function getItem(){
            
            var percentageRandom = Math.random()
            if(percentageRandom < 0.004){
                var itemNumber = randomNumber(0, blackmarketArray.length - 1)
                var wonItem = blackmarketArray[itemNumber].name
                var itemID = blackmarketArray[itemNumber].id
                var rarityID = "A"
                var rarity = "Blackmarket"
            } else 
            if(percentageRandom < 0.01){
                var itemNumber = randomNumber(0, mythicArray.length - 1)
                var color = 0x952ECD
                var wonItem = mythicArray[itemNumber].name
                var itemID = mythicArray[itemNumber].id
                var rarityID = "B"
                var rarity = "Mythic"
            } else
            if(percentageRandom < 0.02){
                var itemNumber = randomNumber(0, legendaryArray.length - 1)
                var color = 0xE9A410
                var wonItem = legendaryArray[itemNumber].name
                var itemID = legendaryArray[itemNumber].id
                var rarityID = "C"
                var rarity = "Legendary"
            } else
            if(percentageRandom < 0.12){
                var itemNumber = randomNumber(0, extraordinaryArray.length - 1)
                var color = 0x31C601
                var wonItem = extraordinaryArray[itemNumber].name
                var itemID = extraordinaryArray[itemNumber].id
                var rarityID = "D"
                var rarity = "Extraordinary"
            } else
            if(percentageRandom < 0.40){
                var itemNumber = randomNumber(0, rareArray.length - 1)
                var color = 0x0ED0E4
                var wonItem = rareArray[itemNumber].name
                var itemID = rareArray[itemNumber].id
                var rarityID = "E"
                var rarity = "Rare"
            } else
            if(percentageRandom < 1.00){
                var itemNumber = randomNumber(0, commonArray.length - 1)
                var color = 0x1E2CFF
                var wonItem = commonArray[itemNumber].name
                var itemID = commonArray[itemNumber].id
                var rarityID = "F"
                var rarity = "Common"
            }
            
            
            var conditionRandom = Math.random()
            
            if(conditionRandom < 0.008){
                var condition = " (Black foil)"
                var conditionID = "A"
            } else 
            if(conditionRandom < 0.03){
                var condition = " (Holographic foil)"
                var conditionID = "B"
            } else
            if(conditionRandom < 0.08){
                var condition = " (Chrome)"
                var conditionID = "C"
            } else
            if(conditionRandom < 0.14){
                var condition = " (Platinum)"
                var conditionID = "D"
            } else
            if(conditionRandom < 1.00){
                var condition = ""
                var conditionID = "E"
            }
            
            unboxedArray.push({name: wonItem, condition: condition, rarity: rarity, ID: itemID, rID: rarityID, cID: conditionID, color: color})
            if(i === amount - 1) send()
            }
            
            function send(){
            
            if(!memeral.cases) memeral.cases = 0
            memeral.cases += amount
            caseNumber = memeral.cases
            
            
            var embed = new Discord.MessageEmbed()
            .setTitle("Unboxing a chest!")
            .setAuthor({name: interaction.user.username, icon: interaction.user.displayAvatarURL()})
            .setColor(0xff1493)
            .setFooter({text: `You have unboxed ${caseNumber} chests! Coins left: ${memeral.money - chestPrice}`})
            .setTimestamp()
            .setImage("https://cdn.discordapp.com/attachments/3348/chest_better.png")
            
            if(amount > 1){
                for(i = 0; i < unboxedArray.length; i++){
                    formed = formed + `${unboxedArray[i].name} ${unboxedArray[i].condition}\n`
                }
            } else {
                formed = `${unboxedArray[i].name} ${unboxedArray[i].condition}`
            }
            
            if(wonItem.includes("Blackmarket")){
            var r = 0
            var titles = [
                "Unboxing a chest in 3 seconds!",
                "Unboxing a chest in 2 seconds!",
                "Unboxing a chest soon!",
                "Unboxing a very soon!",
                "Chest unboxed!",
                
            ]
            var colors = [
                0xFFF00B,
                0xFFAA0B,
                0xFF510B,
                0xFE1603
            ]
            var thumbnails = [
                "https://cdn.discordapp.com/attachments/331370240i1.png",
                "https://cdn.discordapp.com/attachments/333702452.png"
            
            ]
            var images = [
                "https://cdn.discordapp.com/attachments/40chest.png",
                "https://cdn.discordapp.com/attachments/53259623sdasdasdasdasdasdas.png"
            ]
            
            embed.setImage(images[0])
            interaction.reply.send({embeds: [embed]}).then(msg => {
                var interval = setInterval(() => {
                    r++
                    embed.setTitle(titles[r])
                    embed.setColor(colors[r])
                    embed.setThumbnail(thumbnails[0])
                    if(r === 4){
                        embed.setThumbnail(thumbnails[1])
                        embed.setImage(images[1])
                        if(amount > 1){
                            embed.setTitle(`Chests unboxed!`)
                            embed.setDescription(`${name} unboxed following signatures:\n ${formed}`)
                        } else {
                            embed.setDescription(`${name} unboxed ${unboxedArray[0].name}'s signature ${unboxedArray[0].condition}`)
                        }
                        alreadyUnboxing.delete(user_id)
                        clearInterval(interval)
                    }
                    interaction.editReply({embeds: [embed]})
                }, 2000)
            })
            
            } else {
            
            interaction.reply({embeds: [embed]}).then(msg => {
                setTimeout(t5, 1000)
                function t5(){
                    if(amount > 1){
                        embed.setDescription(`${name} unboxed following signatures:\n ${formed}`)
                        embed.setColor(0xff1493)
                        embed.setTitle(`Chests unboxed!`)
                    } else {
                        embed.setDescription(`${name} unboxed ${unboxedArray[0].name}'s signature ${unboxedArray[0].condition}`)
                        embed.setColor(unboxedArray[0].color)
                        embed.setTitle(`Chest unboxed!`)
                    }
                    embed.setImage("https://cdn.discordapp.com/attacst_open.png")
                    interaction.editReply({embeds: [embed]})
                    alreadyUnboxing.delete(user_id)
                }    
            })
            
            for(i = 0; i < unboxedArray.length; i++){
                memeral.inv.push(unboxedArray[i].rID + unboxedArray[i].cID + unboxedArray[i].ID)
            }
            
            memeral.money = memeral.money - chestPrice
            memeral.save().catch(err => console.log(err))
            
            }}
            
            }
            })        
            
            })
    } catch(err) {
        if(err) console.log(err)
}
},
category: "currency"
}
