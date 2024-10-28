const mongoose = require('mongoose');

const pricingOptionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    inclusions: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    }
});

const amenitiesSchema = new mongoose.Schema({
    wifi: {
        type: Boolean,
        default: false
    },
    tv: {
        type: Boolean,
        default: false
    },
    ac: {
        type: Boolean,
        default: false
    },
    bathroom: {
        type: Boolean,
        default: false
    },
    miniBar: {
        type: Boolean,
        default: false
    },
    petsAllowed: {
        type: Boolean,
        default: false
    },
    disabledFacilities: {
        type: Boolean,
        default: false
    }
});

const hotelListingSchema = new mongoose.Schema({
    hotelImages: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    hotelName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    amenities: amenitiesSchema,
    basePrice: {
        type: String,
        required: true
    },
    pricingOptions: [pricingOptionSchema],
    createdAt: {
        type: Date,
        default: new Date()
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

const hotelListing = mongoose.model('hotelListing', hotelListingSchema);

module.exports = hotelListing;