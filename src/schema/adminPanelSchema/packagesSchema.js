const mongoose = require('mongoose');

const packagesschema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
        unique: true,
    },
    packageImage: {
        type: String,
        required: true,
    },
    categories: {
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

const packages = mongoose.model('packages', packagesschema);

module.exports = packages;