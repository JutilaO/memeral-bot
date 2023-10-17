const Discord = require("discord.js")
const schedule = require("node-schedule")
const guildSettings = require("../../models/guildSettings.js")
const Canvas = require('canvas')
module.exports.run = async (bot, member, status, memberGuild) => {
return
if(memberGuild){
    target = memberGuild
} else target = member.guild

if(target.id !== "") return

guildSettings.findOne({
    guildID: target.id
}, (err, guild) => {
    if(err) console.log(err)
    if(!guild) return
    if(!guild.announcements) return
    if(!guild.announcements.length) return
    if(!guild.announceChannel) return
    var channel = target.channels.cache.find(channel => channel.id === guild.announceChannel)
    var types = ["join", "leave", "kick", "ban"]
    for(i = 0; i < types.length; i++){
        if(status === types[i]){
            var searchIndex = guild.announcements.map(function(item){return item.type}).indexOf(types[i])
            if(searchIndex !== -1){
                var text = guild.announcements[searchIndex].text
                var message = text
                imagetest = text.replace(/ /g, '')
                if(imagetest === "image" && guild.announcements[searchIndex].type === "join"){
                    return image(channel)
                }
                if(text.includes("user")){
                    userStart = text.indexOf("user")
                    userEnd = userStart + 4
                    part1 = text.slice(0, userStart)
                    part2 = text.slice(userEnd, text.length)
                    if(memberGuild){
                        message = part1 + `${member.tag}` + part2
                    } else {
                        if(status === "join"){
                            message = part1 + `${member.user}` + part2
                        } else message = part1 + `${member.user.tag}` + part2
                    }
                }
                channel.send(message)
            }
        }
    }
})

async function image(channel){
    
    Canvas.registerFont('./utilities/welcomeImage/Orbitron.ttf', {family: ' '})
    const canvas = Canvas.createCanvas(2560, 1303)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage('./utilities/welcomeImage/background.png')
    const main = await Canvas.loadImage('./utilities/welcomeImage/main.png')
    var date = new Date().toString()
    var dateArray = date.split(" ")

    if(dateArray[1] === "Jan") dateArray[1] = "1"
    if(dateArray[1] === "Feb") dateArray[1] = "2"
    if(dateArray[1] === "Mar") dateArray[1] = "3"
    if(dateArray[1] === "Apr") dateArray[1] = "4"
    if(dateArray[1] === "May") dateArray[1] = "5"
    if(dateArray[1] === "Jun") dateArray[1] = "6"
    if(dateArray[1] === "Jul") dateArray[1] = "7"
    if(dateArray[1] === "Aug") dateArray[1] = "8"
    if(dateArray[1] === "Sep") dateArray[1] = "9"
    if(dateArray[1] === "Oct") dateArray[1] = "10"
    if(dateArray[1] === "Nov") dateArray[1] = "11"
    if(dateArray[1] === "Dec") dateArray[1] = "12"

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d')
        let fontSize = 100
        do {
            ctx.font = `${fontSize -= 10}px 'Orbitron'`
        } while (ctx.measureText(text).width > canvas.width - 300)
        return ctx.font
    }

    ctx.drawImage(main, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.font = `${45}px 'Orbitron'`
    ctx.fillStyle = '#0686CF'
    ctx.fillText(`${member.guild.name}`, 450, 312,canvas.width / 4, canvas.height / 12)

    ctx.font = `${38}px 'Orbitron'`
    ctx.fillStyle = '#0686CF'
    ctx.fillText(`${dateArray[2]}/${dateArray[1]}/${dateArray[3]}`, 53, 312,canvas.width / 4, canvas.height / 12)

    ctx.font = `${38}px 'Orbitron'`
    ctx.fillStyle = '#0686CF'
    ctx.fillText(dateArray[4], 1350, 312,canvas.width / 4, canvas.height / 12)

    ctx.font = applyText(canvas, 'Welcome to the server')
    ctx.fillStyle = '#0686CF'
    ctx.fillText('Welcome to the server', 600, 650,canvas.width / 2, canvas.height / 3)

    ctx.font = applyText(canvas, `${member.user.tag}`)
    ctx.fillStyle = "#ffffff"
    ctx.fillText(`${member.user.tag}`, 550, 550 ,canvas.width / 1.5, canvas.height / 2)

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }))
    ctx.drawImage(avatar, 125, 425, 350, 350)
    const border = await Canvas.loadImage('./utilities/welcomeImage/border.png')
    ctx.drawImage(border, 13, -98, canvas.width+250, canvas.height+250)

    var members = member.guild.memberCount
    ctx.font = `60px 'Orbitron'`
    if(members >= 1000 && members < 10000){
        members = `${members.toString().slice(0, 1)}K`
    }
    if(members >= 10000 && members < 100000){
        members = `${members.toString().slice(0, 2)}K`
    }
    if(members >= 100000 && members < 1000000){
        members = `${members.toString().slice(0, 3)}K`
    }
    if(members >= 1000000){
        members = `${members.toString().slice(0, 4)}K`
    }
    ctx.fillStyle = '#ffffff'
    ctx.rotate(315 * Math.PI / 180)
    ctx.fillText(`#${members}`, -300, 800, 350, 350)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
    
    channel.send(attachment)
}

}


  
