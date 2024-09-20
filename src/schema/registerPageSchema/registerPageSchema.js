const mongoose = require('mongoose');

const registerPageSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
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

const registerPage = mongoose.model('registerPage', registerPageSchema);

module.exports = registerPage;