import express from 'express';
const router = express.Router();
import { authGuard } from '../middleware/authMiddleware.js';
import {
  createComment,
  updateComment,
} from '../controllers/commentControllers.js';

// POST create comment
router.post('/', authGuard, createComment);

// PUT update comment
router.put('/:commentId', authGuard, updateComment);

export default router;
