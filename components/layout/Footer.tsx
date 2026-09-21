"use client";

import Link from "next/link";
import { Mail, Phone, Heart, Sparkles, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) return null;

  return (
    <footer className="bg-gradient-to-b from-[#180C0E] via-[#120708] to-[#0A0304] text-[#C8B4B6] border-t border-[#A65B62]/25 relative z-10 overflow-hidden">
      {/* Soft Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#A65B62]/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="flex flex-col space-y-5">
            <Link href="/" className="flex items-center group">
              <div className="h-20 w-auto flex items-center overflow-hidden bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                <img src="/story_celler_logo.png" alt="The StoryCeller" className="h-full w-auto object-contain brightness-110 drop-shadow" />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#C8B4B6] leading-relaxed font-sans-clean">
              At The Story Celler, we turn your memories into artistic keepsakes that last forever.
            </p>

            <div className="bg-[#241215]/80 border border-[#A65B62]/25 p-4 rounded-2xl shadow-inner">
              <p className="font-serif italic text-xs text-[#E5B869] leading-relaxed">
                ” Forever in Art, Forever in Heart “
              </p>
              <p className="font-sans-clean text-[10px] text-[#A65B62] font-bold tracking-wider uppercase mt-1.5">— G & P</p>
            </div>

            <div>
              <h4 className="font-sans-clean font-bold text-white text-[10px] tracking-[0.2em] uppercase mb-3">Follow Our Journey</h4>
              <div className="flex gap-2.5">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#261417] hover:bg-[#A65B62] border border-[#A65B62]/20 hover:border-[#A65B62] text-[#E8D5D7] hover:text-white rounded-xl transition-all duration-300 text-xs font-sans-clean font-semibold shadow-sm">
                  Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#261417] hover:bg-[#A65B62] border border-[#A65B62]/20 hover:border-[#A65B62] text-[#E8D5D7] hover:text-white rounded-xl transition-all duration-300 text-xs font-sans-clean font-semibold shadow-sm">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-sans-clean font-bold text-white text-xs tracking-[0.15em] uppercase mb-6 border-b border-white/10 pb-2.5 flex items-center justify-between">
              <span>Shop Keepsakes</span>
              <Sparkles size={12} className="text-[#E5B869]" />
            </h4>
            <ul className="space-y-3 font-sans-clean text-sm">
              <li>
                <Link href="/product/custom-magazine" className="text-[#C8B4B6] hover:text-white transition-colors flex items-center justify-between group">
                  <span>Custom Magazines</span>
                  <span className="bg-[#A65B62]/20 border border-[#A65B62]/40 text-rose-300 text-[8px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">Bestseller</span>
                </Link>
              </li>
              <li>
                <Link href="/product/custom-frame" className="text-[#C8B4B6] hover:text-white transition-colors block">
                  Custom Frames
                </Link>
              </li>
              <li>
                <Link href="/product/recap-reel" className="text-[#C8B4B6] hover:text-white transition-colors flex items-center justify-between group">
                  <span>Recap Reels</span>
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[8px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">Digital</span>
                </Link>
              </li>
              <li>
                <Link href="/product/photo-album" className="text-[#C8B4B6] hover:text-white transition-colors block">
                  Photo Book
                </Link>
              </li>

              {/* Collaborations subsection */}
              <li className="pt-4 border-t border-white/10">
                <span className="text-[10px] text-white font-bold tracking-widest uppercase flex items-center justify-between mb-3">
                  <span>Collab With Us</span>
                  <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[8px] font-bold tracking-wider px-2 py-0.5 rounded uppercase">Open</span>
                </span>
                <ul className="pl-3.5 border-l border-[#A65B62]/30 space-y-2.5 text-xs text-[#C8B4B6]">
                  <li>
                    <a href="https://wa.me/919871874041?text=Hi!%20I%20am%20interested%20in%20Artist%20Collaborations." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
                      Artists Collaborations
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/919871874041?text=Hi!%20I%20am%20interested%20in%20Photographer%20Collaboration." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
                      Photographer Collaboration
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/919871874041?text=Hi!%20I%20have%20a%20Brand/Corporate%20Inquiry." target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
                      Brand/Corporate Inquiry
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h4 className="font-sans-clean font-bold text-white text-xs tracking-[0.15em] uppercase mb-6 border-b border-white/10 pb-2.5">Quick Links</h4>
            <ul className="space-y-3 font-sans-clean text-sm">
              {[
                { label: "Track Order", href: "/track-order" },
                { label: "Interactive Samples", href: "/samples" },
                { label: "Read Our Story", href: "/our-story" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Terms & Conditions", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#C8B4B6] hover:text-white transition-colors block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-sans-clean font-bold text-white text-xs tracking-[0.15em] uppercase mb-6 border-b border-white/10 pb-2.5">Direct Support</h4>
            <ul className="space-y-4 font-sans-clean text-sm text-[#C8B4B6]">
              <li className="flex items-start gap-3">
                <MessageCircle size={16} className="text-[#25D366] mt-0.5 shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a href="https://wa.me/919871874041" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-semibold text-white">
                    +91 9871874041 (WhatsApp)
                  </a>
                  <a href="tel:+919871874041" className="hover:text-white transition-colors text-xs text-[#C8B4B6]">
                    +91 9871874041 (Direct Call)
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-[#E5B869] shrink-0" />
                <a href="mailto:team@thestoryceller.in" className="hover:text-white transition-colors text-xs text-[#C8B4B6]">
                  team@thestoryceller.in
                </a>
              </li>
            </ul>

            <div className="mt-8 p-4 bg-[#241215]/80 border border-[#A65B62]/25 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-[#E8D5D7]">
                <span className="text-emerald-400 font-bold">✓</span> Free Shipping Across India
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#E8D5D7]">
                <span className="text-emerald-400 font-bold">✓</span> Cash on Delivery Available
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#E8D5D7]">
                <span className="text-emerald-400 font-bold">✓</span> 100% Satisfaction Guarantee
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans-clean text-xs text-[#9E888A]">
            Copyright © The Story Celler | All rights reserved.
          </p>
          <p className="font-sans-clean text-xs text-[#9E888A] flex items-center gap-1.5">
            Designed & Developed: <a href="https://rachitsharma300.github.io/rachit-portfolio/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5B869] underline decoration-dotted transition-colors">Rachit Sharma</a>
          </p>
        </div>
      </div>
    </footer>
  );
}