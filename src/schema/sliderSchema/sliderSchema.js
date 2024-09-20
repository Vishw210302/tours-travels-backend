
const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    slider: {
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

const slider = mongoose.model('slider', sliderSchema);

module.exports = slider;