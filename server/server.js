import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Increase payload limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// CORS configuration - Allow all origins
app.use(cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}));

// Handle preflight requests for all routes
app.options('*', cors());

// API Endpoints
app.get('/', (req, res) => {
    res.send("API Working");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        database: dbStatus,
        uptime: process.uptime(),
    });
});

// For Vercel deployment, export the app instance
export default app;

// Connect to database when not on Vercel
if (process.env.VERCEL !== '1') {
  const startServer = async () => {
    try {
      await connectDB();
      
      const server = app.listen(port, '0.0.0.0', () => {
          console.log(`Server started on PORT: ${port}`);
      });

      // Handle server errors
      server.on('error', (error) => {
          console.error('Server error:', error.message);
          process.exit(1);
      });

      // Graceful shutdown
      const shutdown = () => {
          console.log('Shutting down gracefully...');
          server.close(() => {
              console.log('Process terminated');
              process.exit(0);
          });
      };

      process.on('SIGTERM', shutdown);
      process.on('SIGINT', shutdown);

    } catch (error) {
      console.error('Failed to start server:', error.message);
      process.exit(1);
    }
  };

  startServer();
}