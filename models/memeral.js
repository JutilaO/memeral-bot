const mongoose = require("mongoose")

const memeralSchema = mongoose.Schema({
    userID: String,
    guildID: String,
    money: Number,
    inventory: String,
    inv: Array,
    cases: Number,
    commands: String,
    modlevel: String,
    daily: String,
    dailystreak: Number,
    dailyHighest: Number,
    inventoryvalue: Number,
    achievements: String,
    messages: Number,
    trivias: Number,
    triviastreak: Number,
    triviaHighest: Number,
    reputation: Number,
    repday: String,
    maths: Number,
    mathStreak: Number,
    shot: Number,
    pftext: String
})

module.exports = mongoose.model("Memeral", memeralSchema)