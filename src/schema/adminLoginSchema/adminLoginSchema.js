const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
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

const adminLogin = mongoose.model('adminlogin', adminLoginSchema);

module.exports = adminLogin;