const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("announcement")
        .setDescription("Manage announcements (leave, join, ban, kick)")
        .addSubcommand(subcommand => 
            subcommand.setName("add")
            .setDescription("Add an announcement message (join, leave, kick, ban)")
                .addStringOption(option => 
                    option.setName("type")
                    .setDescription("Type of announcement message")
                        .addChoice("Join", "join")
                        .addChoice("Leave", "leave")
                        .addChoice("Kick", "kick")
                        .addChoice("Ban", "ban")
                    .setRequired(true))
                .addStringOption(option => 
                    option.setName("message")
                    .setDescription("Announcement message")
                    .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand.setName("remove")
            .setDescription("Remove an announcement message (join, leave, kick, ban)")
                .addStringOption(option => 
                    option.setName("type")
                    .setDescription("Type of announcement message")
                        .addChoice("Join", "join")
                        .addChoice("Leave", "leave")
                        .addChoice("Kick", "kick")
                        .addChoice("Ban", "ban")
                    .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand.setName("channel")
                .setDescription("Set announcement channel")
                .addChannelOption(option => 
                    option.setName("channel")
                    .setDescription("Announcement channel")
                    .setRequired(true)))
        .addSubcommand(subcommand => 
            subcommand.setName("view")
            .setDescription("View announcement messages"))
        .addSubcommand(subcommand => 
            subcommand.setName("help")
            .setDescription("Information about announcement messages")),
    async execute(interaction){
        try {
            var user_id = interaction.user.id
            var guild_id = interaction.member.guild.id
            
            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
            if(err) console.log(err)
            if(!guild){
                var guild = new guildSettings({
                    guildID: guild_id
                })
            }
            if(!guild.moderators) guild.moderators = []
            if(!guild.announcements) guild.announcements = []
            if(!guild.announceChannel) guild.announceChannel = ""
            if(guild.moderators.includes(user_id)){
                announceSet()
            } else {
                if(user_id !== interaction.guild.ownerID && !interaction.member.permissions.has("ADMINISTRATOR")){
                    return interaction.reply({content: "You must be the owner, an administrator or a moderator to use this command!", ephemeral: true})
                } else announceSet()
            }
            
            
            function announceSet(){
            
            var types = ["Join", "Leave", "Kick", "Ban"]
            var action = interaction.options.getSubcommand()
            
            var embed = new Discord.MessageEmbed()
            .setColor(0xff1493)
            .setTitle("Memeral announcements")
            
            if(action === "help"){
                embed.setDescription("You can create your own automatic announcements by following the little guide below.\n If you want to include the name of the user in the message, simply type **user** in your message where you want it to show. Remember to set up the announcement channel!")
                embed.addField("Types", "Join, leave, kick and ban")
                embed.addField("**Creating announcements**", `>announcement [type] [your-message-here]`)
                embed.addField("**Removing announcements**", `>announcement remove [type]`)
                embed.addField("**Setting announcement channel**", ">announcement channel [#channel-name]")
                embed.addField("**View announcement messages**", ">announcement view")
                embed.addField("**Image welcome message**", `>announcement join image`)
                embed.addField("**Example**", ">announcement join Welcome to Memeral's community Discord server, user!")
                embed.setImage("https://cdn.discordapp.com/attachments/692403151789359204/800402452007747594/welcome-image.png")
                return interaction.reply({embeds: [embed]})
            }
            if(action === "view"){
                for(i = 0; i < types.length; i++){
                    var searchIndex = guild.announcements.map(function(item){return item.type}).indexOf(types[i].toLowerCase())
                    if(searchIndex === -1){
                        embed.addField(`${types[i]} message`, "None")
                    } else embed.addField(`${types[i]} message`, guild.announcements[searchIndex].text)
                }
                embed.setDescription(`Announcement messages of this server are listed below.`)
                return interaction.reply({embeds: [embed]})
            }
            
            if(action === "channel"){
                var channel = interaction.options.getChannel("channel")
                if(!channel) return interaction.reply("Channel not found")
                guild.announceChannel = channel.id
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Added <#${channel.id}> as announcement channel`)
            }
            
            if(action === "remove"){
                var type = interaction.options.getString("type")
                var searchIndex = guild.announcements.map(function(item){return item.type}).indexOf(type)
                if(searchIndex === -1) return interaction.reply(`This server doesn't have **${type}** announcement.`)
                guild.announcements.splice(searchIndex, 1)
                guild.save().catch(err => console.log(err))
                return interaction.reply(`Removed **${args[1]}** announcement.`)
                
            }

            if(action === "add"){
                var message = interaction.options.getString("message")
                var type = interaction.options.getString("type")
                if(message.length > 300) return interaction.reply("Your message exceeds the limit of 300 characters. Please make it smaller.")
                var searchIndex = guild.announcements.map(function(item){return item.type}).indexOf(type)
                if(searchIndex !== -1){
                    guild.announcements.splice(searchIndex, 1)
                }
                guild.announcements.push({
                    type: type,
                    text: text
                })
                guild.save().catch(err => console.log(err))
                return interaction.reply(`**New ${type} message**\n*${message}*`)
            }
            }
            })
    } catch(err) {
        if(err) console.log(err)
}
},
category: "guild"
}