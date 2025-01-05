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

// Public routes
router.route('/search').get(searchProductsByName);
router.route('/').get(getProducts);
router.get('/top-deals', getTopDeals);
router.get('/most-popular', getMostPopular);
router.route('/:id').get(getProductById);

// Admin routes
router.route('/')
  .post(protect, authorize('admin'), upload.single('image'), createProduct) // Create product
  .put(protect, authorize('admin'), updateProduct); // Update product

router.route('/:id')
  .delete(protect, authorize('admin'), deleteProduct); // Delete product

export default router;
