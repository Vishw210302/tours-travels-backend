const mongoose = require('mongoose');

const youtubeVideosSchema = new mongoose.Schema({
    youtubeURL: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const youtubeURL = mongoose.model('youtubeURL', youtubeVideosSchema);

module.exports = youtubeURL;