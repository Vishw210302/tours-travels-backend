const mongoose = require('mongoose');

const hotelTestimonialReviewSchema = new mongoose.Schema({
    reviewPersonName: {
        type: String,
        required: true,
    },
    reviewDescription: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Inactive'
    },
    numberOfReview: {
        type: String,
        default: 'Inactive'
    },
    createdAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const hotelTestimonial = mongoose.model('hotelTestimonial', hotelTestimonialReviewSchema);

module.exports = hotelTestimonial;