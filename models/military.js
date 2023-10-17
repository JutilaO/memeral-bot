const mongoose = require("mongoose")

const militarySchema = mongoose.Schema({
    userID: String,
    guildID: String,
    miliSpins: Number,
    miliCoins: Number,
    miliWZJ: Number,
    miliWZJL: Number,
    miliWZL: Number,
    miliDDJ: Number,
    miliDDJL: Number,
    miliDDL: Number,
    miliATJ: Number,
    miliATH: Number,
    miliTRJ: Number,
    miliTRH: Number,
    miliSCJ: Number,
    miliAMJ: Number,
    miliCR: Number,
    miliBR: Number,
    miliAE: Number,
    miliCTASM: Number,
    miliCTAM: Number,
    playtime: Number,
    playtimeMonthly: Array,
    evals: Array
})

module.exports = mongoose.model("Military", militarySchema)