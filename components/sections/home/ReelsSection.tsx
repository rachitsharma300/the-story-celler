"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

export const shortsData = [
  {
    id: "short-1",
    videoUrl: "https://player.vimeo.com/external/384761655.sd.mp4?s=38285db21d033fbefce60e2dbef23d4097f5f9e2&profile_id=165&oauth2_token_id=57447761",
    thumbnailUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=80",
    title: "Couple Memories Recap",
    duration: "0:45",
    tag: "Recap Reel"
  },
  {
    id: "short-2",
    videoUrl: "https://player.vimeo.com/external/403844523.sd.mp4?s=a7199187a55eddb65a3d0f7a637a7b8e19e1e194&profile_id=165&oauth2_token_id=57447761",
    thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80",
    title: "Our Wedding Story",
    duration: "1:00",
    tag: "Wedding Reel"
  },
  {
    id: "short-3",
    videoUrl: "https://player.vimeo.com/external/459389137.sd.mp4?s=894395c4777d130ed6b1fc6f6db6645391e57c6b&profile_id=165&oauth2_token_id=57447761",
    thumbnailUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=80",
    title: "Unboxing Keepsakes",
    duration: "0:35",
    tag: "Magazine"
  },
  {
    id: "short-4",
    videoUrl: "https://player.vimeo.com/external/485854617.sd.mp4?s=ffbdb81329fb84db22f99df899201944af08d66c&profile_id=165&oauth2_token_id=57447761",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80",
    title: "A Year of Memories",
    duration: "1:00",
    tag: "Anniversary"
  }
];

function ShortVideoCard({ item }: { item: typeof shortsData[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative aspect-[9/16] rounded-3xl border border-stone-200/80 bg-stone-950 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-1.5 select-none"
    >
      {/* Smartphone Notch Decorative Top */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black/50 backdrop-blur-md rounded-full z-20 flex items-center justify-center border border-white/10 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
      </div>

      {/* Top Controls: Duration Badge & Mute Toggle Button */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-auto">
        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white font-sans-clean text-[9px] font-bold rounded-full border border-white/10">
          {item.duration}
        </span>

        {isHovered && (
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full bg-black/60 hover:bg-[#A65B62] text-white backdrop-blur-md border border-white/20 transition-all shadow-md focus:outline-none"
            title={isMuted ? "Unmute sound" : "Mute sound"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        )}
      </div>

      {/* Video Element */}
      <video
        ref={videoRef}
        src={item.videoUrl}
        loop
        muted={isMuted}
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
        }`}
      />

      {/* Cover Poster Image when not hovering */}
      {!isHovered && (
        <Image
          src={item.thumbnailUrl}
          alt={`Memory video clip: ${item.title}`}
          fill
          sizes="(max-width: 640px) 50vw, 250px"
          className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
          loading="lazy"
        />
      )}

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />

      {/* Bottom Information */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-left flex flex-col justify-end pointer-events-none">
        <span className="text-[9px] tracking-wider uppercase font-sans-clean font-bold text-rose-300 mb-0.5">
          {item.tag}
        </span>
        <h4 className="font-display text-sm font-bold text-white leading-snug drop-shadow line-clamp-1">
          {item.title}
        </h4>
        <p className="font-sans-clean text-[9px] text-stone-300 mt-1 opacity-75">
          Hover to play
        </p>
      </div>
    </div>
  );
}

export default function ReelsSection() {
  return (
    <section className="py-24 bg-[#FAF4F5] border-t border-stone-100 relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-0 w-80 h-80 rounded-full bg-rose-50/40 blur-[80px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-sans-clean text-[#A65B62] text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">
            ✦ Highlights ✦
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Moments In Motion
          </h2>
          <p className="font-sans-clean text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
            Modern video cards featuring short clips of our customized memory keepsakes in action. Hover over any card to play preview.
          </p>
        </div>

        {/* 4 Modern Video Holder Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {shortsData.map((item) => (
            <ShortVideoCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
