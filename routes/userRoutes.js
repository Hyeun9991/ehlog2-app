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

// POST register, login
router.post('/register', registerUser);
router.post('/login', loginUser);

// GET user profile
router.get('/profile', authGuard, userProfile);

// PUT update profile, profile picture
router.put('/updateProfile', authGuard, updateProfile);
router.put('/updateProfilePicture', authGuard, updateProfilePicture);

export default router;
