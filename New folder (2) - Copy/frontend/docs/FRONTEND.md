# Food Delivery Frontend

Modern React + TypeScript frontend for the food delivery application.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Features

### Authentication
- ✅ User Registration with validation
- ✅ Secure Login with JWT
- ✅ Auto-login on page refresh
- ✅ Protected routes
- ✅ User profile management
- ✅ Password change functionality
- ✅ Auto-logout on token expiry

### User Features
- 🏪 Browse restaurants
- 🔍 Search and filter restaurants by cuisine
- 👤 View restaurant details
- 💳 User profile management
- 🔐 Change password securely

### UI/UX
- 📱 Fully responsive design
- 🎨 Beautiful gradient UI using Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 🔔 Toast notifications
- 📊 Loading states and error handling

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn UI components
│   ├── Navbar.tsx          # Navigation with auth
│   ├── RestaurantCard.tsx  # Restaurant listing
│   ├── CategoryFilter.tsx  # Cuisine filter
│   ├── HeroBanner.tsx      # Hero section
│   ├── Footer.tsx          # Footer
│   └── ProtectedRoute.tsx  # Auth protection
├── pages/
│   ├── Index.tsx           # Home page
│   ├── RestaurantDetail.tsx # Restaurant details
│   ├── SignIn.tsx          # Login page
│   ├── SignUp.tsx          # Registration page
│   ├── Profile.tsx         # User profile
│   ├── AboutUs.tsx         # About page
│   └── ContactUs.tsx       # Contact page
├── services/
│   └── apiClient.ts        # API client with axios
├── contexts/
│   └── AuthContext.tsx     # Authentication state
├── hooks/
│   ├── use-mobile.tsx      # Mobile detection
│   └── use-toast.ts        # Toast notifications
├── lib/
│   └── utils.ts            # Utility functions
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## Authentication Flow

1. **Registration**
   - User enters name, email, password
   - Frontend validates inputs
   - Sends to `/api/users/register`
   - Backend creates user and returns JWT token
   - Token stored in localStorage
   - User auto-logged in

2. **Login**
   - User enters email and password
   - Sends to `/api/users/login`
   - Backend verifies credentials
   - Returns JWT token
   - Token stored in localStorage
   - AuthContext updated

3. **Protected Routes**
   - `ProtectedRoute` component checks authentication
   - Redirects to `/signin` if not authenticated
   - Automatically restores session on page refresh

4. **Auto-Logout**
   - Token expires after 7 days
   - If API returns 401, user logged out
   - Redirected to signin page

## Pages

### Home Page (`/`)
- Hero banner
- Restaurant search
- Category filter
- Restaurant grid
- Pagination support

### Sign Up (`/signup`)
- Full name input
- Email validation
- Password strength requirements
- Phone number (optional)
- Password confirmation
- Link to sign in

### Sign In (`/signin`)
- Email validation
- Password visibility toggle
- Remember me functionality
- Link to sign up

### Profile (`/profile`)
- View & edit profile information
- Change password securely
- Update avatar (future)
- View user role

### Restaurant Detail (`/restaurant/:id`)
- Restaurant information
- Menu display
- Ratings and reviews
- Delivery info

### About Us (`/about`)
- Company information
- Mission and values

### Contact Us (`/contact`)
- Contact form
- Email and phone

## API Integration

All API calls go through `apiClient` with interceptors:

```typescript
import { authAPI, restaurantAPI } from '@/services/apiClient';

// Authentication
await authAPI.register(userData);
await authAPI.login(credentials);
await authAPI.getProfile();
await authAPI.updateProfile(formData);
await authAPI.changePassword(passwordData);

// Restaurants
await restaurantAPI.getAll(params);
await restaurantAPI.getById(id);
await restaurantAPI.create(formData);
await restaurantAPI.update(id, formData);
await restaurantAPI.delete(id);
```

## State Management

### AuthContext
Manages global authentication state:

```typescript
const { 
  user,              // Current user object
  token,             // JWT token
  isAuthenticated,   // Boolean
  isLoading,         // Loading state
  login,             // Login function
  logout,            // Logout function
  setUser            // Update user
} = useAuth();
```

## Components

### Navbar
- Dynamic based on auth state
- Shows user info when logged in
- Dropdown menu with logout
- Mobile responsive

### RestaurantCard
- Restaurant image
- Name and rating
- Cuisine tags
- Delivery time
- Min order info

### CategoryFilter
- Filter by cuisine
- Multi-select support
- Search suggestions

### HeroBanner
- Eye-catching hero section
- Call to action
- Search bar

## Styling

- **Framework**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Colors**: Orange/Red gradient theme

## Development

### Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests (if configured)
npm test
```

### Environment Variables

```
VITE_API_URL=http://localhost:5000/api
```

## Key Technologies

- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v6** - Routing
- **TanStack React Query** - Data fetching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - Component library
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## Common Issues

### API Connection Failed
- Check backend is running on `localhost:5000`
- Verify `VITE_API_URL` in `.env`
- Check CORS configuration in backend

### Authentication Issues
- Clear localStorage
- Check token validity in browser console
- Verify JWT_SECRET matches backend

### Build Errors
- Clear `node_modules` and reinstall
- Delete `dist` folder
- Restart dev server

## Deployment

### Building for Production
```bash
npm run build
```

Output in `dist/` directory.

### Backend URL for Production
Update `VITE_API_URL` in `.env`:
```
VITE_API_URL=https://api.yourdomain.com
```

## Testing Credentials

Use the backend seeded data:
```
User Email: test@example.com
Password: Password123

Admin Email: admin@example.com
Password: AdminPassword123
```
