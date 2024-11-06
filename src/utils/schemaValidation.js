const Joi = require('joi');

const packageSchema = Joi.object({
    packageName: Joi.string().min(3).max(50).required().messages({
        'string.empty': 'Package name is required.',
        'string.min': 'Package name should have at least 3 characters.',
        'string.max': 'Package name should have at most 50 characters.',
    }),
    categories: Joi.array().items(Joi.string()).min(1).required().messages({
        'array.min': 'At least one category is required.',
    }),
    packageImage: Joi.string().uri().required().messages({
        'string.empty': 'Package image URL is required.',
        'string.uri': 'Package image must be a valid URL.',
    }),
});

module.exports = {
    packageSchema,
};