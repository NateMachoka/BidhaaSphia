import express from 'express';
import { createCategory, getCategories, getCategoryById } from '../controllers/categoryController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, authorize('admin'), createCategory) // Admin-only: Create a new category

 // Public: Fetch all categories
router.route('/').get(getCategories);
router.route('/:id').get(getCategoryById);

export default router;
