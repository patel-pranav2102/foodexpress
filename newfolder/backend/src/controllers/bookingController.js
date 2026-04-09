import TableBooking from '../models/TableBooking.js';

// Generate confirmation code
const generateConfirmationCode = () => {
  return 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Create a table booking
export const createBooking = async (req, res) => {
  try {
    const { restaurantId, restaurantName, restaurantLocation, guestName, guestEmail, guestPhone, numberOfGuests, bookingDate, bookingTime, specialRequests } = req.body;
    const userId = req.user.id; // From auth middleware

    // Validation
    if (!restaurantId || !guestName || !guestEmail || !guestPhone || !numberOfGuests || !bookingDate || !bookingTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (numberOfGuests < 1 || numberOfGuests > 20) {
      return res.status(400).json({ message: 'Number of guests must be between 1 and 20' });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone
    if (!/^\d{10}$/.test(guestPhone.replace(/\D/g, ''))) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Validate booking date is not in the past
    const bookingDateTime = new Date(bookingDate);
    if (bookingDateTime < new Date()) {
      return res.status(400).json({ message: 'Booking date must be in the future' });
    }

    // Check if user already has a booking at this restaurant for the same date (any time)
    const userExistingBooking = await TableBooking.findOne({
      userId,
      restaurantId,
      bookingDate: {
        $gte: new Date(bookingDate).setHours(0, 0, 0, 0),
        $lt: new Date(bookingDate).setHours(23, 59, 59, 999),
      },
      status: { $ne: 'cancelled' },
    });

    if (userExistingBooking) {
      return res.status(400).json({ message: 'You already have a booking at this restaurant on this date. Please cancel your existing booking or choose a different date.' });
    }

    // Check total guests for the same time slot (max 7 guests allowed)
    const existingBookings = await TableBooking.find({
      restaurantId,
      bookingDate: {
        $gte: new Date(bookingDate).setHours(0, 0, 0, 0),
        $lt: new Date(bookingDate).setHours(23, 59, 59, 999),
      },
      bookingTime,
      status: { $ne: 'cancelled' },
    });

    const totalExistingGuests = existingBookings.reduce((sum, booking) => sum + booking.numberOfGuests, 0);
    const newTotalGuests = totalExistingGuests + numberOfGuests;

    if (newTotalGuests > 7) {
      return res.status(400).json({ message: `This time slot can only accommodate ${7 - totalExistingGuests} more guests. Please choose another time.` });
    }

    // Create booking
    const confirmationCode = generateConfirmationCode();
    const booking = new TableBooking({
      userId,
      restaurantId,
      restaurantName: restaurantName || '',
      restaurantLocation: restaurantLocation || '',
      guestName,
      guestEmail,
      guestPhone,
      numberOfGuests,
      bookingDate,
      bookingTime,
      specialRequests: specialRequests || '',
      confirmationCode,
      status: 'pending',
    });

    await booking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await TableBooking.find({ userId })
      .populate('restaurantId', 'name image address phone cuisine rating')
      .sort({ bookingDate: -1 });

    res.json({
      message: 'Bookings retrieved successfully',
      bookings,
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Failed to retrieve bookings', error: error.message });
  }
};

// Get booking details
export const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await TableBooking.findById(bookingId).populate('restaurantId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify ownership (unless admin)
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to view this booking' });
    }

    res.json({
      message: 'Booking details retrieved',
      booking,
    });
  } catch (error) {
    console.error('Get booking details error:', error);
    res.status(500).json({ message: 'Failed to retrieve booking', error: error.message });
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    const { guestName, guestPhone, numberOfGuests, bookingDate, bookingTime, specialRequests } = req.body;

    const booking = await TableBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify ownership
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this booking' });
    }

    // Can only update pending bookings
    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Can only update pending bookings' });
    }

    // Update fields
    if (guestName) booking.guestName = guestName;
    if (guestPhone) {
      if (!/^\d{10}$/.test(guestPhone.replace(/\D/g, ''))) {
        return res.status(400).json({ message: 'Invalid phone number format' });
      }
      booking.guestPhone = guestPhone;
    }
    if (numberOfGuests) {
      if (numberOfGuests < 1 || numberOfGuests > 20) {
        return res.status(400).json({ message: 'Number of guests must be between 1 and 20' });
      }
      booking.numberOfGuests = numberOfGuests;
    }
    if (bookingDate) {
      if (new Date(bookingDate) < new Date()) {
        return res.status(400).json({ message: 'Booking date must be in the future' });
      }
      booking.bookingDate = bookingDate;
    }
    if (bookingTime) booking.bookingTime = bookingTime;
    
    // If date is being updated, check for existing bookings at same restaurant on the new date
    if (bookingDate) {
      const existingBookingOnNewDate = await TableBooking.findOne({
        _id: { $ne: bookingId },
        userId,
        restaurantId: booking.restaurantId,
        bookingDate: {
          $gte: new Date(bookingDate).setHours(0, 0, 0, 0),
          $lt: new Date(bookingDate).setHours(23, 59, 59, 999),
        },
        status: { $ne: 'cancelled' },
      });
      
      if (existingBookingOnNewDate) {
        return res.status(400).json({ message: 'You already have a booking at this restaurant on the selected date.' });
      }
    }
    
    // If date or time is being updated, validate capacity for the new slot
    if (bookingDate || bookingTime) {
      const newDate = bookingDate || booking.bookingDate;
      const newTime = bookingTime || booking.bookingTime;
      
      const bookingsInNewSlot = await TableBooking.find({
        _id: { $ne: bookingId },
        restaurantId: booking.restaurantId,
        bookingDate: {
          $gte: new Date(newDate).setHours(0, 0, 0, 0),
          $lt: new Date(newDate).setHours(23, 59, 59, 999),
        },
        bookingTime: newTime,
        status: { $ne: 'cancelled' },
      });
      
      const totalGuestsInNewSlot = bookingsInNewSlot.reduce((sum, b) => sum + b.numberOfGuests, 0);
      const newTotalGuests = totalGuestsInNewSlot + (numberOfGuests || booking.numberOfGuests);
      
      if (newTotalGuests > 7) {
        return res.status(400).json({ message: `The new time slot can only accommodate ${7 - totalGuestsInNewSlot} guests. Please choose another time.` });
      }
    }
    
    if (specialRequests !== undefined) booking.specialRequests = specialRequests;

    await booking.save();
    await booking.populate('restaurantId', 'name address phone');

    res.json({
      message: 'Booking updated successfully',
      booking,
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ message: 'Failed to update booking', error: error.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await TableBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify ownership
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to cancel this booking' });
    }

    // Can only cancel pending or confirmed bookings
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({ message: 'Cannot cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
};

// Get available time slots for a restaurant on a specific date
export const getAvailableSlots = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    // Get all bookings for this date (works with both string and ObjectId restaurantIds)
    const bookings = await TableBooking.find({
      restaurantId: restaurantId,
      bookingDate: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lt: new Date(date).setHours(23, 59, 59, 999),
      },
      status: { $ne: 'cancelled' },
    });

    // Generate time slots (every 30 minutes from 11:00 to 22:00)
    // Maximum 7 guests per time slot
    const MAX_GUESTS_PER_SLOT = 7;
    const timeSlots = [];
    for (let hour = 11; hour < 22; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        const slotBookings = bookings.filter((b) => b.bookingTime === time);
        const totalGuestsInSlot = slotBookings.reduce((sum, booking) => sum + booking.numberOfGuests, 0);
        const availableCapacity = MAX_GUESTS_PER_SLOT - totalGuestsInSlot;
        
        timeSlots.push({
          time,
          available: availableCapacity > 0,
          totalGuests: totalGuestsInSlot,
          availableCapacity: availableCapacity,
        });
      }
    }

    res.json({
      message: 'Available slots retrieved',
      availableSlots: timeSlots,
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({ message: 'Failed to retrieve available slots', error: error.message });
  }
};
