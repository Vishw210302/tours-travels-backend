const mongoose = require('mongoose');

const packageThemeSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
    },
    packageThemeImage: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Inactive'
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

const packageThemeImage = mongoose.model('packageThemeImage', packageThemeSchema);

module.exports = packageThemeImage;