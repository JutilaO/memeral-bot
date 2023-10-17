const mongoose = require("mongoose")

const playlistsSchema = mongoose.Schema({
    userID: String,
    name: String,
    songs: String,
    state: String
})

module.exports = mongoose.model("Playlists", playlistsSchema)