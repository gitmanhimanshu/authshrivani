import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration - Allow all origins
app.use(cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());

// Handle preflight requests for all routes
app.options('*', cors());

// API Endpoints
app.get('/', (req, res) => {
    res.send("API Working");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Connect to MongoDB
connectDB().then(() => {
    const server = app.listen(port, () => {
        console.log(`Server started on PORT: ${port}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
        console.log('SIGTERM received, shutting down gracefully');
        server.close(() => {
            console.log('Process terminated');
        });
    });

    process.on('SIGINT', () => {
        console.log('SIGINT received, shutting down gracefully');
        server.close(() => {
            console.log('Process terminated');
        });
    });
}).catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
});