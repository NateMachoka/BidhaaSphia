import app from '../app.js';
import connectDB from '../config/db.js';
import { connectRedis } from '../config/redis.js';

if (process.env.NODE_ENV !== 'production') {
  // Local testing with Express
  const PORT = process.env.PORT || 5000;

  // Ensure MongoDB and Redis are connected
  const startServer = async () => {
    try {
      await connectDB(); // Connect to MongoDB
      await connectRedis(); // Connect to Redis
      app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
      });
    } catch (error) {
      console.error('Failed to initialize services:', error.message);
      process.exit(1); // Exit if services fail to connect
    }
  };

  startServer();
} else {
  // Vercel serverless function
  export default async (req, res) => {
    await app.handle(req, res);
  };
}
