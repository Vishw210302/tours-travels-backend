const mongoose = require('mongoose');

const mealOrderCountSchema = new mongoose.Schema({
    particularMealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mealItemsImage',
        required: true,
    },
    mealCount: {
        type: String,
        require: true,
    }
})

const contactUsTicketsSchema = new mongoose.Schema({
    passengerId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'passengerDetails',
            required: true,
        },
    ],
    mealOrder: [mealOrderCountSchema],
    paymentId: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
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

const flightContactUs = mongoose.model('flightContactUs', contactUsTicketsSchema);

module.exports = flightContactUs;