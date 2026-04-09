# 🍽️ Food Delivery Application

A full-stack food delivery platform built with modern technologies. Browse restaurants, manage your profile, and seamless ordering experience.

## 🌟 Features

### Authentication & Security
- ✅ User registration with email validation
- ✅ Secure JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Password strength requirements
- ✅ Change password functionality
- ✅ Role-based access (user/admin)
- ✅ Protected routes and endpoints
- ✅ Auto-logout on token expiry

### User Features
- 🏪 Browse and search restaurants
- 🔍 Filter by cuisine type
- ⭐ View restaurant ratings
- 👤 Manage user profile
- 🔐 Secure login/logout
- 📱 Fully responsive design

### Admin Features
- 👨‍💼 Admin dashboard (coming soon)
- 🏢 Manage restaurants
- ⬆️ Upload restaurant images
- 📊 View orders and analytics (coming soon)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB 5.0+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd path/to/project
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ..
npm install
```

4. **Setup Environment Variables**

Backend (`.env`):
```
MONGODB_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your_secure_secret_key_change_this
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Frontend (`.env`):
```
VITE_API_URL=http://localhost:5000/api
```

5. **Seed Database** (optional - creates test data)
```bash
cd backend
npm run seed
```

Test Credentials:
- Email: `test@example.com` / Password: `Password123`
- Admin: `admin@example.com` / Password: `AdminPassword123`

### Running the Application

**Start Backend** (Terminal 1):
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

**Start Frontend** (Terminal 2):
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

## 📁 Project Structure

```
food-delivery/
├── backend/                    # Express server
│   ├── src/
│   │   ├── config/            # Database config
│   │   ├── models/            # MongoDB schemas
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth, upload
│   │   └── server.js          # Main server
│   ├── uploads/               # Uploaded files
│   ├── seed.js                # Database seeding
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── src/                        # React app
│   ├── components/            # React components
│   ├── pages/                 # Page components
│   ├── services/              # API client
│   ├── contexts/              # Auth context
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilities
│   ├── App.tsx
│   └── main.tsx
│
├── docs/                      # Documentation
│   ├── FRONTEND.md
│   └── BACKEND.md
│
├── .env                       # Frontend env
├── package.json
├── vite.config.ts
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - user login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/change-password` - Change password

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (admin)
- `PATCH /api/restaurants/:id` - Update restaurant (admin)
- `DELETE /api/restaurants/:id` - Delete restaurant (admin)

See [Backend README](./backend/README.md) for detailed API documentation.

## 🛠️ Tech Stack

### Frontend
- React 18+ with TypeScript
- Vite (build tool)
- React Router v6
- TanStack React Query
- Axios
- Tailwind CSS
- Framer Motion
- shadcn/ui components
- Lucide icons
- Sonner (notifications)

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt (password hashing)
- Multer (file uploads)
- CORS enabled

## 📧 Authentication

### How It Works
1. User registers or logs in
2. Backend generates JWT token (valid 7 days)
3. Token stored in localStorage
4. Sent in Authorization header for protected requests
5. AuthContext manages global auth state
6. Auto-logout on token expiry

### Password Requirements
- Minimum 6 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

## 🔐 Security Features
- Password hashing with bcrypt
- JWT token-based auth
- CORS configuration
- Input validation
- Protected API endpoints
- Role-based access control
- File upload restrictions (5MB max, image only)

## 📱 Responsive Design
- Mobile-first approach
- Scores: Desktop, Tablet, Mobile
- Touch-friendly navigation
- Optimized images

## 🚀 Deployment

### Backend Deployment (Heroku/Render)
1. Update MongoDB URI for cloud database
2. Set production environment variables
3. Deploy: `git push heroku main`

### Frontend Deployment (Vercel/Netlify)
1. Update `VITE_API_URL` to production backend
2. Deploy: `npm run build`
3. Upload `dist/` folder

## 📚 Documentation

- [Frontend Documentation](./docs/FRONTEND.md)
- [Backend Documentation](./backend/README.md)

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
# Windows: mongod
# macOS: brew services start mongodb-community

# Clear and reseed database
cd backend
npm run seed
```

### Frontend can't connect to backend
- Check `VITE_API_URL` in `.env`
- Verify backend is running on port 5000
- Check CORS is enabled in backend
- Open browser console for error details

### Authentication issues
- Clear browser localStorage
- Clear browser cookies
- Restart both servers
- Check token in console

## 📝 Development

### Running in Development Mode

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

### Building for Production

```bash
# Frontend
npm run build

# Backend (already production-ready)
npm start
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Roadmap

- [x] User authentication
- [x] Restaurant browsing
- [x] User profile management
- [ ] Cart & Checkout
- [ ] Order management
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Reviews & ratings
- [ ] Favorites
- [ ] Push notifications

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review error messages
3. Check browser console
4. Check server logs

## ✨ Credits

Built with modern web technologies and best practices.

---

**Happy Coding! 🚀**
