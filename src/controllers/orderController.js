import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { redisClient } from '../config/redis.js';
import { initiateMPesaPayment } from '../services/paymentService.js';

const placeOrderController = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { id: userId } = req.user;
    const { phoneNumber } = req.body; // Add phoneNumber for MPesa

    const cartKey = `cart:${userId}`;
    const cartItems = await redisClient.hGetAll(cartKey);
    console.log("Cart items:", cartItems);

    if (!cartItems || Object.keys(cartItems).length === 0) {
      return res.status(400).json({ message: 'Your cart is empty.' });
    }

    const productIds = Object.keys(cartItems);
    const productDetails = await Product.find({ _id: { $in: productIds } });

    const productUpdates = productDetails.map(async (product) => {
      const quantity = parseInt(cartItems[product._id], 10);

      if (isNaN(quantity) || quantity <= 0) {
        throw new Error(`Invalid quantity for ${product.name}.`);
      }

      if (product.stock < quantity) {
        throw new Error(`Insufficient stock for ${product.name}.`);
      }

      product.stock -= quantity;
      product.stock = Math.max(0, product.stock);

      await product.save();

      return {
        productId: product._id,
        quantity,
        totalCost: product.price * quantity,
      };
    });

    const updatedProducts = await Promise.all(productUpdates);

    const products = updatedProducts.map(({ productId, quantity }) => ({ productId, quantity }));
    const totalPrice = updatedProducts.reduce((sum, { totalCost }) => sum + totalCost, 0);

    const order = new Order({
      userId,
      products,
      totalPrice,
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await order.save();

    await redisClient.del(cartKey);

    // Initiate MPesa payment
    const paymentResponse = await initiateMPesaPayment(order, phoneNumber);

    res.status(201).json({
      message: 'Order placed successfully. Payment initiated.',
      order,
      paymentResponse,
    });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const viewOrdersController = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

const cancelOrderController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { orderId } = req.params;
    const { reason } = req.body;

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Only pending orders can be cancelled.' });
    }

    // Use Promise.all to handle all async operations in parallel
    await Promise.all(
      order.products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }),
    );

    order.status = 'Cancelled';
    order.cancellationReason = reason || 'No reason provided';
    order.updatedAt = new Date();
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully.',
      order,
    });
  } catch (error) {
    console.error('Error cancelling order:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

const processMpesaCallback = async (req, res) => {
  try {
    const callbackData = req.body;

    // Log the data for debugging
    console.log('M-Pesa Callback Data:', callbackData);

    // Extract relevant data from callback
    const resultCode = callbackData.Body.stkCallback.ResultCode; // 0 is success, others are failure
    const resultDesc = callbackData.Body.stkCallback.ResultDesc;
    const transactionId = callbackData.Body.stkCallback.TransactionID;
    const amount = callbackData.Body.stkCallback.Amount;
    const phoneNumber = callbackData.Body.stkCallback.PhoneNumber;

    // Find the order using the transactionId
    const order = await Order.findOne({ transactionId });

    if (!order) {
      return res.status(404).send('Order not found');
    }

    if (resultCode === 0) {
      // Payment successful
      order.status = 'Paid';
      order.paymentDetails = {
        transactionId,
        amount,
        phoneNumber,
        resultDesc,
      };
      await order.save();
      console.log('Payment successful, order updated:', order);
    } else {
      // Payment failed
      order.status = 'Failed';
      order.paymentDetails = {
        transactionId,
        resultDesc,
      };
      await order.save();
      console.log('Payment failed:', resultDesc);
    }

    // Send response back to M-Pesa with status 200 to acknowledge receipt
    res.status(200).send('Callback processed successfully');
  } catch (error) {
    console.error('Error processing callback:', error);
    res.status(500).send('Internal Server Error');
  }
};

export {
  placeOrderController, viewOrdersController, cancelOrderController, processMpesaCallback,
};
