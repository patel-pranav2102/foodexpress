import express from 'express';
import * as restaurantController from '../controllers/restaurantController.js';
import { authenticateToken, authorizeAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.post('/', authenticateToken, authorizeAdmin, upload.single('image'), restaurantController.createRestaurant);
router.patch('/:id', authenticateToken, authorizeAdmin, upload.single('image'), restaurantController.updateRestaurant);
router.delete('/:id', authenticateToken, authorizeAdmin, restaurantController.deleteRestaurant);

export default router;
