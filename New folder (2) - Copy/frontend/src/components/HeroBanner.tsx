import { motion } from "framer-motion";

const heroBanner = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=1200&h=600&fit=crop";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden h-96 md:h-[500px]">
      {/* Background Image */}
      <img 
        src={heroBanner} 
        alt="Hero Banner" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
      <div className="relative container mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-primary-foreground leading-tight"
          >
            Discover the Best
            <span className="block text-secondary"> Food Near You</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 text-primary-foreground/80 font-body text-lg max-w-md"
          >
            Explore top restaurants, read reviews, and find your next favorite meal — all in one place.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 rounded-full bg-secondary px-8 py-3 text-sm font-bold font-body text-secondary-foreground shadow-lg hover:shadow-xl transition-shadow"
          >
            Explore Restaurants 🍴
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
