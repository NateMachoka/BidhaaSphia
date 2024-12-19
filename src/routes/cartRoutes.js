import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { validateCartInput } from '../middlewares/cartValidation.js';
import { addToCartController, viewCartController, removeFromCartController } from '../controllers/cartController.js';

const router = express.Router();

// Cart routes
router.post('/add', protect, validateCartInput, addToCartController); // Add validation before adding to cart
router.get('/view', protect, viewCartController); // View user's cart
router.delete('/remove', protect, removeFromCartController); // Remove item from cart

export default router;
