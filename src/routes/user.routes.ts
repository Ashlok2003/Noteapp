import express from 'express';
import {
  signup,
  login,
  googleLogin,
  verifyOTP,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/google', googleLogin);

export default router;
