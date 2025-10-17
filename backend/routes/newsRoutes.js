
import express from 'express';
import { getAllNews, 
    createNews, 
    getNewsById, 
    updateNews,
    deleteNews,
    getNewsByCategory,
    getHotNews } from '../controllers/newsController.js';
import { isAdmin, isAuthenticated, isAuthorOrAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
// ⚙️ Admin-only
router.post('/', isAuthenticated, isAdmin, createNews);

// ⚙️ Public routes
router.get('/hot', getHotNews); // 🔥 đặt trước /:id
router.get('/category/:categoryId', getNewsByCategory);
router.get('/', getAllNews);
router.get('/:id', getNewsById);

// ⚙️ Author & Admin
router.put('/:id', isAuthenticated, isAuthorOrAdmin, updateNews);
router.delete('/:id', isAuthenticated, isAuthorOrAdmin, deleteNews);

export default router;
