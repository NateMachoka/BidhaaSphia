import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  placeOrderController, viewOrdersController, cancelOrderController,
} from '../controllers/orderController.js';

const router = express.Router();

// Place an order
router.post('/place', protect, placeOrderController);
// View user orders
router.get('/view', protect, viewOrdersController);
// Cancel an order
router.patch('/cancel/:orderId', protect, cancelOrderController);

export default router;
