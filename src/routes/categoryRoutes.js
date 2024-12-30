import express from 'express';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin'), createCategory) // Admin-only: Create a new category
  .get(getCategories); // Public: Fetch all categories

export default router;
