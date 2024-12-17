import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { connectRedis } from './config/redis.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Initialize Redis and MongoDB
connectDB();
connectRedis();

// Health check endpoint
app.get('/', (req, res) => res.send('Welcome to BidhaaSphia!'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
