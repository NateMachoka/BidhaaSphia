import dotenv from 'dotenv';
import app from '../app.js'; // Import the Express app
import connectDB from '../config/db.js'; // MongoDB connection
import { connectRedis } from '../config/redis.js'; // Redis connection

// Load environment variables
dotenv.config({ path: '.env.development' });

if (process.env.NODE_ENV === 'production') {
  // For production (serverless on Vercel)
  module.exports = async (req, res) => {
    try {
      // Ensure MongoDB and Redis are connected
      await connectDB();
      await connectRedis();
      // Use Express's handle method for serverless functions
      app(req, res);
    } catch (error) {
      console.error('Error handling request:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

} else {
  // For local development (non-serverless)
  const PORT = process.env.PORT || 5000;

  const startServer = async () => {
    try {
      // Connect to MongoDB and Redis
      await connectDB();
      await connectRedis();
      // Start Express server locally
      app.listen(PORT, () => {
        console.log(`Development server running at http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to initialize services:', error.message);
      process.exit(1);
    }
  };

  startServer();
}
