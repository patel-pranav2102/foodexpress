import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get available time slots for a restaurant (no auth required)
router.get('/available/:restaurantId', bookingController.getAvailableSlots);

// All other booking routes require authentication
router.use(authenticateToken);

// Create a new booking
router.post('/', bookingController.createBooking);

// Get user's bookings
router.get('/', bookingController.getUserBookings);

// Get booking details
router.get('/:bookingId', bookingController.getBookingDetails);

// Update booking
router.put('/:bookingId', bookingController.updateBooking);

// Cancel booking
router.delete('/:bookingId', bookingController.cancelBooking);

export default router;
