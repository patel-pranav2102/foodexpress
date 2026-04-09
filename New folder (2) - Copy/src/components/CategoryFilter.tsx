import { motion } from "framer-motion";
import { categories } from "@/data/restaurants";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-lg font-display font-bold text-foreground mb-4">What are you craving?</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold font-body whitespace-nowrap border transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground border-transparent shadow-md"
                  : "bg-card text-foreground border-border hover:border-primary/30 shadow-card"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
