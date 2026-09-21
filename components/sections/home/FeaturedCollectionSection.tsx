"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Heart } from "lucide-react";

export const customCollection = [
  {
    id: "birthday-magazine",
    title: "Birthday Magazine",
    description: "Celebrate another trip around the sun with a custom-themed birthday editorial. Includes interview section, milestone timeline, wish pages, and photo spreads.",
    emoji: "🎂",
    badge: "Bestseller Gift",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
    features: [
      "Custom cover title & headline",
      "Special 'Why We Love You' section",
      "12-20 full-color satin pages",
      "Digital draft preview for review"
    ],
    href: "/product/birthday-magazine"
  },
  {
    id: "anniversary-album",
    title: "Anniversary Album",
    description: "Tell your love story from the first date to your latest chapter. Customized layouts narrating key dates, romantic quotes, travel memories, and heartfelt messages.",
    emoji: "💑",
    badge: "Most Loved",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
    features: [
      "Timeline of your relationship",
      "Dedicated vows & quote layouts",
      "Deluxe softcover or hardcover",
      "Curated editorial typography"
    ],
    href: "/product/anniversary-album"
  }
];

export default function FeaturedCollectionSection() {
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  return (
    <section className="py-24 bg-[#FAF4F5] relative border-b border-[#A65B62]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-[#A65B62] font-bold block mb-2">Luxury Keepsakes</span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-stone-900">
            Custom Collection
          </h2>
          <p className="font-sans-clean text-stone-500 max-w-xl mx-auto mt-2 text-xs sm:text-sm leading-relaxed">
            Crafted around your memories with personalized storytelling, custom layouts, and thoughtful details. Best for deeply personal keepsakes & gifts!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {customCollection.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white border border-stone-200/70 hover:border-[#A65B62]/30 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-6 bg-stone-100">
                  <Image
                    src={p.image}
                    alt={`Custom collection preview: ${p.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white font-sans-clean font-bold text-[10px] uppercase tracking-wider rounded-full flex items-center gap-1.5">
                    <Heart size={10} className="fill-rose-400 text-rose-400" />
                    <span>{p.badge}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" role="img" aria-label={p.title}>
                    {p.emoji}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-stone-900 group-hover:text-[#A65B62] transition-colors">
                    {p.title}
                  </h3>
                </div>

                <p className="font-sans-clean text-stone-500 text-xs sm:text-sm leading-relaxed mb-6">
                  {p.description}
                </p>

                <div className="space-y-2 mb-8 bg-[#FAF4F5] p-4 rounded-xl border border-stone-200/50">
                  <span className="font-sans-clean text-[10px] tracking-wider uppercase font-bold text-[#A65B62] block mb-2">
                    What's Included:
                  </span>
                  {p.features.map((f, i) => (
                    <div key={i} className="font-sans-clean text-xs text-stone-700 flex items-center gap-2">
                      <Sparkles size={12} className="text-[#A65B62] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={p.href}
                className={`w-full py-4 bg-[#A65B62] hover:bg-[#8C484E] text-white font-sans-clean font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${focusRing}`}
              >
                <span>Customize This Design</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
