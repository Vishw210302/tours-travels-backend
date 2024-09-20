const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const testimonial = mongoose.model('testimonial', testimonialSchema);

module.exports = testimonial;