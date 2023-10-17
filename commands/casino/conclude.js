const Discord = require("discord.js")
const mysql = require("mysql")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args) => {
if(message.author.id !== "189387598928674816") return
var casinoChannels = ["]
if(message.author.id !== "" && message.guild.id !== "" && !casinoChannels.includes(message.channel.id)) return

side = args[0]
if(!side) return message.channel.send("Input side")
if(side !== "military" && side !== "terrorists" && side !== "draw") return message.channel.send("Side must be military, terrorists or draw")
if(side === "military") side = "Military"
if(side === "terrorists") side = "Terrorists"
if(side === "draw") side = "Draw"

total = 0
terrorists = 1
military = 1
draw = 1
recent = []
militaryx = 0
terroristsx = 0
drawx = 0

var con = mysql.createConnection({
    host: "138.201.82.201",
    port: "3306",
    user: "u1187_WMqOCVEF2g",
    password: "IgAL.eJg@eD=o3qO7Aa6C8Gf",
    database: "s1187_memeral"
    });
    
    con.connect(function(err) {
    if(err) console.log(err)
        con.query("select * FROM Warzones", function (err, result, fields) {
            for(i = result.length - 1; i > result.length - 21; i--){
                recent.push(result[i])
            }
            if(err) console.log(err)
        })
        con.end()
})

Casino.find({
}, (err, casino) => {
    if(err) console.log(err)
    for(i = 0; i < casino.length; i++){
        if(casino[i].bets){
            for(y = 0; y < casino[i].bets.length; y++){
                if(casino[i].bets[y].active === true){
                    total += casino[i].bets[y].amount
                    if(casino[i].bets[y].side === "Terrorists") terrorists += casino[i].bets[y].amount
                    if(casino[i].bets[y].side === "Military") military += casino[i].bets[y].amount
                    if(casino[i].bets[y].side === "Draw") draw += casino[i].bets[y].amount
                }
            }
        }
    }
    if(recent.length){
        for(i = 0; i < recent.length; i++){
            console.log(recent[i].result)
            if(recent[i].result === "0-4"){
                if(i < 5){
                    militaryx = militaryx + 0.7
                    drawx = drawx + 0.7
                } else
                if(i < 10){
                    militaryx = militaryx + 0.5
                    drawx = drawx + 0.5
                } else
                if(i < 15){
                    militaryx = militaryx + 0.2
                    drawx = drawx + 0.2
                } else {
                    militaryx = militaryx + 0.1
                    drawx = drawx + 0.1
                }
            }
            if(recent[i].result === "1-3"){
                if(i < 5){
                    militaryx = militaryx + 0.5
                    drawx = drawx + 0.5
                } else
                if(i < 10){
                    militaryx = militaryx + 0.4
                    drawx = drawx + 0.4
                } else
                if(i < 15){
                    militaryx = militaryx + 0.3
                    drawx = drawx + 0.3
                } else {
                    militaryx = militaryx + 0.2
                    drawx = drawx + 0.2
                }
            }
            if(recent[i].result === "2-2"){
                if(i < 5){
                    militaryx = militaryx + 0.4
                    terroristsx = terroristsx + 0.4
                } else
                if(i < 10){
                    militaryx = militaryx + 0.3
                    terroristsx = terroristsx + 0.3 
                } else
                if(i < 15){
                    militaryx = militaryx + 0.2
                    terroristsx = terroristsx + 0.2
                } else {
                    militaryx = militaryx + 0.1
                    terroristsx = terroristsx + 0.1 
                }
            }
            if(recent[i].result === "3-1"){
                if(i < 5){
                    terroristsx = terroristsx + 0.5
                    drawx = drawx + 0.5
                } else
                if(i < 10){
                    terroristsx = terroristsx + 0.4
                    drawx = drawx + 0.4
                } else
                if(i < 15){
                    terroristsx = terroristsx + 0.3
                    drawx = drawx + 0.3
                } else {
                    terroristsx = terroristsx + 0.2
                    drawx = drawx + 0.2
                }
            }
            if(recent[i].result === "4-0"){
                if(i < 5){
                    terroristsx = terroristsx + 0.7
                    drawx = drawx + 0.7
                } else
                if(i < 10){
                    terroristsx = terroristsx + 0.5
                    drawx = drawx + 0.5
                } else
                if(i < 15){
                    terroristsx = terroristsx + 0.2
                    drawx = drawx + 0.2
                } else {
                    terroristsx = terroristsx + 0.1
                    drawx = drawx + 0.1
                }
            }
        }
    }
    console.log(militaryx.toFixed(2))
    console.log(terroristsx.toFixed(2))
    console.log(drawx.toFixed(2))
    //militarybets = (terrorists + draw) / military  * 0.9
    //terroristsbets = (military + draw) / terrorists * 0.9
    //drawbets = (military + terrorists) / draw * 0.9
    if(militaryx < 1.1) militaryx = 1.1
    if(terroristsx < 1.1) terroristsx = 1.1
    if(drawx < 1.1) drawx = 1.1
    if(side === "Military") winnerx = militaryx, winner = military
    if(side === "Terrorists") winnerx = terroristsx, winner = terrorists
    if(side === "Draw") winnerx = drawx, winner = draw

    transfer()
})

function transfer(){
    Casino.find({
    }, (err, casino) => {
        if(err) console.log(err)
        for(i = 0; i < casino.length; i++){
            if(casino[i].bets){
                for(y = 0; y < casino[i].bets.length; y++){
                    if(casino[i].bets[y].active === true){
                        if(side === casino[i].bets[y].side){
                            casino[i].balance = casino[i].balance + Math.round(casino[i].bets[y].amount * winnerx)
                        }
                        casino[i].bets[y].active = false
                        casino[i].markModified('bets')
                        casino[i].save().catch(err => console.log(err))
                    }
                }
            }
        }
        return message.channel.send(`Credits transferred. Winner ${side}. Factor ${winnerx}. Total ${total}. On winner ${winner}. Out ${Math.round(winner * winnerx)}.`)
    })
}

}

module.exports.help = {
    name: "conclude",
    description: "",
    availability: ""
}
