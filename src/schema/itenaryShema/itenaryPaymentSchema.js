const mongoose = require('mongoose');

const itenaryPaymentSchema = new mongoose.Schema({
    cardHolderName: {
        type: String,
        required: [true, 'Cardholder name is required'],
    },
    itenaryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itenary'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
    },
    numberOfPerson: {
        adults: {
            type: Number,
            default: 0,
            min: [0, 'Number of adults cannot be negative'],
        },
        childrenWithBed: {
            type: Number,
            default: 0,
            min: [0, 'Number of children with bed cannot be negative'],
        },
        childrenWithoutBed: {
            type: Number,
            default: 0,
            min: [0, 'Number of children without bed cannot be negative'],
        },
        infants: {
            type: Number,
            default: 0,
            min: [0, 'Number of infants cannot be negative'],
        },
    },
    paymentId: {
        type: String,
        default: null,
        trim: true,
    },
    payPrice: {
        type: Number,
    },
    remainingBalance: {
        type: Number,
        default: 0,
        min: [0, 'Remaining balance cannot be negative'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const ItenaryPaymentDetails = mongoose.model('ItenaryPaymentDetails', itenaryPaymentSchema);

module.exports = ItenaryPaymentDetails;
