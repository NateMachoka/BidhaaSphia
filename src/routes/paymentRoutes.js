import express from 'express';
import { initializePayment , validatePayment } from '../controllers/paymentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:id/initialize', protect, initializePayment); // Initialize payment
router.post('/:id/validate', protect, validatePayment); // Validate payment

export default router;
