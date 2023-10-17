const mongoose = require("mongoose")

const terroristSchema = mongoose.Schema({
    name: String,
    id: String,
    at: Number,
    sc: Number,
    andro: Object,
    am: Object,
    robberies: Number,
    wz: Object,
    dd: Object,
    trainings: Object,
    evals: Array,
    activityevent: Object
})

module.exports = mongoose.model("Terrorists", terroristSchema)