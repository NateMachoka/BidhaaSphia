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
      console.log('Extracted Token:', token);
      // Decode the token and verify it using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT:', decoded);
      // Attach the user data (excluding password) to the request object
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password field for security

      if (!req.user) {
        res.status(401).json({ success: false, message: 'User not found' });
        return;
      }
      console.log('Authenticated User:', req.user);

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

// Authorize user roles (e.g., admin only
const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  if (!roles.includes(req.user.role)) {
    console.error(`User role ${req.user.role} not authorized`);
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

// Refresh token route
const refreshToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  // Check if refresh token exists
  if (!token) {
    console.log('No refresh token provided');
    return res.status(400).json({ success: false, message: 'No refresh token provided' });
  }

  try {
    // Verify refresh token
    console.log('Verifying refresh token...');
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // Find the user associated with the refresh token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Issue a new access token
    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }, // Access token expiration time
    );

    // Return the new access token
    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error('Error verifying refresh token:', error);
    res.status(403).json({ success: false, message: 'Invalid refresh token' });
  }
});

export { protect, authorize, refreshToken };
