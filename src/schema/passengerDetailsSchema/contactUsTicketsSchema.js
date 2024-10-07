const mongoose = require('mongoose');

const contactUsTicketsSchema = new mongoose.Schema({
    passengerId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'passengerDetails',
            required: true,
        },
    ],
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
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

const flightContactUs = mongoose.model('flightContactUs', contactUsTicketsSchema);

module.exports = flightContactUs;