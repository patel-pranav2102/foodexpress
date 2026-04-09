# Food Delivery Backend API

Node.js + Express backend for the food delivery application with MongoDB.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend root directory:
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your_secure_secret_key_here
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 3. Database Setup

Make sure MongoDB is running on your system.

Seed the database with sample data:
```bash
npm run seed
```

This creates:
- 1 test user: `test@example.com` / `Password123`
- 1 admin user: `admin@example.com` / `AdminPassword123`
- 5 sample restaurants

## Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

Server runs on `http://localhost:5000`

## Authentication

### Features
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (user/admin)
- ✅ Token refresh on protected routes
- ✅ Password strength requirements
- ✅ Change password functionality

### Password Requirements
- Minimum 6 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

## API Endpoints

### Authentication Endpoints

#### Register
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "5551234567"
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "5551234567",
    "role": "user"
  }
}
```

#### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "5551234567",
    "role": "user"
  }
}
```

#### Get Profile (Protected)
```http
GET /api/users/profile
Authorization: Bearer <token>
```

Response (200):
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "5551234567",
  "address": "123 Main St, City",
  "avatar": "/uploads/avatar.jpg",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update Profile (Protected)
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Jane Doe",
  "phone": "5559876543",
  "address": "456 Oak Ave, City",
  "avatar": <file>
}
```

#### Change Password (Protected)
```http
POST /api/users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456",
  "confirmPassword": "NewPassword456"
}
```

Response (200):
```json
{
  "message": "Password changed successfully"
}
```

### Restaurant Endpoints

#### Get All Restaurants
```http
GET /api/restaurants?search=pizza&cuisine=Italian,Fast%20Food
```

Response (200):
```json
[
  {
    "_id": "restaurant_id",
    "name": "Pizza Palace",
    "description": "Authentic Italian pizzas",
    "cuisine": ["Italian", "Pizza"],
    "rating": 4.5,
    "image": "/uploads/pizza.jpg",
    "address": "123 Restaurant St",
    "phone": "555-0101",
    "hours": { "open": "11:00", "close": "23:00" },
    "isOpen": true,
    "deliveryTime": 30,
    "minOrder": 10
  }
]
```

#### Get Restaurant by ID
```http
GET /api/restaurants/:id
```

#### Create Restaurant (Admin Only)
```http
POST /api/restaurants
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "name": "New Restaurant",
  "description": "Description",
  "cuisine": ["Italian", "Pizza"],
  "address": "123 Main St",
  "phone": "555-0101",
  "hours": {"open": "11:00", "close": "23:00"},
  "minOrder": 10,
  "image": <file>
}
```

#### Update Restaurant (Admin Only)
```http
PATCH /api/restaurants/:id
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

#### Delete Restaurant (Admin Only)
```http
DELETE /api/restaurants/:id
Authorization: Bearer <admin_token>
```

## Error Handling

All errors return appropriate HTTP status codes:

- **400 Bad Request**: Invalid input or validation error
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: User lacks required permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource already exists
- **500 Internal Server Error**: Server error

Example error response:
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

## File Upload

### Supported Formats
- JPEG, JPG, PNG, GIF

### Limits
- Maximum file size: 5MB
- Upload location: `backend/uploads/`
- URL access: `/uploads/<filename>`

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "TestPassword123",
    "phone": "5551234567"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Default: `mongodb://localhost:27017/food-delivery`

### Authentication Errors
- Verify JWT_SECRET in `.env`
- Check token format: `Authorization: Bearer <token>`
- Tokens expire after 7 days

### File Upload Issues
- Ensure `backend/uploads/` directory exists
- Check file size is under 5MB
- Verify file format is supported

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   └── Restaurant.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── restaurantController.js
│   ├── routes/
│   │   ├── users.js
│   │   └── restaurants.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   └── server.js
├── uploads/
├── seed.js
├── package.json
└── .env
```

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ CORS configuration
- ✅ Input validation
- ✅ Role-based access control
- ✅ File upload restrictions

