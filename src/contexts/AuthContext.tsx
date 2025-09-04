import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password
      const mockUser: User = {
        id: '1',
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        avatar: undefined
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success('Login successful! Welcome to the demo!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // Mock signup - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Account created successfully! Please verify your email.');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Mock Google login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '2',
        email: 'demo@gmail.com',
        name: 'Demo User',
        avatar: undefined
      };
      
      const mockToken = 'mock-google-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success('Google login successful! Welcome to the demo!');
    } catch (error) {
      toast.error('Google login failed. Please try again.');
      throw error;
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      // Mock OTP verification - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit OTP
      if (otp.length === 6 && /^\d{6}$/.test(otp)) {
        const mockUser: User = {
          id: '3',
          email: email,
          name: email.split('@')[0],
          avatar: undefined
        };
        
        const mockToken = 'mock-otp-token-' + Date.now();
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success('Email verified successfully! Welcome to the demo!');
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      toast.error('OTP verification failed. Please try again.');
      throw error;
    }
  };

  const sendOTP = async (email: string) => {
    try {
      // Mock OTP sending - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('OTP sent to your email! (Demo: Use any 6-digit number)');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully!');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    signup,
    loginWithGoogle,
    logout,
    verifyOTP,
    sendOTP,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
