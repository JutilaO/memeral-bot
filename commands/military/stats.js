const {SlashCommandBuilder} = require("@discordjs/builders")
const Discord = require("discord.js")
const Military = require("../../models/military.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Look up any soldier's statistics")
        .addStringOption(option =>
             option.setName("name")
             .setDescription("Name of the soldier")
             .setRequired(true)),

    async execute(interaction){
        try {
        await interaction.deferReply()
        var embed = new Discord.MessageEmbed()
        .setTitle("Soldier statistics")
        .setColor(0x137515)
        .setThumbnail("https://i.imgur.com/p8iLBi6.png")
        .setTimestamp()
        
        const {google} = require('googleapis')
        
        const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
        authorize();
        
        function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
        oAuth2Client.setCredentials();
        callback(oAuth2Client);
        }
            
        
        function statistics(auth) {
        var soldier = false
        var aboveSgt = 0
        var rank = ""
        var footerText = ""
        var desc = ""
        var name = ""
        var private = ""
        var hours = 0
        var minutes = 0
        soldiername = interaction.options.getString("name").toLowerCase()
        ignore = ["Promotion time requirements:", "Today's date:", "Reservists", "Name:", "Boot Camp Students", "N/A", "Recruits", "Privates", "Private First Classes", "Specialists", "Corporals", "Sergeants", "Staff Sergeants", "Master Sergeants", "Warrant Officers", "Lieutenants", "Captains", "Major", "Lieutenant Colonel", "Colonel", "Brigadier General", "Major General", "Lieutenant General"]
        for(i in ignore)
        if(soldiername === ignore[i]){
          return interaction.editReply("You think you a smart one?")
        }
                                
        const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.values.get({
        spreadsheetId: '',
        range: '',
        }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
        rows.map((row) => {
        
        if(row[0] === "Boot Camp Students") rank = "Boot Camp Student", footerText = `Tie your shoes, ${rank}!`
        if(row[0] === "Recruits") rank = "Recruit", footerText = `Oi! Clean the toilets, ${rank}!`
        if(row[0] === "Privates") rank = "Private", footerText = `Hello, ${rank}!`
        if(row[0] === "Private First Classes") rank = "Private First Class", footerText = `Hosting some ATs are you, PFC?`
        if(row[0] === "Specialists") rank = "Specialist", footerText = `Specialized in annoying the Captain+`
        if(row[0] === "Lance Corporals") rank = "Lance Corporal", footerText = `Lolcorporal`
        if(row[0] === "Corporals") rank = "Corporal", footerText = `Unlocked a new chat, didn't you ${rank}`
        if(row[0] === "Sergeants") rank = "Sergeant", footerText = `AYE SARGE!`
        if(row[0] === "Staff Sergeants") rank = "Staff Sergeant", footerText = `Tired of mondays, are you ${rank}?`
        if(row[0] === "Master Sergeants") rank = "Master Sergeant", footerText = `So close, or are you?!`
        if(row[0] === "Warrant Officers") rank = "Warrant Officer", footerText = `A new chat full of ...?`
        if(row[0] === "Lieutenants") rank = "Lieutenant", footerText = `Oi ${rank}! Time to do some promotions!`
        if(row[0] === "Captains") rank = "Captain", footerText = `The Kindergarten teacher, aren't ya?`
        if(row[0] === "Major") rank = "Major", footerText = `Tired of the kids already ${rank}?`
        if(row[0] === "Lieutenant Colonel") rank = "Lieutenant Colonel", footerText = `It do be one hell of a job`
        if(row[0] === "Colonel") rank = "Colonel", footerText = `Been here for a while, no?`
        if(row[0] === "Brigadier General") rank = "Brigadier General", footerText = `Toy General`
        if(row[0] === "Major General") rank = "Major General", footerText = `The combination of Major and General`
        if(row[0] === "Lieutenant General") rank = "Lieutenant General", footerText = `Never thought of seeing you as LTG`
        
        if(rank === "Private" && rank !== "Private First Class" && row[0] !== undefined && private === "" && row[0] !== "Privates" && row[0] !== "Name:") private = row[0]
        if(private){
          if(row[0] === "General") rank = "General", footerText = `${rank}! Private ${private} burned his bed!`
        } else if(row[0] === "General") rank = "General", footerText = `${rank}! Your office is burning!`
        
        if(soldiername === "Ninja" || soldiername === "ninja"){
          embed.setImage("https://cdn.discordapp.com/attachments/700380625043823955496/7456734c.jpg")
        }
        if(row[0] === "Sergeants"){
          aboveSgt = 1
        }
        
        
        
        name = ""
        if(row[0] !== undefined) name = row[0].toLowerCase()
        if(name === soldiername){
        footer = footerText
        soldierRank = rank
        sgt = aboveSgt
        soldier = true
        soldierID = row[15]
        
        if(row[0] !== undefined && !ignore.includes(row[0]) && row[0] !== "" && isNaN(soldierID) === false && soldierID.length === 18){
          Military.findOne({
            userID: soldierID
          }, (err, military) => {
            if(err) console.log(err)
            if(!military) military = {}
            if(!military.playtimeMonthly) military.playtimeMonthly = []
            total = 0
            for(i = 0; i < military.playtimeMonthly.length; i++){
              total = total + military.playtimeMonthly[i]
            }
            total = total / military.playtimeMonthly.length
            hours = Math.floor(total / 60)
            minutes = total - (hours * 60)
        
            if(military.playtimeMonthly.length === -1){
              hours = 0
              minutes = 0
            }
            
            if(sgt === 1){
              timeInRank = "Months"
              desc = "Statistics of SGT+ might not be up to date!"
            } else {
              timeInRank = "Weeks"
              desc = "Statistics get updated once in a week."
            }
            
            text = `**Name:** ${row[0]} \n**Contract start:** ${row[1]} \n**${timeInRank} with rank:** ${row[2]} \n**Trainings joined/hosted:** ${row[5]} \n**ATs joined/hosted:** ${row[6]} \n**WZs joined/led:** ${row[7]}\n**Doomsday joined/led:** ${row[8]}\n**SC/AM:** ${row[9]}\n**Robberies:** ${row[10]}\n**CTA:** ${row[11]} \n**Average playtime:** ${hours} h ${minutes} min`
            embed.setDescription(desc)
            embed.addField("-----", `${text}`)
            soldier = true
            interaction.editReply({embeds: [embed]})

          })
        }
        }
        })
        
        if(soldier === false){
            interaction.editReply("Member not found")
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
