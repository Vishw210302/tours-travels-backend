const mongoose = require('mongoose');

const promoCodesSchema = new mongoose.Schema({
    promoCode: {
        type: String,
        required: true,
    },
    discountAmount: {
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

const allPromoCodes = mongoose.model('allPromoCodes', promoCodesSchema);

module.exports = allPromoCodes;