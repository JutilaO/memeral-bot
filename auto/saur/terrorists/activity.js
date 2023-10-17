const Discord = require("discord.js")
const Terrorists = require("../../../models/terrorists.js");
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
module.exports.run = async (bot, message, args) => {


authorize();


function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials();
callback(oAuth2Client);
}

var report = message.content.toLowerCase()
var channel = message.channel.id
var channels = {
    counter: "",
    andromada: "",
    assaultmission: "",
    robberies: "",
    training: "",
    wz: "",
    dd: ""
}

function statistics(auth) {

var ignore = ["SAUR RPG: Terrorists' member list", "Today's date:", "Anarchists", "Rioters", "Martials", "Slayers", "Gunslingers", "Deadshots", "Mercenaries", "Champions", "Dominators", "Notoriouses", "Instructors", "Sergeants", "Supervisors", "Masterminds", "Captains", "Dukes", "Warlords", "Warchiefs"]
              
const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
spreadsheetId: '',
range: '',
}, (err, res) => {
if(err) return console.log('The API returned an error: ' + err);
const rows = res.data.values;
if(rows.length) {
rows.map((row) => {
    if(row[0] && row[0] !== undefined && !ignore.includes(row[0])){
        Terrorists.findOne({
            name: row[0]
        }, (err, terrorists) => {
            if(err) console.log(err)
            if(!terrorists){
                var terrorists = new Terrorists({
                name: row[0]
            })
        }
        var name = row[0].toLowerCase()
        
        if(channel === channels.counter && report.includes(name)){
            start = report.indexOf("activity type")
            end = report.indexOf("activity no")
            line = report.slice(start, end)
            if(line) line = line.toLowerCase()
            if(line.includes("sc") || line.includes("secur")){
                if(!terrorists.sc) terrorists.sc = 0
                terrorists.sc += 1
                terrorists.save().catch(err => console.log(err))
            }
            if(line.includes("andro")){
                if(!terrorists.andro) terrorists.andro = {counter: 0, joined: 0, hosted: 0}
                terrorists.andro.counter += 1
                terrorists.markModified('andro')
                terrorists.save().catch(err => console.log(err))
            }
            if(line.includes("at") || line.includes("ammo")){
                if(!terrorists.at) terrorists.at = 0
                terrorists.at += 1
                terrorists.save().catch(err => console.log(err))
            }
        }
        if(channel === channels.andromada && report.includes(name)){
            start = 0
            end = report.indexOf("activity no")
            line = report.slice(start, end)
            if(line) line = line.toLowerCase()
            if(line.includes(name)){
                if(!terrorists.andro) terrorists.andro = {counter: 0, joined: 0, hosted: 0}
                terrorists.andro.hosted += 1
                terrorists.markModified('andro')
                terrorists.save().catch(err => console.log(err))
            } else {
                if(!terrorists.andro) terrorists.andro = {counter: 0, joined: 0, hosted: 0}
                terrorists.andro.joined += 1
                terrorists.markModified('andro')
                terrorists.save().catch(err => console.log(err))
            }
        }
        if(channel === channels.assaultmission && report.includes(name)){
            start = 0
            end = report.indexOf("activity no")
            line = report.slice(start, end)
            if(line) line = line.toLowerCase()
            if(line.includes(name)){
                if(!terrorists.am) terrorists.am = {joined: 0, hosted: 0}
                terrorists.am.hosted += 1
                terrorists.markModified('am')
                terrorists.save().catch(err => console.log(err))
            } else {
                if(!terrorists.am) terrorists.am = {joined: 0, hosted: 0}
                terrorists.am.joined += 1
                terrorists.markModified('am')
                terrorists.save().catch(err => console.log(err))
            }
        }
        if(channel === channels.robberies && report.includes(name)){
            if(!terrorists.robberies) terrorists.robberies = 0
            terrorists.robberies += 1
            terrorists.save().catch(err => console.log(err))
        }
        if(channel === channels.training && report.includes(name)){
            start = 0
            end = report.indexOf("training no")
            line = report.slice(start, end)
            if(line) line = line.toLowerCase()
            if(line.includes(name)){
                if(!terrorists.trainings) terrorists.trainings = {joined: 0, hosted: 0}
                terrorists.trainings.hosted += 1
                terrorists.markModified('trainings')
                terrorists.save().catch(err => console.log(err))
            } else {
                if(!terrorists.trainings) terrorists.trainings = {joined: 0, hosted: 0}
                terrorists.trainings.joined += 1
                terrorists.markModified('trainings')
                terrorists.save().catch(err => console.log(err))
            }
        }
        if(channel === channels.wz && report.includes(name)){
            start = report.indexOf("warzone leader")
            end = report.indexOf("participants")
            line = report.slice(start, end)
            if(line) line = line.toLowerCase()
            if(line.includes(name)){
                if(!terrorists.wz) terrorists.wz = {joined: 0, hosted: 0}
                terrorists.wz.hosted += 1
                terrorists.markModified('wz')
                terrorists.save().catch(err => console.log(err))
            } else {
                if(!terrorists.wz) terrorists.wz = {joined: 0, hosted: 0}
                terrorists.wz.joined += 1
                terrorists.markModified('wz')
                terrorists.save().catch(err => console.log(err))
            }
        }
        if(channel === channels.dd && report.includes(name)){
            start = report.indexOf("doomsday leader")
            end = report.indexOf("participants")
            line = report.slice(start, end)
            if(line) line = line.toLowerCase()
            if(line.includes(name)){
                if(!terrorists.dd) terrorists.dd = {joined: 0, hosted: 0}
                terrorists.dd.hosted += 1
                terrorists.markModified('dd')
                terrorists.save().catch(err => console.log(err))
            } else {
                if(!terrorists.dd) terrorists.dd = {joined: 0, hosted: 0}
                terrorists.dd.joined += 1
                terrorists.markModified('dd')
                terrorists.save().catch(err => console.log(err))
            }
        }
    })
    }
})
    
    
} else {
    console.log('No data found.')
}

})
}
}
