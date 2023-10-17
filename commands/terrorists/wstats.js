const {SlashCommandBuilder} = require("@discordjs/builders")
const Terrorists = require("../../models/terrorists.js")
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wstats")
        .setDescription("Terrorist weekly statistics")
        .addUserOption(option =>
            option.setName("name")
            .setDescription("Member name")
            .setRequired(true)),
    async execute(interaction){
        try {

        var name = interaction.options.getString("name")

        authorize();

        function authorize(credentials, callback) {
            const {client_secret, client_id, redirect_uris} = credentials.installed;
            const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
            oAuth2Client.setCredentials({});
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
                            if(!terrorists.at) terrorists.at = 0
                            if(!terrorists.sc) terrorists.sc = 0
                            if(!terrorists.andro) terrorists.andro = {counter: 0, joined: 0, hosted: 0}
                            if(!terrorists.am) terrorists.am = {joined: 0, hosted: 0}
                            if(!terrorists.robberies) terrorists.robberies = 0
                            if(!terrorists.wz) terrorists.wz = {joined: 0, hosted: 0}
                            if(!terrorists.dd) terrorists.dd = {joined: 0, hosted: 0}
                            if(!terrorists.trainings) terrorists.trainings = {joined: 0, hosted: 0}

                            embedmessage = `**Name:** ${member}
                            **Warzone:** H:${terrorists.wz.hosted} J:${terrorists.wz.joined}
                            **Doomsday:** H:${terrorists.dd.hosted} J:${terrorists.dd.joined}
                            **Trainings:** H:${terrorists.trainings.hosted} J:${terrorists.trainings.joined}
                            **Assault Mission:** H:${terrorists.am.hosted} J:${terrorists.am.joined}
                            **Andromada:** C:${terrorists.andro.counter} H:${terrorists.andro.hosted} J:${terrorists.andro.joined}
                            **Robberies:** ${terrorists.robberies}
                            **Ammo Transport:** ${terrorists.at}
                            **Securicar:** ${terrorists.sc}`

                            var embed = new Discord.MessageEmbed()
                            .setTitle("Terrorist weekly statistics")
                            .setColor(0xFFB622)
                            .setTimestamp()
                            .setDescription("Weekly statistics reset every sunday")
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

    } catch(err) {
        if(err) console.log(err)
}
},
category: "saur"
}
