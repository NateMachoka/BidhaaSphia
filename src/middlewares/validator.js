import { check } from 'express-validator';

export const validateUserId = [
  check('id')
    .isMongoId()
    .withMessage('Invalid user ID format.'),
];
