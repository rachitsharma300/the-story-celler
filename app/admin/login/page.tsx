"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginWithPassword, logout } = useUserStore();
  const [email, setEmail] = useState("admin@storyceller.in");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    toast.loading("Authenticating admin...", { id: "admin-login" });
    const result = await loginWithPassword(email, password);
    if (result.success) {
      // Fetch user profile from the store state to verify their role
      const currentUser = useUserStore.getState().user;
      if (currentUser && currentUser.role === "ADMIN") {
        const token = useUserStore.getState().token;
        document.cookie = `adminToken=${token}; path=/; max-age=86400`;
        toast.success("Welcome, Administrator!", { id: "admin-login" });
        setTimeout(() => {
          router.push("/admin");
        }, 500);
      } else {
        logout();
        setError("Access Denied: You do not have admin permissions.");
        toast.error("Access Denied.", { id: "admin-login" });
        setLoading(false);
      }
    } else {
      setError(result.error || "Invalid email or password");
      toast.error(result.error || "Authentication failed", { id: "admin-login" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl bg-white border border-stone-200 shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white text-2xl font-black shadow-md mx-auto mb-4">
              S
            </div>
            <h1 className="font-display text-2xl font-bold text-stone-900">
              Admin Dashboard
            </h1>
            <p className="font-sans-clean text-sm text-stone-500 mt-2">
              The Story Celler Control Center
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-stone-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@storyceller.in"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-stone-400" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="font-sans-clean text-sm text-red-600">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              variant="default"
              className="w-full"
            >
              {loading ? "Logging in..." : "Login to Admin Panel"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="font-sans-clean text-xs text-amber-700 font-semibold mb-2">
              Demo Credentials:
            </p>
            <p className="font-sans-clean text-xs text-amber-600">
              Email: admin@storyceller.in
            </p>
            <p className="font-sans-clean text-xs text-amber-600">
              Password: admin123
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
