const mongoose = require('mongoose');

const contactBookingDetailSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNUmber: {
        type: String,
        required: true,
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlightsDetails',
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

const contactBookingDetails = mongoose.model('contactBookingDetails', contactBookingDetailSchema);

module.exports = contactBookingDetails;