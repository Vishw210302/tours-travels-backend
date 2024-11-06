const mongoose = require('mongoose');

const inclusionAndExclusionSchema = new mongoose.Schema({
    
    itenaryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itenary',
    },
    inclusion: {
        type: [String],
        required: true
    },
    exclusion: {
        type: [String],
        required: true
    },
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