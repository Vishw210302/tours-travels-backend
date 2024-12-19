const mongoose = require('mongoose');

const intenaryInquirySchema = new mongoose.Schema({
    itenaryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itenary',
    },
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
    itenaryName: {
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

const intenaryInquiry = mongoose.model('intenaryInquiry', intenaryInquirySchema);

module.exports = intenaryInquiry;