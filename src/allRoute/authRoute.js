const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../adminController/authController');
const { isNotAuthenticated } = require('../middleware/authMiddleware')


router.get('/', isNotAuthenticated, authController.loginPage);

router.get('/auth/google', (req, res, next) => {
	passport.authenticate('google', {
		scope: [
			'email',
			'profile'
		],
		accessType: 'offline',
		prompt: 'consent'
	})(req, res, next);
});

router.get('/auth/google/callback', (req, res, next) => {
	passport.authenticate('google', {
		successRedirect: '/success',
		failureRedirect: '/failure',
		failureFlash: true
	})(req, res, next);
});

router.post("/employee-loginPage", authController.employeeLogin)

// Forgot Password API
router.get("/get-forgot-password", authController.getForgotPassword)
router.post("/otp-send-email", authController.OTPSendEmail)
router.post("/verify-otp-password", authController.verifyOTPPassword)
router.post("/reset-password", authController.resetPassword)

router.get('/success', authController.successGoogleLogin);

router.get('/failure', authController.failureGoogleLogin);

router.get('/get-admin-email', authController.getAdminEmail);

router.get('/get-admin-email-otp', authController.getAdminEmailOtp);

router.get('/verify-otp', authController.verifyOTP);

router.get('/logout', authController.logout);

module.exports = router;