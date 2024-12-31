import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { authenticate, authorize, publicRoute, protectedRoute, adminOnlyRoute } from '../middlewares/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/public', publicRoute);
router.put('/profile', protect, updateUserProfile);
router.get('/profile', protect, getUserProfile);

// Protected routes
router.get('/protected', authenticate, protectedRoute);

// Admin-only routes
router.get('/admin-only', authenticate, authorize('admin'), adminOnlyRoute);

export default router;
