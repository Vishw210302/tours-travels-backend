const mongoose = require('mongoose');

const itenaryPriceSchema  = new mongoose.Schema({

    itenaryId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'itenary',
    },

    perPersonPrice: {
        type: Number,
        required: true
    },

    childWithoutBed: {
        type: Number,
        required: true
    },

    childWithBed: {
        type: Number,
        required: true
    },
    
    costPerAdultExtraBed: {
        type: Number,
        required: true
    },

    costPerInfont : {
        type: Number,
        required: true
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

const itenaryPriceDetails = mongoose.model('itenaryPriceDetails', itenaryPriceSchema);

module.exports = itenaryPriceDetails;