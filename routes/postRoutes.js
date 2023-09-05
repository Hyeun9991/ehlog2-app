import express from 'express';
const router = express.Router();
import { createPost, updatePost } from '../controllers/postControllers.js';
import { authGuard, adminGuard } from '../middleware/authMiddleware';

// POST
router.post('/', authGuard, adminGuard, createPost);

// PUT
router.put('/:slug', authGuard, adminGuard, updatePost);

export default router;
