# Note Taking Application

A modern, full-stack note-taking application built with React TypeScript frontend and Node.js backend. Features include user authentication, OTP verification, Google OAuth, and CRUD operations for notes.

## Features

- **User Authentication**
  - Email/password signup with OTP verification
  - Google OAuth integration
  - JWT-based authentication
  - Secure login/logout functionality

- **Note Management**
  - Create, read, update, and delete notes
  - Real-time search functionality
  - Responsive grid layout
  - Inline editing capabilities

- **Modern UI/UX**
  - Mobile-responsive design
  - Clean and intuitive interface
  - Toast notifications
  - Loading states and error handling

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **CSS3** with modern styling

### Backend (Coming Soon)
- **Node.js** with TypeScript
- **Express.js** framework
- **MongoDB/PostgreSQL** database
- **JWT** authentication
- **Google OAuth** integration

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd note-taking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── Auth.css
│   ├── Dashboard.tsx   # Main dashboard component
│   └── Dashboard.css   # Dashboard styles
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── App.tsx            # Main app component
├── App.css            # App-specific styles
├── index.tsx          # Application entry point
└── index.css          # Global styles
```

## Features in Detail

### Authentication Flow

1. **Signup Process**
   - User enters name, email, and password
   - System validates input fields
   - Account is created and OTP is sent to email
   - User verifies OTP to complete registration

2. **Login Process**
   - User enters email and password
   - System validates credentials
   - JWT token is generated and stored
   - User is redirected to dashboard

3. **Google OAuth**
   - One-click Google authentication
   - Automatic account creation/login
   - Seamless user experience

### Note Management

1. **Creating Notes**
   - Click "New Note" button
   - Enter title and content
   - Save note to database

2. **Editing Notes**
   - Click edit icon on any note
   - Modify title and/or content
   - Save changes

3. **Deleting Notes**
   - Click delete icon on any note
   - Confirm deletion
   - Note is permanently removed

4. **Searching Notes**
   - Use search bar to find specific notes
   - Real-time filtering by title or content
   - Case-insensitive search

## API Endpoints (Backend Required)

The frontend expects the following API endpoints:

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP
- `GET /api/auth/google` - Google OAuth redirect

### Notes
- `GET /api/notes` - Fetch user's notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update existing note
- `DELETE /api/notes/:id` - Delete note

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

### Frontend Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel
   - Netlify
   - AWS S3
   - Firebase Hosting

### Backend Deployment

1. **Set up your backend server**
2. **Configure environment variables**
3. **Deploy to your preferred platform**
   - Heroku
   - DigitalOcean
   - AWS EC2
   - Google Cloud Platform

## Security Features

- JWT token-based authentication
- Password hashing (backend)
- Input validation and sanitization
- CORS protection (backend)
- Rate limiting (backend)

## Performance Optimizations

- Lazy loading of components
- Optimized bundle size
- Efficient state management
- Responsive image handling
- CSS optimization

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change port in package.json or kill existing process

2. **Dependencies not installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json, then reinstall

3. **Build errors**
   - Check TypeScript configuration
   - Ensure all dependencies are properly installed

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Review the browser's developer tools
3. Check the terminal for build errors
4. Create an issue in the repository

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the amazing framework
- TypeScript team for type safety
- Lucide team for beautiful icons
- React Hot Toast for notifications

## Roadmap

- [ ] Backend API development
- [ ] Database integration
- [ ] Real-time collaboration
- [ ] File attachments
- [ ] Note sharing
- [ ] Advanced search filters
- [ ] Dark mode theme
- [ ] Offline support
- [ ] Mobile app (React Native)

---

**Note**: This is the frontend part of the application. The backend API needs to be implemented to make the application fully functional.
