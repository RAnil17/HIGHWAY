# Notes App Backend API

A robust backend API for the Notes App built with Express.js, TypeScript, and MongoDB.

## 🚀 Features

- **Authentication System**
  - Email + OTP signup flow
  - Google OAuth integration
  - JWT-based authentication
  - Secure password hashing with bcrypt

- **Email Services**
  - OTP delivery via nodemailer
  - Welcome emails
  - Professional HTML email templates

- **Database**
  - MongoDB with Mongoose ODM
  - User management
  - Secure data storage

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT, bcrypt
- **Email**: Nodemailer
- **Development**: ts-node-dev

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Gmail account for email services

## 🚀 Installation

1. **Clone the repository**
   ```bash
   cd notes-app-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app
   PORT=5001
   JWT_SECRET=your-super-secret-jwt-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | User registration with email + password |
| POST | `/api/auth/verify-otp` | Verify OTP and complete registration |
| POST | `/api/auth/google` | Google OAuth authentication |
| POST | `/api/auth/login` | Login with email + OTP |
| POST | `/api/auth/resend-otp` | Resend OTP to email |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health status |
| GET | `/` | API documentation |

### Notes (Protected with JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/notes` | Create a new note (content only) |
| GET | `/api/notes` | Get all notes for authenticated user |
| DELETE | `/api/notes/:id` | Delete note by ID |

## 🔐 Authentication Flow

### Email + OTP Signup
1. User submits email + password → `POST /api/auth/signup`
2. System generates OTP and sends via email
3. User verifies OTP → `POST /api/auth/verify-otp`
4. Account created and JWT token returned

### Google OAuth
1. User authenticates with Google
2. Client sends Google token + user info → `POST /api/auth/google`
3. System creates/updates user account
4. JWT token returned

### Login
1. User requests OTP for login → `POST /api/auth/resend-otp`
2. System sends OTP via email
3. User submits OTP → `POST /api/auth/login`
4. JWT token returned

## 🗄️ Database Schema

### User Model
```typescript
{
  email: string (required, unique)
  password: string (optional, if using OTP/Google)
  googleId: string (optional)
  otp: string (temporary OTP storage)
  createdAt: Date
  updatedAt: Date
}
```

### Note Model
```typescript
{
  userId: ObjectId (reference to User)
  content: string (required)
  createdAt: Date
  updatedAt: Date
}
```

## 🔧 Development

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Project Structure
```
src/
├── controllers/     # Request handlers
├── models/         # Database models
├── middleware/     # Custom middleware (JWT auth)
├── routes/         # API routes
├── services/       # Business logic
└── server.ts       # Main server file
```

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate App Password
3. Use App Password in `.env` file

### Email Templates
- OTP emails with professional design
- Welcome emails for new users
- Responsive HTML layouts

## 🔒 Security Features

- **Password Security**: Hash passwords with bcryptjs (if storing them)
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware protection for sensitive endpoints
- **CORS Configuration**: Cross-origin resource sharing security
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Clear error messages (Invalid OTP, JWT expired, etc.)
- **Environment Variables**: Use .env for secrets (JWT_SECRET, EMAIL creds, Google OAuth keys)
- **Secure MongoDB Connection**: Encrypted database connections

## 📝 Notes API Usage

### Create Note
```bash
POST /api/notes
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "content": "Your note content here"
}
```

### Get Notes
```bash
GET /api/notes
Authorization: Bearer <jwt-token>
```

### Delete Note
```bash
DELETE /api/notes/:id
Authorization: Bearer <jwt-token>
```

## 🔐 JWT Authentication Usage

### Protected Routes
All notes endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Token Format
- **Header**: `Authorization: Bearer <token>`
- **Token**: JWT token received from login/signup endpoints
- **Expiry**: Tokens expire after 24 hours by default

### Error Handling Examples
```json
// Invalid OTP
{
  "success": false,
  "message": "Invalid OTP"
}

// JWT Expired
{
  "success": false,
  "message": "Invalid or expired token"
}

// Unauthorized Access
{
  "success": false,
  "message": "Access token required"
}
```

## 🚀 Deployment

1. Build the project: `npm run build`
2. Set production environment variables
3. Start server: `npm start`
4. Ensure MongoDB connection is accessible

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `PORT` | Server port | No (default: 5001) |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRES_IN` | JWT expiration time | No (default: 7d) |
| `EMAIL_USER` | Gmail username | Yes |
| `EMAIL_PASS` | Gmail app password | Yes |
| `EMAIL_FROM` | Sender email address | Yes |
| `OTP_EXPIRES_IN` | OTP expiration time (ms) | No (default: 300000) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
