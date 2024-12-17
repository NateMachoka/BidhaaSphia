import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - ensure the user is authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from the authorization header
      [, token] = req.headers.authorization.split(' ');

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

// Authorize user roles (e.g., admin only)
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(403);
    throw new Error('User role not authorized for this action');
  }
  next();
};

export { protect, authorize };
