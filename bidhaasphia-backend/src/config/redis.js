import { createClient } from 'redis';

// Track Redis connection status
let redisConnected = false;
const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on('error', (err) => console.error('Redis error:', err));

const connectRedis = async () => {
  if (!redisConnected) {
    try {
      await redisClient.connect();
      redisConnected = true; // Set connection status
      console.log('Redis connected successfully');
    } catch (err) {
      console.error('Redis connection failed:', err.message);
      process.exit(1); // Exit on failure
    }
  }
};

export { redisClient, connectRedis };
