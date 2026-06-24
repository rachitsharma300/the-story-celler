import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-display text-xl font-black text-white uppercase block">
                THE STORY <span className="text-amber-400 font-light italic">Celler</span>
              </span>
              <p className="text-[10px] text-stone-500 tracking-[0.2em] uppercase mt-1 font-sans-clean">
                Archiving Memories
              </p>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed font-sans-clean">
              We turn your memories into beautifully crafted keepsakes that you can hold, share, and cherish forever.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="px-4 py-2 bg-stone-800 hover:bg-amber-500 rounded-full transition-all duration-300 text-xs font-sans-clean text-stone-400 hover:text-white">
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="px-4 py-2 bg-stone-800 hover:bg-amber-500 rounded-full transition-all duration-300 text-xs font-sans-clean text-stone-400 hover:text-white">
                Facebook
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans-clean font-semibold text-white text-sm tracking-widest uppercase mb-5">Shop</h4>
            <ul className="space-y-3 font-sans-clean text-sm">
              {["Custom Magazine", "Photo Album", "Recap Reels", "Custom Frame", "Birthday Magazine", "Anniversary Magazine"].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="text-stone-400 hover:text-amber-400 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-sans-clean font-semibold text-white text-sm tracking-widest uppercase mb-5">Info</h4>
            <ul className="space-y-3 font-sans-clean text-sm">
              {[
                { label: "Track Order", href: "/track-order" },
                { label: "Our Story", href: "/our-story" },
                { label: "Shipping Policy", href: "/shipping-policy" },
                { label: "Refund Policy", href: "/refund-policy" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-stone-400 hover:text-amber-400 transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans-clean font-semibold text-white text-sm tracking-widest uppercase mb-5">Contact</h4>
            <ul className="space-y-4 font-sans-clean text-sm">
              <li className="flex items-center gap-3 text-stone-400">
                <Phone size={14} className="text-amber-400 shrink-0" />
                <a href="tel:+917903316723" className="hover:text-amber-400 transition-colors">+91 79033 16723</a>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <a href="mailto:team@storyceller.in" className="hover:text-amber-400 transition-colors">team@storyceller.in</a>
              </li>
            </ul>
            <div className="mt-8 p-4 bg-stone-800 rounded-xl border border-stone-700">
              <p className="font-sans-clean text-xs text-stone-400 mb-1">Free Shipping • COD Available</p>
              <p className="font-sans-clean text-xs text-amber-400 font-medium">Pan India Delivery 🇮🇳</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans-clean text-xs text-stone-500">
            © 2026 The Story Celler. All rights reserved.
          </p>
          <p className="font-sans-clean text-xs text-stone-600">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}