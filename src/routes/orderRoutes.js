import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  placeOrderController, viewOrdersController, cancelOrderController, processMpesaCallback,
} from '../controllers/orderController.js';

const router = express.Router();

// Place an order
router.post('/place', protect, placeOrderController);
// View user orders
router.get('/view', protect, viewOrdersController);
// Cancel an order
router.patch('/cancel/:orderId', protect, cancelOrderController);
// Route to handle M-Pesa callback
router.post('/mpesa-callback', processMpesaCallback);

export default router;
