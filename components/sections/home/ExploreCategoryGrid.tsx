"use client";

import Link from "next/link";
import Image from "next/image";

function TapeCorner({
  className = "",
  rotate = -8,
  tone = "light"
}: {
  className?: string;
  rotate?: number;
  tone?: "light" | "dark";
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-12 h-5 rounded-[2px] pointer-events-none z-20 ${tone === "light"
        ? "bg-[#FBF1EC]/90 border border-[#A65B62]/15"
        : "bg-white/15 border border-white/20 backdrop-blur-sm"
        } shadow-[0_2px_6px_rgba(0,0,0,0.12)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}

export default function ExploreCategoryGrid() {
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B62] focus-visible:ring-offset-2";

  return (
    <section className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-sans-clean text-[10px] tracking-[0.25em] uppercase text-[#A65B62] font-bold block mb-3">
            ✦ Explore Our Collections ✦
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Find the perfect frame for your story
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            {
              href: "/shop?category=photo-frames",
              img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=80",
              title: "Photo Frames",
              sub: "Timeless & Classic"
            },
            {
              href: "/shop?category=magazine-frames",
              img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80",
              title: "Magazine Frames",
              sub: "Trendy & Personal"
            },
            {
              href: "/shop?category=spotify-frames",
              img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
              title: "Spotify Frames",
              sub: "Your Music, Your Story"
            },
            {
              href: "/shop?category=qr-frames",
              img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&auto=format&fit=crop&q=80",
              title: "QR Memory Frames",
              sub: "Scan, Watch, Relive"
            },
            {
              href: "/shop?category=collage-frames",
              img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80",
              title: "Collage Frames",
              sub: "Multiple Memories"
            },
            {
              href: "/shop?category=scrapbook-frames",
              img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=80",
              title: "Scrapbook Frames",
              sub: "Handmade With Love"
            }
          ].map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              className={`group flex flex-col items-center ${focusRing} rounded-2xl`}
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white p-3 shadow-md border border-stone-100 group-hover:shadow-xl group-hover:border-[#A65B62]/25 transition-all duration-300">
                <TapeCorner className="-top-1.5 -left-1.5" rotate={i % 2 === 0 ? -10 : 8} />
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src={c.img}
                    alt={`Photo frame category showcase: ${c.title}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 150px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <h3 className="font-display text-sm font-bold text-stone-850 mt-3.5 group-hover:text-[#A65B62] transition-colors text-center">
                {c.title}
              </h3>
              <p className="font-sans-clean text-[10px] text-stone-400 mt-0.5 text-center">{c.sub}</p>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/shop"
            className={`px-8 py-3.5 border-2 border-[#A65B62]/35 text-[#A65B62] hover:bg-[#A65B62]/5 hover:border-[#A65B62] font-sans-clean font-bold rounded-xl transition-all duration-300 text-xs tracking-widest uppercase ${focusRing}`}>
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
