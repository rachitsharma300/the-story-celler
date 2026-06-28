"use client";

import Link from "next/link";
import { Mail, Phone, Heart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) return null;

  return (
    <footer className="bg-cream text-stone-500 border-t border-stone-100 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img src="/story_celler_logo.png" alt="The Story Celler" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-display text-lg font-extrabold text-foreground tracking-tight block leading-none">
                  Story<span className="text-amber-500 font-light italic">Cellar</span>
                </span>
                <p className="text-[8px] text-stone-400 font-sans-clean tracking-[0.2em] uppercase mt-1 font-bold">
                  Archiving Memories
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans-clean">
              At The Story Celler, we turn your memories into artistic keepsakes that last forever.
            </p>

            <div className="bg-stone-50/50 dark:bg-stone-900/40 border border-stone-100 dark:border-stone-850 p-4 rounded-2xl">
              <p className="font-serif italic text-xs text-amber-400">
                ” Forever in Art, Forever in Heart “
              </p>
              <p className="font-sans-clean text-[10px] text-stone-450 dark:text-stone-500 font-bold tracking-wider uppercase mt-1.5">— G & P</p>
            </div>

            <div>
              <h4 className="font-sans-clean font-bold text-foreground text-[10px] tracking-[0.2em] uppercase mb-3">Follow Us</h4>
              <div className="flex gap-2.5">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-stone-50 dark:bg-stone-900 hover:bg-amber-500 dark:hover:bg-amber-500 border border-stone-100 dark:border-stone-850 hover:border-amber-400 text-stone-500 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white rounded-xl transition-all duration-300 text-xs font-sans-clean font-semibold shadow-sm">
                  Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-stone-50 dark:bg-stone-900 hover:bg-amber-500 dark:hover:bg-amber-500 border border-stone-100 dark:border-stone-850 hover:border-amber-400 text-stone-500 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white rounded-xl transition-all duration-300 text-xs font-sans-clean font-semibold shadow-sm">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-sans-clean font-bold text-foreground text-xs tracking-[0.15em] uppercase mb-6 border-b border-stone-100 dark:border-stone-900 pb-2">Shop</h4>
            <ul className="space-y-3 font-sans-clean text-sm">
              <li>
                <Link href="/product/custom-magazine" className="text-stone-500 dark:text-stone-400 hover:text-amber-500 transition-colors flex items-center justify-between group">
                  <span>Custom Magazines</span>
                  <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">Hot</span>
                </Link>
              </li>
              <li>
                <Link href="/product/custom-frame" className="text-stone-500 dark:text-stone-400 hover:text-amber-500 transition-colors block">
                  Custom Frames
                </Link>
              </li>
              <li>
                <Link href="/product/recap-reel" className="text-stone-500 dark:text-stone-400 hover:text-amber-500 transition-colors flex items-center justify-between group">
                  <span>Recap Reels</span>
                  <span className="bg-green-500/10 border border-green-500/20 text-green-500 text-[8px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">New</span>
                </Link>
              </li>
              <li>
                <Link href="/product/photo-album" className="text-stone-500 dark:text-stone-400 hover:text-amber-500 transition-colors block">
                  Photo Book
                </Link>
              </li>

              {/* Collaborations subsection */}
              <li className="pt-4 border-t border-stone-100 dark:border-stone-900">
                <span className="text-[10px] text-foreground font-bold tracking-widest uppercase flex items-center justify-between mb-3">
                  <span>Collab with us</span>
                  <span className="bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[8px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">New</span>
                </span>
                <ul className="pl-3.5 border-l border-stone-100 dark:border-stone-850 space-y-2.5 text-xs text-stone-500 dark:text-stone-400">
                  <li>
                    <a href="https://wa.me/917903316723?text=Hi!%20I%20am%20interested%20in%20Artist%20Collaborations." target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors block">
                      Artists Collaborations
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/917903316723?text=Hi!%20I%20am%20interested%20in%20Photographer%20Collaboration." target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors block">
                      Photographer Collaboration
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/917903316723?text=Hi!%20I%20have%20a%20Brand/Corporate%20Inquiry." target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors block">
                      Brand/Corporate Inquiry
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="font-sans-clean font-bold text-foreground text-xs tracking-[0.15em] uppercase mb-6 border-b border-stone-100 dark:border-stone-900 pb-2">More Info</h4>
            <ul className="space-y-3 font-sans-clean text-sm">
              {[
                { label: "Track Order", href: "/track-order" },
                { label: "Read Blogs", href: "/blogs" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Terms & Conditions", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-stone-500 dark:text-stone-400 hover:text-amber-500 transition-colors block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-sans-clean font-bold text-foreground text-xs tracking-[0.15em] uppercase mb-6 border-b border-stone-100 dark:border-stone-900 pb-2">Get In Touch</h4>
            <ul className="space-y-4 font-sans-clean text-sm text-stone-500 dark:text-stone-400">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-amber-500 mt-1 shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a href="https://wa.me/919871874041" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors font-semibold">
                    +91 9871874041 (WhatsApp)
                  </a>
                  <a href="tel:+919871874041" className="hover:text-amber-500 transition-colors">
                    +91 9871874041 (Call)
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-amber-500 shrink-0" />
                <a href="mailto:team@mystoryarchive.in" className="hover:text-amber-500 transition-colors">
                  team@mystoryarchive.in
                </a>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-stone-50/50 dark:bg-stone-900 border border-stone-100 dark:border-stone-850 rounded-2xl shadow-inner">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
                <span className="text-green-500 font-bold">✓</span> Free Shipping on All Orders
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400 mt-1.5">
                <span className="text-green-500 font-bold">✓</span> Cash on Delivery Available
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-stone-100 dark:border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans-clean text-xs text-stone-500">
            Copyright © MyStoryArchive | All rights reserved.
          </p>
          <p className="font-sans-clean text-xs text-stone-600 flex items-center gap-1.5">
            Designed & Developed: <a href="https://rachitsharma300.github.io/rachit-portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 underline decoration-dotted transition-colors">Rachit Sharma</a>
          </p>
        </div>
      </div>
    </footer>
  );
}