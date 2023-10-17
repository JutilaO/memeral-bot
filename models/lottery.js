const mongoose = require("mongoose")

const lotterySchema = mongoose.Schema({
    id: Number,
    prize: Number,
    participants: Array,
    created: String,
    drawed: String,
    winners: Array
})

module.exports = mongoose.model("Lottery", lotterySchema)