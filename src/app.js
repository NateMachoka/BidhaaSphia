import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { connectRedis } from './config/redis.js';
import userRoutes from './routes/userRoutes.js'; // Import the user routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Initialize Redis and MongoDB
connectDB();
connectRedis();

// Example health check endpoint
app.get('/', (req, res) => res.send('Welcome to BidhaaSphia!'));

// Integrate user routes here
app.use('/api/users', userRoutes);

export default app;
