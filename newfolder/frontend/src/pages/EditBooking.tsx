import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Phone, Mail, MessageSquare, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { bookingAPI } from "@/services/apiClient";

const EditBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [booking, setBooking] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "",
    guestPhone: "",
    numberOfGuests: 2,
    specialRequests: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [errors, setErrors] = useState<{
    guestName?: string;
    guestPhone?: string;
    numberOfGuests?: string;
    date?: string;
    time?: string;
  }>({});

  const [updateStatus, setUpdateStatus] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await bookingAPI.getBookingDetails(bookingId || "");
        const bookingData = response.data.booking;
        setBooking(bookingData);

        // Populate form with existing data
        setFormData({
          guestName: bookingData.guestName,
          guestPhone: bookingData.guestPhone,
          numberOfGuests: bookingData.numberOfGuests,
          specialRequests: bookingData.specialRequests || "",
        });

        setSelectedDate(bookingData.bookingDate.split("T")[0]);
        setSelectedTime(bookingData.bookingTime);
      } catch (error) {
        console.error("Error fetching booking:", error);
        toast.error("Failed to load booking details");
        navigate("/bookings");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId, navigate]);

  // Fetch available slots when date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate || !booking) return;

      try {
        const response = await bookingAPI.getAvailableSlots(booking.restaurantId, selectedDate);
        setAvailableSlots(response.data.availableSlots || []);
      } catch (error) {
        console.error("Error fetching available slots:", error);
        toast.error("Failed to load available time slots");
      }
    };

    fetchAvailableSlots();
  }, [selectedDate, booking]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      guestName?: string;
      guestPhone?: string;
      numberOfGuests?: string;
      date?: string;
      time?: string;
    } = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = "Guest name is required";
    }

    if (!formData.guestPhone) {
      newErrors.guestPhone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.guestPhone.replace(/\D/g, ""))) {
      newErrors.guestPhone = "Invalid phone number";
    }

    if (!formData.numberOfGuests || formData.numberOfGuests < 1 || formData.numberOfGuests > 20) {
      newErrors.numberOfGuests = "Number of guests must be between 1 and 20";
    }

    if (!selectedDate) {
      newErrors.date = "Please select a date";
    }

    if (!selectedTime) {
      newErrors.time = "Please select a time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await bookingAPI.updateBooking(bookingId || "", {
        guestName: formData.guestName,
        guestPhone: formData.guestPhone,
        numberOfGuests: formData.numberOfGuests,
        bookingDate: selectedDate,
        bookingTime: selectedTime,
        specialRequests: formData.specialRequests,
      });

      console.log("Booking update successful:", response);
      setUpdateStatus("success");
      toast.success("Booking updated successfully!");

      setTimeout(() => {
        navigate("/bookings");
      }, 2000);
    } catch (error: any) {
      console.error("Update error caught:", error);
      
      // Extract error message from various possible locations
      let errorMessage = "Failed to update booking";
      
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      console.log("Error message to display:", errorMessage);
      toast.error(errorMessage);
      setUpdateStatus(null);
    } finally {
      setIsSubmitting(false);
    }
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

  if (updateStatus === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar showSearch={false} />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full rounded-2xl bg-card border border-border shadow-card p-8 text-center"
          >
            <CheckCircle size={64} className="mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">Booking Updated!</h2>
            <p className="text-muted-foreground font-body mb-4">
              Your booking has been updated successfully.
            </p>
            <p className="text-sm text-muted-foreground font-body">Redirecting to your bookings...</p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar showSearch={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle size={48} className="mx-auto text-destructive mb-4" />
            <h2 className="text-2xl font-display font-bold text-foreground">Booking Not Found</h2>
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
            <button
              onClick={() => navigate("/bookings")}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4 font-body"
            >
              <ArrowLeft size={18} />
              Back to Bookings
            </button>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Edit Booking</h1>
            <p className="text-muted-foreground font-body">{booking.restaurantId}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
              <div className="rounded-2xl bg-card border border-border shadow-card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Guest Info */}
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-4">Your Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="guestName" className="text-sm font-body font-medium text-foreground">
                          Full Name
                        </label>
                        <input
                          id="guestName"
                          name="guestName"
                          type="text"
                          value={formData.guestName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className={`w-full mt-1 rounded-lg border ${errors.guestName ? "border-destructive" : "border-border"} bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40`}
                        />
                        {errors.guestName && <p className="text-xs text-destructive mt-1 font-body">{errors.guestName}</p>}
                      </div>

                      <div>
                        <label htmlFor="guestPhone" className="text-sm font-body font-medium text-foreground">
                          Phone
                        </label>
                        <input
                          id="guestPhone"
                          name="guestPhone"
                          type="tel"
                          value={formData.guestPhone}
                          onChange={handleInputChange}
                          placeholder="(555) 000-0000"
                          className={`w-full mt-1 rounded-lg border ${errors.guestPhone ? "border-destructive" : "border-border"} bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40`}
                        />
                        {errors.guestPhone && <p className="text-xs text-destructive mt-1 font-body">{errors.guestPhone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-4">Booking Details</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="numberOfGuests" className="text-sm font-body font-medium text-foreground">
                            Number of Guests
                          </label>
                          <select
                            id="numberOfGuests"
                            name="numberOfGuests"
                            value={formData.numberOfGuests}
                            onChange={handleInputChange}
                            className={`w-full mt-1 rounded-lg border ${errors.numberOfGuests ? "border-destructive" : "border-border"} bg-muted/30 px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40`}
                          >
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "Guest" : "Guests"}
                              </option>
                            ))}
                          </select>
                          {errors.numberOfGuests && <p className="text-xs text-destructive mt-1 font-body">{errors.numberOfGuests}</p>}
                        </div>

                        <div>
                          <label htmlFor="selectedDate" className="text-sm font-body font-medium text-foreground">
                            Date
                          </label>
                          <input
                            id="selectedDate"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className={`w-full mt-1 rounded-lg border ${errors.date ? "border-destructive" : "border-border"} bg-muted/30 px-4 py-3 text-sm font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40`}
                          />
                          {errors.date && <p className="text-xs text-destructive mt-1 font-body">{errors.date}</p>}
                        </div>
                      </div>

                      {/* Time Slots */}
                      {selectedDate && availableSlots.length > 0 && (
                        <div>
                          <label className="text-sm font-body font-medium text-foreground">Select Time</label>
                          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                            {availableSlots.map((slot) => (
                              <button
                                key={slot.time}
                                type="button"
                                onClick={() => slot.available && setSelectedTime(slot.time)}
                                disabled={!slot.available && slot.time !== selectedTime}
                                className={`py-2 px-3 rounded-lg text-xs font-body font-semibold transition-all ${
                                  selectedTime === slot.time
                                    ? "bg-primary text-primary-foreground"
                                    : slot.available || slot.time === selectedTime
                                      ? "bg-muted text-foreground hover:bg-primary/20 cursor-pointer"
                                      : "bg-muted/50 text-muted-foreground opacity-50 cursor-not-allowed"
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                          {errors.time && <p className="text-xs text-destructive mt-2 font-body">{errors.time}</p>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label htmlFor="specialRequests" className="text-sm font-body font-medium text-foreground">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="E.g., High chair needed, celebration, anniversary..."
                      rows={4}
                      className="w-full mt-1 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-secondary px-6 py-3 text-sm font-bold font-body text-secondary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {isSubmitting ? "Updating..." : "Update Booking"}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Booking Summary */}
            {booking && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
                <div className="rounded-2xl bg-card border border-border shadow-card p-6 sticky top-24">
                  <h3 className="text-lg font-display font-bold text-foreground mb-4">Booking Summary</h3>

                  <div className="space-y-4 border-b border-border pb-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="text-xs text-muted-foreground font-body">Confirmation Code</div>
                      <div className="text-xs font-body font-semibold text-foreground">{booking.confirmationCode}</div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="text-xs text-muted-foreground font-body">Status</div>
                      <div className="inline-block px-2 py-1 rounded text-xs font-body font-semibold bg-yellow-500/20 text-yellow-700">
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                    </div>

                    {selectedDate && (
                      <div className="flex items-start gap-3">
                        <Calendar size={18} className="text-primary/60 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground font-body">Date</p>
                          <p className="font-body font-semibold text-foreground">{new Date(selectedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}

                    {selectedTime && (
                      <div className="flex items-start gap-3">
                        <Clock size={18} className="text-primary/60 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground font-body">Time</p>
                          <p className="font-body font-semibold text-foreground">{selectedTime}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <Users size={18} className="text-primary/60 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Guests</p>
                        <p className="font-body font-semibold text-foreground">{formData.numberOfGuests}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-primary/10 border border-primary/20 p-3">
                    <p className="text-xs font-body text-foreground">
                      Changes will be saved to your booking. A confirmation email will be sent.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditBooking;
