import express from 'express';
import {
  loginUser,
  registerUser,
  updateProfile,
  updateProfilePicture,
  userProfile,
} from '../controllers/userControllers';
const router = express.Router();
import { authGuard } from '../middleware/authMiddleware';

// POST
router.post('/register', registerUser);
router.post('/login', loginUser);

// GET
router.get('/profile', authGuard, userProfile);

// PUT
router.put('/updateProfile', authGuard, updateProfile);
router.put('/updateProfilePicture', authGuard, updateProfilePicture);

export default router;
