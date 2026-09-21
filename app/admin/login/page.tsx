"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginWithPassword, logout } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    toast.loading("Authenticating admin credentials...", { id: "admin-login" });
    const result = await loginWithPassword(email, password);
    if (result.success) {
      const currentUser = useUserStore.getState().user;
      if (currentUser && currentUser.role === "ADMIN") {
        const token = useUserStore.getState().token;
        document.cookie = `adminToken=${token}; path=/; max-age=86400; SameSite=Strict`;
        toast.success("Welcome back, Administrator!", { id: "admin-login" });
        setTimeout(() => {
          router.push("/admin");
        }, 500);
      } else {
        logout();
        setError("Access Denied: You do not have administrator permissions.");
        toast.error("Access Denied.", { id: "admin-login" });
        setLoading(false);
      }
    } else {
      setError(result.error || "Invalid administrator credentials.");
      toast.error(result.error || "Authentication failed", { id: "admin-login" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#180C0E] via-[#120708] to-[#0A0304] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl bg-[#1A1012] border border-[#A65B62]/30 shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#A65B62]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A65B62] to-[#8C484E] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#A65B62]/30 mx-auto mb-4 border border-white/10">
              <Lock size={26} />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Admin Portal
            </h1>
            <p className="font-sans-clean text-xs text-[#C8B4B6] mt-2">
              The Story Celler Secure Control Center
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative z-10" autoComplete="off">
            {/* Email */}
            <div>
              <label className="font-sans-clean text-xs font-bold text-[#E8D5D7] uppercase tracking-wider block mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-[#9E888A]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@storyceller.in"
                  required
                  autoComplete="off"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-800 bg-[#221517] font-sans-clean text-sm text-white placeholder-stone-600 outline-none focus:border-[#A65B62] focus:bg-[#2A191C] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-sans-clean text-xs font-bold text-[#E8D5D7] uppercase tracking-wider block mb-2">
                Master Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-[#9E888A]" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-stone-800 bg-[#221517] font-sans-clean text-sm text-white placeholder-stone-600 outline-none focus:border-[#A65B62] focus:bg-[#2A191C] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-[#9E888A] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-rose-950/60 border border-rose-500/40 rounded-xl flex items-center gap-3 text-rose-200 text-xs font-sans-clean"
              >
                <ShieldAlert size={18} className="shrink-0 text-rose-400" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#A65B62] to-[#8C484E] hover:from-[#8C484E] hover:to-[#733A3F] text-white font-sans-clean font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#A65B62]/25 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Authenticating Admin..." : "Authorize Admin Access"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
