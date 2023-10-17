const mongoose = require("mongoose")

const guildSchema = mongoose.Schema({
    guildID: String,
    moderators: Array,
    modroles: Array,
    admins: Array,
    adminroles: Array,
    dj: Array,
    music: String,
    logchannel: String,
    moneyPerMsg: Number,
    botchannel: Array,
    prefix: String,
    community: String,
    reminder: Array,
    applications: String,
    applies: Number,
    applysettings: String,
    applycd: String,
    applybl: String,
    automessage: Array,
    commands: Array,
    embeds: Array,
    muted: Array,
    announcements: Array,
    announceChannel: String,
    rcommands: Array,
    giveaways: Array
})

module.exports = mongoose.model("Guild", guildSchema)