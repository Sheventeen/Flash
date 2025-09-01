import express from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/authControllers.js';

//  creates a router for us to export and use in our server
const router = express.Router();

router.get('/check-auth', verifyAuth, checkAuth);

router.post('/signup', signup)
router.post('/login', login);
router.post('/logout', logout);

router.post('/verify-email', verifyEmail);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resetToken', resetPassword);

export default router