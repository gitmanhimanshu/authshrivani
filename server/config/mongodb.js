import mongoose from "mongoose";

const connectDB = async () => {
  try {
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

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;