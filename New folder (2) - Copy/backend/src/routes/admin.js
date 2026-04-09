import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { authorizeAdmin } from '../middleware/admin.js';
import {
  getPendingBookings,
  getAllBookings,
  approveBooking,
  rejectBooking,
} from '../controllers/adminController.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken, authorizeAdmin);

// Get all pending bookings
router.get('/bookings/pending', getPendingBookings);

// Get all bookings with statistics
router.get('/bookings', getAllBookings);

// Approve a booking
router.patch('/bookings/:bookingId/approve', approveBooking);

// Reject a booking
router.patch('/bookings/:bookingId/reject', rejectBooking);

export default router;
