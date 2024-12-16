const mongoose = require('mongoose');

const querySendSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    travelDate: {
        type: [String],
        required: true,
    },
    packageName: {
        type: String,
        required: true,
    },
    numberOfAdult: {
        type: [String],
        required: true,
    },
    numberOfChildWithBed: {
        type: [String],
        required: true,
    },
    numberOfChildWithoutBed: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        default: 'UnAssigned'
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

const querySend = mongoose.model('querySend', querySendSchema);

module.exports = querySend;