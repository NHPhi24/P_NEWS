import express from 'express';
import { isAuthenticated, isAuthorOrAdmin } from '../middleware/authMiddleware.js';
import { getAuthorStats, getAuthorNews } from '../controllers/authorDashboardController.js';
import { createNews, updateNews, deleteNews } from '../controllers/newsController.js';
const router = express.Router();

router.get("/stats", isAuthenticated, isAuthorOrAdmin, getAuthorStats )
router.get("/news", isAuthenticated, isAuthorOrAdmin, getAuthorNews )
router.get("/profile", isAuthenticated, isAuthorOrAdmin, getAuthorNews )
// CRUD news
router.post("/news", isAuthenticated, isAuthorOrAdmin, createNews )
router.put("/news/:id", isAuthenticated, isAuthorOrAdmin, updateNews )
router.delete("/news/:id", isAuthenticated, isAuthorOrAdmin, deleteNews )
export default router;