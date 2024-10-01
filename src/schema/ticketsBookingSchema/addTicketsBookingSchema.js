const mongoose = require('mongoose');

const ticketsBookingSchema = new mongoose.Schema({
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
    dob: {
        type: String,
        required: true,
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contactBookingDetails',
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

const ticketsBooking = mongoose.model('ticketsBooking', ticketsBookingSchema);

module.exports = ticketsBooking;