import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticateToken, userController.getUserProfile);
router.put('/profile', authenticateToken, upload.single('avatar'), userController.updateUserProfile);
router.post('/change-password', authenticateToken, userController.changePassword);

export default router;
