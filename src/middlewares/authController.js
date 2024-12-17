import jwt from 'jsonwebtoken';

// Middleware to authenticate users
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded token data to req.user
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

// Middleware to authorize roles (e.g., admin)
export const authorize = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ error: 'Access denied. Admins only' });
  }
  next();
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
