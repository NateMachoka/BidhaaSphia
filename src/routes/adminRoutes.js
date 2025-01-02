import express from 'express';
import { listUsers, deleteUser } from '../controllers/adminController.js';
import { validateUserId } from '../middlewares/validator.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// List all users (Admin only)
router.get('/users', protect, authorize('admin'), listUsers);

// Delete a user by ID (Admin only)
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

export default router;
