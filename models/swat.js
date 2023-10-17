const mongoose = require("mongoose")

const swatSchema = mongoose.Schema({
    name: String,
    operations: Number,
    trainings: Number,
    warzones: Number,
    doomsdays: Number,
    turfunit: Number,
    patrol: Number
})

module.exports = mongoose.model("SWAT", swatSchema)