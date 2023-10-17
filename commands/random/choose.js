const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("choose")
        .setDescription("Chooses one of your inputs")
        .addSubcommand(subcommand => 
            subcommand
                .setName("anyone")
                .setDescription("Chooses a random person from the server"))
        .addSubcommand(subcommand => 
            subcommand
                .setName("input")
                .setDescription("Chooses 1 of your inputs randomly (separate by a space)")
                .addStringOption(option => 
                    option.setName("input")
                    .setDescription("Your inputs (separate with a space)")
                    .setRequired(true))),
    async execute(interaction){
        try {
            var guildMembers = await interaction.guild.members.fetch()
            var action = interaction.options.getSubcommand()
            if(action === "anyone"){
                guildMembers = guildMembers.map(u => u.user.tag)
                random = Math.floor(Math.random() * (guildMembers.length - 1 + 1)) + 1
                member = guildMembers[random - 1]
                return interaction.reply(`I choose ${member}`)
            } else {
                var array = interaction.options.getString("input").split(" ")
                if(array.length <= 1) return message.channel.send("Please input atleast 2 options seperated by a space")
                random = Math.floor(Math.random() * (array.length - 1 + 1)) + 1
                interaction.reply(`I choose ${array[random - 1]}`)
            } 
    } catch(err) {
        if(err) console.log(err)
}
},
category: "random"
}