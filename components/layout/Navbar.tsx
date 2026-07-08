"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Heart, User, Package, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Samples", href: "/samples" },
  { label: "Track Order", href: "/track-order" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  if (isAdminPage) return null;
  const cartCount = 0; // zustand connection placeholder

  // Initialize theme from localStorage on client-side mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 px-4 ${scrolled ? "top-4 py-0" : "top-0 py-2 sm:py-4"
          }`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${scrolled
          ? "bg-background/70 backdrop-blur-lg shadow-lg border border-border/40 rounded-2xl h-14 sm:h-16 flex items-center"
          : "bg-transparent border border-transparent h-16 lg:h-20 flex items-center"
          }`}>
          <div className="flex items-center justify-between w-full">

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className={`relative w-auto flex items-center transition-all duration-300 ${
                scrolled ? "h-11 sm:h-13" : "h-14 sm:h-16 lg:h-[72px]"
              }`}>
                <img
                  src="/story_celler_logo.png"
                  alt="The Story Celler Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans-clean text-sm text-stone-600 hover:text-amber-600 transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                className="text-stone-600 hover:text-amber-600 transition-colors"
                title="Toggle Dark/Light Mode"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </Button>

              <Button asChild variant="ghost" size="icon">
                <Link href="/dashboard" className="text-stone-600 hover:text-amber-600">
                  <User size={18} />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href="/wishlist" className="text-stone-600 hover:text-amber-600">
                  <Heart size={18} />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href="/track-order" className="text-stone-600 hover:text-amber-600">
                  <Package size={18} />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href="/cart" className="text-stone-600 hover:text-amber-600">
                  <div className="relative">
                    <ShoppingCart size={18} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center font-sans-clean font-bold">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                onClick={() => setMobileOpen(!mobileOpen)}
                variant="ghost"
                size="icon"
                className="lg:hidden text-stone-600 hover:text-amber-600"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 px-8">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-3xl text-stone-900 hover:text-amber-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Theme Toggle in Mobile Menu */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                <span className="font-sans-clean text-sm text-stone-500">Theme Preference</span>
                <Button
                  onClick={toggleTheme}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-stone-200"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={14} /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={14} /> Dark Mode
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-auto pb-12">
                <p className="font-sans-clean text-xs text-stone-400 tracking-widest uppercase">
                  Forever in Art, Forever in Heart
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}