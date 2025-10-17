import express from 'express';
import { addCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory } from '../controllers/categoriesController.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();

// user routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
// admin only routes
router.post("/",isAuthenticated, isAdmin, addCategory);
router.put("/:id",isAuthenticated, isAdmin, updateCategory);
router.delete("/:id",isAuthenticated, isAdmin, deleteCategory);

export default router;