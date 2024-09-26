const mongoose = require('mongoose');

const specialFlightsSchema = new mongoose.Schema({
    flightsImage: {
        type: String,
        required: true,
    },
    flightsFrom: {
        type: String,
        required: true,
    },
    flightsTo: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    totalTime: {
        type: String,
        required: true,
    },
    hold: {
        type: String,
        required: true,
    },
    fromAirportCode: {
        type: String,
        required: true,
    },
    toAirportCode: {
        type: String,
        required: true,
    },
    fromAirportName: {
        type: String,
        required: true,
    },
    toAirportName: {
        type: String,
        required: true,
    },
    pnrNumber: {
        type: String,
        required: true,
    },
    flightsType: {
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

const specialFlights = mongoose.model('specialFlights', specialFlightsSchema);

module.exports = specialFlights;