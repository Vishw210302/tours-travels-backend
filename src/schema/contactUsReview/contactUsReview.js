const mongoose = require('mongoose');

const contactUsReviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    message: {
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

const messageReview = mongoose.model('messageReview', contactUsReviewSchema);

module.exports = messageReview;