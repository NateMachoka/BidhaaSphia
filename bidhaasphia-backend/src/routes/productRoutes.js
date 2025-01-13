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
  getFeaturedProducts,
} from '../controllers/productController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/featured', getFeaturedProducts); // Featured products
router.route('/search').get(searchProductsByName);
router.get('/top-deals', getTopDeals);
router.get('/most-popular', getMostPopular);
router.route('/').get(getProducts); // all products
router.route('/:id').get(getProductById); // product by ID


// Admin routes
router.route('/')
  .post(protect, authorize('admin'), upload.single('image'), createProduct) // Create product
  .put(protect, authorize('admin'), updateProduct); // Update product

router.route('/:id')
  .delete(protect, authorize('admin'), deleteProduct); // Delete product

export default router;
