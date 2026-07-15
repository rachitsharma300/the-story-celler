"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, RefreshCw, Printer, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";

// Maps backend OrderStatus enum values to tracking display
const STATUS_STEPS = [
  { status: "PENDING", label: "Order Confirmed", icon: <Clock size={16} />, desc: "Your order has been confirmed and payment received." },
  { status: "DESIGNING", label: "Design In Progress", icon: <Package size={16} />, desc: "Our team is designing your personalized keepsake." },
  { status: "REVIEW", label: "Under Review", icon: <Eye size={16} />, desc: "Your design is being reviewed for quality." },
  { status: "PRINTING", label: "Printing", icon: <Printer size={16} />, desc: "Your keepsake is being printed and prepared." },
  { status: "SHIPPED", label: "Shipped", icon: <Truck size={16} />, desc: "Your order has been shipped and is on the way." },
  { status: "DELIVERED", label: "Delivered", icon: <CheckCircle size={16} />, desc: "Package delivered successfully!" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  PENDING: { label: "Order Processing", color: "text-blue-600", bg: "bg-blue-50 border-blue-200", icon: "⏳" },
  DESIGNING: { label: "Designing", color: "text-purple-600", bg: "bg-purple-50 border-purple-200", icon: "🎨" },
  REVIEW: { label: "Under Review", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: "🔍" },
  PRINTING: { label: "Printing", color: "text-orange-600", bg: "bg-orange-50 border-orange-200", icon: "🖨️" },
  SHIPPED: { label: "Shipped", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: "📦" },
  DELIVERED: { label: "Delivered", color: "text-green-600", bg: "bg-green-50 border-green-200", icon: "✅" },
};

interface TrackingResult {
  orderId: string;
  productName: string;
  status: string;
  totalAmount: number;
  advanceAmount: number;
  pages: number;
  printingType: string;
  createdAt: string;
  customerName: string;
  delivery?: {
    trackingNumber: string;
    carrier: string;
    deliveryStatus: string;
    estimatedDelivery: string | null;
  };
  timeline: { status: string; done: boolean }[];
}

export default function TrackOrderPage() {
  const [input, setInput] = useState("");
  const [tracking, setTracking] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"timeline" | "delhivery">("timeline");

  async function handleTrack() {
    if (!input.trim()) {
      setError("Please enter an order number or AWB");
      return;
    }
    setLoading(true);
    setError("");
    setTracking(null);

    const query = input.trim();

    try {
      // If it starts with MV, treat as orderId; otherwise try AWB lookup first then orderId
      if (query.toUpperCase().startsWith("MV")) {
        const res = await api.get(`/api/orders/track/${encodeURIComponent(query)}`);
        setTracking(res.data);
      } else {
        // Try AWB tracking number lookup via delivery endpoint
        try {
          const delRes = await api.get(`/api/delivery/${encodeURIComponent(query)}`);
          if (delRes.data && delRes.data.order) {
            // If found, use the orderId from the delivery to get full tracking info
            const orderId = delRes.data.order.orderId;
            const res = await api.get(`/api/orders/track/${encodeURIComponent(orderId)}`);
            setTracking(res.data);
          } else {
            setError("Order not found. Please check your order number and try again.");
          }
        } catch {
          // Fallback: try as orderId
          try {
            const res = await api.get(`/api/orders/track/${encodeURIComponent(query)}`);
            setTracking(res.data);
          } catch {
            setError("Order not found. Please check your order number and try again.");
          }
        }
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Order not found. Please check your order number and try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleTrack();
  }

  const currentConfig = tracking ? (statusConfig[tracking.status] || statusConfig.PENDING) : null;
  const completedSteps = tracking ? tracking.timeline.filter((t) => t.done).length : 0;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  // Compute estimated delivery display
  const estimatedDelivery = tracking?.delivery?.estimatedDelivery
    ? formatDate(tracking.delivery.estimatedDelivery)
    : tracking?.createdAt
      ? (() => {
          const d = new Date(tracking.createdAt);
          d.setDate(d.getDate() + 6);
          return formatDate(d.toISOString());
        })()
      : "To be determined";

  return (
    <div className="min-h-screen bg-background pt-24">

      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50 py-16 border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="font-sans-clean text-xs tracking-widest uppercase text-amber-500 font-bold">Shipping</span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 mt-3 mb-4">
              Track Your Order
            </h1>
            <p className="font-sans-clean text-stone-500 text-base">
              Enter your order number or AWB number to track your keepsake.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm mb-8"
        >
          <label className="font-sans-clean text-sm font-semibold text-stone-700 mb-3 block">
            Order Number or AWB Number
          </label>
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. MV-2026-0001"
              className="flex-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 font-sans-clean text-sm text-stone-800 placeholder-stone-300 outline-none focus:border-amber-400 focus:bg-white transition-all"
            />
            <Button
              onClick={handleTrack}
              disabled={loading}
              size="lg"
              variant="default"
            >
              {loading
                ? <RefreshCw size={16} className="animate-spin" />
                : <Search size={16} />
              }
              {loading ? "Tracking..." : "Track"}
            </Button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans-clean text-sm text-red-500 mt-3"
            >
              {error}
            </motion.p>
          )}
          <p className="font-sans-clean text-xs text-stone-400 mt-3">
            Your order number was sent to your email and is visible in your dashboard.
          </p>
        </motion.div>

        {/* Tracking Result */}
        <AnimatePresence>
          {tracking && currentConfig && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Status Card */}
              <div className={"rounded-2xl p-6 border mb-6 " + currentConfig.bg}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{currentConfig.icon}</span>
                    <div>
                      <p className="font-sans-clean text-xs text-stone-500 uppercase tracking-widest mb-1">Current Status</p>
                      <p className={"font-display text-2xl font-bold " + currentConfig.color}>{currentConfig.label}</p>
                      <p className="font-sans-clean text-sm text-stone-500 mt-1">{tracking.productName} — Order #{tracking.orderId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-sans-clean text-xs text-stone-400">Estimated Delivery</p>
                    <p className="font-sans-clean font-bold text-stone-800">{estimatedDelivery}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex justify-between font-sans-clean text-xs text-stone-400 mb-2">
                    <span>Progress</span>
                    <span>{completedSteps} of {tracking.timeline.length} steps</span>
                  </div>
                  <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: (completedSteps / tracking.timeline.length * 100) + "%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-amber-500 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Customer", value: tracking.customerName },
                    { label: "Product", value: tracking.productName },
                    { label: "AWB Number", value: tracking.delivery?.trackingNumber || "Not dispatched yet" },
                    { label: "Order Date", value: formatDate(tracking.createdAt) },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="font-sans-clean text-xs text-stone-400 mb-1">{item.label}</p>
                      <p className="font-sans-clean text-sm font-semibold text-stone-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-stone-100">
                  {[
                    { id: "timeline" as const, label: "Order Timeline" },
                    { id: "delhivery" as const, label: "Live Courier Tracking" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={
                        "flex-1 py-4 font-sans-clean text-sm font-semibold transition-all " +
                        (activeTab === tab.id
                          ? "text-amber-600 border-b-2 border-amber-500 bg-amber-50/50"
                          : "text-stone-400 hover:text-stone-600")
                      }
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === "timeline" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-5 top-6 bottom-6 w-px bg-stone-100" />

                        <div className="space-y-6">
                          {tracking.timeline.map((item, i) => {
                            const stepInfo = STATUS_STEPS.find(s => s.status === item.status) || STATUS_STEPS[0];
                            return (
                              <motion.div
                                key={item.status}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4 items-start"
                              >
                                <div className={
                                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all " +
                                  (item.done
                                    ? "bg-amber-500 text-white shadow-md shadow-amber-200"
                                    : "bg-stone-100 text-stone-400")
                                }>
                                  {item.done
                                    ? <CheckCircle size={16} />
                                    : stepInfo.icon
                                  }
                                </div>
                                <div className="pt-1.5 flex-1">
                                  <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <p className={"font-sans-clean text-sm font-semibold " + (item.done ? "text-stone-900" : "text-stone-400")}>
                                      {stepInfo.label}
                                    </p>
                                    {item.done && i === 0 && tracking.createdAt && (
                                      <p className="font-sans-clean text-xs text-stone-400">{formatDate(tracking.createdAt)}</p>
                                    )}
                                  </div>
                                  <p className={"font-sans-clean text-xs mt-0.5 " + (item.done ? "text-stone-500" : "text-stone-300")}>
                                    {stepInfo.desc}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "delhivery" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {tracking.delivery?.trackingNumber ? (
                        <div>
                          <p className="font-sans-clean text-sm text-stone-500 mb-4">
                            AWB Number: <span className="font-bold text-stone-800">{tracking.delivery.trackingNumber}</span>
                            {tracking.delivery.carrier && (
                              <span className="ml-2 text-stone-400">via {tracking.delivery.carrier}</span>
                            )}
                          </p>
                          <div className="bg-stone-50 rounded-xl overflow-hidden border border-stone-100" style={{ height: "400px" }}>
                            <iframe
                              src={"https://www.delhivery.com/track/package/" + tracking.delivery.trackingNumber}
                              className="w-full h-full border-0"
                              title="Delhivery Tracking"
                            />
                          </div>
                          <p className="font-sans-clean text-xs text-stone-400 mt-3 text-center">
                            Powered by Delhivery courier tracking
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <span className="text-5xl mb-4 block">📦</span>
                          <p className="font-display text-lg font-bold text-stone-700 mb-2">Not Dispatched Yet</p>
                          <p className="font-sans-clean text-sm text-stone-400">
                            Your order is still being prepared. Once dispatched, live courier tracking will appear here.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Help Section */}
              <div className="mt-6 bg-stone-900 dark:bg-stone-950/60 border border-transparent dark:border-stone-850 rounded-2xl p-6 text-center">
                <p className="font-sans-clean text-stone-300 text-sm mb-4">
                  Need help with your order? Contact us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/919871874041"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-sans-clean font-semibold rounded-xl transition-all"
                  >
                    <span>💬</span>
                    WhatsApp Support
                  </a>
                  <a
                    href="tel:+919871874041"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white font-sans-clean font-semibold rounded-xl transition-all"
                  >
                    <Phone size={14} />
                    Call Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}