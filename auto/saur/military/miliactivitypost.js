const Discord = require("discord.js")
const schedule = require("node-schedule")
const {google} = require('googleapis')
const Military = require("../../../models/military.js")
const Evaluations = require("../../../models/evaluations.js")
module.exports.run = async (bot, message, args) => {

var rule = new schedule.RecurrenceRule()
rule.hour = 13
rule.minute = 20
rule.dayOfWeek = 1
//101
var j = schedule.scheduleJob(rule, async function(){

var rowNumber = 0
var sheetID = ""
var points = ""
var activityevent = []
var users = []
var rank = ""
var rankArray = []
var date = new Date().toString().split(" ")
var day = `${date[1]} ${date[2]} ${date[3]} ${date[4]}`
var guild = await bot.guilds.cache.get()
var guildMembers = await guild.members.fetch()

authorize();

function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials();
callback(oAuth2Client);
}
    

function sheet(auth) {

var ignore = ["Notes:", "Discord ID:"]

const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
spreadsheetId: sheetID,
range: ,
}, (err, res) => {
if(err) return console.log('The API returned an error: ' + err);
const rows = res.data.values;
if(rows.length) {
rows.map((row) => {
    rowNumber += 1
    var soldierID = row[15]

    if(row[0] === "Boot Camp Students") rank = "Boot Camp Student"
    if(row[0] === "Recruits") rank = "Recruit"
    if(row[0] === "Privates") rank = "Private"
    if(row[0] === "Private First Classes") rank = "Private First Class"
    if(row[0] === "Specialists") rank = "Specialist"
    if(row[0] === "Lance Corporals") rank = "Lance Corporal"
    if(row[0] === "Corporals") rank = "Corporal"
    if(row[0] === "Sergeants") rank = "Sergeant"
    if(row[0] === "Staff Sergeants") rank = "Staff Sergeant"
    if(row[0] === "Master Sergeants") rank = "Master Sergeant"
    if(row[0] === "Warrant Officers") rank = "Warrant Officer"
    if(row[0] === "Lieutenants") rank = "Lieutenant"
    if(row[0] === "Captains") rank = "Captain"
    if(row[0] === "Major") rank = "Major"
    if(row[0] === "Lieutenant Colonel") rank = "Lieutenant Colonel"
    if(row[0] === "Colonel") rank = "Colonel"
    if(row[0] === "Brigadier General") rank = "Brigadier General"
    if(row[0] === "Major General") rank = "Major General"
    if(row[0] === "Lieutenant General") rank = "Lieutenant General"
    if(row[0] === "General") rank = "General"
    
    if(rank === "Boot Camp Student"){
        if(!rankArray[0]) rankArray[0] = {}
        if(!rankArray[0].soldiers) rankArray[0].soldiers = []
        if(!rankArray[0].rank) rankArray[0].rank = "Boot Camp Student"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[0].soldiers.push(soldierID)
    }
    if(rank === "Recruit"){
        if(!rankArray[1]) rankArray[1] = {}
        if(!rankArray[1].soldiers) rankArray[1].soldiers = []
        if(!rankArray[1].rank) rankArray[1].rank = "Recruit"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[1].soldiers.push(soldierID)
    }
    if(rank === "Private"){
        if(!rankArray[2]) rankArray[2] = {}
        if(!rankArray[2].soldiers) rankArray[2].soldiers = []
        if(!rankArray[2].rank) rankArray[2].rank = "Private"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[2].soldiers.push(soldierID)
    }
    if(rank === "Private First Class"){
        if(!rankArray[3]) rankArray[3] = {}
        if(!rankArray[3].soldiers) rankArray[3].soldiers = []
        if(!rankArray[3].rank) rankArray[3].rank = "Private First Class"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[3].soldiers.push(soldierID)
    }
    if(rank === "Specialist"){
        if(!rankArray[4]) rankArray[4] = {}
        if(!rankArray[4].soldiers) rankArray[4].soldiers = []
        if(!rankArray[4].rank) rankArray[4].rank = "Specialist"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[4].soldiers.push(soldierID)
    }
    if(rank === "Lance Corporal"){
        if(!rankArray[5]) rankArray[5] = {}
        if(!rankArray[5].soldiers) rankArray[5].soldiers = []
        if(!rankArray[5].rank) rankArray[5].rank = "Lance Corporal"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[5].soldiers.push(soldierID)
    }
    if(rank === "Corporal"){
        if(!rankArray[6]) rankArray[6] = {}
        if(!rankArray[6].soldiers) rankArray[6].soldiers = []
        if(!rankArray[6].rank) rankArray[6].rank = "Corporal"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[6].soldiers.push(soldierID)
    }
    if(rank === "Sergeant"){
        if(!rankArray[7]) rankArray[7] = {}
        if(!rankArray[7].soldiers) rankArray[7].soldiers = []
        if(!rankArray[7].rank) rankArray[7].rank = "Sergeant"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[7].soldiers.push(soldierID)
    }
    if(rank === "Staff Sergeant"){
        if(!rankArray[8]) rankArray[8] = {}
        if(!rankArray[8].soldiers) rankArray[8].soldiers = []
        if(!rankArray[8].rank) rankArray[8].rank = "Staff Sergeant"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[8].soldiers.push(soldierID)
    }
    if(rank === "Master Sergeant"){
        if(!rankArray[9]) rankArray[9] = {}
        if(!rankArray[9].soldiers) rankArray[9].soldiers = []
        if(!rankArray[9].rank) rankArray[9].rank = "Master Sergeant"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[9].soldiers.push(soldierID)
    }
    if(rank === "Warrant Officer"){
        if(!rankArray[10]) rankArray[10] = {}
        if(!rankArray[10].soldiers) rankArray[10].soldiers = []
        if(!rankArray[10].rank) rankArray[10].rank = "Warrant Officer"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[10].soldiers.push(soldierID)
    }
    if(rank === "Lieutenant"){
        if(!rankArray[11]) rankArray[11] = {}
        if(!rankArray[11].soldiers) rankArray[11].soldiers = []
        if(!rankArray[11].rank) rankArray[11].rank = "Lieutenant"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[11].soldiers.push(soldierID)
    }
    if(rank === "Captain"){
        if(!rankArray[12]) rankArray[12] = {}
        if(!rankArray[12].soldiers) rankArray[12].soldiers = []
        if(!rankArray[12].rank) rankArray[12].rank = "Captain"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[12].soldiers.push(soldierID)
    }
    if(rank === "Major"){
        if(!rankArray[13]) rankArray[13] = {}
        if(!rankArray[13].soldiers) rankArray[13].soldiers = []
        if(!rankArray[13].rank) rankArray[13].rank = "Major"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[13].soldiers.push(soldierID)
    }
    if(rank === "Lieutenant Colonel"){
        if(!rankArray[14]) rankArray[14] = {}
        if(!rankArray[14].soldiers) rankArray[14].soldiers = []
        if(!rankArray[14].rank) rankArray[14].rank = "Lieutenant Colonel"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[14].soldiers.push(soldierID)
    }
    if(rank === "Colonel"){
        if(!rankArray[15]) rankArray[15] = {}
        if(!rankArray[15].soldiers) rankArray[15].soldiers = []
        if(!rankArray[15].rank) rankArray[15].rank = "Colonel"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[15].soldiers.push(soldierID)
    }
    if(rank === "Brigadier General"){
        if(!rankArray[16]) rankArray[16] = {}
        if(!rankArray[16].soldiers) rankArray[16].soldiers = []
        if(!rankArray[16].rank) rankArray[16].rank = "Brigadier General"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[16].soldiers.push(soldierID)
    }
    if(rank === "Major General"){
        if(!rankArray[17]) rankArray[17] = {}
        if(!rankArray[17].soldiers) rankArray[17].soldiers = []
        if(!rankArray[17].rank) rankArray[17].rank = "Major General"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[17].soldiers.push(soldierID)
    }
    if(rank === "Lieutenant General"){
        if(!rankArray[18]) rankArray[18] = {}
        if(!rankArray[18].soldiers) rankArray[18].soldiers = []
        if(!rankArray[18].rank) rankArray[18].rank = "Lieutenant General"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[18].soldiers.push(soldierID)
    }
    if(rank === "General"){
        if(!rankArray[19]) rankArray[19] = {}
        if(!rankArray[19].soldiers) rankArray[19].soldiers = []
        if(!rankArray[19].rank) rankArray[19].rank = "General"
        if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18) rankArray[19].soldiers.push(soldierID)
    }
    
    if(soldierID && soldierID !== undefined && !ignore.includes(soldierID) && isNaN(soldierID) === false && soldierID.length === 18){
        var data = {}
        data.rowNumber = rowNumber
        var soldiername = row[0]
        Military.findOne({
            userID: soldierID
        }, (err, military) => {
            if(err) console.log(err)
            if(military){
                if(!military.miliWZJ) military.miliWZJ = 0
                if(!military.miliWZJL) military.miliWZJL = 0
                if(!military.miliWZL) military.miliWZL = 0
                if(!military.miliDDJ) military.miliDDJ = 0
                if(!military.miliDDJL) military.miliDDJL = 0
                if(!military.miliDDL) military.miliDDL = 0
                if(!military.miliATJ) military.miliATJ = 0
                if(!military.miliATH) military.miliATH = 0
                if(!military.miliTRH) military.miliTRH = 0
                if(!military.miliTRJ) military.miliTRJ = 0
                if(!military.miliSCJ) military.miliSCJ = 0
                if(!military.miliAMJ) military.miliAMJ = 0
                if(!military.miliBR) military.miliBR = 0
                if(!military.miliCR) military.miliCR = 0
                if(!military.miliCTAM) military.miliCTAM = 0
                if(!military.miliCTASM) military.miliCTASM = 0
                if(!military.playtime) military.playtime = 0
                if(!military.playtimeMonthly) military.playtimeMonthly = []

                trainingStart = row[5].indexOf("J:") + 2
                trainingEnd = row[5].indexOf("H:")
                trainingsJoined = parseInt(row[5].slice(trainingStart, trainingEnd)) + military.miliTRJ
                trainingsHosted = parseInt(row[5].slice(trainingEnd + 2, row[5].length)) + military.miliTRH

                atStart = row[6].indexOf("J:") + 2
                atEnd = row[6].indexOf("H:")
                atJoined = parseInt(row[6].slice(atStart, atEnd)) + military.miliATJ
                atHosted = parseInt(row[6].slice(atEnd + 2, row[6].length)) + military.miliATH

                wzStart = row[7].indexOf("J:") + 2
                wzEnd = row[7].indexOf("L:")
                wzJoined = parseInt(row[7].slice(wzStart, wzEnd)) + military.miliWZJ + military.miliWZJL
                wzLed = parseInt(row[7].slice(wzEnd + 2, row[7].length)) + military.miliWZL

                ddStart = row[8].indexOf("J:") + 2
                ddEnd = row[8].indexOf("L:")
                ddJoined = parseInt(row[8].slice(ddStart, ddEnd)) + military.miliDDJ + military.miliDDJL
                ddLed = parseInt(row[8].slice(ddEnd + 2, row[8].length)) + military.miliDDL

                scStart = row[9].indexOf("SC:") + 3
                amStart = row[9].indexOf("AM:")
                scJoined = parseInt(row[9].slice(scStart, amStart)) + military.miliSCJ
                amJoined = parseInt(row[9].slice(amStart + 3, row[9].length)) + military.miliAMJ

                brStart = row[10].indexOf("BR:") + 3
                crStart = row[10].indexOf("CR:")
                brJoined = parseInt(row[10].slice(brStart, crStart)) + military.miliBR
                crJoined = parseInt(row[10].slice(crStart + 3, row[10].length)) + military.miliCR

                ctamStart = row[11].indexOf("AM:") + 3
                ctasmStart = row[11].indexOf("ASM:")
                ctamJoined = parseInt(row[11].slice(ctamStart, ctasmStart)) + military.miliCTAM
                ctasmJoined = parseInt(row[11].slice(ctasmStart + 4, row[11].length)) + military.miliCTASM

                var recommendations = parseFloat(row[12])

                data.trainings = `J:${trainingsJoined} H:${trainingsHosted}`
                data.ats = `J:${atJoined} H:${atHosted}`
                data.wzs = `J:${wzJoined} L:${wzLed}`
                data.dds = `J:${ddJoined} L:${ddLed}`
                data.ops = `SC:${scJoined} AM:${amJoined}`
                data.robberies = `BR:${brJoined} CR:${crJoined}`
                data.cta = `AM:${ctamJoined} ASM:${ctasmJoined}`
                data.status = row[3]

                military.playtimeMonthly.push(military.playtime)
                if(military.playtimeMonthly.length >= 3){
                    military.playtimeMonthly.shift()
                }



                wzJoined = military.miliWZJ + military.miliWZJL
                ddJoined = military.miliDDJ + military.miliDDJL
                totalJoined = wzJoined + military.miliWZL + ddJoined + military.miliDDL + military.miliATJ + military.miliATH + military.miliTRH + military.miliTRJ + military.miliCR + military.miliBR + military.miliCTASM + military.miliCTAM
                
                var totalPoints = 0
                totalPoints = totalPoints + military.miliWZJ * 4
                totalPoints = totalPoints + military.miliWZJL * 3
                totalPoints = totalPoints + military.miliWZL * 6
                totalPoints = totalPoints + military.miliDDJ * 2.5
                totalPoints = totalPoints + military.miliDDJL * 1.5
                totalPoints = totalPoints + military.miliDDL * 3
                totalPoints = totalPoints + military.miliATH * 2
                totalPoints = totalPoints + military.miliATJ * 1.5
                totalPoints = totalPoints + military.miliTRH * 4
                totalPoints = totalPoints + military.miliTRJ * 2.5
                totalPoints = totalPoints + military.miliSCJ
                totalPoints = totalPoints + military.miliAMJ
                totalPoints = totalPoints + military.miliBR
                totalPoints = totalPoints + military.miliCR
                totalPoints = totalPoints + military.miliCTASM
                totalPoints = totalPoints + military.miliCTAM
    
                if(totalJoined >= 4) totalPoints = totalPoints + ((military.playtime / 60) * 0.4)
                hours = Math.floor(military.playtime / 60)
                minutes = military.playtime - (hours * 60)
                points = points + `${row[0]} with ${Math.floor(totalPoints)} points\n`
                rating = ""

                if(totalPoints >= 100){rating = "Insanely positive", recommendations += 2} else
                if(totalPoints >= 51){rating = "Very positive", recommendations += 1.5} else
                if(totalPoints >= 21){rating = "Positive", recommendations += 1} else
                if(totalPoints >= 15){rating = "Semi positive", recommendations += 0.5} else
                if(totalPoints >= 0){rating = "Negative", recommendations -= 1}
                data.recommendations = recommendations

                dataObject = {
                    userID: military.userID,
                    name: soldiername,
                    activities: {
                        miliWZJ: military.miliWZJ,
                        miliWZJL: military.miliWZJL,
                        miliWZL: military.miliWZL,
                        miliDDJ: military.miliDDJ,
                        miliDDJL: military.miliDDJL,
                        miliDDL: military.miliDDL,
                        miliATJ: military.miliATJ,
                        miliATH: military.miliATH,
                        miliTRH: military.miliTRH,
                        miliTRJ: military.miliTRJ,
                        miliSCJ: military.miliSCJ,
                        miliAMJ: military.miliAMJ,
                        miliBR: military.miliBR,
                        miliCR: military.miliCR,
                        miliCTAM: military.miliCTAM,
                        miliCTASM: military.miliCTASM
                    },
                    playtime: military.playtime,
                    points: Math.floor(totalPoints),
                    enddate: day,
                    rating: rating
                }
                for(i in rankArray){
                    if(rankArray[i].soldiers.includes(dataObject.userID)) dataObject.rank = rankArray[i].rank
                }
                if(!dataObject.rank) dataObject.rank = "soldier"
                users.push(dataObject)
                military.miliWZJ = 0
                military.miliWZJL = 0
                military.miliWZL = 0
                military.miliDDJ = 0
                military.miliDDJL = 0
                military.miliDDL = 0
                military.miliATJ = 0
                military.miliATH = 0
                military.miliTRH = 0
                military.miliTRJ = 0
                military.miliSCJ = 0
                military.miliAMJ = 0
                military.miliBR = 0
                military.miliCR = 0
                military.miliCTAM = 0
                military.miliCTASM = 0
                military.playtime = 0
                if(!military.evals) military.evals = []
                military.evals.push(dataObject)
                military.save().catch(err => console.log(err))

                activityevent.push({name: row[0], points: Math.floor(totalPoints)})
                user = guild.members.cache.get(dataObject.userID)
                if(data.status && data.status.includes("LOA") && user){
                    user.send(`**Good evening ${dataObject.rank} ${dataObject.name}!**\nDuring the last week you have participated in:\nWarzones: J:${dataObject.activities.miliWZJ} L:${dataObject.activities.miliWZL} JL/LE: ${dataObject.activities.miliWZJL}\nDoomsdays: J:${dataObject.activities.miliDDJ} L:${dataObject.activities.miliDDL} JL/LE:${dataObject.activities.miliDDJL}\nAmmo Transports: J:${dataObject.activities.miliATJ} H:${dataObject.activities.miliATH}\nTrainings: J:${dataObject.activities.miliTRJ} H:${dataObject.activities.miliTRH}\nSC/AM: ${dataObject.activities.miliSCJ}/${dataObject.activities.miliAMJ}\nBR/CR: ${dataObject.activities.miliBR}/${dataObject.activities.miliCR}\nCTAM/CTASM: ${dataObject.activities.miliCTAM}/${dataObject.activities.miliCTASM}\nYour weekly activity rating is **${dataObject.rating}!**\nAccording to my knowledge you are on LOA, so your rank will not be affected.`)
                } else {
                    if(user){
                    user.send(`**Good evening ${dataObject.rank} ${dataObject.name}!**\nDuring the last week you have participated in:\nWarzones: J:${dataObject.activities.miliWZJ} L:${dataObject.activities.miliWZL} JL/LE: ${dataObject.activities.miliWZJL}\nDoomsdays: J:${dataObject.activities.miliDDJ} L:${dataObject.activities.miliDDL} JL/LE:${dataObject.activities.miliDDJL}\nAmmo Transports: J:${dataObject.activities.miliATJ} H:${dataObject.activities.miliATH}\nTrainings: J:${dataObject.activities.miliTRJ} H:${dataObject.activities.miliTRH}\nSC/AM: ${dataObject.activities.miliSCJ}/${dataObject.activities.miliAMJ}\nBR/CR: ${dataObject.activities.miliBR}/${dataObject.activities.miliCR}\nCTAM/CTASM: ${dataObject.activities.miliCTAM}/${dataObject.activities.miliCTASM}\nYour weekly activity rating is **${dataObject.rating}!**`)
                    }
                }
                postData(data)
            }
        })
    }
})

setTimeout(() => {
    var evalNumber = 1
    var start = new Date() - (1000 * 60 * 60 * 24 * 7)
    var startString = new Date(start).toString().split(" ")
    var startDate = `${startString[1]} ${startString[2]} ${startString[3]} ${startString[4]}`

    Evaluations.findOne({
        posted: false
    }, (err, evals) => {
        if(err) console.log(err)
            if(!evals){
                Evaluations.find({
                }, (err, allevals) => {
                    if(err) console.log(err)
                    if(allevals.length) evalNumber = allevals.length + 1 
                    var evals = new Evaluations({
                        number: evalNumber,
                        end: day,
                        start: startDate,
                        users: users,
                        posted: true,
                        lastBackup: "None"
                    })
                    evals.save().catch(err => console.log(err))
                    bot.guilds.cache.get("").channels.cache.get("").send("```" + `Week ${evalNumber} - (${evals.start} - ${evals.end})\n\n` + points + "```").then(message => {
                        message.react("✅")
                    })
                })
            } else {
                evals.posted = true
                evals.end = day
                evals.users = users
                evals.save().catch(err => console.log(err))
                bot.guilds.cache.get("").channels.cache.get("").send("```" + `Week ${evals.number} - (${evals.start} - ${evals.end})\n\n` + points + "```").then(message => {
                    message.react("✅")
                })
            }
    })
    
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
    }
    for(i = 0; i < activityevent2.length; i++){
        activityevent2array.push(`${activityevent2[i].name}`) 
    }
    for(i = 0; i < activityevent3.length; i++){
        activityevent3array.push(`${activityevent3[i].name}`) 
    }
    bot.guilds.cache.get("").channels.cache.get("").send(`Congratulations to the following players for winning this week's activity event!\n**Top 1 player(s)**\n${activityevent1array.join("\n")}\n**Top 2 player(s)**\n${activityevent2array.join("\n")}\n**Top 3 player(s)**\n${activityevent3array.join("\n")}`)
    }
}, 30000)

} else {
    console.log('No data found.')
}
})

function postData(data){
    if(data.status && data.status.includes("LOA")){
        var values = [
            [
                data.trainings,
                data.ats,
                data.wzs,
                data.dds,
                data.ops,
                data.robberies,
                data.cta
            ],
        ]
    } else {
        var values = [
            [
                data.trainings,
                data.ats,
                data.wzs,
                data.dds,
                data.ops,
                data.robberies,
                data.cta,
                data.recommendations
            ],
        ]
    }
    var resource = {
        values,
    }
          
    sheets.spreadsheets.values.update({
    spreadsheetId: sheetID,
    range: ``,
    resource,
    valueInputOption: "RAW"
    }, (err, res) => {
    if (err) return console.log('MILIACTIVITYPOST: The API returned an error: ' + err)
})
}

}

})
}
