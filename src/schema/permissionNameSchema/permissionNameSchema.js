const mongoose = require('mongoose');

const permissionNameSchema = new mongoose.Schema({
    permissionName: {
        type: String,
        required: true,
    },
    permissionDescription: {
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

const permission = mongoose.model('permission', permissionNameSchema);

module.exports = permission;