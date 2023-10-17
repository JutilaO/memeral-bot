const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const bot = require("../../index.js")
const {google} = require('googleapis')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rstats")
        .setDescription("View rank statistics")
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
    spreadsheetId: '',
    range: '',
    }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        rows.map((row) => {
            if(row[0] && row[0] !== undefined && row[0].toLowerCase() === name){
                found = true
               var embed = new Discord.MessageEmbed()
               .setTitle(`SWAT Rank statistics`)
               .setColor("#0000cc")
               .setTimestamp()
               .setDescription(`**Name:** ${row[0]}\n**Join date:** ${row[5]}\n**Operations attended:** ${row[10]}\n**WZ/DD attended:** ${row[11]}\n**Trainings attended:** ${row[12]}\n**Hours spent as TRU:** ${row[13]}\n**Warnings: **${row[14]}`)
                if(name === "antimate"){
                    embed.setFooter({text: "Antimage :D"})
                }
                if(name === "darkside"){
                    embed.setFooter({text: "Look on the bright side.."})
                }
                if(name === "dutcharmy"){
                    embed.setFooter({text: "Military in heart"})
                }
                if(name === "a.x.e"){
                    embed.setFooter({text: `Dirty talk in Spanish ._.`})
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
