import express from 'express';
import {
  loginUser,
  registerUser,
  userProfile,
} from '../controllers/userControllers';
const router = express.Router();
import { authGuard } from '../middleware/authMiddleware';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authGuard, userProfile);

export default router;
