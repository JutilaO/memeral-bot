const {google} = require('googleapis')
const SWAT = require("../../../models/swat.js")
module.exports.run = async (bot, message, args) => {

var data = message.content.toLowerCase()

authorize();

function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0])
oAuth2Client.setCredentials();
callback(oAuth2Client)
}

var ignore = [" ", "name", "academy", "novice", "la student records", "probationary officer records", "officer records", "senior officer records", "lead officer records", "veteran officer records", "superintendent officer records", "corporal records", "executive team", "trial sergeant records", "sergeant records", "staff sergeant records", "first sergeant records", "headquarters", "rank", "honorables & special ranks", "advisor", "captain", "major", "colonel", "deputy commander", "commander"]

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
            if(row[0] && !ignore.includes(row[0].toLowerCase()) && row[0] !== undefined && data.includes(row[0].toLowerCase())){
                SWAT.findOne({
                    name: row[0]
                }, (err, swat) => {
                    if(err) console.log(err)
                    if(!swat){
                        var swat = new SWAT({
                            name: row[0],
                            operations: 0,
                            trainings: 0,
                            warzones: 0,
                            doomsdays: 0,
                            turfunit: 0,
                            patrol: 0
                        })
                    }
                    if(message.channel.id === ""){
                        swat.operations = swat.operations + 1
                    }
                    if(message.channel.id === ""){
                        swat.trainings = swat.trainings + 1
                    }
                    if(message.channel.id === ""){    
                        swat.doomsdays = swat.doomsdays + 1
                    }
                    if(message.channel.id === ""){
                        swat.turfunit = swat.turfunit + 1
                    }
                    if(message.channel.id === ""){
                        swat.patrol = swat.patrol + 1
                    }
                    if(message.channel.id === ""){
                        swat.warzones = swat.warzones + 1
                    }
                    swat.save().catch(err => console.log(err))
                })
            }
        })
    } else {
        console.log('No data found.')
    }
})
}
}
