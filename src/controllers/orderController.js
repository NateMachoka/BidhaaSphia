import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { redisClient } from '../config/redis.js';

const placeOrderController = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { id: userId } = req.user;

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

      console.log(`Before update: ${product.name}, stock: ${product.stock}`);
      product.stock -= quantity;
      console.log(`After update: ${product.name}, stock: ${product.stock}`);

      if (product.stock < 0) {
        product.stock = 0;
      }

      try {
        await product.save();
      } catch (error) {
        throw new Error(`Failed to save product ${product.name}: ${error.message}`);
      }

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

    res.status(201).json({ message: 'Order placed successfully.', order });
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

export { placeOrderController, viewOrdersController, cancelOrderController };
