import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/services/apiClient";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<"user" | "admin">("user");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (loginType === "user") {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    } else {
      if (!formData.email) {
        newErrors.email = "Username is required";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const email = loginType === "admin" 
        ? (formData.email === "admin123" ? "admin@fooddelivery.com" : formData.email)
        : formData.email;

      const response = await authAPI.login({
        email,
        password: formData.password,
      });

      const { token, user } = response.data;
      
      // Check if user role matches login type
      if (loginType === "admin" && user.role !== "admin") {
        toast.error("Invalid admin credentials");
        return;
      }
      
      if (loginType === "user" && user.role === "admin") {
        toast.error("Please use admin login for admin accounts");
        return;
      }

      login(user, token);
      toast.success("Sign in successful!");
      
      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Sign in failed. Please try again.";
      toast.error(message);
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar showSearch={false} />
      
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-card border border-border shadow-card p-8">
            <div className="space-y-2 text-center mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground font-body">Sign in to your account to continue</p>
            </div>

            {/* Login Type Toggle */}
            <div className="flex gap-3 mb-8 bg-muted p-1 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setLoginType("user");
                  setFormData({ email: "", password: "" });
                  setErrors({});
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  loginType === "user"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                User Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginType("admin");
                  setFormData({ email: "", password: "" });
                  setErrors({});
                }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  loginType === "admin"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Admin Login
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-body font-medium text-foreground flex items-center gap-2">
                  {loginType === "admin" ? (
                    <>
                      <Lock size={16} />
                      Username
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      Email Address
                    </>
                  )}
                </label>
                <input
                  id="email"
                  name="email"
                  type={loginType === "admin" ? "text" : "email"}
                  placeholder={loginType === "admin" ? "admin123" : "you@example.com"}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full rounded-lg border ${errors.email ? 'border-destructive' : 'border-border'} bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50`}
                />
                {errors.email && <p className="text-xs font-body text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-body font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full rounded-lg border ${errors.password ? 'border-destructive' : 'border-border'} bg-muted/30 px-4 py-3 pr-10 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs font-body text-destructive">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 rounded-lg bg-secondary px-4 py-3 text-sm font-bold font-body text-secondary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center space-y-4">
              {loginType === "user" && (
                <p className="text-sm text-muted-foreground font-body">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-secondary font-body font-semibold hover:underline transition"
                  >
                    Sign Up
                  </Link>
                </p>
              )}

              <div className="pt-4 border-t border-border">
                {loginType === "user" ? (
                  <p className="text-xs text-muted-foreground font-body">
                    Demo: test@example.com / Password123
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground font-body">
                    Demo: admin123 / Admin@213
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
