"use client";

import Link from "next/link";

export default function AboutSection() {
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  return (
    <section id="about-us" className="py-24 bg-[#FAF4F5] border-t border-stone-100 relative">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div>
          <span className="font-sans-clean text-xs tracking-[0.2em] uppercase text-[#A65B62] font-bold block mb-4">Our Narrative</span>

          <h2 className="font-display text-3xl lg:text-5xl font-bold text-stone-900 mb-8">
            The Story Of The Story Celler
          </h2>

          <p className="font-sans-clean text-stone-500 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
            At The Story Celler, we believe that every story, every moment deserves to be told beautifully. Whether it's celebrating love, friendships, milestones, or adventures, we capture the essence of your memories and turn them into one-of-a-kind keepsakes.
          </p>

          <p className="font-sans-clean text-stone-500 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
            A team of highly creative minds working together to create special keepsakes for lifelong memory.
          </p>

          <Link href="/our-story"
            className={`inline-block px-10 py-4 bg-stone-900 hover:bg-[#A65B62] text-white font-sans-clean font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-md ${focusRing}`}>
            Join Our Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
