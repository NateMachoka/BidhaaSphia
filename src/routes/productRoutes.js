import express from 'express';
import { upload } from '../middlewares/upload.js';
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
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Search route
router.route('/search').get(searchProductsByName); // Public: Search products by name

router.route('/').get(getProducts); // Public: View all products
router.get('/top-deals', getTopDeals);
router.get('/most-popular', getMostPopular);
router.route('/:id').get(getProductById); // Public: View a specific product

// CRUD Operations
router.route('/')
  .post(protect, authorize('admin'), upload.single('image'), createProduct) // Admin-only access to create
  .put(protect, authorize('admin'), updateProduct) // Admin-only access to update
  .delete(protect, authorize('admin'), deleteProduct); // Admin-only access to delete

export default router;
