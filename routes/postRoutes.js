import express from 'express';
const router = express.Router();
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from '../controllers/postControllers.js';
import { authGuard, adminGuard } from '../middleware/authMiddleware';

// POST create post & GET get all posts
router.route('/').post(authGuard, adminGuard, createPost).get(getAllPosts);

// PUT update post, DELETE delete post, GET get post
router
  .route('/:slug')
  .put(authGuard, adminGuard, updatePost)
  .delete(authGuard, adminGuard, deletePost)
  .get(getPost);

export default router;
