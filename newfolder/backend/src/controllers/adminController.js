import TableBooking from '../models/TableBooking.js';

// Get all pending bookings
export const getPendingBookings = async (req, res) => {
  try {
    const pendingBookings = await TableBooking.find({
      status: 'pending',
    })
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Pending bookings retrieved successfully',
      bookings: pendingBookings,
    });
  } catch (error) {
    console.error('Get pending bookings error:', error);
    res.status(500).json({ message: 'Error fetching pending bookings', error: error.message });
  }
};

// Get all bookings (for admin dashboard statistics)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await TableBooking.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    const stats = {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === 'pending').length,
      confirmed: bookings.filter((b) => b.status === 'confirmed').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
      completed: bookings.filter((b) => b.status === 'completed').length,
    };

    res.json({
      message: 'All bookings retrieved successfully',
      bookings,
      stats,
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Approve a pending booking
export const approveBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await TableBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending bookings can be approved' });
    }

    booking.status = 'confirmed';
    await booking.save();

    res.json({
      message: 'Booking approved successfully',
      booking,
    });
  } catch (error) {
    console.error('Approve booking error:', error);
    res.status(500).json({ message: 'Error approving booking', error: error.message });
  }
};

// Reject a pending booking (mark as cancelled)
export const rejectBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const booking = await TableBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending bookings can be rejected' });
    }

    booking.status = 'cancelled';
    booking.specialRequests = `Rejected${reason ? ': ' + reason : ''}`;
    await booking.save();

    res.json({
      message: 'Booking rejected successfully',
      booking,
    });
  } catch (error) {
    console.error('Reject booking error:', error);
    res.status(500).json({ message: 'Error rejecting booking', error: error.message });
  }
};
