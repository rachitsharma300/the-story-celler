"use client";

import { Upload, Sliders, Eye, Truck } from "lucide-react";

export default function ProcessSection() {
  return (
    <section id="how-it-works" className="py-24 bg-[#FAF4F5] relative border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="font-sans-clean text-[#A65B62] text-[10px] tracking-[0.25em] uppercase font-bold block mb-3">
            ✦ How It Works ✦
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            From your memories to your wall in 4 simple steps
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#A65B62]/35 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[
              { icon: Upload, title: "1. Upload", desc: "Upload your favorite photos & details" },
              { icon: Sliders, title: "2. Customize", desc: "Choose frame, style & personalize" },
              { icon: Eye, title: "3. Preview", desc: "We create & share preview for you" },
              { icon: Truck, title: "4. Delivered", desc: "We print, pack & deliver with love" }
            ].map((step, i) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white border border-stone-100 shadow-md rounded-full flex items-center justify-center text-[#A65B62] relative z-10 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <step.icon size={28} />
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#A65B62] text-white text-xs rounded-full flex items-center justify-center font-sans-clean font-bold shadow-md">{i + 1}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-stone-850 mt-6 mb-2">{step.title}</h3>
                <p className="font-sans-clean text-xs text-stone-500 max-w-[200px] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
