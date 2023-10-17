const mongoose = require("mongoose")

const casinoSchema = mongoose.Schema({
    userID: String,
    guildID: String,
    account: String,
    balance: Number,
    deposits: Array,
    withdrawals: Array,
    bonus: Number,
    bonusmoney: Number,
    wager: Number,
    wagerx: Number,
    stats: Array,
    raffle: Boolean,
    rafflecredits: Number,
    bets: Array
})

module.exports = mongoose.model("Casino", casinoSchema)