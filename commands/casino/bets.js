const Discord = require("discord.js")
const mysql = require("mysql")
const Casino = require("../../models/casino.js")
module.exports.run = async (bot, message, args) => {

var casinoChannels = []
if(message.guild.id !==  && !casinoChannels.includes(message.channel.id)) return

total = 0
terrorists = 1
military = 1
draw = 1

recent = []
militaryx = 0
terroristsx = 0
drawx = 0

var con = mysql.createConnection({
    host: ,
    port: ,
    user: ,
    password: ,
    database: 
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

//1000
//200
//400
//400


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
    //militaryx = (terrorists + draw) / military  * 0.9
    //terroristsx = (military + draw) / terrorists * 0.9
    //drawx = (military + terrorists) / draw * 0.9
    if(militaryx < 1.1) militaryx = 1.1
    if(terroristsx < 1.1) terroristsx = 1.1
    if(drawx < 1.1) drawx = 1.1
    var embed = new Discord.MessageEmbed()
    .setTitle(`Bets`)
    .setColor(0xff1493)
    .setDescription(`Military: ${militaryx.toFixed(2)}x\nTerrorists: ${terroristsx.toFixed(2)}x\nDraw: ${drawx.toFixed(2)}x`)
    message.channel.send(embed)
})
}

module.exports.help = {
    name: "bets",
    description: "",
    availability: ""
}
