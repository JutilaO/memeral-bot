const Discord = require("discord.js")
const schedule = require("node-schedule")
const {google} = require('googleapis')
const Terrorists = require("../../../models/terrorists.js");
module.exports.run = async (bot, message, args) => {

var rule = new schedule.RecurrenceRule()
rule.hour = 23
rule.minute = 0
rule.dayOfWeek = 0
//23 0 0
var j = schedule.scheduleJob(rule, async function(){
var rowNumber = 0
var sheetID = ""
var activityevent = []
var rank = ""
var guild = await bot.guilds.cache.get("")
var guildMembers = await guild.members.fetch()
var totalPointsArray = []

authorize();


function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials();
callback(oAuth2Client);
}

    

function sheet(auth) {

var ignore = ["SAUR RPG: Terrorists' member list", "Today's date:", "Reservists", "Anarchists", "Rioters", "Martials", "Slayers", "Gunslingers", "Deadshots", "Mercenaries", "Champions", "Dominators", "Notoriouses", "Instructors", "Sergeants", "Supervisors", "Masterminds", "Captains", "Dukes", "Warlords", "Warchiefs"]
const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
spreadsheetId: sheetID,
range: '',
}, (err, res) => {
if(err) return console.log('The API returned an error: ' + err);
const rows = res.data.values;
if(rows.length) {
rows.map((row) => {

rowNumber += 1

if(row[0] === "Reservists") rank = "Reservist"
if(row[0] === "Trainees") rank = "Trainee"
if(row[0] === "Anarchists") rank = "Anarchist"
if(row[0] === "Rioters") rank = "Rioter"
if(row[0] === "Martials") rank = "Martial"
if(row[0] === "Slayers") rank = "Slayer"
if(row[0] === "Gunslingers") rank = "Gunslinger"
if(row[0] === "Deadshots") rank = "Deadshot"
if(row[0] === "Mercenaries") rank = "Mercenary"
if(row[0] === "Champions") rank = "Champion"
if(row[0] === "Dominators") rank = "Dominator"
if(row[0] === "Notoriouses") rank = "Notorious"
if(row[0] === "Instructors") rank = "Instructor"
if(row[0] === "Sergeants") rank = "Sergeant"
if(row[0] === "Supervisors") rank = "Supervisor"
if(row[0] === "Masterminds") rank = "Mastermind"
if(row[0] === "Captains") rank = "Captain"
if(row[0] === "Dukes") rank = "Duke"
if(row[0] === "Warlords") rank = "Warlord"
if(row[0] === "Warchiefs") rank = "Warchief"

if(row[0] && row[0] !== undefined && !ignore.includes(row[0])){
    var data = {}
    data.rowNumber = rowNumber
    data.rank = rank
    var points = 0
    
    Terrorists.findOne({
        name: row[0]
    }, (err, terrorists) => {
        if(err) console.log(err)
        if(!terrorists){
            var terrorists = new Terrorists({
            name: row[0]
        })
    }
    if(!terrorists.at) terrorists.at = 0
    if(!terrorists.sc) terrorists.sc = 0
    if(!terrorists.andro) terrorists.andro = {counter: 0, joined: 0, hosted: 0}
    if(!terrorists.am) terrorists.am = {joined: 0, hosted: 0}
    if(!terrorists.robberies) terrorists.robberies = 0
    if(!terrorists.wz) terrorists.wz = {joined: 0, hosted: 0}
    if(!terrorists.dd) terrorists.dd = {joined: 0, hosted: 0}
    if(!terrorists.trainings) terrorists.trainings = {joined: 0, hosted: 0}
    if(!terrorists.id) terrorists.id = ""

    points += terrorists.at
    points += terrorists.sc
    points += terrorists.andro.counter
    points += terrorists.andro.joined
    points += terrorists.andro.hosted * 2
    points += terrorists.am.joined * 2
    points += terrorists.am.hosted * 3
    points += terrorists.robberies * 1
    points += terrorists.wz.joined * 2
    points += terrorists.wz.hosted * 3
    points += terrorists.dd.joined * 2
    points += terrorists.dd.hosted * 3
    points += terrorists.trainings.joined * 2
    points += terrorists.trainings.hosted * 3

    var name = row[0]
    var contractstart = row[1]
    var weekswrank = row[2]
    var activitystatus = row[3]
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
    var totalp = row[18]
    var totalr = row[19]

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
    if(!totalp) totalp = 0
    if(!totalr) totalr = ""

    data.wzp = parseInt(warzonep) + terrorists.wz.joined
    data.wzl = parseInt(warzonel) + terrorists.wz.hosted
    data.ddp = parseInt(doomsdayp) + terrorists.dd.joined
    data.ddl = parseInt(doomsdayl) + terrorists.dd.hosted
    data.trp = parseInt(trainingp) + terrorists.trainings.joined
    data.trl = parseInt(trainingl) + terrorists.trainings.hosted
    data.amp = parseInt(assaultmissionp) + terrorists.am.joined
    data.aml = parseInt(assaultmissionl) + terrorists.am.hosted
    data.androp = parseInt(andromadap) + terrorists.andro.joined
    data.androl = parseInt(andromadal) + terrorists.andro.hosted
    data.androc = parseInt(counterandro) + terrorists.andro.counter
    data.at = parseInt(counterat) + terrorists.at
    data.sc = parseInt(countersc) + terrorists.sc
    data.crbr = parseInt(robberies) + terrorists.robberies
    data.name = name
    data.points = points

    totalp += data.points
    data.totalpoints = totalp
    activityevent.push({name: data.name, points: Math.floor(data.points)})

    rating = ""
    ratingletter = ""
    if(points < 25) rating = "Inactive", ratingletter = "N"
    if(points >= 25) rating = "Semi-Active", ratingletter = "S"
    if(points >= 60) rating = "Active", ratingletter = "A"
    if(points >= 100) rating = "Nolifer", ratingletter = "B"
    data.rating = rating
    data.ratingletter = ratingletter
    data.totalrating = ratingletter + totalr
    data.activitystatus = rating

    rankreq = {}
    if(data.rank === "Trainee") rankreq = {active: 1, semi: 2}
    if(data.rank === "Anarchist") rankreq = {active: 3, semi: 4}
    if(data.rank === "Rioter") rankreq = {active: 4, semi: 5}
    if(data.rank === "Martial") rankreq = {active: 4, semi: 5}
    if(data.rank === "Slayer") rankreq = {active: 4, semi: 5}
    if(data.rank === "Gunslinger") rankreq = {active: 4, semi: 5}
    if(data.rank === "Deadshot") rankreq = {active: 5, semi: 6}
    if(data.rank === "Mercenary") rankreq = {active: 5, semi: 6}
    if(data.rank === "Champion") rankreq = {active: 5, semi: 6}
    if(data.rank === "Dominator") rankreq = {active: 6, semi: 7}
    if(rankreq && data.name === "Vindiesel"){
        activeweeks = 0
        semiweeks = 0
        totalratingArray = data.totalrating.split("")
        for(i in totalratingArray){
            if(totalratingArray[i] === "A" || totalratingArray[i] === "B"){
                activeweeks += 1
            }
            if(totalratingArray[i] === "S"){
                semiweeks += 1
            }
        }
        if(activeweeks >= rankreq.active) data.promote = true
        if(semiweeks >= rankreq.semi) data.promote = true
    }
    if(data.promote === true){
        totalPointsArray.push(`${data.name} with ${data.points} points is ready to be promoted!`)
    } else {
        totalPointsArray.push(`${data.name} with ${data.points} points`)
    }

    if(terrorists.id){
        guilduser = guild.members.cache.get(terrorists.id)
        if(guilduser){
            pointvar = ""
            if(points <= 0) pointvar = "Where have you been?"
            if(points >= 1) pointvar = "I am not sure what to say."
            if(points >= 10) pointvar = "That's something, but not sure if it's enough."
            if(points >= 15) pointvar = "Looks like you have been trying but well.."
            if(points >= 25) pointvar = "The cops must be confused after that one."
            if(points >= 30) pointvar = "Turns out you are better than Rexolen."
            if(points >= 40) pointvar = "I would ask for a promotion if I were you."
            if(points >= 50) pointvar = "Death to the infidels you say? I already informed the FBI."
            if(points >= 75) pointvar = "You have been busy, you sure your mom approves?"
            if(points >= 100) pointvar = "They say chaos is a ladder, perhaps it will help you to claim up to the next rank."
            if(!rank) rank = "Terrorist"

wpr = `**Greetings ${data.rank} ${data.name}!**
${pointvar} 
During the last week you participated in:
    Warzones: J:${terrorists.wz.joined} L: ${terrorists.wz.hosted}
    Doomsdays: J:${terrorists.dd.joined} L: ${terrorists.dd.hosted}
    Trainings: J:${terrorists.trainings.joined} L: ${terrorists.trainings.hosted}
    Assault Mission: J:${terrorists.am.joined} L: ${terrorists.am.hosted}
    Andromada: J:${terrorists.andro.joined} L: ${terrorists.andro.hosted}
    Counter-Activities:
        \xa0\xa0\xa0\xa0\xa0Andromada: ${terrorists.andro.counter}
        \xa0\xa0\xa0\xa0\xa0Securicar: ${terrorists.sc}
        \xa0\xa0\xa0\xa0\xa0Ammo Transport: ${terrorists.at}
    Robberies: ${terrorists.robberies}
Your weekly rating is **${rating}!**`

            guilduser.send(wpr)
        }
    }
    postData(data)
    terrorists.at = 0
    terrorists.sc = 0
    terrorists.andro = {counter: 0, joined: 0, hosted: 0}
    terrorists.am = {joined: 0, hosted: 0}
    terrorists.robberies = 0
    terrorists.wz = {joined: 0, hosted: 0}
    terrorists.dd = {joined: 0, hosted: 0}
    terrorists.trainings = {joined: 0, hosted: 0}
    terrorists.markModified('andro')
    terrorists.markModified('am')
    terrorists.markModified('wz')
    terrorists.markModified('dd')
    terrorists.markModified('trainings')
    terrorists.save().catch(err => console.log(err))

})
}

})

setTimeout(() => {
    var start = new Date() - (1000 * 60 * 60 * 24 * 7)
    var startString = new Date(start).toString().split(" ")
    var startDate = `${startString[1]} ${startString[2]} ${startString[3]} ${startString[4]}`
    var end = new Date()
    var endString = new Date(end).toString().split(" ")
    var endDate = `${endString[1]} ${endString[2]} ${endString[3]} ${endString[4]}`

    if(activityevent.length){
    activityevent.sort(function (a, b) {
        return a.points - b.points;
    })
    activityevent.reverse()
    activityevent1pos = 0
    activityevent2pos = 0
    activityevent3pos = 0
    activityevent1array = []
    activityevent2array = []
    activityevent3array = []
    for(i = 0; i < activityevent.length; i++){
        if(activityevent[i].points !== activityevent[0].points && activityevent2pos === 0) activityevent2pos = i
        if(activityevent2pos !== 0 && activityevent[i].points !== activityevent[activityevent2pos].points && activityevent3pos === 0) activityevent3pos = i
    }
    activityevent1 = activityevent.filter(player => player.points === activityevent[activityevent1pos].points)
    activityevent2 = activityevent.filter(player => player.points === activityevent[activityevent2pos].points)
    activityevent3 = activityevent.filter(player => player.points === activityevent[activityevent3pos].points)
    for(i = 0; i < activityevent1.length; i++){
        activityevent1array.push(`${activityevent1[i].name}`)
        Terrorists.findOne({
            name: activityevent1[i].name
        }, (err, terrorists) => {
            if(err) console.log(err)
            if(terrorists){
               if(!terrorists.activityevent) terrorists.activityevent = {first: 0, second: 0, third: 0, last: ""}
               terrorists.activityevent.first += 1
               terrorists.activityevent.last = endDate
            }
            terrorists.markModified('activityevent')
            terrorists.save().catch(err => console.log(err))
        })
    }
    for(i = 0; i < activityevent2.length; i++){
        activityevent2array.push(`${activityevent2[i].name}`)
        Terrorists.findOne({
            name: activityevent2[i].name
        }, (err, terrorists) => {
            if(err) console.log(err)
            if(terrorists){
               if(!terrorists.activityevent) terrorists.activityevent = {first: 0, second: 0, third: 0, last: ""}
               terrorists.activityevent.second += 1
               terrorists.activityevent.last = endDate
            }
            terrorists.markModified('activityevent')
            terrorists.save().catch(err => console.log(err))
        })
    }
    for(i = 0; i < activityevent3.length; i++){
        activityevent3array.push(`${activityevent3[i].name}`)
        Terrorists.findOne({
            name: activityevent3[i].name
        }, (err, terrorists) => {
            if(err) console.log(err)
            if(terrorists){
               if(!terrorists.activityevent) terrorists.activityevent = {first: 0, second: 0, third: 0, last: ""}
               terrorists.activityevent.third += 1
               terrorists.activityevent.last = endDate
            }
            terrorists.markModified('activityevent')
            terrorists.save().catch(err => console.log(err))
        })
    }
    bot.guilds.cache.get("").channels.cache.get("").send(`Congratulations to the following players for winning this week's activity event!\n**Top 1 player(s)**\n${activityevent1array.join("\n")}\n**Top 2 player(s)**\n${activityevent2array.join("\n")}\n**Top 3 player(s)**\n${activityevent3array.join("\n")}`)
    }
    bot.guilds.cache.get("").channels.cache.get("").send(`${startDate} - ${endDate}\n${totalPointsArray.join("\n")}`)
}, 30000)

} else {
    console.log('No data found.')
}
})

function postData(data){
    var values = [
        [
            data.name,
            data.contractstart,
            data.weekswrank,
            data.activitystatus,
            data.wzp,
            data.wzl,
            data.ddp,
            data.ddl,
            data.trainingp,
            data.trainingl,
            data.amp,
            data.aml,
            data.androp,
            data.androl,
            data.at,
            data.sc,
            data.androc,
            data.crbr,
            data.points,
            data.totalrating,
        ],
    ]

    var resource = {
        values,
    }
          
    sheets.spreadsheets.values.update({
    spreadsheetId: sheetID,
    range: `Sheet1!A${data.rowNumber}:T${data.rowNumber}`,
    resource,
    valueInputOption: "RAW"
    }, (err) => {
    if (err) return console.log('MILIACTIVITYPOST: The API returned an error: ' + err)
})
}

}

})
}
