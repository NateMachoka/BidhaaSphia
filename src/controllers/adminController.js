import User from '../models/User.js';
import { validationResult } from 'express-validator';
import logger from '../utils/logger.js';

// List all users (Admin only)
export const listUsers = async (req, res) => {
  try {
    // Fetch all users except their passwords
    const users = await User.find({}, '-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    logger.error('Error listing users:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete a user by ID (Admin only)
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Validate the ID parameter
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    // Prevent admin from deleting themselves
    if (req.user.id === id) {
      return res.status(400).json({ success: false, message: 'Admins cannot delete themselves.' });
    }

    // Find the user to delete
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Prevent deletion of other admins
    if (userToDelete.role === 'admin') {
      return res.status(403).json({ success: false, message: 'Admins cannot delete other admins.' });
    }

    // Delete the user
    await User.findByIdAndDelete(id);
    logger.info(`User with ID ${id} deleted by Admin ID ${req.user.id}`);
    res.status(200).json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    logger.error('Error deleting user:', error.message);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
