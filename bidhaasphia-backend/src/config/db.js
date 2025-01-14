import mongoose from 'mongoose';

// Track connection status
let dbConnected = false;

const connectDB = async () => {
  if (!dbConnected) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      dbConnected = true; // Set connection status
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1); // Exit on failure
    }
  }
};

export default connectDB;
