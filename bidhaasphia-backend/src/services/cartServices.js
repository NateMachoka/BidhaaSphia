import { redisClient } from '../config/redis.js';
import Product from '../models/Product.js';

const CART_PREFIX = 'cart:';

// Add an item to the cart
export const addToCart = async (userId, productId, quantity) => {
  try {
    if (!userId || !productId || quantity === undefined) {
      throw new Error('Invalid inputs. userId, productId, and quantity are required.');
    }

    // Fetch the product from the database, including stock
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Ensure that the quantity being added doesn't exceed available stock
    if (quantity > product.stock) {
      throw new Error(`Cannot add more than ${product.stock} units to the cart. Only ${product.stock} units are available.`);
    }

    const cartKey = `${CART_PREFIX}${userId}`;
    const currentQuantity = (await redisClient.hGet(cartKey, productId)) || 0;
    const newQuantity = parseInt(currentQuantity, 10) + parseInt(quantity, 10); // Added radix

    // Ensure that we don't end up with negative quantities
    if (newQuantity <= 0) {
      await redisClient.hDel(cartKey, productId);
    } else {
      await redisClient.hSet(cartKey, productId, newQuantity);
    }

    // Return the product name along with the updated quantity
    return { name: product.name, quantity: newQuantity };
  } catch (err) {
    console.error(`Error adding to cart for user ${userId}:`, err.message);
    throw err;
  }
};

// View the cart for a user
export const viewCart = async (userId) => {
  try {
    if (!userId) throw new Error('User ID is required to view cart.');

    const cartKey = `${CART_PREFIX}${userId}`;
    const cartItems = await redisClient.hGetAll(cartKey);

    // Fetch product details for each productId in the cart
    const productsInCart = await Promise.all(
      Object.entries(cartItems).map(async ([productId, quantity]) => {
        const product = await Product.findById(productId);
        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }

        return {
          productId,
          name: product.name,
          quantity: parseInt(quantity, 10), // Added radix
        };
      }),
    );

    return productsInCart;
  } catch (err) {
    console.error(`Error viewing cart for user ${userId}:`, err.message);
    throw err;
  }
};

// Remove an item from the cart
export const removeFromCart = async (userId, productId) => {
  try {
    if (!userId || !productId) {
      throw new Error('User ID and product ID are required to remove item from cart.');
    }

    const cartKey = `${CART_PREFIX}${userId}`;
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    // Remove the product from the cart
    await redisClient.hDel(cartKey, productId);

    // Return a formatted string
    return `${product.name}`;
  } catch (err) {
    console.error(`Error removing product ${productId} from cart for user ${userId}:`, err.message);
    throw err;
  }
};

export const removeAllFromCart = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required to clear the cart.');
    }

    const cartKey = `${CART_PREFIX}${userId}`;
    const isDeleted = await redisClient.del(cartKey); // Delete the entire cart from Redis

    if (isDeleted === 0) {
      throw new Error('Cart not found for this user.');
    }

    return 'All items'; // Return a success message
  } catch (err) {
    console.error(`Error clearing cart for user ${userId}:`, err.message);
    throw err;
  }
};
