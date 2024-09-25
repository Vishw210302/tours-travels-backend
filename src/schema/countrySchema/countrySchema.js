const mongoose = require('mongoose');

const allCountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code:{
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

const country = mongoose.model('country', allCountrySchema);

module.exports = country;