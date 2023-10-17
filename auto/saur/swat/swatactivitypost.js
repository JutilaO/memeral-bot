const Discord = require("discord.js")
const schedule = require("node-schedule")
const {google} = require('googleapis')
const SWAT = require("../../../models/swat.js")
module.exports.run = async (bot, message, args) => {

var rule = new schedule.RecurrenceRule()
rule.hour = 0
rule.minute = 0
rule.dayOfWeek = 1
var sheetID = ""

var j = schedule.scheduleJob(rule, function(){
var top = []


authorize();


function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0])
oAuth2Client.setCredentials();
callback(oAuth2Client)
}

    

function sheet(auth) {

                
const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
spreadsheetId: sheetID,
range: '',
}, (err, res) => {
if(err) return console.log('The API returned an error: ' + err);
const rows = res.data.values;
if(rows.length) {
rows.map((row) => {
    if(row[0] && row[0] !== undefined){
        var data = {}
        data.rowNumber = rowNumber
        SWAT.findOne({
            name: row[0]
        }, (err, swat) => {
            if(err) console.log(err)
            if(!swat) return
            data.operations = swat.operations
            data.trainings = swat.trainings
            data.doomsdays = swat.doomsdays
            data.turfunit = swat.turfunit
            data.patrol = swat.patrol
            data.warzones = swat.warzones
            swat.operations = 0
            swat.trainings = 0
            swat.doomsdays = 0
            swat.turfunit = 0
            swat.patrol = 0
            swat.warzones = 0
            postData(data)
            swat.save().catch(err => console.log(err))
        })
    }
})

function postData(data){
        var values = [
            [
                data.operations,
                data.warzones,
                data.doomsdays,
                data.trainings,
                data.patrol,
                data.turfunit
            ],
        ]
    var resource = {
        values,
    }
          
    sheets.spreadsheets.values.update({
    spreadsheetId: sheetID,
    range: `Sheet1!K${data.rowNumber}:P${data.rowNumber}`,
    resource,
    valueInputOption: "RAW"
    }, (err, res) => {
    if (err) return console.log('SWATACTIVITYPOST: The API returned an error: ' + err)
})
}

function postCareerData(data){
    var values = [
        [
            data.operations,
            data.warzones,
            data.doomsdays,
            data.trainings,
            data.patrol,
            data.turfunit
        ],
    ]
var resource = {
    values,
}
      
sheets.spreadsheets.values.update({
spreadsheetId: sheetID,
range: `Sheet1!K${data.rowNumber}:P${data.rowNumber}`,
resource,
valueInputOption: "RAW"
}, (err, res) => {
if (err) return console.log('SWATACTIVITYPOST: The API returned an error: ' + err)
})
}


setTimeout(() => {
    if(top.length){
        top.sort(function (a, b) {
        return a.points - b.points;
    })
    top.reverse()
    top1pos = 0
    top2pos = 0
    top3pos = 0
    top1array = []
    top2array = []
    top3array = []
    for(i = 0; i < top.length; i++){
        if(top[i].points !== top[0].points && top2pos === 0) top2pos = i
        if(top2pos !== 0 && top[i].points !== top[top2pos].points && top3pos === 0) top3pos = i
    }
    top1 = top.filter(player => player.points === top[top1pos].points)
    top2 = top.filter(player => player.points === top[top2pos].points)
    top3 = top.filter(player => player.points === top[top3pos].points)
    for(i = 0; i < top1.length; i++){
        top1array.push(`${top1[i].name} with ${top1[i].points} points`) 
    }
    for(i = 0; i < top2.length; i++){
        top2array.push(`${top2[i].name} with ${top2[i].points} points`) 
    }
    for(i = 0; i < top3.length; i++){
        top3array.push(`${top3[i].name} with ${top3[i].points} points`) 
    }
    bot.guilds.cache.get("").channels.cache.get("").send(`**Top 1 player(s)**\n${top1array.join("\n")}\n**Top 2 player(s)**\n${top2array.join("\n")}\n**Top 3 player(s)**\n${top3array.join("\n")}`)
    }
}, 10000)

} else {
    console.log('No data found.')
}
})
}
})
}
