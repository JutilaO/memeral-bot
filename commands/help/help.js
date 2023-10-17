const {SlashCommandBuilder} = require("@discordjs/builders")
const guildSettings = require("../../models/guildSettings.js")
const {MessageActionRow, MessageButton} = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("View command list & info"),
    async execute(interaction){
        try {

            var guild_id = interaction.guild.id
            var user_id = interaction.user.id
            var page = 0
            var pages = 0
            
            var categories = []
            var filter = []
            var commandsArray2 = [
                {
                  category: "help",
                  commands: []
                },
                {
                  category: "casino",
                  commands: [],
                  guilds: ["]
                },
                {
                  category: "currency",
                  commands: []
                },
                {
                  category: "distube",
                  commands: []
                },
                {
                  category: "guild",
                  commands: []
                },
                {
                  category: "juti",
                  commands: [],
                  guilds: []
                },
                {
                  category: "military",
                  commands: [],
                  guilds: [""]
                },
                {
                  category: "random",
                  commands: []
                },
                {
                  category: "saur",
                  commands: [],
                  guilds: []
                },
                {
                  category: "statistics",
                  commands: []
                },
                {
                  category: "swat",
                  commands: [],
                  guilds: [""]
                }]


                const { readdirSync } = require('fs')
                const load = dirs => {
                    categoryAmount = categoryAmount + 1
                    const commandFileList = readdirSync(`F:/Memeral/commands/${dirs}/`).filter(d => d.endsWith('.js'));
                    for (const file of commandFileList) {
                      commandAmount = commandAmount + 1
                      const cmdfile = require(`F:/Memeral/commands/${dirs}/${file}`)
                      if(cmdfile.data){
                        for(i in commandsArray2){
                          if(cmdfile.category === commandsArray2[i].category){
                            commandsArray2[i].commands.push(cmdfile.data.toJSON())
                          }
                        }
                      }
                    }
                  }
                  
                  const commandsDir = readdirSync('F:/Memeral/commands/')
                  commandsDir.forEach(x => load(x))

            guildSettings.findOne({
                guildID: guild_id
            }, (err, guild) => {
                if(err) console.log(err)
                if(!guild){
                    var guild = new guildSettings({
                        guildID: guild_id
                    })
                }
                if(!guild.community) guild.community = ""
                

            for(i = 0; i < commandsArray2.length; i++){
                
                list = false
                if(guild.community.includes("saur") && commandsArray2[i].category === "saur") list = true
                if(commandsArray2[i].guilds){
                    if(commandsArray2[i].guilds.includes(guild_id)){
                        list = true
                    }
                } else list = true
                if(list === true){
                    for(y = 0; y < commandsArray2[i].commands.length; y++){
                        if(!commandsArray2[i].commandlist) commandsArray2[i].commandlist = []
                        if(!commandsArray2[i].descriptions) commandsArray2[i].descriptions = []
                        commandsArray2[i].commandlist.push("``" + commandsArray2[i].commands[y].name + "``")
                        commandsArray2[i].descriptions.push("``" + commandsArray2[i].commands[y].description + "``")
                    }
                }
                commandsArray2[i].list = list
            }
            
            categories = commandsArray2

            for(x in categories){
                if(categories[x].category === "swat") categories[x].category = "SWAT"
                if(categories[x].category === "saur") categories[x].category = "SAUR"
                if(categories[x].category === "distube") categories[x].category = "Music"
                if(categories[x].list === true){
                  if(categories[x].commands.length > 0) filter.push(categories[x])
                }
                categories[x].category = categories[x].category.charAt(0).toUpperCase() + categories[x].category.slice(1)
            }

            categories = filter

            pages = categories.length - 1

            var underline = "\n -----------------------------------------------------------------------------"
            const embed = new Discord.MessageEmbed()
            .setColor(0xff1493)
            .setTimestamp()
            .setFooter({text:`Page ${page+1} of ${pages+1}`})
            .setTitle(`Memeral ${categories[page].category} Commands${underline}`)
            .addField("Commands:", categories[page].commandlist.join("\n"), true)
            .addField("Description:", categories[page].descriptions.join("\n"), true)

            const buttons = new MessageActionRow()
            .addComponents(
				new MessageButton()
                .setCustomId('last')
                .setLabel('Last page')
                .setStyle('DANGER'),
			)
            .addComponents(
				new MessageButton()
                .setCustomId('next')
                .setLabel('Next page')
                .setStyle('SUCCESS'),
			)

            interaction.reply({embeds: [embed], components: [buttons], ephemeral: true})
            const last = b => b.customId === 'last' && b.user.id === user_id
            const next = b => b.customId === 'next' && b.user.id === user_id
            const lastCollector = interaction.channel.createMessageComponentCollector({last, time: 300000})
            const nextCollector = interaction.channel.createMessageComponentCollector({next, time: 300000})

            lastCollector.on('collect', async int => {
                if(int.customId === "last" && int.message.interaction.id === interaction.id){
                    if(page <= 0){
                        page = pages
                    } else page--

                    embed.setFooter({text: `Page ${page+1} of ${pages+1}`})
                    embed.fields = []
                    embed.setTitle(`Memeral ${categories[page].category} commands${underline}`)
                    embed.addField("Commands:", categories[page].commandlist.join("\n"), true)
                    embed.addField("Description:", categories[page].descriptions.join("\n"), true)
                    interaction.editReply({embeds: [embed], components: [buttons], ephemeral: true})
                }
            })

            nextCollector.on('collect', async int => {
                if(int.customId === "next" && int.message.interaction.id === interaction.id){
                    if(page >= pages){
                        page = 0
                    } else page++
                    embed.setFooter({text: `Page ${page+1} of ${pages+1}`})
                    embed.fields = []
                    embed.setTitle(`Memeral ${categories[page].category} commands${underline}`)
                    embed.addField("Commands:", categories[page].commandlist.join("\n"), true)
                    embed.addField("Description:", categories[page].descriptions.join("\n"), true)
                    interaction.editReply({embeds: [embed], components: [buttons], ephemeral: true})
                }
            })
        })
            
    } catch(err) {
        if(err) console.log(err)
}
},
category: "help"
}
