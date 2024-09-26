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
    airlineLogo: {
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
    hold_details: [
        {
            airport: {
                type: String,
            },
            city: {
                type: String
            },
            time: {
                type: Date,
            }
        }
    ],
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
                    required: true,
                },
                children: {
                    type: Number,
                    required: false,
                },
                infant: {
                    type: Number,
                    required: false,
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
                    required: true,
                },
                children: {
                    type: Number,
                    required: false,
                },
                infant: {
                    type: Number,
                    required: false,
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
                    required: true,
                },
                children: {
                    type: Number,
                    required: false,
                },
                infant: {
                    type: Number,
                    required: false,
                }
            }
        }
    },
});

const FlightsDetails = mongoose.model('FlightsDetails', flightDetailsSchema);

module.exports = FlightsDetails;