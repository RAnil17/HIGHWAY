import { Router } from 'express';
import {
  signup,
  verifyOTP,
  googleAuth,
  login,
  resendOTP
} from '../controllers/authController';

const router = Router();

// Auth Routes
router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/google', googleAuth);
router.post('/login', login);
router.post('/resend-otp', resendOTP);

export default router;


