const mongoose = require('mongoose');

const airportCitiesSchema = new mongoose.Schema({
    airport_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

const airport_cities = mongoose.model('airport_cities', airportCitiesSchema);

module.exports = airport_cities;