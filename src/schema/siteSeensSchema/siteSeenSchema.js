const mongoose = require('mongoose');

const siteSeenSchema = new mongoose.Schema({
    SiteseenName: {
        type: String,
        required: true,
    },
    SiteseenDescription: {
        type: String,
        required: true,
    },
    siteseen: {
        type: String,
        required: true,
    },
    PackagesInclude: {
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

const siteSeen = mongoose.model('siteSeen', siteSeenSchema);

module.exports = siteSeen;