import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Target, Award, Heart, Utensils, TrendingUp, Globe, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: <Utensils className="h-6 w-6" />, value: "500+", label: "Partner Restaurants" },
  { icon: <Users className="h-6 w-6" />, value: "1M+", label: "Happy Customers" },
  { icon: <Globe className="h-6 w-6" />, value: "50+", label: "Cities Covered" },
  { icon: <TrendingUp className="h-6 w-6" />, value: "10M+", label: "Orders Delivered" },
];

const values = [
  { icon: <Heart className="h-8 w-8" />, title: "Passion for Food", description: "We believe great food brings people together. Every restaurant on our platform is handpicked for quality and taste." },
  { icon: <ShieldCheck className="h-8 w-8" />, title: "Trust & Safety", description: "Your health matters. We ensure all our partners follow strict hygiene and food safety standards." },
  { icon: <Award className="h-8 w-8" />, title: "Excellence", description: "From delivery speed to customer support, we strive for excellence in every interaction." },
  { icon: <Target className="h-8 w-8" />, title: "Innovation", description: "We leverage cutting-edge technology to make food discovery and ordering seamless for everyone." },
];

const team = [
  { name: "Rahul Sharma", role: "Founder & CEO", emoji: "👨‍💼" },
  { name: "Priya Patel", role: "Head of Operations", emoji: "👩‍💻" },
  { name: "Amit Singh", role: "Chief Technology Officer", emoji: "👨‍🔬" },
  { name: "Sneha Gupta", role: "Head of Partnerships", emoji: "👩‍🍳" },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearch={false} />

      {/* Hero Section */}
      <section className="relative overflow-hidden h-72 md:h-96">
        <div className="h-full w-full bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-body mb-2 inline-block">
                ← Back to Home
              </Link>
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary-foreground">About Us</h1>
              <p className="text-primary-foreground/80 font-body text-lg mt-3 max-w-xl">
                The story behind Food Express — connecting food lovers with the best restaurants since 2020.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              At Food Express, we're on a mission to revolutionize the way people discover and enjoy food. We believe everyone deserves access to amazing restaurants and cuisines, no matter where they are.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Founded in 2020, we started as a small team of food enthusiasts who wanted to create a platform that truly understands what foodies need — honest reviews, beautiful imagery, and seamless ordering.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-secondary px-6 py-3 text-sm font-bold font-body text-secondary-foreground shadow-md"
              >
                Get in Touch →
              </motion.button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="h-80 bg-muted rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-foreground/20 text-primary-foreground mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-display font-extrabold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80 font-body mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display font-bold text-foreground text-center mb-12"
        >
          Our Core Values
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                {value.icon}
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quality Section */}
      <section className="container mx-auto px-4 md:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="h-80 bg-muted rounded-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Quality You Can Trust</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              Every restaurant on Food Express goes through a rigorous vetting process. We visit each location, taste the food, and check hygiene standards before listing them on our platform.
            </p>
            <ul className="space-y-3">
              {["Hygiene certified restaurants", "Real customer reviews only", "Fresh ingredients guaranteed", "24/7 quality monitoring"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground font-body text-sm">
                  <span className="w-6 h-6 rounded-full gradient-hero flex items-center justify-center text-xs text-primary-foreground">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-foreground text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-card-hover transition-all cursor-pointer text-center"
              >
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-display font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary font-body font-semibold mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 md:px-8 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Ready to Explore?</h2>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
            Discover amazing restaurants and cuisines near you. Your next favorite meal is just a click away.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full bg-secondary px-8 py-3 text-sm font-bold font-body text-secondary-foreground shadow-lg">
                Browse Restaurants 🍴
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full border-2 border-primary px-8 py-3 text-sm font-bold font-body text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
