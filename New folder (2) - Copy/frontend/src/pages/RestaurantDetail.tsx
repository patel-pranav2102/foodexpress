import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, MapPin, IndianRupee, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { restaurants } from "@/data/restaurants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl block mb-4">🔍</span>
          <h2 className="text-2xl font-display font-bold text-foreground">Restaurant not found</h2>
          <Link to="/" className="mt-4 inline-block text-primary font-body hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
          width={800}
          height={512}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 md:px-8 pb-6">
          <Link to="/">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground font-body mb-3"
            >
              <ArrowLeft className="h-4 w-4" /> Back to restaurants
            </motion.span>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-display font-extrabold text-primary-foreground"
          >
            {restaurant.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary-foreground/80 font-body mt-1"
          >
            {restaurant.cuisine}
          </motion.p>
        </div>
      </div>

      {/* Info Bar */}
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-4 md:gap-8 py-6 border-b border-border"
        >
          <div className="flex flex-wrap gap-4 md:gap-8">
            {[
              { icon: <Star className="h-4 w-4 fill-secondary text-secondary" />, text: `${restaurant.rating} (${restaurant.reviews} reviews)` },
              { icon: <Clock className="h-4 w-4 text-primary" />, text: restaurant.deliveryTime },
              { icon: <MapPin className="h-4 w-4 text-accent" />, text: restaurant.location },
              { icon: <IndianRupee className="h-4 w-4 text-muted-foreground" />, text: restaurant.priceRange },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-body text-foreground">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
          
          {user?.role !== "admin" && (
            <button
              onClick={() => {
                if (isAuthenticated) {
                  navigate(`/restaurant/${id}/book`);
                } else {
                  navigate("/signin");
                }
              }}
              className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-2 text-sm font-body font-semibold text-secondary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <Calendar size={16} />
              Book a Table
            </button>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="py-8"
        >
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">About</h2>
          <p className="text-muted-foreground font-body leading-relaxed max-w-3xl">{restaurant.description}</p>
        </motion.div>

        {/* Menu Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pb-12"
        >
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">Menu</h2>
          <div className="space-y-8">
            {restaurant.menu.map((section, sIdx) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + sIdx * 0.1 }}
              >
                <h3 className="text-xl font-display font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 gradient-hero rounded-full" />
                  {section.category}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl border border-border bg-card p-4 shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-body font-semibold text-foreground">{item.name}</h4>
                        <span className="text-sm font-bold text-primary font-body">{item.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground font-body mt-1">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantDetail;
