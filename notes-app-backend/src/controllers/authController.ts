import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import emailService from '../services/emailService';
import jwtService from '../services/jwtService';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Generate OTP
    const otp = jwtService.generateOTP();
    const otpExpires = jwtService.getOTPExpiryTime();

    // Create user with OTP
    const user = new User({
      email,
      password,
      otp
    });

    await user.save();

    // Send OTP email
    const emailSent = await emailService.sendOTP(email, otp);
    if (!emailSent) {
      // Delete user if email fails
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email'
      });
    }

    res.status(201).json({
      success: true,
      message: 'OTP sent to your email. Please verify to complete registration.',
      data: {
        email: user.email,
        userId: user._id
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Find user with OTP
    const user = await User.findOne({
      email,
      otp
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP or OTP expired'
      });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // Note: OTP expiry is handled by the service layer

    // Mark email as verified and clear OTP
    user.otp = undefined;
    await user.save();

    // Generate JWT token
    const token = jwtService.generateToken({
      userId: (user._id as any).toString(),
      email: user.email
    });

    // Send welcome email
    await emailService.sendWelcomeEmail(email);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully! Welcome to Notes App!',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { googleToken, email, googleId } = req.body;

    // Validate input
    if (!googleToken || !email || !googleId) {
      return res.status(400).json({
        success: false,
        message: 'Google token, email, and Google ID are required'
      });
    }

    // TODO: Verify Google token with Google API
    // For now, we'll trust the client data

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists, check if they have Google ID
      if (!user.googleId) {
        // Link Google account to existing email account
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // Create new user
      user = new User({
        email,
        googleId
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwtService.generateToken({
      userId: (user._id as any).toString(),
      email: user.email
    });

    res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          googleId: user.googleId
        }
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required'
      });
    }

    // Find user with OTP
    const user = await User.findOne({
      email,
      otp
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP or OTP expired'
      });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // OTP expiry is handled by the service layer

    // Clear OTP after successful login
    user.otp = undefined;
    // Clear OTP
    await user.save();

    // Generate JWT token
    const token = jwtService.generateToken({
      userId: (user._id as any).toString(),
      email: user.email
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate new OTP
    const otp = jwtService.generateOTP();
    const otpExpires = jwtService.getOTPExpiryTime();

    user.otp = otp;
    // Set OTP
    await user.save();

    // Send new OTP email
    const emailSent = await emailService.sendOTP(email, otp);
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email'
      });
    }

    res.status(200).json({
      success: true,
      message: 'New OTP sent to your email'
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
