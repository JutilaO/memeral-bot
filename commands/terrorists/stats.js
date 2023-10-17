const Discord = require("discord.js")
const Terrorists = require("../../models/terrorists.js");
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
module.exports.run = async (bot, message, args) => {


var name = args[0]
if(args[0]) args[0].toLowerCase()
if(!args[0]) return message.channel.send("Give me a name and I give you information")

authorize(s);

function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials(});
callback(oAuth2Client);
}
    

function statistics(auth) {

var ignore = ["SAUR RPG: Terrorists' member list", "Today's date:", "Anarchists", "Rioters", "Martials", "Slayers", "Gunslingers", "Deadshots", "Mercenaries", "Champions", "Dominators", "Notoriouses", "Instructors", "Sergeants", "Supervisors", "Masterminds", "Captains", "Dukes", "Warlords", "Warchiefs"]
var found = false
              
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
        lower = row[0].toLowerCase()
        lowername = name.toLowerCase()
        if(lower === lowername){
        found = true
        Terrorists.findOne({
            name: row[0]
        }, (err, terrorists) => {
            if(err) console.log(err)
            if(!terrorists){
                var terrorists = new Terrorists({
                name: row[0]
            })
        }
        if(!terrorists.name) terrorists.name = "Al Qaida"
        member = terrorists.name
        if(!terrorists.activityevent) terrorists.activityevent = {first: 0, second: 0, third: 0, last: "-"}

        var contractstart = row[1]
        var weekswrank = row[2]
        var warzonep = row[4]
        var warzonel = row[5]
        var doomsdayp = row[6]
        var doomsdayl = row[7]
        var trainingp = row[8]
        var trainingl = row[9]
        var assaultmissionp = row[10]
        var assaultmissionl = row[11]
        var andromadap = row[12]
        var andromadal = row[13]
        var counterat = row[14]
        var countersc = row[15]
        var counterandro = row[16]
        var robberies = row[17]

        if(!contractstart) contractstart = "6.12.1917"
        if(!weekswrank) weekswrank = "9001"
        if(!warzonep) warzonep = "0"
        if(!warzonel) warzonel = "0"
        if(!doomsdayp) doomsdayp = "0"
        if(!doomsdayl) doomsdayl = "0"
        if(!trainingp) trainingp = "0"
        if(!trainingl) trainingl = "0"
        if(!assaultmissionp) assaultmissionp = "0"
        if(!assaultmissionl) assaultmissionl = "0"
        if(!andromadap) andromadap = "0"
        if(!andromadal) andromadal = "0"
        if(!counterat) counterat = "0"
        if(!countersc) countersc = "0"
        if(!counterandro) counterandro = "0"
        if(!robberies) robberies = "0"

        embedmessage = `**Name:** ${member}
        **Contract start:** ${contractstart}
        **Weeks with rank:** ${weekswrank}
        **Warzones:** J:${warzonep} L: ${warzonel}
        **Doomsdays:** J:${doomsdayp} L: ${doomsdayl}
        **Trainings:** J:${trainingp} L: ${trainingl}
        **Assault Mission:** J:${assaultmissionp} L: ${assaultmissionl}
        **Andromada:** J:${andromadap} L: ${andromadal}
        **Counter-Activities:**
           \xa0\xa0\xa0\xa0\xa0**Andromada:** ${counterandro}
           \xa0\xa0\xa0\xa0\xa0**Securicar:** ${countersc}
           \xa0\xa0\xa0\xa0\xa0**Ammo Transport:** ${counterat}
        **Robberies:** ${robberies}
        **Activity event:** T1: ${terrorists.activityevent.first} T2: ${terrorists.activityevent.second} T3: ${terrorists.activityevent.third}
        \xa0\xa0\xa0\xa0\xa0**Last won:** ${terrorists.activityevent.last}`

        var embed = new Discord.MessageEmbed()
        .setTitle("Terrorist member statistics")
        .setColor(0xFFB622)
        .setTimestamp()
        .setDescription("Statistics get updated once a week")
        .addField(`----`, embedmessage)
        return message.channel.send(embed)
    })
}
}
})
if(found === false) return message.channel.send("Member not found, please check your spelling")
    
} else {
    console.log('No data found.')
}
})
}

}

module.exports.help = {
    name: "stats",
    description: "",
    availability: ""
}
