const mongoose = require('mongoose');

const flightMealSchema = new mongoose.Schema({
    mealCategories: {
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

const flightMeal = mongoose.model('flightMeal', flightMealSchema);

module.exports = flightMeal;