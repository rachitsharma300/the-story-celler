"use client";

import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export default function ComboPromoSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#A65B62]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[-10%] w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <span className="px-3.5 py-1 bg-[#A65B62]/20 border border-[#A65B62]/30 text-[#A65B62] text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase rounded-full mb-6 inline-flex items-center gap-1.5">
              <Gift size={11} /> Premium Combo Pack
            </span>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-6">
              Flip the Pages,<br />
              <span className="font-black text-[#A65B62]">Scan the Moments</span>
            </h2>

            <p className="font-sans-clean text-stone-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              Get the best of both worlds! A beautifully designed magazine filled with memories and a recap reel video linked through a scannable QR. Perfect for gifts, surprises, and forever moments.
            </p>

            <a href="https://wa.me/919871874041?text=Hi!%20I%20want%20to%20order%20the%20Combo%20(Magazine%20%2B%20Recap%20Reel)%20seen%20on%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#A65B62] hover:bg-[#8F4A50] text-white font-sans-clean font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#A65B62]/25 hover:-translate-y-0.5 flex items-center gap-2 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950">
              💬 Get My Combo
            </a>
          </div>

          <div className="md:col-span-5 flex justify-center relative">
            <div className="relative w-72 h-80 bg-stone-800 rounded-3xl p-4 border border-stone-700 shadow-2xl flex flex-col justify-between overflow-hidden will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/90 to-[#A65B62]/10 pointer-events-none" />
              <div className="flex justify-between items-center text-white/50 text-[10px] tracking-widest font-sans-clean font-bold">
                <span>MAGAZINE</span>
                <span>+ REEL</span>
              </div>

              <div className="w-32 h-32 bg-white/95 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center p-3.5 shadow-xl relative border border-white/20">
                <div className="w-full h-full border-4 border-stone-900 border-dashed opacity-85 flex items-center justify-center">
                  <span className="text-xl">🎬</span>
                </div>
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-[#A65B62]/85 shadow-md shadow-[#A65B62]"
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
              </div>

              <div className="text-center">
                <p className="font-display text-base font-bold text-white mb-0.5">Scannable Experience</p>
                <p className="font-sans-clean text-[10px] text-amber-400">Scan QR Code inside book to play Recap Reel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
