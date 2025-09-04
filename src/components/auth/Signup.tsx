import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import './Auth.css';

const Signup: React.FC = () => {
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { signup, verifyOTP, sendOTP, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(formData.name, formData.email, formData.password);
      await sendOTP(formData.email);
      setStep('otp');
      toast.success('OTP sent to your email!');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setErrors({ otp: 'Please enter the OTP' });
      return;
    }

    setIsLoading(true);
    try {
      await verifyOTP(formData.email, otp);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Google signup successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await sendOTP(formData.email);
      toast.success('OTP resent successfully!');
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  const goBackToForm = () => {
    setStep('form');
    setOtp('');
    setErrors({});
  };

  return (
    <div className="auth-container">
      <div className="auth-split-layout">
        {/* Left Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-content">
            <div className="auth-header">
              <div className="auth-logo">
                <div className="logo-circle">HD</div>
              </div>
              <h1 className="auth-title">
                {step === 'form' ? 'Sign up' : 'Verify OTP'}
              </h1>
              <p className="auth-subtitle">
                {step === 'form' 
                  ? 'Create your account to get started' 
                  : `We've sent a 6-digit code to ${formData.email}`
                }
              </p>
            </div>

            {step === 'form' ? (
              <form onSubmit={handleFormSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <User size={16} />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    <Lock size={16} />
                    Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    <Shield size={16} />
                    Confirm Password
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Sign up'}
                </button>

                <div className="divider">
                  <span>or</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="google-btn"
                  disabled={isLoading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="otp" className="form-label">
                    <Shield size={16} />
                    OTP Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={`form-input ${errors.otp ? 'error' : ''}`}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    pattern="[0-9]{6}"
                  />
                  {errors.otp && <div className="error-message">{errors.otp}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <div className="otp-actions">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="btn btn-secondary btn-full"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                  
                  <button
                    type="button"
                    onClick={goBackToForm}
                    className="btn btn-secondary btn-full"
                    disabled={isLoading}
                  >
                    Back to Form
                  </button>
                </div>
              </form>
            )}

            <div className="auth-footer">
              <p>
                {step === 'form' ? (
                  <>
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">
                      Sign in
                    </Link>
                  </>
                ) : (
                  <>
                    Didn't receive the code?{' '}
                    <button
                      onClick={handleResendOTP}
                      className="auth-link"
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      Resend OTP
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Abstract Warm Background */}
        <div className="auth-background-section">
          <div className="abstract-warm-background">
            <div className="abstract-shapes">
              <div className="shape-1"></div>
              <div className="shape-2"></div>
              <div className="shape-3"></div>
              <div className="shape-4"></div>
              <div className="shape-5"></div>
            </div>
            <div className="organic-wave"></div>
            <div className="overlay-pattern"></div>
            <div className="overlay-elements">
              <div className="overlay-circle overlay-circle-1">
                <span>R</span>
              </div>
              <div className="overlay-circle overlay-circle-2">
                <span>7</span>
                <div className="mini-profile"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
