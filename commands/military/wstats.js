const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Military = require("../../models/military.js")
const {google} = require('googleapis');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wstats")
        .setDescription("Look up any soldier's weekly statistics")
        .addStringOption(option =>
             option.setName("name")
             .setDescription("Name of the soldier")
             .setRequired(true)),

    async execute(interaction){
        try {
            await interaction.deferReply()


var name = interaction.options.getString("name").toLowerCase()
var soldierfound = 0


authorize();

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials();
    callback(oAuth2Client);
}
    

function statistics(auth) {

ignore = ["Promotion time requirements:", "Today's date:", "Reservists", "Name:", "Boot Camp Students", "N/A", "Recruits", "Privates", "Private First Classes", "Specialists", "Corporals", "Sergeants", "Staff Sergeants", "Master Sergeants", "Warrant Officers", "Lieutenants", "Captains", "Major", "Lieutenant Colonel", "Colonel", "Brigadier General", "Major General", "Lieutenant General"]
              
const sheets = google.sheets({version: 'v4', auth});
sheets.spreadsheets.values.get({
spreadsheetId: '',
range: '',
}, (err, res) => {
if(err) return console.log('The API returned an error: ' + err);
const rows = res.data.values;
if(rows.length) {
rows.map((row) => {
    var soldierID = row[15]
    if(row[0] !== undefined && !ignore.includes(row[0]) && row[0] !== "" && isNaN(soldierID) === false && soldierID.length === 18){
        var username = row[0].toLowerCase()
        name = name.toLowerCase()
        if(name === username){
            id = soldierID
            soldierfound = 1
            Military.findOne({
                userID: id
            }, (err, military) => {
                if(err) console.log(err)
                if(!military) return interaction.editReply("Member not found in the database")
                    
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
                if(!military.miliCR) military.miliCR = 0
                if(!military.miliBR) military.miliBR = 0
                if(!military.miliCTASM) military.miliCTASM = 0
                if(!military.miliCTAM) military.miliCTAM = 0
                if(!military.playtime) military.playtime = 0

                total = military.miliWZJ + military.miliWZJL + military.miliWZL + military.miliDDJ + military.miliDDJL + military.miliDDL + military.miliATJ + military.miliATH + military.miliTRH + military.miliTRJ + military.miliSCJ + military.miliAMJ + military.miliBR + military.miliCR + military.miliCTASM + military.miliCTAM
                hours = Math.floor(military.playtime / 60)
                minutes = military.playtime - (hours * 60)
                warzones = `**Warzones:** J:${military.miliWZJL + military.miliWZJ} L: ${military.miliWZL}\n`
                doomsdays = `**Doomsdays:** J:${military.miliDDJ + military.miliDDJL} L: ${military.miliDDL}\n`
                ats = `**Ammo Transports:** J: ${military.miliATJ} H: ${military.miliATH}\n`
                trainings = `**Trainings:** J: ${military.miliTRJ} H: ${military.miliTRH}\n`
                ops = `**SC/AM:** SC: ${military.miliSCJ} AM: ${military.miliAMJ}\n`
                playtime = `**Playtime:** ${hours} h ${minutes} min\n`
                robberies = `**Robberies:** BR: ${military.miliBR} CR: ${military.miliCR}\n`
                cta = `**CTA:** AM: ${military.miliCTAM} AsM: ${military.miliCTASM}\n`
                user = `**Name:** ${row[0]}\n`

                var footer = 0
                var embed = new Discord.MessageEmbed()
                .setTitle("Soldier weekly statistics")
                .setColor(0x137515)
                .setThumbnail("https://i.imgur.com/.png")
                .setTimestamp()
                .setDescription("Weekly statistics reset every monday night")
                .addField("----", user + warzones + doomsdays + ats + trainings + ops + robberies + cta + playtime)
                if((military.miliWZL + military.miliWZJ + military.miliWZJL) === 8) embed.setFooter({text:"Warzone veteran"}), footer = 1
                //if(military.playtime === 0) embed.setFooter({text:"Exceptional activity!"}), footer = 1
                //if(military.playtime / 60 > 24) embed.setFooter({text:"A day of saur in a week keeps a man dumb"}), footer = 1
                //if(military.playtime / 60 > 50) embed.setFooter({text:"Over 50 hours of autism"}), footer = 1
                if(military.miliATH > 10) embed.setFooter({text:"Trying to be JustSmile or what?"}), footer = 1
                if(total === 0) embed.setFooter({text:"Zero activities? Welcome to the HQ!"}), footer = 1
                if(military.miliSCJ > 20) embed.setFooter({text:`${military.miliSCJ} securicars? Take a break?`}), footer = 1
                var random = Math.floor (Math.random() * (21 - 1 + 1)) + 1
                if(footer === 4){
                switch(random){
                    case 1: embed.setFooter({text:"Randomly tagging Captain+ is hazardous"}); break
                    case 2: embed.setFooter({text:"Non-English in clanc/ac/mst? Suicidal."}); break
                    case 3: embed.setFooter({text:"Try !duck"}); break
                    case 4: embed.setFooter({text:"Activity > promotions"}); break
                    case 5: embed.setFooter({text:"Inactivity > demotions"}); break
                    case 6: embed.setFooter({text:"All fine until #court-martial pops up"}); break
                    case 7: embed.setFooter({text:"Enough bitch"}); break
                    case 8: embed.setFooter({text:"How about !azoz"}); break
                    case 9: embed.setFooter({text:"Maybe !cj?"}); break
                    case 10: embed.setFooter({text:"The legend of mthn06 lives in !mthn"}); break
                    case 11: embed.setFooter({text:"1 teemo 1 respect"}); break
                    case 12: embed.setFooter({text:"mart are you here?"}); break
                    case 13: embed.setFooter({text:"Go and run investigation"}); break
                    case 14: embed.setFooter({text:"Tag Aerion and say ':DDDDDDDDD'"}); break
                    case 15: embed.setFooter({text:"Have you heard about the table of friendship?"}); break
                    case 16: embed.setFooter({text:"A wise man once promoted a WO to CPT and then demoted him to LT"}); break
                    case 17: embed.setFooter({text:"There's a snip-"}); break
                    case 18: embed.setFooter({text:"Shut the fuck up for once"}); break
                    case 19: embed.setFooter({text:"You see this, you deposit all your money in hand to clan bank"}); break
                    case 20: embed.setFooter({text:"I was fucking bored when I wrote this"}); break
                    case 21: embed.setFooter({text: "Be very careful when tagging the Colonel"}); break
                }
            }
                return  interaction.editReply({embeds: [embed]})
            })
        }
    }

})
if(soldierfound === 0){
    return interaction.editReply("Soldier not found. Please check your spelling.")
}
    
} else {
    console.log('No data found.')
}
})
}
    } catch(err) {
        if(err) console.log(err)
}
},
category: "military"
}
