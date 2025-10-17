import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';
import { getAdminStats, getAdminNews, getAdminUsers, getAdminAuthors, getAdminCategories } from '../controllers/adminDashboardController.js';
const router = express.Router();

router.get("/stats", isAuthenticated, isAdmin, getAdminStats )
router.get("/news", isAuthenticated, isAdmin, getAdminNews )
router.get("/users", isAuthenticated, isAdmin, getAdminUsers )
router.get("/authors", isAuthenticated, isAdmin, getAdminAuthors )
router.get("/categories", isAuthenticated, isAdmin, getAdminCategories )
export default router;