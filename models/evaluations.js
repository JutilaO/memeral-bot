const mongoose = require("mongoose")

const evaluationsSchema = mongoose.Schema({
    number: Number,
    start: String,
    end: String,
    lastBackup: String,
    posted: Boolean,
    users: Array
})

module.exports = mongoose.model("Evaluations", evaluationsSchema)