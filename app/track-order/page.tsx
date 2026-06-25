"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type TrackingStatus = "processing" | "designed" | "dispatched" | "out_for_delivery" | "delivered";

interface TrackingData {
  orderNumber: string;
  status: TrackingStatus;
  product: string;
  customerName: string;
  city: string;
  awb: string;
  estimatedDelivery: string;
  timeline: {
    status: TrackingStatus;
    label: string;
    desc: string;
    time: string;
    done: boolean;
  }[];
}

const mockOrders: Record<string, TrackingData> = {
  "MV001": {
    orderNumber: "MV001",
    status: "dispatched",
    product: "Custom Magazine",
    customerName: "Rahul Sharma",
    city: "New Delhi",
    awb: "1234567890",
    estimatedDelivery: "June 12, 2025",
    timeline: [
      { status: "processing", label: "Order Confirmed", desc: "Your order has been confirmed and payment received.", time: "June 5, 10:30 AM", done: true },
      { status: "designed", label: "Design Completed", desc: "Your keepsake has been designed and approved.", time: "June 6, 3:00 PM", done: true },
      { status: "dispatched", label: "Dispatched", desc: "Your order is on the way via Delhivery.", time: "June 8, 11:00 AM", done: true },
      { status: "out_for_delivery", label: "Out for Delivery", desc: "Your order is out for delivery today.", time: "Expected June 12", done: false },
      { status: "delivered", label: "Delivered", desc: "Package delivered successfully.", time: "Expected June 12", done: false },
    ],
  },
  "MV002": {
    orderNumber: "MV002",
    status: "designed",
    product: "Photo Album",
    customerName: "Priya Singh",
    city: "Mumbai",
    awb: "",
    estimatedDelivery: "June 15, 2025",
    timeline: [
      { status: "processing", label: "Order Confirmed", desc: "Your order has been confirmed and payment received.", time: "June 7, 9:00 AM", done: true },
      { status: "designed", label: "Design Completed", desc: "Your keepsake has been designed. Awaiting your approval.", time: "June 9, 2:00 PM", done: true },
      { status: "dispatched", label: "Dispatched", desc: "Will be dispatched after your approval.", time: "Pending", done: false },
      { status: "out_for_delivery", label: "Out for Delivery", desc: "Your order is out for delivery today.", time: "Pending", done: false },
      { status: "delivered", label: "Delivered", desc: "Package delivered successfully.", time: "Pending", done: false },
    ],
  },
};

const statusConfig: Record<TrackingStatus, { label: string; color: string; bg: string; icon: string }> = {
  processing: { label: "Order Processing", color: "text-blue-600", bg: "bg-blue-50 border-blue-200", icon: "⏳" },
  designed: { label: "Design Ready", color: "text-purple-600", bg: "bg-purple-50 border-purple-200", icon: "🎨" },
  dispatched: { label: "Dispatched", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", icon: "📦" },
  out_for_delivery: { label: "Out for Delivery", color: "text-orange-600", bg: "bg-orange-50 border-orange-200", icon: "🚚" },
  delivered: { label: "Delivered", color: "text-green-600", bg: "bg-green-50 border-green-200", icon: "✅" },
};

const timelineIcons = [
  <Clock key="clock" size={16} />,
  <Package key="package" size={16} />,
  <Truck key="truck" size={16} />,
  <MapPin key="map" size={16} />,
  <CheckCircle key="check" size={16} />,
];

export default function TrackOrderPage() {
  const [input, setInput] = useState("");
  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"timeline" | "delhivery">("timeline");

  function handleTrack() {
    if (!input.trim()) {
      setError("Please enter an order number or AWB");
      return;
    }
    setLoading(true);
    setError("");
    setTracking(null);

    setTimeout(() => {
      const found = mockOrders[input.toUpperCase().trim()];
      if (found) {
        setTracking(found);
      } else {
        setError("Order not found. Please check your order number and try again.");
      }
      setLoading(false);
    }, 1200);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleTrack();
  }

  const currentConfig = tracking ? statusConfig[tracking.status] : null;
  const completedSteps = tracking ? tracking.timeline.filter((t) => t.done).length : 0;

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
              placeholder="e.g. MV001 or try MV002"
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
            Your order number was sent to your email. Try <span className="text-amber-500 font-semibold cursor-pointer" onClick={() => setInput("MV001")}>MV001</span> or <span className="text-amber-500 font-semibold cursor-pointer" onClick={() => setInput("MV002")}>MV002</span> for demo.
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
                      <p className="font-sans-clean text-sm text-stone-500 mt-1">{tracking.product} — Order #{tracking.orderNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-sans-clean text-xs text-stone-400">Estimated Delivery</p>
                    <p className="font-sans-clean font-bold text-stone-800">{tracking.estimatedDelivery}</p>
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
                    { label: "City", value: tracking.city },
                    { label: "AWB Number", value: tracking.awb || "Not dispatched yet" },
                    { label: "Product", value: tracking.product },
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
                          {tracking.timeline.map((item, i) => (
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
                                  : timelineIcons[i]
                                }
                              </div>
                              <div className="pt-1.5 flex-1">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <p className={"font-sans-clean text-sm font-semibold " + (item.done ? "text-stone-900" : "text-stone-400")}>
                                    {item.label}
                                  </p>
                                  <p className="font-sans-clean text-xs text-stone-400">{item.time}</p>
                                </div>
                                <p className={"font-sans-clean text-xs mt-0.5 " + (item.done ? "text-stone-500" : "text-stone-300")}>
                                  {item.desc}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "delhivery" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {tracking.awb ? (
                        <div>
                          <p className="font-sans-clean text-sm text-stone-500 mb-4">
                            AWB Number: <span className="font-bold text-stone-800">{tracking.awb}</span>
                          </p>
                          <div className="bg-stone-50 rounded-xl overflow-hidden border border-stone-100" style={{ height: "400px" }}>
                            <iframe
                              src={"https://www.delhivery.com/track/package/" + tracking.awb}
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
                            Your order is still being designed. Once dispatched, live courier tracking will appear here.
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
                    href="https://wa.me/917903316723"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-sans-clean font-semibold rounded-xl transition-all"
                  >
                    <span>💬</span>
                    WhatsApp Support
                  </a>
                  <a
                    href="tel:+917903316723"
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