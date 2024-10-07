const mongoose = require('mongoose');

const allMealItemsSchema = new mongoose.Schema({
    mealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'locationBranch',
        default: null
    },
    mealItems: {
        type: String,
        required: true,
    },
    mealPrice: {
        type: String,
        required: true,
    },
    mealItemsImage: {
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

const mealItemsImage = mongoose.model('mealItemsImage', allMealItemsSchema);

module.exports = mealItemsImage;