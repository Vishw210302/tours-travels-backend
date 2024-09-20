const mongoose = require('mongoose');

const inclusionAndExclusionSchema = new mongoose.Schema({
    inclusionPoints: {
        type: [String],
        required: true,
    },
    exclusionPoints: {
        type: [String],
        required: true,
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

const InclusionAndExclusion = mongoose.model('InclusionAndExclusion', inclusionAndExclusionSchema);

module.exports = InclusionAndExclusion;
