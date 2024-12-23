import {
  addToCart, viewCart, removeFromCart, removeAllFromCart,
} from '../services/cartServices.js';

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

    // Add to cart and handle possible stock errors
    const { name, quantity: updatedQuantity } = await addToCart(userId, productId, quantity);

    // Success response
    res.status(200).json({
      success: true,
      message: `${name} has been added to the cart. Current quantity: ${updatedQuantity}.`,
    });
  } catch (err) {
    console.error('Error in addToCartController:', err.message);

    // Check for specific stock-related error
    if (err.message.includes('Cannot add more than')) {
      return res.status(400).json({ success: false, message: err.message });
    }

    // Generic error message
    res.status(400).json({ success: false, message: err.message });
  }
};

export const viewCartController = async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Fetch cart for the user
    const cart = await viewCart(userId);
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

    // Remove product from the cart
    const name = await removeFromCart(userId, productId);
    res.status(200).json({ success: true, message: `${name} has been removed from the cart.` });
  } catch (err) {
    console.error('Error in removeFromCartController:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const removeAllFromCartController = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const message = await removeAllFromCart(userId); // Clear all items from the cart
    res.status(200).json({ success: true, message: `${message} have been removed from the cart.` });
  } catch (err) {
    console.error('Error in removeAllFromCartController:', err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
