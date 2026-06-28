"use client";

import { useState, useEffect } from "react";
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

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setMobileOpen(!mobileOpen);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-stone-900 text-white py-6 relative">
      <div className="px-6 border-b border-stone-800 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-orange-600 flex items-center justify-center font-display font-black text-base text-white shadow-md">
            S
          </div>
          <div>
            <h1 className="font-display text-base font-black tracking-tight text-white uppercase leading-none">
              Story<span className="text-amber-500 font-light italic">Cellar</span>
            </h1>
            <p className="font-sans-clean text-[9px] text-stone-400 mt-1 uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-1.5 flex-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all font-sans-clean text-sm font-medium ${
              pathname === item.href
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/15"
                : "text-stone-300 hover:bg-stone-850 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              {item.label}
            </div>
            {item.badge && (
              <span className="px-2.5 py-0.5 bg-rose-500 text-white text-[10px] rounded-full font-bold">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="px-4 mt-auto pt-6 border-t border-stone-800">
        <Button
          onClick={handleLogout}
          variant="destructive"
          size="sm"
          className="w-full justify-start gap-3 rounded-xl"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed left-0 top-0 w-64 h-screen bg-stone-900 z-40 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-64 h-screen bg-stone-900 z-50 overflow-y-auto lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 min-h-screen flex flex-col ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-0"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 bg-white border-b border-stone-200 shadow-sm z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={toggleSidebar}
                variant="ghost"
                size="icon"
                className="text-stone-600 hover:text-amber-600"
              >
                {sidebarOpen && typeof window !== "undefined" && window.innerWidth >= 1024 ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </Button>
              <h2 className="font-display text-xl font-bold text-stone-900">
                {sidebarItems.find((item) => item.href === pathname)?.label || "Admin Panel"}
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
        <main className="p-6 flex-1 bg-stone-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
