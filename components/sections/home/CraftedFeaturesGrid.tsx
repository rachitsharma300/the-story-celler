"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CraftedFeaturesGrid() {
  return (
    <section className="py-24 bg-stone-50 border-t border-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-sans-clean text-[#A65B62] text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">
            ✦ Made For Memories ✦
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Crafted For Your Stories
          </h2>
          <p className="font-sans-clean text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
            Every keepsake is carefully designed to transform your milestones into beautiful physical pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-white border border-stone-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#A65B62]/20 transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/custom_designs_feature.png"
                alt="Personalized custom design layout samples"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent pointer-events-none z-10" />
            </div>
            <div className="p-8 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-3 group-hover:text-[#A65B62] transition-colors duration-300">
                  Custom-Made Designs
                </h3>
                <p className="font-sans-clean text-stone-500 text-sm leading-relaxed mb-6">
                  Every product is crafted from your memories, tailored to your story. Custom layouts, colors, and content.
                </p>
              </div>
              <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-sans-clean font-bold text-[#A65B62] hover:text-[#8F4A50] transition-colors">
                Explore Designs <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-white border border-stone-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#A65B62]/20 transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/best_gifting_feature.png"
                alt="Premium gift wrapping and presentation keepsakes"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent pointer-events-none z-10" />
            </div>
            <div className="p-8 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-3 group-hover:text-[#A65B62] transition-colors duration-300">
                  Best For Gifting
                </h3>
                <p className="font-sans-clean text-stone-500 text-sm leading-relaxed mb-6">
                  Every order is packed and designed to wow! Perfect for birthdays, weddings, anniversaries, or surprise gestures.
                </p>
              </div>
              <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-sans-clean font-bold text-[#A65B62] hover:text-[#8F4A50] transition-colors">
                Order a Gift <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-white border border-stone-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#A65B62]/20 transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-[3/2] w-full overflow-hidden">
              <Image
                src="/fast_process_feature.png"
                alt="Fast and simple customer memory creation process"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent pointer-events-none z-10" />
            </div>
            <div className="p-8 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-3 group-hover:text-[#A65B62] transition-colors duration-300">
                  Fast & Friendly Process
                </h3>
                <p className="font-sans-clean text-stone-500 text-sm leading-relaxed mb-6">
                  Support via WhatsApp, easy upload forms, fast feedback, and 7-12 day secure express delivery to your doorstep.
                </p>
              </div>
              <Link href="#how-it-works" className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-sans-clean font-bold text-[#A65B62] hover:text-[#8F4A50] transition-colors">
                How it Works <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
