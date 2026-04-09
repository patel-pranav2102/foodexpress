import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, HelpCircle } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import contactSupport from "@/assets/contact-support.jpg";

const contactInfo = [
  { icon: <Phone className="h-5 w-5" />, title: "Phone", value: "+91 98765 43210", subtitle: "Mon-Sat, 9am-9pm IST", action: "tel:+919876543210" },
  { icon: <Mail className="h-5 w-5" />, title: "Email", value: "hello@foodexpress.in", subtitle: "We reply within 24 hours", action: "mailto:hello@foodexpress.in" },
  { icon: <MapPin className="h-5 w-5" />, title: "Office", value: "Tower B, Cyber City", subtitle: "Gurgaon, Haryana 122002", action: "#" },
  { icon: <Clock className="h-5 w-5" />, title: "Hours", value: "9:00 AM - 9:00 PM", subtitle: "Monday to Saturday", action: "#" },
];

const faqs = [
  { q: "How do I list my restaurant on Food Express?", a: "Simply visit our Partner page or email us at partners@foodexpress.in. Our team will guide you through the onboarding process within 48 hours." },
  { q: "Is there a delivery fee?", a: "Delivery fees vary by restaurant and distance. Many of our partner restaurants offer free delivery on orders above ₹500." },
  { q: "How can I track my order?", a: "Once your order is confirmed, you'll receive a real-time tracking link via SMS and email. You can also track it in the app." },
  { q: "What if I have a complaint about food quality?", a: "We take quality very seriously. Contact our support team immediately and we'll resolve the issue within 24 hours with a refund or replacement." },
];

const supportCards = [
  { icon: <MessageCircle className="h-8 w-8" />, title: "Live Chat", description: "Chat with our support team in real-time for instant help.", buttonText: "Start Chat", color: "gradient-hero" },
  { icon: <Headphones className="h-8 w-8" />, title: "Call Us", description: "Speak directly with our friendly customer support team.", buttonText: "Call Now", color: "gradient-warm" },
  { icon: <HelpCircle className="h-8 w-8" />, title: "Help Center", description: "Browse our knowledge base for quick answers to common questions.", buttonText: "Visit Help Center", color: "gradient-hero" },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
              <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary-foreground">Contact Us</h1>
              <p className="text-primary-foreground/80 font-body text-lg mt-3 max-w-xl">
                We'd love to hear from you. Get in touch and let us know how we can help!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 md:px-8 -mt-12 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => (
            <motion.a
              key={info.title}
              href={info.action}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary mb-3">
                {info.icon}
              </div>
              <h3 className="font-display font-bold text-foreground">{info.title}</h3>
              <p className="text-sm font-body font-semibold text-foreground mt-1">{info.value}</p>
              <p className="text-xs text-muted-foreground font-body mt-0.5">{info.subtitle}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Send us a Message</h2>
            <p className="text-muted-foreground font-body mb-6">Fill out the form and our team will get back to you within 24 hours.</p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-2xl bg-card border border-primary/30 p-8 text-center"
              >
                <span className="text-5xl block mb-4">✅</span>
                <h3 className="text-xl font-display font-bold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground font-body mt-2">Thank you for reaching out. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <textarea
                  placeholder="Your Message..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-full bg-secondary px-8 py-3 text-sm font-bold font-body text-secondary-foreground shadow-md hover:shadow-lg transition-shadow"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Map / Support Cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Other Ways to Reach Us</h2>
            <div className="space-y-4">
              {supportCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 rounded-2xl bg-card border border-border p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer"
                >
                  <div className={`shrink-0 w-14 h-14 rounded-xl ${card.color} flex items-center justify-center text-foreground`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground font-body mt-1">{card.description}</p>
                    <button className="text-sm text-foreground font-body font-semibold mt-2 hover:underline">{card.buttonText} →</button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Embedded map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-card h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2!2d77.088!3d28.494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI5JzM4LjQiTiA3N8KwMDUnMTYuOCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Office Location"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold text-foreground text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl bg-card border border-border overflow-hidden shadow-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-body font-semibold text-foreground hover:bg-muted/50 transition-colors"
                >
                  {faq.q}
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} className="text-primary shrink-0 ml-2">▼</motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-muted-foreground font-body">{faq.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-8 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Still have questions?</h2>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
            Our support team is always ready to help. Don't hesitate to reach out!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full bg-secondary px-8 py-3 text-sm font-bold font-body text-secondary-foreground shadow-lg">
                Explore Restaurants 🍴
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full border-2 border-primary px-8 py-3 text-sm font-bold font-body text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                About Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
