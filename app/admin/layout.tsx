"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCart size={18} />,
    badge: 12,
  },
  {
    label: "Samples",
    href: "/admin/samples",
    icon: <Package size={18} />,
  },
  { label: "Users", href: "/admin/users", icon: <Users size={18} />, badge: 156 },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 size={18} /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings size={18} /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "adminToken=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 w-64 h-screen bg-stone-900 text-white z-40 overflow-y-auto"
          >
            <div className="p-6 border-b border-stone-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center font-display font-black text-base text-white shadow-md">
                  S
                </div>
                <div>
                  <h1 className="font-display text-base font-black tracking-tight text-white uppercase leading-none">
                    THE STORY <span className="text-amber-500 font-light italic block mt-0.5">Celler</span>
                  </h1>
                  <p className="font-sans-clean text-[9px] text-stone-450 mt-1 uppercase tracking-widest">Admin Panel</p>
                </div>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all font-sans-clean text-sm font-medium ${
                    pathname === item.href
                      ? "bg-amber-500 text-white"
                      : "text-stone-300 hover:bg-stone-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-stone-700">
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
                className="w-full justify-start gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="sticky top-0 bg-white border-b border-stone-200 shadow-sm z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="ghost"
                size="icon"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <h2 className="font-display text-xl font-bold text-stone-900">
                {sidebarItems.find((item) => item.href === pathname)?.label ||
                  "Admin Panel"}
              </h2>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <p className="font-sans-clean text-sm text-stone-600">
                  Welcome, <span className="font-semibold text-stone-900">Admin</span>
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
