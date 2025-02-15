import express from "express";
import authController from '../controllers/auth/index.js';

const router = express.Router();

router.post('/send-code',authController.sendCode);
router.post('/verify-code',authController.verifyCode);
router.post('/register',authController.registerUser);

export default router;