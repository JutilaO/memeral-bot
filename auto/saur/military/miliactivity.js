const Discord = require("discord.js")
const Military = require("../../../models/military.js");
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const mysql = require("mysql")
module.exports.run = async (bot, message) => {
console.log("ded")
var data = message.content.toLowerCase()
var rawData = message.content
var wzlogged = false
var atlogged = false
var confirm = {
    type: "",
    number: "",
    participants: []
}

authorize(, statistics);


function authorize(credentials, callback) {
const {client_secret, client_id, redirect_uris} = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
client_id, client_secret, redirect_uris[0]);
oAuth2Client.setCredentials({"access_token":"","refresh_token":"","scope":"https://www.googleapis.com/auth/spreadsheets.readonly","token_type":"Bearer","expiry_date":});
callback(oAuth2Client);
}
    

function statistics(auth) {

ignore = ["Promotion time requirements:", "Today's date:", "Reservists", "Name:", "Boot Camp Students", "N/A", "Recruits", "Privates", "Private First Classes", "Specialists", "Corporals", "Sergeants", "Staff Sergeants", "Master Sergeants", "Warrant Officers", "Lieutenants", "Captains", "Major", "Lieutenant Colonel", "Colonel", "Brigadier General", "Major General", "Lieutenant General"]
              
const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
spreadsheetId: ,
range: ,
}, (err, res) => {
if(err) return console.log('The API returned an error: ' + err);
const rows = res.data.values;
if(rows.length) {
rows.map((row) => {
    var soldierID = row[15]
    if(row[0] !== undefined && !ignore.includes(row[0]) && row[0] !== "" && isNaN(soldierID) === false && soldierID.length === 18){
        var name = row[0].toLowerCase()
        if(name && data.includes(name) || message.author.id === soldierID){
            Military.findOne({
                userID: soldierID
            }, (err, military) => {
                if(err) console.log(err)
                if(!military){
                    var military = new Military({
                    userID: soldierID
                })
                }
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
                var name = row[0].toLowerCase()
                var id = row[15]
                var formalname = row[0]

                if(message.channel.id === ""){
                    leaderStart = data.indexOf("leader")
                    leaderEnd = data.indexOf("date and time of the event")
                    leader = data.slice(leaderStart, leaderEnd)

                    jStart = data.indexOf("participants (start to end)")
                    jEnd = data.indexOf("participants (joined late/left early)")
                    j = data.slice(jStart, jEnd)

                    jlEnd = data.indexOf("screenshot of tab at the start")

                    jl = data.slice(jEnd, jlEnd)

                    confirm.type = `Warzone`
                    confirm.number = data.slice(0, leaderStart - 1)

                    if(leader.includes(name)){
                        military.miliWZL = military.miliWZL + 1
                        confirm.participants.push({name: formalname, type: "Warzone led"})
                    } else
                    if(j.includes(name)){
                        military.miliWZJ = military.miliWZJ + 1
                        confirm.participants.push({name: formalname, type: "Warzone joined"})
                    } else
                    if(jl.includes(name)){
                        military.miliWZJL = military.miliWZJL + 1
                        confirm.participants.push({name: formalname, type: "Warzone joined late/left early"})
                    }

                    numberStart = rawData.indexOf("Number:")
                    wznumber = rawData.slice(numberStart, leaderStart)
                    wznumber = wznumber.replace("Number:", "")
                    dateend = rawData.indexOf("Result")
                    wzdate = rawData.slice(leaderEnd, dateend)
                    wzdate = wzdate.replace("Date and time of the event:", "")
                    wzleader = rawData.slice(leaderStart, leaderEnd)
                    wzleader = wzleader.replace("Leader:", "")
                    wzresult = rawData.slice(dateend, jStart)
                    wzresult = wzresult.replace("Result:", "")

                    if(wzresult && wznumber && wzleader && wzdate && wzlogged === "disabled"){
                        wzlogged = true
                        var con = mysql.createConnection({
                            host: ,
                            port: ,
                            user: ,
                            password: ,
                            database: 
                            });
                            
                            con.connect(function(err) {
                            if(err) console.log(err)
                                var sql = `INSERT INTO Warzones (number, leader, date, result) VALUES ('${wznumber.trim()}', '${wzleader.trim()}', '${wzdate.trim()}', '${wzresult.trim()}')`
                                con.query(sql, function (err, result) {
                                    if(err) console.log(err)
                                })
                                con.end()
                            })
                    }
                }

                if(message.channel.id === ){
                    hostStart = data.indexOf("host")
                    hostEnd = data.indexOf("training type")
                    host = data.slice(hostStart, hostEnd)

                    joinedStart = data.indexOf("participants")
                    joinedEnd = data.indexOf("result")
                    joined = data.slice(joinedStart, joinedEnd)

                    confirm.type = `Training`
                    confirm.number = data.slice(0, hostStart - 1)

                    if(host.includes(name)){
                        military.miliTRH = military.miliTRH + 1
                        confirm.participants.push({name: formalname, type: "Training hosted"})
                    } else
                    if(joined.includes(name)){
                        military.miliTRJ = military.miliTRJ + 1
                        confirm.participants.push({name: formalname, type: "Training joined"})
                    }

                }
                if(message.channel.id === ){
                    hostStart = data.indexOf("host")
                    hostEnd = data.indexOf("participants")
                    host = data.slice(hostStart, hostEnd)

                    joinedEnd = data.indexOf("destination")
                    joined = data.slice(hostEnd, joinedEnd)

                    confirm.type = `Ammo Transport`
                    confirm.number = data.slice(0, hostStart - 1)

                    if(host.includes(name)){
                        military.miliATH = military.miliATH + 1
                        confirm.participants.push({name: formalname, type: "Ammo Transport hosted"})
                    } else
                    if(joined.includes(name)){
                        military.miliATJ = military.miliATJ + 1
                        confirm.participants.push({name: formalname, type: "Ammo Transport joined"})
                    }

                    host = rawData.slice(hostStart, hostEnd)
                    host = host.replace("Host:", "")
                    number = rawData.slice(0, hostStart)
                    number = number.replace("Number:", "")
                    number = number.replace("#", "")
                    destinationStart = rawData.indexOf("Destination:")
                    resultStart = rawData.indexOf("Result:")
                    resultEnd = rawData.indexOf("Extra information:")
                    destination = rawData.slice(destinationStart, resultStart)
                    destination = destination.replace("Destination:", "")
                    destination2 = ""
                    result = rawData.slice(resultStart, resultEnd)
                    result = result.replace("Result:", "")
                    if(number) number = parseInt(number)
                    if(destination) destination2 = destination.toLowerCase()
                    if(host) host = host.trim()
                    if(destination) destination = destination.trim()
                    if(destination2) destination2 = destination2.trim()
                    if(result){
                        result = result.trim()
                        result = result.toLowerCase()
                    }
                    if(result === "succeed" || result === "succeeded" || result === "success") result = "Succeeded"
                    if(result === "fail" || result === "failed") result = "Failed"
                    if(result !== "Succeeded" && result !== "Failed") result = "Unknown"
                    if(destination2 === "angel pine" || destination2 === "ap" || destination2 === "angelpine") destination = "Angel Pine"
                    if(destination2 === "docks") destination = "Docks"
                    if(destination2 === "santamaria beach") destination = "Santamaria beach"
                    if(host && number && destination && result && atlogged === "disabled"){
                        atlogged = true
                        var con = mysql.createConnection({
                            host: 
                            port: 
                            user: 
                            password: 
                            database: 
                        })

                        con.connect(function(err) {
                        if(err) console.log(err)
                            var sql = `INSERT INTO AmmoTransports (number, host, destination, result) VALUES ('${number}', '${host}', '${destination}', '${result}')`
                            con.query(sql, function (err, result) {
                                if(err) console.log(err)
                            })
                            con.end()
                        })
                    }

                }
                if(message.channel.id === ""){
                    leaderStart = data.indexOf("leader")
                    leaderEnd = data.indexOf("date and time of the event")
                    leader = data.slice(leaderStart, leaderEnd)

                    joinedStart = data.indexOf("participants (start to end)")
                    joinedEnd = data.indexOf("participants (joined late/left early)")
                    joined = data.slice(joinedStart, joinedEnd)

                    jlEnd = data.indexOf("screenshot of tab at the start")
                    jl = data.slice(joinedStart, jlEnd)

                    confirm.type = `Doomsday`
                    confirm.number = data.slice(0, leaderStart - 1)

                    if(leader.includes(name)){
                        military.miliDDL = military.miliDDL + 1
                        confirm.participants.push({name: formalname, type: "Doomsday led"})
                    } else
                    if(joined.includes(name)){
                        military.miliDDJ = military.miliDDJ + 1
                        confirm.participants.push({name: formalname, type: "Doomsday joined"})
                    } else
                    if(jl.includes(name)){
                        military.miliDDJL = military.miliDDJL + 1
                        confirm.participants.push({name: formalname, type: "Doomsday joined late/left early"})
                    }
                }
                if(message.channel.id === ""){
                    driverStart = data.indexOf("driver")
                    confirm.type = `Securicar`
                    confirm.number = data.slice(0, driverStart - 1)

                    if(data.includes(name)){
                        military.miliSCJ = military.miliSCJ + 1
                        confirm.participants.push({name: formalname, type: "Securicar joined"})
                    } else if(message.author.id === id){
                        military.miliSCJ = military.miliSCJ + 1
                        confirm.participants.push({name: message.author.username, type: "Securicar joined"})
                    }
                }
                if(message.channel.id === ""){
                    pilotStart = data.indexOf("pilot")
                    confirm.type = `Andromada Mission`
                    confirm.number = data.slice(0, pilotStart - 1)

                    if(data.includes(name)){
                        military.miliAMJ = military.miliAMJ + 1
                        confirm.participants.push({name: formalname, type: "Andromada Mission joined"})
                    } else if(message.author.id === id){
                        military.miliAMJ = military.miliAMJ + 1
                        confirm.participants.push({name: message.author.username, type: "Andromada Mission joined"})
                    }
                }
                if(message.channel.id === ""){
                    start = data.indexOf("location")
                    end = data.indexOf("participants")
                    activity = data.slice(start, end)
                    
                    if(activity.includes("bank") || activity.includes("br")){
                        confirm.type = `Bank Robbery`
                        confirm.number = data.slice(0, start - 1)
                        if(data.includes(name)){
                            military.miliBR = military.miliBR + 1
                            confirm.participants.push({name: formalname, type: "Bank Robbery joined"})
                        } else if(message.author.id === id){
                            military.miliBR = military.miliBR + 1
                            confirm.participants.push({name: message.author.username, type: "Bank Robbery joined"})
                        }
                        
                    } else
                    if(activity.includes("casino") || activity.includes("cr")){
                        confirm.type = `Casino Robbery`
                        confirm.number = data.slice(0, start - 1)
                        if(data.includes(name)){
                            military.miliCR = military.miliCR + 1
                            confirm.participants.push({name: formalname, type: "Casino Robbery joined"})
                        } else if(message.author.id === id){
                            military.miliCR = military.miliCR + 1
                            confirm.participants.push({name: message.author.username, type: "Casino Robbery joined"})
                        }
                    }
                }
                if(message.channel.id === ""){
                    start = data.indexOf("activity type") + 11
                    end = data.indexOf("participants")
                    activity = data.slice(start, end)
                    if(activity.includes("am") || activity.includes("assault mission")){
                        confirm.type = `CT Assault Mission`
                        confirm.number = data.slice(0, start - 1)
                        if(data.includes(name)){
                            military.miliCTASM = military.miliCTASM + 1
                            confirm.participants.push({name: formalname, type: "CT Assault Mission joined"})
                        } else if(message.author.id === id){
                            military.miliCTASM = military.miliCTASM + 1
                            confirm.participants.push({name: formalname, type: "CT Assault Mission joined"})
                        }
                    } else 
                    if(activity.includes("andro") || activity.includes("andromada")){
                        confirm.type = `CT Andromada Mission`
                        confirm.number = data.slice(0, start - 1)
                        if(data.includes(name)){
                            military.miliCTAM = military.miliCTAM + 1
                            confirm.participants.push({name: formalname, type: "CT Andromada Mission joined"})
                        } else if(message.author.id === id){
                            military.miliCTAM = military.miliCTAM
                            confirm.participants.push({name: message.author.username, type: "CT Andromada Mission joined"})
                        }
                    }
                }
                military.save().catch(err => console.log(err))
                data = data.replace(name, "")
            })
        }
    } 
})

setTimeout(() => {
    msg = `${confirm.type} - ${confirm.number}- posted by ${message.author.username}\n`
    for(i = 0; i < confirm.participants.length; i++){
        msg = msg + `${confirm.participants[i].name} - ${confirm.participants[i].type}\n`
        if(i === confirm.participants.length - 1){
            bot.guilds.cache.get("").channels.cache.get("").send("```" + msg + "```")
        }
    }
}, 5000);
    
} else {
    console.log('No data found.')
}

})
}
}
