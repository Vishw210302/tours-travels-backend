const mongoose = require('mongoose');

const allCitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    admin1: {
        type: String,
        required: true,
    },
    admin2: {
        type: String,
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

const cities = mongoose.model('cities', allCitiesSchema);

module.exports = cities;