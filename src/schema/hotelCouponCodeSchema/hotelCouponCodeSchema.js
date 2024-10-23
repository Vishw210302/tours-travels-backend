const mongoose = require('mongoose');

const hotelCouponCodeSchema = new mongoose.Schema({
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

const hotelCouponCode = mongoose.model('hotelCouponCode', hotelCouponCodeSchema);

module.exports = hotelCouponCode;