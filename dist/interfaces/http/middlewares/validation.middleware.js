// Middleware para validar campos requeridos
export const validateFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = requiredFields.filter(field => !(field in req.body));
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: 'Faltan campos requeridos',
                missingFields
            });
        }
        next();
    };
};
