"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Users, TrendingUp, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  designing: "bg-blue-100 text-blue-700",
  review: "bg-purple-100 text-purple-700",
  printing: "bg-orange-100 text-orange-700",
  shipped: "bg-amber-100 text-amber-700",
  delivered: "bg-green-100 text-green-700",
};

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState({
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0.0,
    pendingOrders: 0,
    designingOrders: 0,
    deliveredOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const statsRes = await api.get("/api/admin/stats");
        setStatsData(statsRes.data);

        const ordersRes = await api.get("/api/admin/orders");
        // Sort orders by orderId descending to show the newest orders first
        const sorted = (ordersRes.data || []).sort((a: any, b: any) => b.orderId.localeCompare(a.orderId));
        setRecentOrders(sorted.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const stats = [
    {
      label: "Total Orders",
      value: statsData.totalOrders.toString(),
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600",
      link: "/admin/orders",
    },
    {
      label: "Registered Users",
      value: statsData.totalUsers.toString(),
      icon: Users,
      color: "bg-purple-50 text-purple-600",
      link: "/admin/users",
    },
    {
      label: "Total Revenue",
      value: "₹" + statsData.totalRevenue.toLocaleString("en-IN"),
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
      link: "/admin/analytics",
    },
    {
      label: "Pending Approvals",
      value: statsData.pendingOrders.toString(),
      icon: Package,
      color: "bg-orange-50 text-orange-600",
      link: "/admin/orders",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-amber-500 mr-2" size={28} />
        <span className="font-sans-clean text-sm text-stone-500">Loading admin statistics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={stat.link}>
                <div className="rounded-2xl bg-white border border-stone-200 p-6 hover:shadow-lg transition-all cursor-pointer group">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <p className="font-sans-clean text-sm text-stone-500 mb-1">
                    {stat.label}
                  </p>
                  <p className="font-display text-3xl font-bold text-stone-900">
                    {stat.value}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl bg-white border border-stone-200 overflow-hidden"
      >
        <div className="p-6 border-b border-stone-200">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-stone-900">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="font-sans-clean text-sm text-amber-600 hover:text-amber-700 font-semibold"
            >
              View All →
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-stone-500 font-sans-clean">
              No orders placed in the system yet.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-3 text-left font-sans-clean font-semibold text-stone-700 text-sm">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left font-sans-clean font-semibold text-stone-700 text-sm">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left font-sans-clean font-semibold text-stone-700 text-sm">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left font-sans-clean font-semibold text-stone-700 text-sm">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left font-sans-clean font-semibold text-stone-700 text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b border-stone-200 hover:bg-stone-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-sans-clean font-semibold text-stone-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 font-sans-clean text-stone-600">
                      {order.personalDetails?.name || "Guest Customer"}
                    </td>
                    <td className="px-6 py-4 font-sans-clean text-stone-600">
                      {order.productName}
                    </td>
                    <td className="px-6 py-4 font-sans-clean font-semibold text-stone-900">
                      ₹{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[order.status.toLowerCase() as keyof typeof statusColors] || "bg-stone-100 text-stone-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-6">
          <h3 className="font-display text-lg font-bold text-stone-900 mb-3">
            📊 System Performance
          </h3>
          <div className="space-y-2">
            <p className="font-sans-clean text-sm text-stone-600">
              <span className="font-semibold">{statsData.totalOrders}</span> total processed orders
            </p>
            <p className="font-sans-clean text-sm text-stone-600">
              <span className="font-semibold">₹{statsData.totalRevenue.toLocaleString()}</span> lifetime sales volume
            </p>
            <p className="font-sans-clean text-sm text-stone-600">
              <span className="font-semibold">{statsData.totalUsers}</span> active community accounts
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6">
          <h3 className="font-display text-lg font-bold text-stone-900 mb-3">
            ✅ Order Workflow
          </h3>
          <div className="space-y-2">
            <p className="font-sans-clean text-sm text-stone-600">
              <span className="font-semibold">{statsData.pendingOrders}</span> orders waiting for approval
            </p>
            <p className="font-sans-clean text-sm text-stone-600">
              <span className="font-semibold">{statsData.designingOrders}</span> keepsakes in active layout design phase
            </p>
            <p className="font-sans-clean text-sm text-stone-600">
              <span className="font-semibold">{statsData.deliveredOrders}</span> memories happily preserved and delivered
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
