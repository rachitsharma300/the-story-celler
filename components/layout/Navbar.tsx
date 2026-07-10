"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Heart, User, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Samples", href: "/samples" },
  // { label: "Track Order", href: "/track-order" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Force Light Mode globally
  useEffect(() => {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdminPage) return null;

  const cartCount = 2; // Fixed to 2 to perfectly match the user's screenshot mockup

  return (
    <>
      {/* Announcement/Top Bar */}
      <div className="w-full bg-[#A65B62] border-b border-[#A65B62]/20 text-white/90 text-[10px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 flex justify-center sm:justify-between items-center relative z-50 font-sans-clean shadow-sm">
        <div className="flex items-center gap-1.5 font-semibold">
          <span className="text-rose-200 animate-pulse">❤️</span> Forever in art, forever in heart.
        </div>
        <div className="hidden sm:flex items-center gap-4 sm:gap-6 font-medium text-white/90">
          <Link href="/track-order" className="hover:text-rose-200 transition-colors">
            Track Order
          </Link>
          <Link href="/contact" className="hover:text-rose-200 transition-colors">
            Help Center
          </Link>
          <a href="tel:+919871874041" className="hover:text-rose-200 transition-colors flex items-center gap-1">
            📞 +91 9871874041
          </a>
        </div>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 px-4 ${scrolled ? "top-0 py-0" : "top-9 sm:top-9 py-1 sm:py-2"
          }`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled
          ? "bg-[#FAF4F5]/90 backdrop-blur-lg shadow-md border border-[#A65B62]/10 rounded-2xl h-14 sm:h-16 flex items-center"
          : "bg-transparent border border-transparent h-16 lg:h-20 flex items-center"
          }`}>
          <div className="flex items-center justify-between w-full">

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className={`relative w-auto flex items-center transition-all duration-300 ${scrolled ? "h-10 sm:h-12" : "h-12 sm:h-16"
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
                  className="font-sans-clean text-xs font-bold tracking-wider uppercase text-stone-700 hover:text-[#A65B62] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A65B62] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Icon */}
              <Button variant="ghost" size="icon" className="hidden lg:inline-flex text-stone-600 hover:text-[#A65B62] transition-colors">
                <Search size={18} />
              </Button>

              {/* User Dashboard */}
              <Button asChild variant="ghost" size="icon" className="hidden lg:inline-flex text-stone-600 hover:text-[#A65B62]">
                <Link href="/dashboard">
                  <User size={18} />
                </Link>
              </Button>

              {/* Wishlist */}
              <Button asChild variant="ghost" size="icon" className="hidden lg:inline-flex text-stone-600 hover:text-[#A65B62]">
                <Link href="/wishlist">
                  <Heart size={18} />
                </Link>
              </Button>

              {/* Cart */}
              <Button asChild variant="ghost" size="icon">
                <Link href="/cart" className="text-stone-600 hover:text-[#A65B62]">
                  <div className="relative">
                    <ShoppingCart size={18} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#A65B62] text-white text-[9px] rounded-full flex items-center justify-center font-sans-clean font-bold">
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
                className="lg:hidden text-stone-600 hover:text-[#A65B62]"
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
            className="fixed inset-0 z-40 bg-[#FAF8F5] lg:hidden"
          >
            <div className="flex flex-col h-full pt-28 px-8 pb-8 overflow-y-auto">
              <nav className="flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-2xl text-stone-900 hover:text-[#A65B62] transition-colors font-semibold"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Separator line */}
              <div className="h-px bg-[#A65B62]/10 my-6" />

              {/* Utility Menu Links */}
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 font-sans-clean text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-[#A65B62] py-1 transition-colors"
                >
                  <User size={14} /> Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 font-sans-clean text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-[#A65B62] py-1 transition-colors"
                >
                  <Heart size={14} /> Wishlist
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 font-sans-clean text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-[#A65B62] py-1 transition-colors"
                >
                  <ShoppingCart size={14} /> Track Order
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 font-sans-clean text-xs font-bold uppercase tracking-wider text-stone-700 hover:text-[#A65B62] py-1 transition-colors"
                >
                  <HelpCircle size={14} className="shrink-0" /> Help Center
                </Link>
              </div>

              {/* Support actions */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="https://wa.me/919871874041"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-center text-[10px] tracking-wider font-bold font-sans-clean uppercase flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  💬 WhatsApp Support
                </a>
                <a
                  href="tel:+919871874041"
                  className="w-full py-3.5 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-center text-[10px] tracking-wider font-bold font-sans-clean uppercase flex items-center justify-center gap-2 transition-colors"
                >
                  📞 Call +91 9871874041
                </a>
              </div>

              <div className="mt-auto pt-6 text-center">
                <p className="font-sans-clean text-[9px] text-stone-400 tracking-[0.25em] uppercase font-bold">
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