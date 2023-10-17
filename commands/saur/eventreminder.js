const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eventreminder")
        .setDescription("Set/remove warzone/doomsday reminder")
        .addStringOption(option =>
            option
                .setName("event")
                .setDescription("Event type")
                .addChoice("Warzone", "warzone")
                .addChoice("Doomsday", "doomsday")
                .setRequired(true))
        .addChannelOption(option =>
            option
                .setName("channel")
                .setDescription("Channel where the reminders are to be posted")
                .setRequired(true)),
    async execute(interaction){
        try {

           var user_id = interaction.user.id
           var guild_id = interaction.guild.id
           var event = interaction.options.getString("event")
           var channel = interaction.options.getChannel("channel")

           guildSettings.findOne({
            guildID: guild_id
        }, (err, guild) => {
            if(err) console.log(err)
            if(!guild){
                var guild = new guildSettings({
                    guildID: guild_id
                })
            }
            if(guild.community !== "saur") return interaction.reply({text: "Server is not part of the SAUR community", ephemeral: true})
            if(!guild.moderators) guild.moderators = []
            if(!guild.reminder) guild.reminder = []
            if(guild.moderators.includes(user_id) || user_id === interaction.guild.ownerID || interaction.member.permissions.has("ADMINISTRATOR") || interaction.member.permissions.has("MANAGE_CHANNELS")){
                reminder()
            } else return message.channel.send("You must be an Administrator to use this command!")
        
        
        
        function reminder(){

            var index = guild.reminder.map(function(item){return item.type}).indexOf(event)
            if(index === -1){
                guild.reminder.push({type: event, channel: channel.id})
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Event **${event}** reminder has been set to ${channel}`)
            } else {
                guild.reminder.splice(index, 1)
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Event **${event}** reminder has been removed`)
            }
        }
        })

    } catch(err) {
        if(err) console.log(err)
}
},
category: "saur"
}