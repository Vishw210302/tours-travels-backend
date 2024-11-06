const validatePackage = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({
                status: false,
                message: 'Validation errors',
                errors: errorMessages,
            });
        }
        next();
    };
};

module.exports = validatePackage;