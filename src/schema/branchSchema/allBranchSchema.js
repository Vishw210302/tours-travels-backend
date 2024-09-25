const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'locationBranch',
        default: null
    },
    branchName: {
        type: String,
        required: true,
    },
    branchNumber: {
        type: String,
        required: true,
    },
    branchLocation: {
        type: String,
        required: true,
    },
    mapUrl: {
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

const branch = mongoose.model('branch', branchSchema);

module.exports = branch;