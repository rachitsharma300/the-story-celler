"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";

interface KeyMetrics {
  monthlyRevenue: number;
  monthlyOrders: number;
  avgOrderValue: number;
  totalOrders: number;
}

interface RevenueTrendItem {
  month: string;
  revenue: number;
}

interface SalesByProductItem {
  product: string;
  orders: number;
}

interface PopularOccasionItem {
  occasion: string;
  count: number;
}

interface AnalyticsData {
  keyMetrics: KeyMetrics;
  revenueTrend: RevenueTrendItem[];
  salesByProduct: SalesByProductItem[];
  popularOccasions: PopularOccasionItem[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await api.get("/api/admin/analytics");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-amber-500 mr-2" size={28} />
        <span className="font-sans-clean text-sm text-stone-500">Loading analytics data...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <span className="font-sans-clean text-sm text-stone-500">Failed to load analytics. Please refresh.</span>
      </div>
    );
  }

  const { keyMetrics, revenueTrend, salesByProduct, popularOccasions } = data;

  // Compute max revenue for bar chart scaling
  const maxRevenue = Math.max(...revenueTrend.map((r) => r.revenue), 1);
  const maxProductOrders = Math.max(...(salesByProduct.length > 0 ? salesByProduct.map((p) => p.orders) : [1]), 1);
  const maxOccasionCount = Math.max(...(popularOccasions.length > 0 ? popularOccasions.map((o) => o.count) : [1]), 1);

  const metricCards = [
    {
      label: "Monthly Revenue",
      value: `₹${keyMetrics.monthlyRevenue.toLocaleString("en-IN")}`,
    },
    {
      label: "Orders This Month",
      value: keyMetrics.monthlyOrders.toString(),
    },
    {
      label: "Avg Order Value",
      value: `₹${keyMetrics.avgOrderValue.toLocaleString("en-IN")}`,
    },
    {
      label: "Total Orders (All Time)",
      value: keyMetrics.totalOrders.toString(),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
            Analytics & Reports
          </h1>
          <p className="font-sans-clean text-stone-500">
            Business insights and performance metrics
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metricCards.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-white border border-stone-200 p-6"
          >
            <p className="font-sans-clean text-sm text-stone-500 mb-2">
              {metric.label}
            </p>
            <div className="flex items-end justify-between">
              <p className="font-display text-3xl font-bold text-stone-900">
                {metric.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Revenue Chart */}
        <div className="rounded-2xl bg-white border border-stone-200 p-6">
          <h3 className="font-display text-lg font-bold text-stone-900 mb-6">
            Revenue Trend (Last 6 Months)
          </h3>
          {revenueTrend.length === 0 ? (
            <p className="font-sans-clean text-sm text-stone-400 text-center py-8">No revenue data yet.</p>
          ) : (
            <div className="space-y-4">
              {revenueTrend.map((item) => (
                <div key={item.month}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans-clean text-sm text-stone-600">
                      {item.month}
                    </span>
                    <span className="font-sans-clean text-sm font-semibold text-stone-900">
                      {item.revenue > 0 ? `₹${(item.revenue / 1000).toFixed(item.revenue >= 1000 ? 0 : 1)}K` : "₹0"}
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sales by Product */}
        <div className="rounded-2xl bg-white border border-stone-200 p-6">
          <h3 className="font-display text-lg font-bold text-stone-900 mb-6">
            Sales by Product
          </h3>
          {salesByProduct.length === 0 ? (
            <p className="font-sans-clean text-sm text-stone-400 text-center py-8">No product data yet.</p>
          ) : (
            <div className="space-y-4">
              {salesByProduct.map((item, i) => {
                const colors = ["bg-blue-500", "bg-purple-500", "bg-orange-500", "bg-green-500", "bg-pink-500", "bg-teal-500"];
                const color = colors[i % colors.length];
                return (
                  <div key={item.product}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-sans-clean text-sm text-stone-600">
                        {item.product}
                      </span>
                      <span className="font-sans-clean text-sm font-semibold text-stone-900">
                        {item.orders} orders
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.orders / maxProductOrders) * 100}%` }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className={`${color} h-full rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Top Products & Occasions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Top Products Table */}
        <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-200">
            <h3 className="font-display text-lg font-bold text-stone-900">
              Top Products
            </h3>
          </div>
          <div>
            {salesByProduct.length === 0 ? (
              <div className="p-6 text-center font-sans-clean text-sm text-stone-400">
                No product data yet.
              </div>
            ) : (
              salesByProduct.slice(0, 5).map((product) => {
                const emojiMap: Record<string, string> = {
                  "magazine": "📖",
                  "album": "🖼️",
                  "reel": "🎬",
                  "frame": "🖼️",
                };
                const key = Object.keys(emojiMap).find(k => product.product.toLowerCase().includes(k));
                const emoji = key ? emojiMap[key] : "📦";
                return (
                  <div
                    key={product.product}
                    className="p-6 border-b border-stone-200 last:border-b-0 flex items-center justify-between hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{emoji}</span>
                      <p className="font-sans-clean font-semibold text-stone-900">
                        {product.product}
                      </p>
                    </div>
                    <p className="font-display font-bold text-stone-900">
                      {product.orders}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Top Occasions */}
        <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-200">
            <h3 className="font-display text-lg font-bold text-stone-900">
              Popular Occasions
            </h3>
          </div>
          <div>
            {popularOccasions.length === 0 ? (
              <div className="p-6 text-center font-sans-clean text-sm text-stone-400">
                No occasion data yet.
              </div>
            ) : (
              popularOccasions.slice(0, 5).map((item) => (
                <div
                  key={item.occasion}
                  className="p-6 border-b border-stone-200 last:border-b-0 flex items-center justify-between hover:bg-stone-50 transition-colors"
                >
                  <p className="font-sans-clean font-semibold text-stone-900">
                    {item.occasion}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                        style={{ width: `${(item.count / maxOccasionCount) * 100}%` }}
                      />
                    </div>
                    <p className="font-display font-bold text-stone-900 w-10 text-right">
                      {item.count}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
