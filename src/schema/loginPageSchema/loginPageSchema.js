const mongoose = require('mongoose');

const loginPageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
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

const loginPage = mongoose.model('loginPage', loginPageSchema);

module.exports = loginPage;