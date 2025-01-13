import Joi from 'joi';

// Cart input validation schema
const cartValidationSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});

// Middleware to validate cart input
export const validateCartInput = (req, res, next) => {
  const { error } = cartValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};
