const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
    socialMediaName: {
        type: String,
        required: true,
    },
    socialMediaLink: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 1,
        required: false
    }
});

// const socialMediaLinkSchema = new mongoose.Schema({
//     socialMediaLinks: [socialMediaSchema]
// });

const socialMediaLink = mongoose.model('socialMediaLink', socialMediaSchema);

module.exports = socialMediaLink;