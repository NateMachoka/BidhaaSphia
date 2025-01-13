import { initiateMPesaPayment, validateMPesaPayment, } from '../services/paymentService.js';
import Order from '../models/Order.js';

export const initializePayment = async (req, res) => {
  try {
    const { paymentMethod, phoneNumber } = req.body;
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order || order.status !== 'Pending') {
      return res.status(400).json({ message: 'Order not found or already processed.' });
    }

    let paymentResponse;

    if (paymentMethod === 'MPesa') {
      paymentResponse = await initiateMPesaPayment(order, phoneNumber);
    } else {
      return res.status(400).json({ message: 'Unsupported payment method.' });
    }

    res.status(200).json({ message: 'Payment initiated.', paymentResponse });
  } catch (error) {
    console.error('Error initializing payment:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const validatePayment = async (req, res) => {
  try {
    const { transactionId, paymentMethod } = req.body;
    const { id: orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order || order.status !== 'Pending') {
      return res.status(400).json({ message: 'Order not found or already processed.' });
    }

    let isValid;

    if (paymentMethod === 'MPesa') {
      isValid = await validateMPesaPayment(transactionId);
    } else {
      return res.status(400).json({ message: 'Unsupported payment method.' });
    }

    if (isValid) {
      order.status = 'Completed';
      await order.save();

      res.status(200).json({ message: 'Payment validated and order completed.' });
    } else {
      res.status(400).json({ message: 'Payment validation failed.' });
    }
  } catch (error) {
    console.error('Error validating payment:', error.message);
    res.status(500).json({ message: error.message });
  }
};
