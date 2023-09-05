import express from 'express';
const router = express.Router();
import { authGuard } from '../middleware/authMiddleware.js';
import { createComment } from '../controllers/commentControllers.js';

// POST create comment
router.post('/', authGuard, createComment);

export default router;
