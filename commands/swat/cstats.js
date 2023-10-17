const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const bot = require("../../index.js")
const {google} = require('googleapis')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cstats")
        .setDescription("View career statistics")
            .addStringOption(option =>
                option
                    .setName("name")
                    .setDescription("Officer name")
                    .setRequired(true)),
    async execute(interaction){
        try {



var name = interaction.options.getString("name").toLowerCase()
var found = false


authorize();


function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0])
oAuth2Client.setCredentials();
callback(oAuth2Client)
}

function sheet(auth) {
    const sheets = google.sheets({version: 'v4', auth})
    sheets.spreadsheets.values.get({
    spreadsheetId: 'g',
    range: '',
    }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        rows.map((row) => {
            if(row[17] && row[17] !== undefined && row[17].toLowerCase() === name){
            found = true
               var embed = new Discord.MessageEmbed()
               .setTitle(`SWAT Career statistics`)
               .setColor("#0000cc")
               .setTimestamp()
               .setDescription(`**Name:** ${row[17]}\n**Rank:** ${row[18]}\n**Join date:** ${row[19]}\n**Operations attended:** ${row[20]}\n**WZ/DD attended:** ${row[21]}\n**Trainings attended:** ${row[22]}\n**Hours spent as TRU:** ${row[24]}\n**Warnings: **${row[25]}`)
               if(name === "antimate"){
                   embed.setFooter({text: "Antimage :D"})
               }
               if(name === "darkside"){
                embed.setFooter({text: "Look on the bright side.."})
               }
               if(name === "dutcharmy"){
                embed.setFooter({text: "Military in heart"})
               }
               if(name === "A.X.E"){
                emote = bot.emojis.cache.get("thecattestcat:769369833992880138")
                embed.setFooter({text: `Dirty talk in spanish ${emote}`})
               }
               return interaction.reply({embeds: [embed]})
            
            }
        })
        if(found === false) interaction.reply("Officer not found") 
    } else {
        console.log('No data found.')
    }
})
}
         

    } catch(err) {
        if(err) console.log(err)
}
},
category: "swat"
}
