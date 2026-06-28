import { create } from "zustand";
import api from "@/lib/axios";

interface UserProfile {
  email: string;
  name: string;
  role: string;
}

interface UserState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  
  sendOtp: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  initializeAuth: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  initializeAuth: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({ token, user, isAuthenticated: true });
          // Add default Authorization header to axios client
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (e) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    }
  },

  sendOtp: async (email: string) => {
    set({ loading: true, error: null });
    try {
      await api.post(`/api/auth/send-otp?email=${encodeURIComponent(email)}`);
      set({ loading: false });
      return { success: true };
    } catch (err: any) {
      const errMsg = err.response?.data?.error || "Failed to send OTP. Please check the email address.";
      set({ loading: false, error: errMsg });
      return { success: false, error: errMsg };
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post(
        `/api/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`
      );
      const { token, email: resEmail, name, role } = res.data;
      
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ email: resEmail, name, role }));
      }
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      set({
        token,
        user: { email: resEmail, name, role },
        isAuthenticated: true,
        loading: false
      });
      return { success: true };
    } catch (err: any) {
      const errMsg = err.response?.data?.error || "Invalid or expired OTP.";
      set({ loading: false, error: errMsg });
      return { success: false, error: errMsg };
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    delete api.defaults.headers.common["Authorization"];
    set({ token: null, user: null, isAuthenticated: false });
  }
}));
