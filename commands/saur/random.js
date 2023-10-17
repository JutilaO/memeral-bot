const {SlashCommandBuilder} = require("@discordjs/builders")
const {google} = require('googleapis')
const Discord = require("discord.js")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Random SAUR image"),
    async execute(interaction){
        try {

var guild_id = interaction.guild.id
            
guildSettings.findOne({
    guildID: guild_id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild){
        var guild = new guildSettings({
            guildID: guild_id,
        })
    }
    if(!guild.botchannel) guild.botchannel = []
    if(guild.botchannel.includes(interaction.channelId)){
        randomPicture()
    } else interaction.reply({content: "This command is limited to bot channels", ephemeral: true})
})

function randomPicture(){

authorize(s)

function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials()
callback(oAuth2Client);
}
    

function statistics(auth) {

if(guild_id === "2"){
    var sheetID = "4"
    var footer = "Want an image of yours added here? Ask your headquarters!"
} else {
    var sheetID = ""
    var footer = "Got some good pictures? Join the Memeral's Discord server using >discord to contribute!"
}

var numberArray= []

const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
spreadsheetId: sheetID,
range: 'Sheet1!A1:H600',
}, (err, res) => {
if (err) return console.log('The API returned an error: ' + err);
const rows = res.data.values;
if (rows.length) {
rows.map((row) => {
    if(row[6] !== "Total" && parseInt(row[6]) !== undefined){
        total = parseInt(row[6])
        if(!isNaN(total)) numberArray.push(Math.floor(Math.random() * (total - 1 + 1)) + 1 )
    }
    if(parseInt(row[0]) === numberArray[0]){
        const embed = new Discord.MessageEmbed()
        .setImage(row[1])
        .setFooter({text: footer})
        .setDescription(row[3])
        .setColor(0xff1493)
        .setAuthor({name: `Author: ${row[2]}`})

        return interaction.reply({embeds: [embed]})
    }
})
    } else {
        console.log('No data found.');
    }
})
}
}
   
         

    } catch(err) {
        if(err) console.log(err)
}
},
category: "saur"
}
