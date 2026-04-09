import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import RestaurantDetail from "./pages/RestaurantDetail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import BookTable from "./pages/BookTable";
import MyBookings from "./pages/MyBookings";
import EditBooking from "./pages/EditBooking";
import AdminDashboard from "./pages/AdminDashboard";
import { ProtectedRoute } from "@/components/ProtectedRoute";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/restaurant/:id/book" element={<ProtectedRoute element={<BookTable />} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
            <Route path="/bookings" element={<ProtectedRoute element={<MyBookings />} />} />
            <Route path="/edit-booking/:bookingId" element={<ProtectedRoute element={<EditBooking />} />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
