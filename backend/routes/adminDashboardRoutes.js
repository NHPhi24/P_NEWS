import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';
import { getAdminStats, getAdminNews, getAdminUsers, getAdminAuthors, getAdminCategories } from '../controllers/adminDashboardController.js';
import { createNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { updateUser, deleteUser } from '../controllers/usersController.js';
import { createAuthor, updateAuthor, deleteAuthor } from '../controllers/authorsController.js';
import { addCategory, updateCategory, deleteCategory } from '../controllers/categoriesController.js';
const router = express.Router();

router.get("/stats", isAuthenticated, isAdmin, getAdminStats )
router.get("/news", isAuthenticated, isAdmin, getAdminNews )
router.get("/users", isAuthenticated, isAdmin, getAdminUsers )
router.get("/authors", isAuthenticated, isAdmin, getAdminAuthors )
router.get("/categories", isAuthenticated, isAdmin, getAdminCategories )

// CRUD news 
router.post("/news", isAuthenticated, isAdmin, createNews)
router.put("/news/:id", isAuthenticated, isAdmin, updateNews)
router.delete("/news/:id", isAuthenticated, isAdmin, deleteNews)

// CRUD users
router.put("/users/:id", isAuthenticated, isAdmin, updateUser)
router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser)
// CRUD authors

router.post("/authors", isAuthenticated, isAdmin, createAuthor)
router.put("/authors/:id", isAuthenticated, isAdmin, updateAuthor)
router.delete("/authors/:id", isAuthenticated, isAdmin, deleteAuthor)
// CRUD categories

router.post("/categories", isAuthenticated, isAdmin, addCategory)
router.put("/categories/:id", isAuthenticated, isAdmin, updateCategory)
router.delete("/categories/:id", isAuthenticated, isAdmin, deleteCategory)
export default router;