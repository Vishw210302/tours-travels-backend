const mongoose = require('mongoose');

const branchLocationSchema = new mongoose.Schema({
    branchLocation: {
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

const locationBranch = mongoose.model('locationBranch', branchLocationSchema);

module.exports = locationBranch;