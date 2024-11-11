const mongoose = require('mongoose');

const packagesDetailsItenary = new mongoose.Schema({

    bannerImage: {
        type: String,
        required: true
    },

    packageThemeImageId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'packageThemeImage',
    },

    mainPackageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'packages',
    },

    packageTitle: {
        type: String,
        required: true
    },

    smallDescription: {
        type: String,
        required: true
    },

    departureDates: {
        type: [Date],
        required: true
    },

    perPersonCost: {
        type: String,
        required: true
    },

    departureFrom: {
        type: String,
        required: true
    },

    departureTo: {
        type: String,
        required: true
    },

    fileUpload: {
        type: String,
        required: true
    },

    categories: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: null,
        default: new Date(),
    },

    deletedAt: {
        type: Date,
        default: null,
    }
});

const itenary = mongoose.model('itenary', packagesDetailsItenary);

module.exports = itenary;