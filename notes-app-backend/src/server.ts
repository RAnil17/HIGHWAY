import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import notesRoutes from './routes/notesRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = parseInt(process.env.PORT || '5001', 10);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️  Server will continue running without database connection');
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Notes App Backend is running! 🚀',
    timestamp: new Date().toISOString(),
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Notes App Backend API! 📝',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: {
        signup: 'POST /api/auth/signup',
        verifyOTP: 'POST /api/auth/verify-otp',
        googleAuth: 'POST /api/auth/google',
        login: 'POST /api/auth/login',
        resendOTP: 'POST /api/auth/resend-otp'
      },
      notes: {
        create: 'POST /api/notes (content)',
        getAll: 'GET /api/notes',
        delete: 'DELETE /api/notes/:id'
      }
    }
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server always (regardless of MongoDB connection)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Notes App Backend server is running on http://localhost:${PORT}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/health`);
  console.log(`📧 Auth Endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`📝 Notes Endpoints: http://localhost:${PORT}/api/notes`);
  
  // Connect to MongoDB after server starts
  connectDB();
});

export default app;
