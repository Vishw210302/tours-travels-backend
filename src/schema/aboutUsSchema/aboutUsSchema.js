const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
    aboutUsTitle: {
        type: String,
        required: true,
    },
    aboutUsContent: {
        type: String,
        required: true,
    },
    aboutUsContentImages: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const aboutUsContentImage = mongoose.model('aboutUsContentImage', aboutUsSchema);

module.exports = aboutUsContentImage;