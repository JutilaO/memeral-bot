const {SlashCommandBuilder} = require("@discordjs/builders")
const {google} = require('googleapis')


module.exports = {
    data: new SlashCommandBuilder()
        .setName("promote")
        .setDescription("View soldiers ready to be promoted"),
    async execute(interaction){
        try {

            if(!interaction.member.roles.cache.some(role => role.id === "") && !interaction.member.roles.cache.some(role => role.id === "") && !interaction.member.roles.cache.some(role => role.id === "1")){
                return interaction.reply("You don't have access to this command")
            }

          authorize(s);
          
          function authorize(credentials, callback) {
              const {client_secret, client_id, redirect_uris} = credentials.installed;
              const oAuth2Client = new google.auth.OAuth2(
                  client_id, client_secret, redirect_uris[0]);
              oAuth2Client.setCredentials();
              callback(oAuth2Client);
          }
              
          function statistics(auth) {

              var array = []
              const sheets = google.sheets({version: 'v4', auth});
              sheets.spreadsheets.values.get({
                  spreadsheetId: ,
                  range: ,
                  }, (err, res) => {
                    if (err) return console.log('The API returned an error: ' + err);
                    const rows = res.data.values;
                    if (rows.length) {
                      rows.map((row) => {
                          if(row[13] === "Yes") array.push(row[0])
                      });
                      if(!array.length) return interaction.reply(`Nobody is ready to be promoted`)
                      if(array.length === 0) return interaction.reply(`Following soldiers are ready to be promoted:\n${array}`)
                      if(array.length >= 1) return interaction.reply(`Following soldiers are ready to be promoted:\n${array.join("\n")}`)
              } else {
                console.log('No data found.');
              }
            })
            } 
                    
    } catch(err) {
        if(err) console.log(err)
}
},
category: "military"
}
