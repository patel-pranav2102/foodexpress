import { Star, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Restaurant } from "@/data/restaurants";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard = ({ restaurant, index }: RestaurantCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link to={`/restaurant/${restaurant.id}`}>
        <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300">
          {/* Image */}
          <div className="relative overflow-hidden h-48">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              loading="lazy"
              width={800}
              height={512}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold font-body">
              <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
              {restaurant.rating}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-foreground/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground font-body mt-1">{restaurant.cuisine}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground font-body">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {restaurant.deliveryTime}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {restaurant.location.split(",")[0]}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground font-body">{restaurant.priceRange}</span>
              <span className="text-xs text-muted-foreground font-body">{restaurant.reviews} reviews</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
