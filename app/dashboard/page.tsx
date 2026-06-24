"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Heart,
  Package,
  Settings,
  LogOut,
  Edit2,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Eye,
  EyeOff,
  ChevronRight,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type TabType = "orders" | "profile" | "wishlist" | "settings";

interface Order {
  id: string;
  product: string;
  emoji: string;
  date: string;
  status: "pending" | "processing" | "designed" | "dispatched" | "delivered";
  total: number;
  advance: number;
}

interface WishlistItem {
  slug: string;
  name: string;
  emoji: string;
  price: number;
  originalPrice: number;
  tag: string;
  tagColor: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const mockOrders: Order[] = [
  {
    id: "MV001",
    product: "Custom Magazine",
    emoji: "📖",
    date: "June 5, 2025",
    status: "dispatched",
    total: 1200,
    advance: 600,
  },
  {
    id: "MV002",
    product: "Photo Album",
    emoji: "🖼️",
    date: "May 28, 2025",
    status: "delivered",
    total: 1500,
    advance: 750,
  },
  {
    id: "MV003",
    product: "Recap Reel",
    emoji: "🎬",
    date: "May 15, 2025",
    status: "delivered",
    total: 550,
    advance: 275,
  },
];

const mockWishlist: WishlistItem[] = [
  {
    slug: "anniversary-album",
    name: "Anniversary Album",
    emoji: "💑",
    price: 1800,
    originalPrice: 2500,
    tag: "Premium",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    slug: "birthday-magazine",
    name: "Birthday Magazine",
    emoji: "🎂",
    price: 1400,
    originalPrice: 2000,
    tag: "Trending",
    tagColor: "bg-amber-100 text-amber-700",
  },
];

const mockProfile: UserProfile = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "+91 98765 43210",
  joinDate: "March 2024",
  address: "123 Memory Lane, Apartment 4B",
  city: "New Delhi",
  state: "Delhi",
  pincode: "110001",
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "text-blue-600", bg: "bg-blue-50" },
  processing: { label: "Processing", color: "text-purple-600", bg: "bg-purple-50" },
  designed: { label: "Design Ready", color: "text-amber-600", bg: "bg-amber-50" },
  dispatched: { label: "Dispatched", color: "text-orange-600", bg: "bg-orange-50" },
  delivered: { label: "Delivered", color: "text-green-600", bg: "bg-green-50" },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("orders");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  const [showPassword, setShowPassword] = useState(false);

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          {/* ── SIDEBAR ── */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm h-fit sticky top-24"
          >
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-md mx-auto">
                {profile.name.charAt(0)}
              </div>
              <p className="font-display text-lg font-bold text-stone-900 text-center mt-4">
                {profile.name}
              </p>
              <p className="font-sans-clean text-xs text-stone-500 text-center">
                Joined {profile.joinDate}
              </p>
            </div>

            <nav className="space-y-2">
              {[
                { id: "orders" as TabType, label: "Orders", icon: Package },
                { id: "profile" as TabType, label: "Profile", icon: User },
                { id: "wishlist" as TabType, label: "Wishlist", icon: Heart },
                { id: "settings" as TabType, label: "Settings", icon: Settings },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-sans-clean text-sm font-medium ${
                    activeTab === id
                      ? "bg-amber-50 text-amber-600 border border-amber-200"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-stone-200">
              <Button variant="destructive" size="sm" className="w-full justify-start gap-3">
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </motion.aside>

          {/* ── CONTENT ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div>
                <div className="mb-8">
                  <p className="text-xs tracking-widest uppercase text-amber-500 font-bold font-sans-clean mb-2">
                    Your Orders
                  </p>
                  <h1 className="font-display text-4xl font-bold text-stone-900">
                    Order History
                  </h1>
                </div>

                <div className="space-y-4">
                  {mockOrders.length === 0 ? (
                    <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center">
                      <p className="text-5xl mb-4">📦</p>
                      <p className="font-display text-2xl font-bold text-stone-900 mb-2">
                        No orders yet
                      </p>
                      <p className="font-sans-clean text-stone-500 mb-6">
                        Start creating your keepsakes today!
                      </p>
                      <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-sans-clean font-semibold rounded-full transition-all"
                      >
                        Shop Now
                      </Link>
                    </div>
                  ) : (
                    mockOrders.map((order, i) => {
                      const config = statusConfig[order.status];
                      return (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="rounded-3xl border border-stone-200 bg-white p-6 hover:shadow-md transition-all"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-50 text-4xl">
                              {order.emoji}
                            </div>

                            <div>
                              <p className="font-display text-lg font-bold text-stone-900">
                                {order.product}
                              </p>
                              <p className="font-sans-clean text-sm text-stone-500">
                                Order #{order.id} • {order.date}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <span
                                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${config.bg} ${config.color}`}
                                >
                                  {config.label}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="font-display text-2xl font-bold text-stone-900">
                                ₹{order.total.toLocaleString()}
                              </p>
                              <p className="font-sans-clean text-xs text-stone-400 mt-1">
                                Advance paid: ₹{order.advance.toLocaleString()}
                              </p>
                              <Link
                                href={`/track-order?order=${order.id}`}
                                className="inline-flex items-center gap-1 mt-3 text-amber-600 hover:text-amber-700 font-sans-clean text-sm font-semibold transition-colors"
                              >
                                Track <ChevronRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div>
                <div className="mb-8">
                  <p className="text-xs tracking-widest uppercase text-amber-500 font-bold font-sans-clean mb-2">
                    Account
                  </p>
                  <h1 className="font-display text-4xl font-bold text-stone-900">
                    Your Profile
                  </h1>
                </div>

                <div className="rounded-3xl border border-stone-200 bg-white p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-display text-2xl font-bold text-stone-900">
                      Personal Information
                    </h2>
                  <Button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    variant="outline"
                    size="sm"
                    className="text-amber-600"
                  >
                    <Edit2 size={16} />
                    {isEditingProfile ? "Save" : "Edit"}
                  </Button>
                  </div>

                  {isEditingProfile ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { label: "Full Name", field: "name" as keyof UserProfile },
                        { label: "Email", field: "email" as keyof UserProfile },
                        { label: "Phone", field: "phone" as keyof UserProfile },
                        { label: "Address", field: "address" as keyof UserProfile },
                        { label: "City", field: "city" as keyof UserProfile },
                        { label: "State", field: "state" as keyof UserProfile },
                        { label: "Pincode", field: "pincode" as keyof UserProfile },
                      ].map(({ label, field }) => (
                        <div key={field} className={field === "address" ? "sm:col-span-2" : ""}>
                          <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                            {label}
                          </label>
                          <input
                            type="text"
                            value={profile[field]}
                            onChange={(e) =>
                              handleProfileChange(field, e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                          <User className="text-amber-500 mt-1" size={20} />
                          <div>
                            <p className="font-sans-clean text-sm text-stone-500 mb-1">
                              Full Name
                            </p>
                            <p className="font-sans-clean font-semibold text-stone-900">
                              {profile.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Mail className="text-amber-500 mt-1" size={20} />
                          <div>
                            <p className="font-sans-clean text-sm text-stone-500 mb-1">
                              Email
                            </p>
                            <p className="font-sans-clean font-semibold text-stone-900">
                              {profile.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Phone className="text-amber-500 mt-1" size={20} />
                          <div>
                            <p className="font-sans-clean text-sm text-stone-500 mb-1">
                              Phone
                            </p>
                            <p className="font-sans-clean font-semibold text-stone-900">
                              {profile.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="text-amber-500 mt-1" size={20} />
                          <div>
                            <p className="font-sans-clean text-sm text-stone-500 mb-1">
                              Member Since
                            </p>
                            <p className="font-sans-clean font-semibold text-stone-900">
                              {profile.joinDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-stone-200">
                        <p className="font-sans-clean text-sm font-semibold text-stone-700 mb-4">
                          Delivery Address
                        </p>
                        <div className="flex items-start gap-3">
                          <MapPin className="text-amber-500 mt-1" size={20} />
                          <div>
                            <p className="font-sans-clean text-stone-800">
                              {profile.address}
                            </p>
                            <p className="font-sans-clean text-stone-600">
                              {profile.city}, {profile.state} {profile.pincode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div>
                <div className="mb-8">
                  <p className="text-xs tracking-widest uppercase text-amber-500 font-bold font-sans-clean mb-2">
                    Saved
                  </p>
                  <h1 className="font-display text-4xl font-bold text-stone-900">
                    Your Wishlist
                  </h1>
                </div>

                {mockWishlist.length === 0 ? (
                  <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center">
                    <p className="text-5xl mb-4">❤️</p>
                    <p className="font-display text-2xl font-bold text-stone-900 mb-2">
                      Your wishlist is empty
                    </p>
                    <p className="font-sans-clean text-stone-500 mb-6">
                      Save your favorite keepsakes to view them later.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-sans-clean font-semibold rounded-full transition-all"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockWishlist.map((item, i) => (
                      <motion.div
                        key={item.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-3xl border border-stone-200 bg-white overflow-hidden hover:shadow-md transition-all group"
                      >
                        <div className="relative h-40 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 flex items-center justify-center">
                          <span className="text-6xl">{item.emoji}</span>
                          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-all">
                            <Heart
                              size={18}
                              className="text-red-500 fill-red-500"
                            />
                          </button>
                        </div>
                        <div className="p-5">
                          <h3 className="font-display text-lg font-bold text-stone-900">
                            {item.name}
                          </h3>
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold mt-2 ${item.tagColor}`}
                          >
                            {item.tag}
                          </span>
                          <div className="mt-4 flex items-center justify-between">
                            <div>
                              <p className="font-display text-2xl font-bold text-stone-900">
                                ₹{item.price.toLocaleString()}
                              </p>
                              <p className="text-xs text-stone-400 line-through">
                                ₹{item.originalPrice.toLocaleString()}
                              </p>
                            </div>
                            <Link
                              href={`/product/${item.slug}`}
                              className="p-3 bg-amber-50 group-hover:bg-amber-500 rounded-xl text-amber-600 group-hover:text-white transition-all"
                            >
                              <ArrowRight size={18} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div>
                <div className="mb-8">
                  <p className="text-xs tracking-widest uppercase text-amber-500 font-bold font-sans-clean mb-2">
                    Preferences
                  </p>
                  <h1 className="font-display text-4xl font-bold text-stone-900">
                    Settings
                  </h1>
                </div>

                <div className="space-y-6">
                  {/* Password Section */}
                  <div className="rounded-3xl border border-stone-200 bg-white p-8">
                    <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">
                      Password & Security
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="font-sans-clean text-sm font-semibold text-stone-700 block mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
                        />
                      </div>
                      <Button size="lg" variant="default" className="w-full">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  {/* Notifications Section */}
                  <div className="rounded-3xl border border-stone-200 bg-white p-8">
                    <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">
                      Notifications
                    </h2>

                    <div className="space-y-4">
                      {[
                        {
                          title: "Order Updates",
                          desc: "Get notified about your order status changes.",
                        },
                        {
                          title: "New Releases",
                          desc: "Be the first to know about new products and collections.",
                        },
                        {
                          title: "Special Offers",
                          desc: "Receive exclusive deals and promotional codes.",
                        },
                        {
                          title: "Newsletter",
                          desc: "Weekly memory tips and inspiration delivered to your inbox.",
                        },
                      ].map((item) => (
                        <label
                          key={item.title}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 cursor-pointer transition-all"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 rounded border-stone-300 text-amber-500 cursor-pointer"
                          />
                          <div className="flex-1">
                            <p className="font-sans-clean font-semibold text-stone-900">
                              {item.title}
                            </p>
                            <p className="font-sans-clean text-xs text-stone-500">
                              {item.desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
                    <h2 className="font-display text-2xl font-bold text-red-700 mb-4">
                      Danger Zone
                    </h2>
                    <p className="font-sans-clean text-sm text-red-600 mb-6">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button size="lg" variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
