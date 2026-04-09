import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, Phone, Edit2, Trash2, CheckCircle, Clock as ClockIcon, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { bookingAPI } from "@/services/apiClient";

const MyBookings = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    fetchBookings();
  }, [isAuthenticated, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getUserBookings();
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await bookingAPI.cancelBooking(bookingId);
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    }
  };

  const handleEditBooking = (bookingId) => {
    navigate(`/edit-booking/${bookingId}`);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
      confirmed: "bg-green-500/20 text-green-700 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-700 border-red-500/30",
      completed: "bg-blue-500/20 text-blue-700 border-blue-500/30",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <ClockIcon size={16} />,
      confirmed: <CheckCircle size={16} />,
      cancelled: <AlertCircle size={16} />,
      completed: <CheckCircle size={16} />,
    };
    return icons[status] || icons.pending;
  };

  const filteredBookings = filterStatus === "all" ? bookings : bookings.filter((b) => b.status === filterStatus);

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar showSearch={false} />

      <div className="flex-1 container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">My Bookings</h1>
            <p className="text-muted-foreground font-body">Manage your table reservations</p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-2 mb-8">
            {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-card border border-border shadow-card p-8 text-center"
            >
              <Calendar size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-display font-bold text-foreground mb-2">No Bookings</h3>
              <p className="text-muted-foreground font-body mb-6">
                {filterStatus === "all" ? "You haven't made any bookings yet." : `No ${filterStatus} bookings.`}
              </p>
              <button
                onClick={() => navigate("/")}
                className="rounded-lg bg-secondary px-6 py-2 text-sm font-body font-semibold text-secondary-foreground hover:opacity-90 transition-opacity"
              >
                Browse Restaurants
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl bg-card border border-border shadow-card p-6 hover:shadow-card-hover transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-display font-bold text-foreground">{booking.restaurantName}</h3>
                      <p className="text-sm text-muted-foreground font-body">{booking.confirmationCode}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-body font-semibold border ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-3">
                      <Calendar size={18} className="text-primary/60" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Date</p>
                        <p className="font-body font-semibold text-foreground">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-primary/60" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Time</p>
                        <p className="font-body font-semibold text-foreground">{booking.bookingTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users size={18} className="text-primary/60" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Guests</p>
                        <p className="font-body font-semibold text-foreground">{booking.numberOfGuests}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-primary/60" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Location</p>
                        <p className="font-body font-semibold text-foreground text-sm">{booking.restaurantLocation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleEditBooking(booking._id)}
                          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-body font-semibold text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-destructive/20 px-4 py-2 text-sm font-body font-semibold text-destructive hover:bg-destructive/30 transition-colors"
                        >
                          <Trash2 size={16} />
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="w-full rounded-lg bg-destructive/20 px-4 py-2 text-sm font-body font-semibold text-destructive hover:bg-destructive/30 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>

                  {booking.specialRequests && (
                    <div className="mt-4 rounded-lg bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground font-body font-semibold mb-1">Special Requests</p>
                      <p className="text-sm font-body text-foreground">{booking.specialRequests}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyBookings;
