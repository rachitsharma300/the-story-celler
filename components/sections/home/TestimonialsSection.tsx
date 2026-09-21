"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const reviews = [
  {
    name: "Shameena Shahin",
    city: "Chennai",
    stars: 5,
    text: "Their product was absolutely amazing, and working with the team was a truly pleasant experience. They provided thoughtful, understanding support every step of the way. I had a wonderful experience and I highly recommend this creative, dedicated team to anyone looking for exceptional results.✨",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Yashvi Changela",
    city: "Ahmedabad",
    stars: 5,
    text: "A heartfelt thank you to the The Story Celler team for making my husband’s birthday so special! Your efforts created lifelong memories for us, making our evening truly unforgettable.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Ashwin Sharma",
    city: "Pune",
    stars: 5,
    text: "Very good quality of work and totally worth the price! Lovedddd ittt",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Akanksha Razdan",
    city: "Gurgaon",
    stars: 5,
    text: "Absolutely loved their work. The way they narrated the entire story and gave it a life gave me goosebumps. Every emotion was written beautifully 💗 Thankyou so much for making such a special thing for us .",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Simran Agarwal",
    city: "New Delhi",
    stars: 5,
    text: "I recently ordered my first magazine with them. It was insanely perfect♥️ My partner loved the concept. From Printing to Concept visualisation everything is top notch. Thank you team Story Celler",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Pratika Karnam",
    city: "Ahmedabad",
    stars: 5,
    text: "Got a 20 pager magazine done from The Story Celler for my first wedding anniversary. It has come beautifully. The team was very helpful throughout. Very patient during the planning and design phase. The end result is just amazing. I loved it. Keep up the good work guys ❤️",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Shruti Shrivastava",
    city: "New Delhi",
    stars: 5,
    text: "If you decide to gift your partner this magazine then will be the best thoughtful gift for them. The print quality of the product is very nice. People at Story Celler are also cooperative, they appreciate and accept the feedback gracefully.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
  },
  {
    name: "Muskan Agarwal",
    city: "New Delhi",
    stars: 5,
    text: "The Story Celler made amazing magazine for my anniversary. They caught the essence that I wanted and presented in the most beautiful way possible. Exceeded all my expectations. Great work done by the entire team!",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&auto=format&fit=crop&q=80"
  }
];

const stats = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 50000, suffix: "+", label: "Frames Delivered" },
  { value: 4.9, suffix: "/5", label: "Customer Rating" }
];

function StatCountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start) || start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, hasAnimated]);

  return <span ref={elementRef}>{suffix === "/5" ? end.toFixed(1) : count.toLocaleString()}{suffix}</span>;
}

export default function TestimonialsSection() {
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: "left" | "right") => {
    if (reviewsContainerRef.current) {
      const scrollAmount = 340;
      reviewsContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  return (
    <section id="reviews" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Block */}
          <div className="lg:col-span-4 bg-[#A65B62] rounded-3xl p-8 sm:p-10 flex flex-col justify-between text-white relative overflow-hidden shadow-xl min-h-[350px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="text-white/80 font-sans-clean text-[10px] font-bold tracking-[0.25em] uppercase block mb-6">
                Customer Love
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-normal leading-[1.2] text-white">
                Trusted by thousands to <span className="italic">preserve</span> their most precious moments
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-white/20 pt-8 mt-12">
              {stats.map((s) => (
                <div key={s.label}>
                  <h4 className="font-display text-lg sm:text-xl font-bold">
                    <StatCountUp end={s.value} suffix={s.suffix} />
                  </h4>
                  <p className="font-sans-clean text-[9px] text-white/70 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block */}
          <div className="lg:col-span-8 flex flex-col justify-center relative px-2">
            <div className="absolute -top-12 right-2 flex items-center gap-2 lg:top-auto lg:bottom-full lg:mb-4">
              <button
                onClick={() => scrollReviews("left")}
                className={`w-10 h-10 rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-[#A65B62] hover:text-white hover:border-[#A65B62] flex items-center justify-center transition-all duration-200 shadow-sm ${focusRing}`}
                aria-label="Previous review"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollReviews("right")}
                className={`w-10 h-10 rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-[#A65B62] hover:text-white hover:border-[#A65B62] flex items-center justify-center transition-all duration-200 shadow-sm ${focusRing}`}
                aria-label="Next review"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div
              ref={reviewsContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory pt-2 scroll-smooth"
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="w-full sm:w-[340px] flex-shrink-0 snap-start"
                >
                  <div className="bg-[#FAF4F5] border border-stone-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-350 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex gap-0.5 mb-4 text-amber-400 text-sm">
                        {[...Array(r.stars)].map((_, idx) => (
                          <span key={idx}>★</span>
                        ))}
                      </div>
                      <p className="font-sans-clean text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 italic">
                        "{r.text}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border-t border-stone-100 pt-4 mt-auto">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border border-stone-200 shrink-0">
                        <Image
                          src={r.avatar}
                          alt={`Customer avatar of ${r.name}`}
                          fill
                          sizes="40px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-grow">
                        <h5 className="font-sans-clean font-bold text-stone-900 text-xs sm:text-sm leading-tight">{r.name}</h5>
                        <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5">{r.city}</p>
                      </div>
                      <span className="text-rose-500 opacity-60"><Heart size={14} className="fill-rose-500" /></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
