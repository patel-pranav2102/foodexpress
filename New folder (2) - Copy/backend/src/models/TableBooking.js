import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurantId: {
      type: String, // Accept both string IDs and MongoDB ObjectIds
      required: true,
    },
    restaurantName: {
      type: String,
      default: '',
    },
    restaurantLocation: {
      type: String,
      default: '',
    },
    guestName: {
      type: String,
      required: true,
      trim: true,
    },
    guestEmail: {
      type: String,
      required: true,
      trim: true,
    },
    guestPhone: {
      type: String,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    confirmationCode: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('TableBooking', bookingSchema);
