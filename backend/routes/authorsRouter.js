import express from 'express';
import { createAuthor, 
    getAllAuthors, 
    getAuthorById, 
    updateAuthor, 
    deleteAuthor } from '../controllers/authorsController.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
// Admin only routes
router.post("/", isAuthenticated, isAdmin, createAuthor);
router.put("/:id",isAuthenticated, isAdmin, updateAuthor);
router.delete("/:id",isAuthenticated, isAdmin, deleteAuthor);
export default router;