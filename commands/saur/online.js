const {SlashCommandBuilder} = require("@discordjs/builders")
const {google} = require('googleapis')
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("online")
        .setDescription("List of online players in SAUR")
        .addStringOption(option =>
            option
                .setName("searchword")
                .setDescription("Optional searchwords")),
    async execute(interaction){
        try {

            var user_id = interaction.user.id
            var guild_id = interaction.guild.id
            var input = interaction.options.getString("searchword")
            var ephemeral = false

            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild){
                    var guild = new guildSettings({
                        guildID: guild_id
                    })
                }
                if(!guild.botchannel) guild.botchannel = []
                if(!guild.botchannel.includes(interaction.channelId)){
                    ephemeral = true
                }
            })

            online()
            async function online(){
            

            var staffs = []
            var mili = []
            var swat = []
            var terro = []
            var sortedPlayerArray = []
            var miliSorted = []
            var staffSorted = []
            var swatSorted = []
            var playerString = ""
            var amount = 0
            
            var staffTags = ["*SAUR*", "*SAUR\\*", "[SAUR]", "{SAUR}", "(SAUR)", "AeroXbird", "Infinate", "Crotchy", "Castillo"]
            var miliTags = ["BCS", "RCT", "PVT", "PFC", "SPC", "LCPL", "CPL", "SGT", "SSG", "MSG", "WO", "LT", "CPT", "MJR", "LTC", "COL", "BG", "MJG", "LTG", "GEN"]
            var swatTags = ["[LA]", "*SWAT*", "*SWAT\\*", "[SWAT]", "{SWAT}", "(SWAT)"]
            var militarycl = []
            
            
            authorize();
            
            
            function authorize(credentials, callback) {
            const {client_secret, client_id, redirect_uris} = credentials.installed;
            const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
            oAuth2Client.setCredentials();
            callback(oAuth2Client);
            }
                
            
            function statistics(auth) {
            
            ignore = ["Promotion time requirements:", "Today's date:", "Reservists", "Name:", "Boot Camp Students", "N/A", "Recruits", "Privates", "Private First Classes", "Specialists", "Corporals", "Sergeants", "Staff Sergeants", "Master Sergeants", "Warrant Officers", "Lieutenants", "Captains", "Major", "Lieutenant Colonel", "Colonel", "Brigadier General", "Major General", "Lieutenant General"]
                          
            const sheets = google.sheets({version: 'v4', auth});
            sheets.spreadsheets.values.get({
            spreadsheetId: '',
            range: '',
            }, (err, res) => {
            if(err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if(rows.length) {
            rows.map((row) => {
                if(!ignore.includes(row[0])) militarycl.push(row[0])
                   
            })
            } else {
                console.log('No data found.')
            }
            })
            }
            
            const fetch = require('node-fetch');
            
             
            fetch('https://saurapi.devprio.repl.co/players/1')
                .then(res => res.json())
                .then(json => post(json.players));
            
            function post(players){
            
            if(!input){
            players.forEach(p => {
            
            if(p.includes("||") || p.includes("*")){
                if(!p.includes("*SWAT*") && !p.includes("*SAUR")) players = players.filter(u => u !== p)
            }
            
            if(p.includes("*SAUR*")){
                taglessName = p.slice(6, p.length)
                staffs.push(`*SAUR\\*${taglessName}`)
                players = players.filter(u => u !== p)
            } else
            staffTags.forEach(tag => {
                if(p.includes(tag)){
                    staffs.push(p)
                    players = players.filter(u => u !== p)
                }  
            })
            
            miliTags.forEach(mTag => {
                if(!p.includes("RIOT")){
                if(p.startsWith(`${mTag}-`)){
                    mili.push(p)
                    players = players.filter(u => u !== p)
                }
                if(p.includes(staffTags[0]) || p.includes(staffTags[1]) || p.includes(staffTags[2]) || p.includes(staffTags[3]) || p.includes(staffTags[4])){
                    if(p.includes(mTag)){
                        if(p.includes("*SAUR*")){
                            taglessName = p.slice(6, p.length)
                            mili.push(`*SAUR\\*${taglessName}`)
                        } else {
                            mili.push(p)
                        }
                        players = players.filter(u => u !== p)
                    }
                }
            }
            })
            
            if(p.includes("*SWAT*")){
                taglessName = p.slice(6, p.length)
                swat.push(`*SWAT\\*${taglessName}`)
                players = players.filter(u => u !== p)
            } else
            swatTags.forEach(sTag => {
                if(p.includes(sTag)){
                    if(p.includes("*SAUR*")){
                        taglessName = p.slice(6, p.length)
                        swat.push(`*SAUR\\*${taglessName}`)
                    } else {
                        swat.push(p)
                    }
                    players = players.filter(u => u !== p)
                }
            })
            
            if(p.startsWith("T|") || p.startsWith("TRN-")){
                terro.push(p)
                players = players.filter(u => u !== p)
            }
            if(p.includes(staffTags[0]) || p.includes(staffTags[1]) || p.includes(staffTags[2]) || p.includes(staffTags[3]) || p.includes(staffTags[4])){
                if(p.includes("|T") || p.includes("-TRN")){
                    if(p.includes("*SAUR*")){
                        taglessName = p.slice(6, p.length)
                        terro.push(`*SAUR\\*${taglessName}`)
                    } else {
                        terro.push(p)
                    }
                    players = players.filter(u => u !== p)
                }
            } else {
                if(p.endsWith("|T")){
                    terro.push(p)
                    players = players.filter(u => u !== p)
                }
            }
            })
            
            
            
            for(i = 0; i < miliTags.length; i++){
                for(x = 0; x < mili.length; x++){
                    if(mili[x].includes(miliTags[i])){
                        if(!miliSorted.includes(mili[x])) miliSorted.push(mili[x])
                    }
                }
            }
            
            for(i = 0; i < swatTags.length; i++){
                for(x = 0; x < swat.length; x++){
                    if(swat[x].includes(swatTags[i])) swatSorted.push(swat[x])
                }
            }
            
            for(i = 0; i < staffTags.length; i++){
                for(x = 0; x < staffs.length; x++){
                    if(staffs[x].startsWith(staffTags[i])) staffSorted.push(staffs[x])
                }
            }
            
            
            
            if(!staffSorted.length) staffSorted = ["None"]
            if(!miliSorted.length) miliSorted = ["None"]
            if(!swatSorted.length) swatSorted = ["None"]
            if(!terro.length) terro = ["None"]
            
            sortedPlayerArray.push({
                group: "Military",
                amount: miliSorted.length,
                members: miliSorted.reverse()
            })
            sortedPlayerArray.push({
                group: "SWAT",
                amount: swatSorted.length,
                members: swatSorted.reverse()
            })
            sortedPlayerArray.push({
                group: "Terrorists",
                amount: terro.length,
                members: terro.reverse()
            })
            
            sortedPlayerArray.sort(function (a, b) {
                return b.amount - a.amount;
            })
            
            
            
            var divided = Math.floor(players.length / 3)
            var embed = new Discord.MessageEmbed()
            .setTitle(`SAUR - ${amount} online players`)
            .setColor(0xff1493)
            .addField("Staff", staffSorted.reverse().join("\n"))
            .addField(sortedPlayerArray[0].group, sortedPlayerArray[0].members.join("\n"), true)
            .addField(sortedPlayerArray[1].group, sortedPlayerArray[1].members.join("\n"), true)
            .addField(sortedPlayerArray[2].group, sortedPlayerArray[2].members.join("\n"), true)
            .setFooter({text: `Use 'online [searchword]' to look for specific player(s)`})
            .setAuthor({name: interaction.user.username, icon: interaction.user.displayAvatarURL()})
            //.setThumbnail("https://saur.co/donate/img/circle.png")
            
            for(i = 0; i < players.length; i++){
                if(players[i] !== " 0" && players[i] !== 0 && players.length > 1){
                    if(players[i].length > 8){
                        if(players[i]){
                            var p = players[i].split("")
                            var upperCaseAmount = 0
                            ignore = ["(", ")", "|", "{", "}", "[", "]", "*"]
                            for(x = 0; x < p.length; x++){
                                if(!ignore.includes(p[x]) && p[x] === p[x].toUpperCase()) upperCaseAmount++
                                if(upperCaseAmount === 9){
                                    upperCaseAmount = 0
                                    players[i] = players[i].slice(0, 9) + "-"
                                } else
                                if(players[i].length > 16){
                                    players[i] = players[i].slice(0, 16) + "-"
                                }
                            }
                        }
                    }
                    if(players.length < 60){
                        playerString = playerString + players[i] + "\n"
                        if(i === divided){
                            if(players.length <= 1){
                                embed.addField("Other", playerString, true)
                                playerString = ""
                            } else {
                                embed.addField("-", playerString, true)
                                playerString = ""
                            }
                        } else
                        if(i === (divided + divided)){
                            embed.addField("Other", playerString, true)
                            playerString = ""
                        } else
                        if(i === players.length - 1){
                            embed.addField("-", playerString, true)
                        }
                    } else {
                        if(i === 20){
                            playerString = playerString + players[i] + "\n"
                            embed.addField("-", playerString, true)
                            playerString = ""
                        } else
                        if(i === 40){
                            playerString = playerString + players[i] + "\n"
                            embed.addField("Other", playerString, true)
                            playerString = ""
                        } else
                        if(i === 60){
                            playerString = playerString + players[i] + "\n"
                            embed.addField("-", playerString, true)
                        } else playerString = playerString + players[i] + "\n"
                    }
                }
            }
            
            return interaction.reply({embeds: [embed], ephemeral: ephemeral})
            }
            result = []
            args = input.split(" ")
            players.forEach(p => {
                if(p.toLowerCase().includes(args[0].toLowerCase())) result.push(p)
            })
            
            var embed = new Discord.MessageEmbed()
            .setTitle(`SAUR - ${amount} online players`)
            .setColor(0xff1493)
            .setFooter({text: `Use 'online [searchword]' to look for specific player(s)`})
            .setAuthor({name: interaction.user.username, icon: interaction.user.displayAvatarURL()})
            //.setThumbnail("https://saur.co/donate/img/circle.png")
            
            if(result.length > 0){
                if(result.length > 1){
                    msg = result.join("\n")
                    if(msg.length > 1000){
                        embed.addField("Matches", "Too many matches. Try a more accurate searchword.")
                    } else embed.addField("Matches", msg)
                    interaction.reply({embeds: [embed], ephemeral: ephemeral})
                } else return interaction.reply({content: `${interaction.user.tag}: ${result.join("")} is online.`, ephemeral: ephemeral})
            } else {
                interaction.reply({content: `${interaction.user.tag}: ${args[0]} is not online.`, ephemeral: ephemeral})
            }
            }
            
            }
         

    } catch(err) {
        if(err) console.log(err)
}
},
category: "saur"
}
