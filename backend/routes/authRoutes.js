import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();

// Auth controller functions
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);


export default router;