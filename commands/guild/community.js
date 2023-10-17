const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const {REST} = require("@discordjs/rest")
const bot = require("../../index.js")
const {token} = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("community")
        .setDescription("Join/leave a community")
        .addStringOption(option => 
            option.setName("community")
            .setDescription("The community you would like to be linked to")
                .addChoice("SAUR", "saur")
            .setRequired(true)),
    async execute(interaction){
        try {
            var user_id = interaction.user.id
            var guild_id = interaction.member.guild.id
            
            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild){
                    guild = new guildSettings({
                        guildID: guild_id
                    })
                }
                if(!guild.moderators) guild.moderators = []
                if(guild.moderators.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR")){
                    community()
                } else return interaction.reply({content: "You must be the owner, an administrator or a moderator to use this command!", ephemeral: true})
            
            
            
            function community(){

            var community = interaction.options.getString("community")
            if(guild.community !== community){
                if(!guild.community) guild.community = ""
                guild.community = community
                guild.save().catch(err => console.log(err))
                interaction.reply("Community set to " + community)
                const BOTID = bot.user.id;
                const rest = new REST({
                  version: "9"
                }).setToken(token);
                
                (async () => {
                  try {
                
                   for(i in bot.commands){
                       if(bot.commands[i].category === "saur"){
                            await rest.put(Routes.applicationGuildCommands(BOTID, guild_id), {
                                body: bot.commands[i].commands
                            })
                       }
                   }
                
                  } catch (err) {
                    if(err) console.log(err)
                  }
                })();

            } else {
                guild.community = ""
                guild.save().catch(err => console.log(err))
                return interaction.reply(`This server is no longer linked to **${community}** community`)
            }
            }
            })
            
    } catch(err) {
        if(err) console.log(err)
}
},
category: "guild"
}