import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { authAPI } from "@/services/apiClient";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateProfileForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      newErrors.newPassword = "Must contain uppercase, lowercase, and number";
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProfileForm()) return;

    setIsLoading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("address", formData.address);

      const response = await authAPI.updateProfile(formDataObj);
      setUser(response.data);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update profile";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setIsLoading(true);
    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
      toast.success("Password changed successfully");
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to change password";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return <div className="flex items-center justify-center h-screen">Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar showSearch={false} />
      
      <div className="flex-1 container mx-auto px-4 md:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="rounded-2xl bg-card border border-border shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground font-body">{user.email}</p>
              </div>
              {user.role === "admin" && (
                <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-body font-semibold rounded-full">
                  Admin
                </span>
              )}
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="rounded-2xl bg-card border border-border shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Profile Information</h2>
                <p className="text-sm text-muted-foreground font-body">Manage your account details</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setFormData({
                      name: user.name,
                      email: user.email,
                      phone: user.phone || "",
                      address: user.address || "",
                    });
                  }}
                  className="rounded-lg bg-secondary px-4 py-2 text-sm font-body font-semibold text-secondary-foreground hover:opacity-90 transition-opacity"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground font-body font-medium">Full Name</label>
                  <p className="text-foreground font-body font-semibold mt-1">{user.name}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-body font-medium">Email</label>
                  <p className="text-foreground font-body font-semibold mt-1">{user.email}</p>
                </div>
                {user.phone && (
                  <div>
                    <label className="text-xs text-muted-foreground font-body font-medium">Phone</label>
                    <p className="text-foreground font-body font-semibold mt-1">{user.phone}</p>
                  </div>
                )}
                {user.address && (
                  <div>
                    <label className="text-xs text-muted-foreground font-body font-medium">Address</label>
                    <p className="text-foreground font-body font-semibold mt-1">{user.address}</p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-body font-medium text-foreground">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`w-full rounded-lg border ${errors.name ? 'border-destructive' : 'border-border'} bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50`}
                  />
                  {errors.name && <p className="text-xs font-body text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-body font-medium text-foreground">Email (Cannot be changed)</label>
                  <input
                    value={formData.email}
                    disabled
                    className="w-full rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm font-body text-muted-foreground opacity-50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-body font-medium text-foreground">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="(555) 000-0000"
                    className={`w-full rounded-lg border ${errors.phone ? 'border-destructive' : 'border-border'} bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50`}
                  />
                  {errors.phone && <p className="text-xs font-body text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-body font-medium text-foreground">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    placeholder="Your address"
                    className="w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-lg bg-secondary px-4 py-2 text-sm font-body font-semibold text-secondary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                    }}
                    disabled={isLoading}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-body font-semibold text-foreground hover:bg-muted/50 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Change Password Section */}
          <div className="rounded-2xl bg-card border border-border shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Security</h2>
                <p className="text-sm text-muted-foreground font-body">Change your password</p>
              </div>
              {!showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Change Password
                </button>
              )}
            </div>

            {showPasswordForm && (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="currentPassword" className="text-sm font-body font-medium text-foreground">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPasswordCurrent ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      disabled={isLoading}
                      className={`w-full rounded-lg border ${errors.currentPassword ? 'border-destructive' : 'border-border'} bg-muted/30 px-4 py-3 pr-10 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordCurrent(!showPasswordCurrent)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPasswordCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-xs font-body text-destructive">{errors.currentPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="newPassword" className="text-sm font-body font-medium text-foreground">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPasswordNew ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      disabled={isLoading}
                      className={`w-full rounded-lg border ${errors.newPassword ? 'border-destructive' : 'border-border'} bg-muted/30 px-4 py-3 pr-10 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordNew(!showPasswordNew)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPasswordNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-xs font-body text-destructive">{errors.newPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-body font-medium text-foreground">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    className={`w-full rounded-lg border ${errors.confirmPassword ? 'border-destructive' : 'border-border'} bg-muted/30 px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs font-body text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-body font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setErrors({});
                    }}
                    disabled={isLoading}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-body font-semibold text-foreground hover:bg-muted/50 disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
