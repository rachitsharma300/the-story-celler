"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

export const quickCreate = [
  {
    id: "custom-magazine",
    title: "Custom Magazine",
    tagline: "Magazine-style keepsakes for birthdays, anniversaries, and personal milestones.",
    tag: "Bestseller",
    emoji: "📖",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80",
    badge: "Fast 5-7 Days",
    highlights: ["Custom Headings & Notes", "Flexible 8-20 Pages", "Digital PDF Draft Included"],
    deliveryDays: "5-7 days",
    href: "/product/custom-magazine"
  },
  {
    id: "photo-album",
    title: "Photo Album",
    tagline: "Classic memory books crafted with thick satin paper and custom cover designs.",
    tag: "Popular",
    emoji: "📔",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
    badge: "Heavy Satin Pages",
    highlights: ["Thick 300 GSM Satin Paper", "HD Color Print Output", "Custom Cover Title"],
    deliveryDays: "7-10 days",
    href: "/product/photo-album"
  },
  {
    id: "recap-reel",
    title: "Recap Reel",
    tagline: "Cinematic short video recap tailored from your favorite clips and music.",
    tag: "Digital Only",
    emoji: "🎬",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80",
    badge: "2-4 Days Express",
    highlights: ["Synced Music Beat Edits", "Full HD Vertical Format", "Quick Revisions Supported"],
    deliveryDays: "2-4 days",
    href: "/product/recap-reel"
  },
  {
    id: "custom-frame",
    title: "Custom Frame",
    tagline: "Framed photo keepsakes with personalized dates, captions, and coordinates.",
    tag: "Gifting",
    emoji: "🖼️",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
    badge: "Ready to Hang",
    highlights: ["Matte Glass & Wood Frame", "Custom Date & Coordinates", "Secure Protective Packaging"],
    deliveryDays: "5-7 days",
    href: "/product/custom-frame"
  }
];

interface QuickCreateSectionProps {
  onOpenConfigurator?: (slug: string, name: string, price: number) => void;
}

export default function QuickCreateSection({ onOpenConfigurator }: QuickCreateSectionProps) {
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  return (
    <section className="py-24 bg-[#FFFBFB] relative border-b border-[#A65B62]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-[#A65B62] font-bold block mb-4">Fast Keepsakes</span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-stone-900">
            Quick Create
          </h2>
          <p className="font-sans-clean text-stone-500 max-w-2xl mx-auto mt-4 text-xs sm:text-sm leading-relaxed">
            Choose a design, upload your memories, and create meaningful keepsakes in just a few clicks. Best for last-minute gifting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickCreate.map((p) => (
            <div
              key={p.id}
              className="group bg-white border border-stone-200/70 hover:border-[#A65B62]/30 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-5 bg-stone-100">
                  <Image
                    src={p.image}
                    alt={`Quick create preview for ${p.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 250px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white font-sans-clean font-bold text-[10px] uppercase tracking-wider rounded-md">
                    {p.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl" role="img" aria-label={p.title}>
                    {p.emoji}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-sans-clean font-bold text-[#A65B62] bg-[#FBF1EC] px-2.5 py-0.5 rounded-full">
                    {p.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-stone-900 mb-2 group-hover:text-[#A65B62] transition-colors">
                  {p.title}
                </h3>
                <p className="font-sans-clean text-stone-500 text-xs leading-relaxed mb-4">
                  {p.tagline}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {p.highlights.map((h, i) => (
                    <li key={i} className="font-sans-clean text-[11px] text-stone-600 flex items-center gap-1.5">
                      <Sparkles size={10} className="text-[#A65B62] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {onOpenConfigurator ? (
                <button
                  type="button"
                  onClick={() => onOpenConfigurator(p.id, p.title, 1200)}
                  className={`w-full py-3 bg-[#A65B62] hover:bg-[#8C484E] text-white font-sans-clean font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${focusRing}`}
                >
                  <span>Create Now</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <Link
                  href={p.href}
                  className={`w-full py-3 bg-[#A65B62] hover:bg-[#8C484E] text-white font-sans-clean font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${focusRing}`}
                >
                  <span>Create Now</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
