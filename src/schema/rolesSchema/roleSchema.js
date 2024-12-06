const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    roleName: {
        type: String,
        required: true,
    },
    roleDescription: {
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

const roles = mongoose.model('roles', rolesSchema);

module.exports = roles;