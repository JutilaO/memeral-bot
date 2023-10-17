const mongoose = require("mongoose")

const rulesSchema = mongoose.Schema({
    id: String,
    rule: String,
    keywords: Array,
    positive: Array,
    negative: Array,
    rating: Number,
    counter: Number

})

module.exports = mongoose.model("Rules", rulesSchema)