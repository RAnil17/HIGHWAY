"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
    async sendOTP(email, otp) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Your OTP for Notes App',
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">Notes App Verification</h2>
            <p>Hello!</p>
            <p>Your OTP for email verification is:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #3b82f6; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            <p>This OTP will expire in 5 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">Notes App Team</p>
          </div>
        `
            };
            await this.transporter.sendMail(mailOptions);
            return true;
        }
        catch (error) {
            console.error('Email sending error:', error);
            return false;
        }
    }
    async sendWelcomeEmail(email) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Welcome to Notes App!',
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">Welcome to Notes App! 🎉</h2>
            <p>Hello!</p>
            <p>Your account has been successfully created and verified.</p>
            <p>You can now start using our app to create and manage your notes.</p>
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0369a1; margin-top: 0;">Getting Started:</h3>
              <ul style="color: #0c4a6e;">
                <li>Create your first note</li>
                <li>Organize notes with categories</li>
                <li>Share notes with others</li>
              </ul>
            </div>
            <p>Happy note-taking!</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">Notes App Team</p>
          </div>
        `
            };
            await this.transporter.sendMail(mailOptions);
            return true;
        }
        catch (error) {
            console.error('Welcome email sending error:', error);
            return false;
        }
    }
}
exports.default = new EmailService();
//# sourceMappingURL=emailService.js.map