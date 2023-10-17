const Discord = require("discord.js")
const {google} = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
module.exports.run = async (bot, message, args) => {
return

var channel  = message.channel
var message = message.content.toLowerCase()

authorize();

function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials();
callback(oAuth2Client);
}
    

function statistics(auth) {
              
const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
spreadsheetId: '',
range: '',
}, (err, res) => {
if(err) return console.log('The API returned an error: ' + err);
const rows = res.data.values;
if(rows.length) {
rows.map((row) => {
    if(row[0] !== undefined && row[0] !== " " && row[0] !== ""){
    username = row[0].toLowerCase()
    if(message.includes(username)){
        user = row[0]
        account = row[1]
        reason = row[2]
        if(!row[0]) user = "Unknown"
        if(!row[1]) account = "Unknown"
        if(!row[2]) reason = "No reason given"
        return channel.send(`Potentially risky pick detected:\nName: ${user}\nAccount: ${account}\nReason: ${reason}`)
    }
}
    if(row[1] !== undefined && row[1] !== " " && row[1] !== ""){
        accountname = row[1].toLowerCase()
        if(message.includes(accountname)){
            user = row[0]
            account = row[1]
            reason = row[2]
            if(!row[0]) user = "Unknown"
            if(!row[1]) account = "Unknown"
            if(!row[2]) reason = "No reason given"
            return channel.send(`Potentially risky pick detected:\nName: ${user}\nAccount: ${account}\nReason: ${reason}`)
        }
    }
})
    
} else {
    console.log('No data found.')
}

})
}
}
