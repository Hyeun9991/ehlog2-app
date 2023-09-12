import express from 'express';
const router = express.Router();
import { authGuard } from '../middleware/authMiddleware.js';
import {
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/commentControllers.js';

// POST create comment
router.post('/', authGuard, createComment);

// PUT update comment & DELETE delete comment
router
  .route('/:commentId')
  .put(authGuard, updateComment)
  .delete(authGuard, deleteComment);

export default router;
