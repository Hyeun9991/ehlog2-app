import express from 'express';
const router = express.Router();
import {
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postControllers.js';
import { authGuard, adminGuard } from '../middleware/authMiddleware';

// POST create post
router.post('/', authGuard, adminGuard, createPost);

// PUT update post, DELETE delete post
router
  .route('/:slug')
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost);

export default router;
