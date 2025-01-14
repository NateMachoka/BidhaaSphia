import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { connectRedis } from './config/redis.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import professionalRoutes from './routes/professionalRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // Parse JSON requests

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies or authentication credentials
};

// Serve static files from uploads with Cache-Control headers
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
      // Set Cache-Control headers
      const maxAge = 60 * 60 * 24 * 365; // Cache for 1 year
      res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    },
  })
);

app.use(cors(corsOptions)); // Enable CORS

// Middleware to ensure MongoDB and Redis are connected
app.use(async (req, res, next) => {
  try {
    await connectDB(); // Ensures MongoDB is connected
    await connectRedis(); // Ensures Redis is connected
    next();
  } catch (error) {
    res.status(500).json({ message: 'Failed to initialize services', error: error.message });
  }
});

// Health check endpoint
app.get('/', (req, res) => res.send('Welcome to BidhaaSphia!'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/professionals', professionalRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
