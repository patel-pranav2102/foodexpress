import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, LogOut, Calendar, Users, TrendingUp, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

interface Booking {
  _id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  restaurantId: string;
  restaurantName: string;
  numberOfGuests: number;
  bookingDate: string;
  bookingTime: string;
  specialRequests: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "all" | "confirmed" | "cancelled" | "completed">("pending");

  const API_URL =  "http://localhost:5002/api";

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (user?.role !== "admin") {
      toast.error("Admin access required");
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  // Fetch all bookings
  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(`${API_URL}/admin/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllBookings(response.data.bookings || []);
        setStats(response.data.stats || {
          total: 0,
          pending: 0,
          confirmed: 0,
          cancelled: 0,
          completed: 0,
        });
      } catch (error: any) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  const getFilteredBookings = () => {
    if (activeTab === "all") return allBookings;
    return allBookings.filter((b) => b.status === activeTab);
  };

  const handleApprove = async (bookingId: string) => {
    setProcessingId(bookingId);
    try {
      const token = localStorage.getItem("auth_token");
      await axios.patch(
        `${API_URL}/admin/bookings/${bookingId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAllBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "confirmed" } : b
        )
      );
      setStats(prev => ({
        ...prev,
        pending: prev.pending - 1,
        confirmed: prev.confirmed + 1,
      }));
      toast.success("Booking approved successfully!");
    } catch (error: any) {
      console.error("Error approving booking:", error);
      toast.error(error?.response?.data?.message || "Failed to approve booking");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (bookingId: string) => {
    setProcessingId(bookingId);
    try {
      const token = localStorage.getItem("auth_token");
      await axios.patch(
        `${API_URL}/admin/bookings/${bookingId}/reject`,
        { reason: "Rejected by admin" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAllBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );
      setStats(prev => ({
        ...prev,
        pending: prev.pending - 1,
        cancelled: prev.cancelled + 1,
      }));
      toast.success("Booking rejected successfully!");
    } catch (error: any) {
      console.error("Error rejecting booking:", error);
      toast.error(error?.response?.data?.message || "Failed to reject booking");
    } finally {
      setProcessingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/signin");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar showSearch={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-8 w-48 bg-muted rounded mb-4 mx-auto"></div>
            <div className="h-4 w-64 bg-muted rounded mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const filteredBookings = getFilteredBookings();
  const statCards = [
    { label: "Total Bookings", value: stats.total, icon: Calendar, color: "from-blue-500 to-blue-600" },
    { label: "Pending", value: stats.pending, icon: Clock, color: "from-yellow-500 to-yellow-600" },
    { label: "Confirmed", value: stats.confirmed, icon: CheckCircle, color: "from-green-500 to-green-600" },
    { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "from-red-500 to-red-600" },
    { label: "Completed", value: stats.completed, icon: TrendingUp, color: "from-purple-500 to-purple-600" },
  ];

  const tabOptions = [
    { id: "pending", label: "Pending", count: stats.pending },
    { id: "confirmed", label: "Confirmed", count: stats.confirmed },
    { id: "cancelled", label: "Cancelled", count: stats.cancelled },
    { id: "completed", label: "Completed", count: stats.completed },
    { id: "all", label: "All Bookings", count: stats.total },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar showSearch={false} />

      <div className="flex-1 p-3 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-8">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">Manage table bookings and customer reservations</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition whitespace-nowrap"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
            {statCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-muted-foreground text-xs md:text-sm font-medium truncate">{card.label}</p>
                      <p className="text-2xl md:text-3xl font-bold text-foreground mt-2">{card.value}</p>
                    </div>
                    <div className={`bg-gradient-to-br ${card.color} p-2 md:p-3 rounded-lg flex-shrink-0`}>
                      <Icon size={20} className="md:w-6 md:h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 flex-wrap bg-muted p-2 rounded-lg overflow-x-auto">
              {tabOptions.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-1 md:gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span className="bg-background/20 px-2 py-0.5 rounded text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 md:py-20 px-4 bg-card border border-border rounded-lg"
            >
              <AlertCircle size={40} className="md:w-12 md:h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-base md:text-lg font-semibold text-foreground mb-2">No {activeTab} bookings</p>
              <p className="text-xs md:text-sm text-muted-foreground">All bookings in this category have been processed!</p>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {filteredBookings.map((booking, index) => {
                const isActionable = booking.status === "pending";
                const statusColor =
                  booking.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : booking.status === "confirmed"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : booking.status === "completed"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";

                return (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card border border-border rounded-lg p-4 md:p-6 hover:shadow-lg transition"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                      {/* Booking Info */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 text-sm md:text-base">Guest</h3>
                        <div className="space-y-2 text-xs md:text-sm">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Name:</span> {booking.guestName}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Email:</span> {booking.guestEmail}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Phone:</span> {booking.guestPhone}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Guests:</span> {booking.numberOfGuests}
                          </p>
                        </div>
                      </div>

                      {/* Restaurant Details */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 text-sm md:text-base">Restaurant</h3>
                        <div className="space-y-2 text-xs md:text-sm">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Name:</span> {booking.restaurantName}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Date:</span>{" "}
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Time:</span> {booking.bookingTime}
                          </p>
                          {booking.specialRequests && (
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Notes:</span> {booking.specialRequests}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* User Info */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 text-sm md:text-base">Booker</h3>
                        <div className="space-y-2 text-xs md:text-sm">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Name:</span> {booking.userId?.name}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Email:</span> {booking.userId?.email}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Requested:</span>{" "}
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3 text-sm md:text-base">Status</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    {isActionable && (
                      <div className="flex flex-col md:flex-row gap-2 md:gap-3 pt-6 border-t border-border">
                        <button
                          onClick={() => handleApprove(booking._id)}
                          disabled={processingId === booking._id}
                          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 px-3 md:px-4 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 text-sm md:text-base"
                        >
                          <CheckCircle size={16} className="md:w-[18px] md:h-[18px]" />
                          {processingId === booking._id ? "Processing..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleReject(booking._id)}
                          disabled={processingId === booking._id}
                          className="flex-1 flex items-center justify-center gap-2 bg-destructive text-destructive-foreground py-2 px-3 md:px-4 rounded-lg hover:bg-destructive/90 transition disabled:opacity-50 text-sm md:text-base"
                        >
                          <XCircle size={16} className="md:w-[18px] md:h-[18px]" />
                          {processingId === booking._id ? "Processing..." : "Reject"}
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
