const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    duration: {
        type: Number
    },
    audioUrl: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    lyrics: {
        type: String
    },
    playCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Song', songSchema);
