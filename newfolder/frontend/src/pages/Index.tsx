import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoryFilter from "@/components/CategoryFilter";
import RestaurantCard from "@/components/RestaurantCard";
import Footer from "@/components/Footer";
import { restaurants } from "@/data/restaurants";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter restaurants by both search and category
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || r.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <HeroBanner />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {/* Restaurant Grid */}
      <section className="container mx-auto px-4 md:px-8 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {selectedCategory === "all" ? "All Restaurants" : "Filtered Results"}
            <span className="ml-2 text-sm font-body font-normal text-muted-foreground">
              ({filteredRestaurants.length} places)
            </span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {filteredRestaurants.length > 0 ? (
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredRestaurants.map((restaurant, i) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <span className="text-6xl block mb-4">😕</span>
              <h3 className="text-xl font-display font-bold text-foreground">No restaurants found</h3>
              <p className="text-muted-foreground font-body mt-2">Try a different search or category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
