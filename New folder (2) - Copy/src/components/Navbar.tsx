import { Search, User, X, Menu, LogOut, LogIn, Calendar } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

const Navbar = ({ searchQuery = "", onSearchChange, showSearch = true }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/signin");
    setMobileMenuOpen(false);
  };

  const handleSignUp = () => {
    navigate("/signup");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-2xl">🍽️</span>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gradient tracking-tight group-hover:scale-105 transition-transform">
              Food Express
            </h1>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all ${
                  location.pathname === link.to
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/bookings"
                className={`px-4 py-2 rounded-full text-sm font-body font-semibold transition-all flex items-center gap-2 ${
                  location.pathname === "/bookings"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Calendar size={16} />
                My Bookings
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          {showSearch && onSearchChange && (
            <div className="relative hidden lg:block w-full max-w-sm mx-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-full border border-border bg-muted/50 pl-10 pr-4 py-2.5 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
              {searchQuery && (
                <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          )}

          <div className="flex items-center gap-3">
            {/* User Menu / Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2.5 text-sm font-semibold font-body text-orange-600 hover:bg-orange-200 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline max-w-[100px] truncate">{user.name}</span>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg bg-background border border-border shadow-lg"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        {user.role === "admin" && (
                          <span className="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded">
                            Admin
                          </span>
                        )}
                      </div>
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <User className="h-4 w-4" />
                          My Profile
                        </Link>
                        <Link
                          to="/bookings"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <Calendar className="h-4 w-4" />
                          My Bookings
                        </Link>
                        {user.role === "admin" && (
                          <Link
                            to="/admin/dashboard"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            <User className="h-4 w-4" />
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignIn}
                  className="hidden md:flex items-center gap-2 rounded-full border border-orange-600 px-4 py-2.5 text-sm font-semibold font-body text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignUp}
                  className="hidden md:flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2.5 text-sm font-semibold font-body text-white hover:bg-orange-700 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Sign Up
                </motion.button>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile Nav + Search */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="px-4 py-3 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-body font-semibold transition-all ${
                      location.pathname === link.to
                        ? "gradient-hero text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    to="/bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-body font-semibold transition-all ${
                      location.pathname === "/bookings"
                        ? "gradient-hero text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Calendar size={16} />
                    My Bookings
                  </Link>
                )}

                {!isAuthenticated ? (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <button
                      onClick={handleSignIn}
                      className="w-full flex items-center justify-center gap-2 rounded-lg border border-orange-600 px-4 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </button>
                    <button
                      onClick={handleSignUp}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <User className="h-4 w-4" />
                      My Profile
                    </Link>
                    <Link
                      to="/bookings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      My Bookings
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors justify-start"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}

                {showSearch && onSearchChange && (
                  <div className="relative pt-2">
                    <Search className="absolute left-3 top-1/2 mt-1 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search restaurants..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full rounded-full border border-border bg-muted/50 pl-10 pr-4 py-2.5 text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
