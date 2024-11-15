const mongoose = require('mongoose');

const itenaryFlightsSchema = new mongoose.Schema({

    departure: {
        location: {
            type: String,
            required: true,
        },
        airportCode: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    },

    arrival: {
        location: {
            type: String,
            required: true,
        },
        airportCode: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
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

const itenaryFlightDetails = mongoose.model('itenaryFlightDetails', itenaryFlightsSchema);

module.exports = itenaryFlightDetails;