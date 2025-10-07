import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if we're already connected
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    // If we're connecting or disconnecting, wait a bit
    if (mongoose.connection.readyState === 2 || mongoose.connection.readyState === 3) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // More robust connection with better timeout handling
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'auth_mern1',
      // Connection options for better reliability
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds timeout
      maxIdleTimeMS: 30000, // 30 seconds max idle time
      retryWrites: true,
      retryReads: true,
      // Remove deprecated options
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

export default connectDB;