"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Auth Routes
router.post('/signup', authController_1.signup);
router.post('/verify-otp', authController_1.verifyOTP);
router.post('/google', authController_1.googleAuth);
router.post('/login', authController_1.login);
router.post('/resend-otp', authController_1.resendOTP);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map