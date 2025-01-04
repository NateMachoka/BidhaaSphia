import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProductsByName,
  getTopDeals,
  getMostPopular,
} from '../controllers/productController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js'; // Ensure authenticated routes

const router = express.Router();

// search route
router.route('/search').get(searchProductsByName); // Public: Search products by name

// CRUD Operations
router.route('/')
  .post(protect, authorize('admin'), createProduct) // Admin-only access to create products
    .get(getProducts); // Public: View all products
router.get('/top-deals', getTopDeals);
router.get('/most-popular', getMostPopular);

router.route('/:id')
  .get(getProductById) // Public: View a specific product
  .put(protect, authorize('admin'), updateProduct) // Admin-only access to update
  .delete(protect, authorize('admin'), deleteProduct); // Admin-only access to delete

export default router;
