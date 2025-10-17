import express from 'express';
import { getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser } from '../controllers/usersController.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();
// Admin only route
router.get("/",isAuthenticated, isAdmin, getAllUsers);
router.delete("/:id",isAuthenticated, isAdmin, deleteUser);
//user routes
router.get("/:id",isAuthenticated, getUserById);
router.put("/:id",isAuthenticated, updateUser);


export default router;