const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    teamMemberName: {
        type: String,
        required: true,
    },
    teamMemberRole: {
        type: String,
        required: true,
    },
    teamMemberImage: {
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

const teamMemberDetails = mongoose.model('teamMemberDetails', teamMemberSchema);

module.exports = teamMemberDetails;