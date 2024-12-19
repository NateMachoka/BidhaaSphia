import { addToCart, viewCart, removeFromCart } from '../services/cartServices.js';

export const addToCartController = async (req, res) => {
  try {
    // Check if userId is present in req.user
    if (!req.user || !req.user.id) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    const { id: userId } = req.user; // Access user ID from the decoded token
    const { productId, quantity } = req.body;

    // Check if productId and quantity are provided
    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: 'Product ID and quantity are required.' });
    }

    const { name } = await addToCart(userId, productId, quantity); // Use extracted userId
    res.status(200).json({ success: true, message: `${name} has been added to the cart.` });
  } catch (err) {
    console.error('Error in addToCartController:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const viewCartController = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const cart = await viewCart(userId); // Fetch cart for the user
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    console.error('Error in viewCartController:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const removeFromCartController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { productId } = req.body;

    const name = await removeFromCart(userId, productId); // Remove product from the cart
    res.status(200).json({ success: true, message: `${name} has been removed from the cart.` });
  } catch (err) {
    console.error('Error in removeFromCartController:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
