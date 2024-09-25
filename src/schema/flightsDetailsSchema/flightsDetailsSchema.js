const mongoose = require('mongoose');



const flightDetailsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    airline: {
        type: String,
        required: true,
    },
    departure: {
        airport: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        }
    },
    arrival: {
        airport: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        }
    },
    duration: {
        type: String,
        required: true,
    },
    hold: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seats_available: {
        type: Number,
        required: true,
    },
    hold_details: {
        type: [String],
        default: [],
    },
    class_details: {
        economy: {
            price: {
                type: Number,
                required: true,
            },
            seats_available: {
                type: Number,
                required: true,
            },
            prices: {
                adult: {
                    type: Number,
                    required: true,  // Optional: Add 'required' if necessary
                },
                children: {
                    type: Number,
                    required: false, // Change to 'true' if mandatory
                },
                infant: {
                    type: Number,
                    required: false, // Change to 'true' if mandatory
                }
            }
        },
        business: {
            price: {
                type: Number,
                required: true,
            },
            seats_available: {
                type: Number,
                required: true,
            },
            prices: {
                adult: {
                    type: Number,
                    required: true,  // Optional: Add 'required' if necessary
                },
                children: {
                    type: Number,
                    required: false, // Change to 'true' if mandatory
                },
                infant: {
                    type: Number,
                    required: false, // Change to 'true' if mandatory
                }
            }
        },
        first_class: {
            price: {
                type: Number,
                required: true,
            },
            seats_available: {
                type: Number,
                required: true,
            },
            prices: {
                adult: {
                    type: Number,
                    required: true,  // Optional: Add 'required' if necessary
                },
                children: {
                    type: Number,
                    required: false, // Change to 'true' if mandatory
                },
                infant: {
                    type: Number,
                    required: false, // Change to 'true' if mandatory
                }
            }
        }
    },
});

// Capitalized model name
const FlightsDetails = mongoose.model('FlightsDetails', flightDetailsSchema);

module.exports = FlightsDetails;
