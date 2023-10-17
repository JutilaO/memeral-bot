const mongoose = require("mongoose")

const saurSchema = mongoose.Schema({
    id: String,
    string: String,
    keywords: Array,
    positive: Array,
    negative: Array,
    rating: Number,
    counter: Number

})

module.exports = mongoose.model("SAUR", saurSchema)