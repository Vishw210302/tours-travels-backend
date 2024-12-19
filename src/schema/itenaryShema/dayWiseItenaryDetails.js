const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const itenaryDetailsSchema = new mongoose.Schema({

    siteSeenId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'siteSeen',
        default: null
    }],
    itenaryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itenary',
    },
    deFaultImage: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    meal: {
        type: [String],
        required: true
    },
    hotelName: {
        type: String,
        required: true
    },
    hotelRoomType: {
        type: String,
        required: true
    },
    mealPlan: {
        type: String,
        required: true
    },
    arrivalTransfer: {
        type: String,
        required: true
    },
    pickupTransfer: {
        type: String,
        required: true
    },
    roadType: {
        type: String,
        required: true
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

const itenaryDetails = mongoose.model('itenaryDetails', itenaryDetailsSchema);

module.exports = itenaryDetails;