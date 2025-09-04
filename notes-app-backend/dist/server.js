"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const notesRoutes_1 = __importDefault(require("./routes/notesRoutes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '5001', 10);
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// MongoDB Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose_1.default.connect(mongoURI);
        console.log('✅ Connected to MongoDB successfully!');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        console.log('⚠️  Server will continue running without database connection');
    }
};
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/notes', notesRoutes_1.default);
// Health check route
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Notes App Backend is running! 🚀',
        timestamp: new Date().toISOString(),
        status: 'OK',
        database: mongoose_1.default.connection.readyState === 1 ? 'Connected' : 'Disconnected'
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
app.use((err, req, res, next) => {
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
exports.default = app;
//# sourceMappingURL=server.js.map