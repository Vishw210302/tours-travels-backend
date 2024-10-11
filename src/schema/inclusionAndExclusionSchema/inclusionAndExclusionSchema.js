const mongoose = require('mongoose');

const inclusionSchema = new mongoose.Schema({
    points: {
        type: [String],
        required: true
    }
});

const exclusionSchema = new mongoose.Schema({
    points: {
        type: [String],
        required: true
    }
});

const inclusionAndExclusionSchema = new mongoose.Schema({
    itenaryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itenary',
    },
    inclusion: inclusionSchema,
    exclusion: exclusionSchema,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const InclusionAndExclusion = mongoose.model('InclusionAndExclusion', inclusionAndExclusionSchema);

module.exports = InclusionAndExclusion;