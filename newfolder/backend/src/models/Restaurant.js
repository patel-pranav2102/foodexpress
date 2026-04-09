import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    cuisine: [String],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    image: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hours: {
      open: String,
      close: String,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    deliveryTime: {
      type: Number,
      default: 30,
    },
    minOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', restaurantSchema);
