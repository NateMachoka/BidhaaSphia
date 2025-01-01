import jwt from 'jsonwebtoken';

// Middleware to authenticate users
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('No token provided in Authorization header');
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token data to req.user
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ error: 'Token is not valid or has expired' });
  }
};

// Public route handler (no auth required)
export const publicRoute = (req, res) => {
  res.json({ message: 'This is a public route' });
};

// Protected route handler
export const protectedRoute = (req, res) => {
  res.json({ message: 'This is a protected route' });
};

// Admin-only route handler
export const adminOnlyRoute = (req, res) => {
  res.json({ message: 'Admin access only' });
};
