const {Client, Intents, Collection} = require('discord.js')
const Discord = require("discord.js")
const bot = new Discord.Client({ intents:[
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MEMBERS
]})
const {prefix, token, botname, ownerID} = require('./config.json')
const mongoose = require("mongoose")
mongoose.connect("",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const botsettings = require("./models/botSettings.js")
const Memeral = require("./models/memeral.js")
const schedule = require("node-schedule")
const { readdirSync } = require('fs')
const { YtDlpPlugin } = require("@distube/yt-dlp")
const distube = require("distube")
const {REST} = require("@discordjs/rest")
const {Routes} = require("discord-api-types/v9")
const guildSettings = require("./models/guildSettings.js")
module.exports = bot

bot.DisTube = new distube.DisTube(bot, 
  {searchSongs: 10,
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  plugins: [new YtDlpPlugin()]})
.on("playSong", (queue, song) => {
  queue.textChannel.send(`Now playing: ${song.name} - ${song.formattedDuration}\nRequested by: ${song.user}`)
})
.on("addSong", (queue, song) => {
  queue.textChannel.send(`Added to queue: ${song.name} - ${song.formattedDuration}\nRequested by: ${song.user}`)
})
.on("searchResult", (queue, result) => {
  let i = 0
  result = result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
  let embed = new Discord.MessageEmbed()
  .setTitle(`Youtube search`)
  .setColor(0xff1493)
  .setDescription(result)
  .setFooter({text: "Enter a number to choose a song"})
  queue.textChannel.send({embeds: [embed]})
})
.on("error", (queue, error) => {
  console.error(error)
  queue.textChannel.send(`Error: this is often caused by invalid arguments in 'play' command or Memeral lacking the required permissions to join a voice channel and play music. Should this happen repeatedly please contact Juti or post a bug report using 'report' command.`)
})
.on("searchCancel", (queue) => {
  queue.textChannel.send("Search canceled")
})
.on("noRelated", (queue) =>  {
  queue.textChannel.send("Couldn't find any related songs")
})
.on("playList", (queue, playlist, song) =>  {
  queue.textChannel.send(`Playlist ${playlist.name} added to queue with ${playlist.songs.length} songs, requested by ${song.user}.\nNow playing: ${song.name} - ${song.formattedDuration}.`)
})
.on("empty", (queue) =>  {
  queue.textChannel.send("The channel seems empty, guess I am no longer needed")
})
.on("finish", (queue) =>  {
  queue.textChannel.send("Queue is empty")
})


categoryAmount = 0
commandAmount = 0

const commandsArray = [
{
  category: "help",
  commands: []
},
{
  category: "casino",
  commands: [],
  guilds: []
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
  commands: []
},
{
  category: "military",
  commands: [],
  guilds: []
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
  guilds: []
}]

bot.commands = new Collection()

const load = dirs => {
  categoryAmount = categoryAmount + 1
  console.log(`Loading ${dirs}`)
  const commandFileList = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
  for (const file of commandFileList) {
    commandAmount = commandAmount + 1
    const cmdfile = require(`./commands/${dirs}/${file}`)
    if(cmdfile.data){
      for(i in commandsArray){
        if(cmdfile.category === commandsArray[i].category){
          commandsArray[i].commands.push(cmdfile.data.toJSON())
          bot.commands.set(cmdfile.data.name, cmdfile)
        }
      }
    }
  }
  if(categoryAmount === 11) console.log(`${commandAmount} commands in ${categoryAmount} categories`)
}


const commandsDir = readdirSync('./commands/')
commandsDir.forEach(x => load(x))


var commandFile = require("./auto/saur/other/eventreminders.js")
commandFile.run(bot)

var commandFile = require("./auto/other/logs.js")
commandFile.run(bot, botname)

var commandFile = require("./auto/saur/military/miliactivitypost.js")
commandFile.run(bot)

var commandFile = require("./auto/saur/swat/swatactivitypost.js")
commandFile.run(bot)

var commandFile = require("./auto/saur/terrorists/activitypost.js")
commandFile.run(bot)

var commandFile = require("./auto/saur/casino/caslottery.js");
const botSettings = require('./models/botSettings.js')
const { count } = require('console')
commandFile.run(bot)

var rule = new schedule.RecurrenceRule()
rule.second = 0

var j = schedule.scheduleJob(rule, function(){
  var commandFile = require("./auto/other/automessages.js")
  commandFile.run(bot)
})

process.on('unhandledRejection', error => {
  if(error.code !== 50013) console.log(error)
})


bot.on("messageCreate", message => {
if(!message) return
if(!message.guild) return 

if(message.guild.id === ""){
  console.log(`${message.author.tag} in ${message.channel.name}: ${message.content}`)
}

if(message.guild.id === "" && !message.author.bot){
  var commandFile = require("./auto/other/teemo.js") 
  commandFile.run(bot, message)
}

if(message.guild.id === "" && !message.author.bot){
  var commandFile = require("./auto/other/teemo.js") 
  commandFile.run(bot, message)
}

if(message.guild.id === ""){
  var commandFile = require("./auto/saur/other/saurmedia.js")
  commandFile.run(bot, message)
}

reportChannels = []

if(reportChannels.includes(message.channel.id)){
  var commandFile = require("./auto/saur/military/miliactivity.js")
  commandFile.run(bot, message)
}


reportChannels = []
if(reportChannels.includes(message.channel.id)){
  var commandFile = require("./auto/saur/swat/swatactivity.js")
  commandFile.run(bot, message)
}

reportChannels = []
if(reportChannels.includes(message.channel.id)){
  var commandFile = require("./auto/saur/terrorists/activity.js")
  commandFile.run(bot, message)
}

if(message.channel.id === "){
  message.react("✅")
}



Memeral.findOne({
  userID: message.author.id,
  guildID: message.guild.id
}, (err, memeral) => {
  if(err) console.log(err)
  if(message.author.bot) return;
    if(!memeral){
        var memeral = new Memeral({
          userID: message.author.id,
          guildID: message.guild.id
        })
    }
    if(!memeral.money) memeral.money = 0
    if(!memeral.messages) memeral.messages = 0
    if(!memeral.guildID) memeral.guildID = message.guild.id

    if(memeral.money > 5000){
      if(!memeral.achievements) memeral.achievements = ""
      if(!memeral.achievements.includes("a07")){
        memeral.achievements = memeral.achievements + "a07 "
      }
    }

memeral.messages = memeral.messages + 1
memeral.money = memeral.money + 1
memeral.save().catch(err => console.log(err))
})

})

guildSettings.find({
  community: "saur"
}, (err, guild) => {
  if(err) console.log(err)
  for(i in guild){
    if(!guild[i].guildID) guild[i].guildID = ""
    if(!guild[i].community) guild[i].community = ""
    if(guild[i].community === "saur"){
        for(y in commandsArray){
          if(commandsArray[y].category === "saur") commandsArray[y].guilds.push(guild[i].guildID)
        }
    }
}
})

bot.on('ready', async () => {
bot.user.setActivity(">help")
console.log("Ready!")

setTimeout(async() => {
guildarray = bot.guilds.cache.map(guild => guild.id)
ownerarray = []
for(i in guildarray){
  return
  g = bot.guilds.cache.get(guildarray[i])
    if(!ownerarray.includes(g.ownerId)){
      ownerarray.push(g.ownerId)
      o = bot.users.cache.get(g.ownerId)
      if(!o) o = await bot.users.fetch(g.ownerId)
      o = bot.users.cache.get(g.ownerId)
      o.send("Sorry, I started it up for fun")
    }
}
}, 10000);

var globalCommands = []
for(i in commandsArray){
  if(!commandsArray[i].guilds && commandsArray[i].commands.length >= 0){
    for(y in commandsArray[i].commands){
      globalCommands.push(commandsArray[i].commands[y])
    }
  }
}

const BOTID = bot.user.id;
const rest = new REST({
  version: "9"
}).setToken(token);

(async () => {
  try {

    if(1 === 2){
      test = []
      for(i in commandsArray[6].commands) test.push(commandsArray[6].commands[i])
      for(y in commandsArray[8].commands) test.push(commandsArray[8].commands[y])
      await rest.put(Routes.applicationGuildCommands(BOTID, ""), {
        body: test
      })
      test = []
      for(i in commandsArray[8].commands) test.push(commandsArray[8].commands[i])
      for(y in commandsArray[10].commands) test.push(commandsArray[10].commands[y])
      await rest.put(Routes.applicationGuildCommands(BOTID, ""), {
        body: test
      })
    }
    //await rest.put(Routes.applicationGuildCommands(BOTID, ""), {
      //body: globalCommands
    //})

    if(1 === 2){
      await rest.put(Routes.applicationCommands(BOTID), {
        body: globalCommands
      })
      console.log(`Commands loaded globally`)
    }

   for(i in commandsArray){
     if(commandsArray[i].commands.length > 99){
       if(commandsArray[i].guilds){
          for(y in commandsArray[i].guilds){
            server = bot.guilds.cache.get(commandsArray[i].guilds[y])
              await rest.put(Routes.applicationGuildCommands(BOTID, commandsArray[i].guilds[y]), {
                body: commandsArray[i].commands
              }).catch(err => console.log(err))
          }
          console.log(`${commandsArray[i].category} commands loaded`)
      }
    }
  }

  } catch (err) {
    if(err){
      console.log(err)
    }
  }
})();

});

botsettings.findOne({
  ownerID: ""
}, async (err, settings) => {
  return
  if(err) console.log(err)
    if(!settings) return
    if(settings.blacklist) return
    if(settings.blacklist.length) return
    if(!settings.blacklist.includes(interaction.user.id)){
      await command.execute(interaction)
    } else return
  })

bot.on('interactionCreate', async interaction => {
  if(interaction.isButton()) return interaction.deferUpdate()
  if(!interaction.isCommand()) return
  if(!interaction.guild) return interaction.reply("My commands only work in guilds")
  if(interaction.guild.id !== "" && interaction.guild.id !== "") return
  botsettings.findOne({
    ownerID: ""
  }, async (err, settings) => {
    if(err) console.log(err)
      if(settings && settings.optedout){
        if(!settings.optedout.includes(interaction.user.id)){
          const command = bot.commands.get(interaction.commandName)
          if(!command) return
          try {
            await command.execute(interaction)
          } catch(err) {
            if(!err) console.log(err);
          }
        } else return
      }
  })
})

        

bot.login(token);
