import axios from "axios";

const API_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: any) => {
    console.log("API Error Response:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/signin";
    }

    // Create a more informative error object
    const apiError = new Error(
      error.response?.data?.message || 
      error.response?.statusText || 
      error.message || 
      "An error occurred"
    ) as any;
    apiError.response = error.response;
    
    return Promise.reject(apiError);
  }
);

export const authAPI = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    apiClient.post("/users/register", data),

  login: (data: { email: string; password: string }) =>
    apiClient.post("/users/login", data),

  getProfile: () =>
    apiClient.get("/users/profile"),

  updateProfile: (data: FormData) =>
    apiClient.put("/users/profile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  changePassword: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
    apiClient.post("/users/change-password", data),
};

export const restaurantAPI = {
  getAll: (params?: { search?: string; cuisine?: string }) =>
    apiClient.get("/restaurants", { params }),

  getById: (id: string) =>
    apiClient.get(`/restaurants/${id}`),

  create: (data: FormData) =>
    apiClient.post("/restaurants", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: string, data: FormData) =>
    apiClient.patch(`/restaurants/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id: string) =>
    apiClient.delete(`/restaurants/${id}`),
};

export const bookingAPI = {
  createBooking: (data: {
    restaurantId: string;
    restaurantName?: string;
    restaurantLocation?: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    numberOfGuests: number;
    bookingDate: string;
    bookingTime: string;
    specialRequests?: string;
  }) =>
    apiClient.post("/bookings", data),

  getUserBookings: () =>
    apiClient.get("/bookings"),

  getBookingDetails: (bookingId: string) =>
    apiClient.get(`/bookings/${bookingId}`),

  updateBooking: (bookingId: string, data: {
    guestName?: string;
    guestEmail?: string;
    guestPhone?: string;
    numberOfGuests?: number;
    bookingDate?: string;
    bookingTime?: string;
    specialRequests?: string;
  }) =>
    apiClient.put(`/bookings/${bookingId}`, data),

  cancelBooking: (bookingId: string) =>
    apiClient.delete(`/bookings/${bookingId}`),

  getAvailableSlots: (restaurantId: string, date: string) =>
    apiClient.get(`/bookings/available/${restaurantId}`, { params: { date } }),
};

export default apiClient;
