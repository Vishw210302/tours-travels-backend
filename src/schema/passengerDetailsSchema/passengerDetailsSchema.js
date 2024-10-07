const mongoose = require('mongoose');

const passengerDetailsSchema = new mongoose.Schema({
    seatNumberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'flightSeat',
        required: true,
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlightsDetails',
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
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

const passengerDetails = mongoose.model('passengerDetails', passengerDetailsSchema);

module.exports = passengerDetails;