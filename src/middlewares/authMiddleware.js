import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - ensure the user is authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the Authorization header is present and contains a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from the Authorization header
      [, token] = req.headers.authorization.split(' ');
      // Decode the token and verify it using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user data (excluding password) to the request object
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password field for security

      if (!req.user) {
        res.status(401).json({ success: false, message: 'User not found' });
        return;
      }

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
  } else {
    // If no token is provided, return an error
    res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
});

// Authorize user roles (e.g., admin only)
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(403).json({ success: false, message: 'User role not authorized for this action' });
    return;
  }
  next();
};

export { protect, authorize };
