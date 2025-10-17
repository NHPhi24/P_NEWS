import express from 'express';
import { isAuthenticated, isAuthorOrAdmin } from '../middleware/authMiddleware.js';
import { getAuthorStats, getAuthorNews } from '../controllers/authorDashboardController.js';
const router = express.Router();

router.get("/stats", isAuthenticated, isAuthorOrAdmin, getAuthorStats )
router.get("/news", isAuthenticated, isAuthorOrAdmin, getAuthorNews )

export default router;