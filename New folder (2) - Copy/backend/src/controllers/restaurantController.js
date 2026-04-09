import Restaurant from '../models/Restaurant.js';

export const getAllRestaurants = async (req, res) => {
  try {
    const { search, cuisine } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (cuisine) {
      filter.cuisine = { $in: cuisine.split(',') };
    }

    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant', error: error.message });
  }
};

export const createRestaurant = async (req, res) => {
  try {
    const { name, description, cuisine, address, phone, hours, minOrder } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const restaurant = new Restaurant({
      name,
      description,
      cuisine,
      address,
      phone,
      hours,
      minOrder,
      image,
    });

    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: 'Error creating restaurant', error: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const restaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: 'Error updating restaurant', error: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant', error: error.message });
  }
};
