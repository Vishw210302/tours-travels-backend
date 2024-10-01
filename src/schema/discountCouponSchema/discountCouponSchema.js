const mongoose = require('mongoose');

const discountCouponSchema = new mongoose.Schema({
    discountCouponName: {
        type: String,
        required: true,
    },
    promoCodeDescription: {
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

const discountCoupon = mongoose.model('discountCoupon', discountCouponSchema);

module.exports = discountCoupon;