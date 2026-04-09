export interface MenuItem {
  name: string;
  price: string;
  description: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  deliveryTime: string;
  priceRange: string;
  menu: MenuCategory[];
}

export const categories = [
  { id: "all", label: "All", icon: "🍽️" },
  { id: "fast-food", label: "Fast Food", icon: "🍔" },
  { id: "fine-dining", label: "Fine Dining", icon: "🥂" },
  { id: "sweets", label: "Sweets", icon: "🍬" },
  { id: "italian", label: "Italian", icon: "🍕" },
  { id: "chinese", label: "Chinese", icon: "🥡" },
  { id: "mexican", label: "Mexican", icon: "🌮" },
  { id: "japanese", label: "Japanese", icon: "🍣" },
  { id: "cafe", label: "Café", icon: "☕" },
];

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Kingdom",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=500&fit=crop",
    cuisine: "Burgers & Fries",
    category: "fast-food",
    rating: 4.5,
    reviews: 1240,
    description: "The ultimate burger destination with juicy patties, crispy fries, and secret sauces that keep you coming back for more. Our burgers are made from 100% premium beef, grilled to perfection.",
    location: "MG Road, Sector 14, Gurgaon",
    deliveryTime: "25-35 min",
    priceRange: "₹200 - ₹500",
    menu: [
      { category: "Starters", items: [
        { name: "Loaded Nachos", price: "₹199", description: "Crispy tortilla chips with cheese, jalapeños & salsa" },
        { name: "Chicken Wings", price: "₹299", description: "Spicy buffalo wings with ranch dip" },
        { name: "Onion Rings", price: "₹149", description: "Golden crispy onion rings with chipotle mayo" },
      ]},
      { category: "Mains", items: [
        { name: "Classic Smash Burger", price: "₹349", description: "Double patty, cheddar, lettuce, tomato, special sauce" },
        { name: "BBQ Bacon Burger", price: "₹399", description: "Smoky BBQ sauce, crispy bacon, onion rings" },
        { name: "Mushroom Swiss Burger", price: "₹379", description: "Sautéed mushrooms, swiss cheese, garlic aioli" },
      ]},
      { category: "Desserts", items: [
        { name: "Chocolate Shake", price: "₹179", description: "Thick & creamy chocolate milkshake" },
        { name: "Brownie Sundae", price: "₹229", description: "Warm brownie with vanilla ice cream & hot fudge" },
      ]},
    ],
  },
  {
    id: "2",
    name: "The Grand Table",
    image: "https://images.unsplash.com/photo-1577303935007-0d306ee638cf?q=80&w=840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&h=500&fit=crop",
    cuisine: "Continental & European",
    category: "fine-dining",
    rating: 4.8,
    reviews: 890,
    description: "An exquisite fine dining experience with European-inspired cuisine, impeccable service, and an award-winning wine list. Perfect for special occasions and romantic evenings.",
    location: "Connaught Place, New Delhi",
    deliveryTime: "45-60 min",
    priceRange: "₹1500 - ₹5000",
    menu: [
      { category: "Starters", items: [
        { name: "Truffle Soup", price: "₹599", description: "Wild mushroom & black truffle velouté" },
        { name: "Foie Gras Terrine", price: "₹899", description: "With brioche toast & fig compote" },
        { name: "Carpaccio", price: "₹749", description: "Thinly sliced beef with arugula & parmesan" },
      ]},
      { category: "Mains", items: [
        { name: "Wagyu Steak", price: "₹3999", description: "A5 grade with roasted vegetables & red wine jus" },
        { name: "Lobster Thermidor", price: "₹2999", description: "Classic preparation with gruyère gratin" },
        { name: "Duck Confit", price: "₹1899", description: "Slow-cooked with cherry gastrique" },
      ]},
      { category: "Desserts", items: [
        { name: "Crème Brûlée", price: "₹499", description: "Madagascar vanilla with caramelized sugar" },
        { name: "Soufflé au Chocolat", price: "₹599", description: "Dark chocolate soufflé with crème anglaise" },
      ]},
    ],
  },
  {
    id: "3",
    name: "Mithai Palace",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=500&fit=crop",
    cuisine: "Indian Sweets & Namkeen",
    category: "sweets",
    rating: 4.6,
    reviews: 2100,
    description: "A paradise for sweet lovers! Serving authentic Indian mithai made with pure ghee, fresh milk, and premium dry fruits. From classic gulab jamun to innovative fusion desserts.",
    location: "Chandni Chowk, Old Delhi",
    deliveryTime: "20-30 min",
    priceRange: "₹100 - ₹800",
    menu: [
      { category: "Starters", items: [
        { name: "Samosa Platter", price: "₹149", description: "Assorted samosas – aloo, paneer & keema" },
        { name: "Kachori Chaat", price: "₹129", description: "Crispy kachori with yogurt & chutneys" },
        { name: "Namkeen Box", price: "₹199", description: "Assorted premium namkeen mix" },
      ]},
      { category: "Mains", items: [
        { name: "Gulab Jamun (12 pcs)", price: "₹299", description: "Soft, melt-in-mouth dumplings in rose syrup" },
        { name: "Kaju Katli (500g)", price: "₹599", description: "Premium cashew fudge with silver leaf" },
        { name: "Rasgulla (12 pcs)", price: "₹249", description: "Spongy cottage cheese balls in sugar syrup" },
      ]},
      { category: "Desserts", items: [
        { name: "Rabri Falooda", price: "₹179", description: "Rich rabri with falooda noodles & rose syrup" },
        { name: "Kulfi Plate", price: "₹149", description: "Traditional malai kulfi with falooda" },
      ]},
    ],
  },
  {
    id: "4",
    name: "Napoli Pizzeria",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&h=500&fit=crop",
    cuisine: "Authentic Italian Pizza",
    category: "italian",
    rating: 4.7,
    reviews: 1580,
    description: "Wood-fired pizzas straight from our imported Italian oven. Using San Marzano tomatoes, fresh mozzarella, and dough fermented for 72 hours for the perfect Neapolitan crust.",
    location: "Hauz Khas Village, New Delhi",
    deliveryTime: "30-40 min",
    priceRange: "₹400 - ₹1200",
    menu: [
      { category: "Starters", items: [
        { name: "Bruschetta Trio", price: "₹349", description: "Classic tomato, mushroom & ricotta variations" },
        { name: "Arancini", price: "₹299", description: "Crispy risotto balls with marinara" },
        { name: "Caprese Salad", price: "₹399", description: "Buffalo mozzarella, heirloom tomatoes, basil" },
      ]},
      { category: "Mains", items: [
        { name: "Margherita DOC", price: "₹549", description: "San Marzano, buffalo mozzarella, fresh basil" },
        { name: "Diavola", price: "₹649", description: "Spicy salami, chili flakes, mozzarella" },
        { name: "Quattro Formaggi", price: "₹699", description: "Four cheese blend – mozzarella, gorgonzola, parmesan, fontina" },
      ]},
      { category: "Desserts", items: [
        { name: "Tiramisu", price: "₹349", description: "Classic Italian coffee-soaked layered dessert" },
        { name: "Panna Cotta", price: "₹299", description: "Vanilla bean with berry compote" },
      ]},
    ],
  },
  {
    id: "5",
    name: "Dragon Wok",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=692&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&h=500&fit=crop",
    cuisine: "Chinese & Asian Fusion",
    category: "chinese",
    rating: 4.4,
    reviews: 1890,
    description: "Experience the bold flavors of authentic Chinese cuisine with a modern twist. Our chefs bring decades of experience from the finest kitchens across Asia.",
    location: "Cyber Hub, Gurgaon",
    deliveryTime: "30-45 min",
    priceRange: "₹300 - ₹1000",
    menu: [
      { category: "Starters", items: [
        { name: "Dim Sum Basket", price: "₹399", description: "Assorted steamed & fried dim sum (8 pcs)" },
        { name: "Salt & Pepper Prawns", price: "₹449", description: "Crispy prawns with Sichuan pepper" },
        { name: "Spring Rolls", price: "₹249", description: "Vegetable spring rolls with sweet chili sauce" },
      ]},
      { category: "Mains", items: [
        { name: "Kung Pao Chicken", price: "₹499", description: "Spicy diced chicken with peanuts & dried chilies" },
        { name: "Hakka Noodles", price: "₹349", description: "Stir-fried noodles with vegetables & soy" },
        { name: "Mapo Tofu", price: "₹399", description: "Silky tofu in spicy fermented bean sauce" },
      ]},
      { category: "Desserts", items: [
        { name: "Mochi Ice Cream", price: "₹249", description: "Assorted flavors – matcha, mango, strawberry" },
        { name: "Toffee Banana", price: "₹199", description: "Caramelized banana fritters" },
      ]},
    ],
  },
  {
    id: "6",
    name: "Casa de Tacos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=500&fit=crop",
    cuisine: "Mexican Street Food",
    category: "mexican",
    rating: 4.3,
    reviews: 760,
    description: "Vibrant Mexican street food bursting with flavor! From handmade tortillas to slow-cooked meats and fresh guacamole made tableside. ¡Viva la comida!",
    location: "Khan Market, New Delhi",
    deliveryTime: "25-35 min",
    priceRange: "₹250 - ₹700",
    menu: [
      { category: "Starters", items: [
        { name: "Guacamole & Chips", price: "₹249", description: "Fresh avocado guacamole with tortilla chips" },
        { name: "Elote", price: "₹179", description: "Grilled Mexican street corn with lime & chili" },
        { name: "Queso Fundido", price: "₹299", description: "Melted cheese dip with chorizo" },
      ]},
      { category: "Mains", items: [
        { name: "Tacos Al Pastor (3 pcs)", price: "₹349", description: "Marinated pork, pineapple, cilantro, onion" },
        { name: "Burrito Bowl", price: "₹449", description: "Rice, beans, meat, salsa, cheese, sour cream" },
        { name: "Enchiladas", price: "₹399", description: "Corn tortillas, chicken, mole sauce, cheese" },
      ]},
      { category: "Desserts", items: [
        { name: "Churros", price: "₹199", description: "Cinnamon sugar churros with chocolate sauce" },
        { name: "Tres Leches Cake", price: "₹249", description: "Three milk soaked sponge cake" },
      ]},
    ],
  },
  {
    id: "7",
    name: "Sakura Sushi",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=500&fit=crop",
    cuisine: "Japanese Sushi & Ramen",
    category: "japanese",
    rating: 4.9,
    reviews: 670,
    description: "Premium Japanese cuisine with fish flown in fresh from Tsukiji market. Our itamae (sushi chef) crafts each piece with precision and artistry for an unforgettable omakase experience.",
    location: "Saket, New Delhi",
    deliveryTime: "35-50 min",
    priceRange: "₹800 - ₹3000",
    menu: [
      { category: "Starters", items: [
        { name: "Edamame", price: "₹199", description: "Steamed soybeans with sea salt" },
        { name: "Gyoza (6 pcs)", price: "₹349", description: "Pan-fried pork dumplings with ponzu" },
        { name: "Miso Soup", price: "₹179", description: "Traditional dashi broth with tofu & wakame" },
      ]},
      { category: "Mains", items: [
        { name: "Omakase Set (12 pcs)", price: "₹2499", description: "Chef's selection of premium nigiri sushi" },
        { name: "Tonkotsu Ramen", price: "₹599", description: "Rich pork bone broth, chashu, ajitama egg" },
        { name: "Dragon Roll", price: "₹799", description: "Eel, avocado, cucumber with unagi sauce" },
      ]},
      { category: "Desserts", items: [
        { name: "Matcha Tiramisu", price: "₹349", description: "Japanese-Italian fusion dessert" },
        { name: "Dorayaki", price: "₹199", description: "Red bean pancakes with ice cream" },
      ]},
    ],
  },
  {
    id: "8",
    name: "Morning Brew Café",
    image: "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&h=500&fit=crop",
    cuisine: "Coffee & Pastries",
    category: "cafe",
    rating: 4.6,
    reviews: 1420,
    description: "A cozy neighborhood café serving artisanal coffee, freshly baked pastries, and wholesome brunch options. The perfect spot to start your morning or unwind with a book.",
    location: "Lajpat Nagar, New Delhi",
    deliveryTime: "15-25 min",
    priceRange: "₹150 - ₹600",
    menu: [
      { category: "Starters", items: [
        { name: "Avocado Toast", price: "₹299", description: "Sourdough, smashed avocado, poached egg" },
        { name: "Granola Bowl", price: "₹249", description: "Greek yogurt, house granola, fresh berries" },
        { name: "Eggs Benedict", price: "₹349", description: "Poached eggs, hollandaise, English muffin" },
      ]},
      { category: "Mains", items: [
        { name: "Classic Pancake Stack", price: "₹349", description: "Fluffy pancakes, maple syrup, butter, berries" },
        { name: "Club Sandwich", price: "₹299", description: "Triple-decker with chicken, bacon, egg" },
        { name: "Pasta Primavera", price: "₹399", description: "Seasonal vegetables in creamy garlic sauce" },
      ]},
      { category: "Desserts", items: [
        { name: "Croissant", price: "₹149", description: "Buttery, flaky, freshly baked" },
        { name: "Cheesecake Slice", price: "₹299", description: "New York style with berry compote" },
      ]},
    ],
  },
];
