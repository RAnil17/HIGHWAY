"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JWTService {
    constructor() {
        this.secret = process.env.JWT_SECRET || 'fallback-secret-key';
        this.expiresIn = process.env.JWT_EXPIRES_IN || '7d';
    }
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }
    verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secret);
            return decoded;
        }
        catch (error) {
            console.error('JWT verification error:', error);
            return null;
        }
    }
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    getOTPExpiryTime() {
        const expiryTime = parseInt(process.env.OTP_EXPIRES_IN || '300000'); // 5 minutes default
        return new Date(Date.now() + expiryTime);
    }
}
exports.default = new JWTService();
//# sourceMappingURL=jwtService.js.map