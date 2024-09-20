const mongoose = require('mongoose');

const brandsSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    brandsLogo: {
        type: String,
        required: true,
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

const brands = mongoose.model('brands', brandsSchema);

module.exports = brands;