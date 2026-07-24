"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShoppingBag
} from "lucide-react";
import toast from "react-hot-toast";

export interface ReelItem {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
  likes: string;
  views: string;
  productLink: string;
}

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  reels: ReelItem[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

export default function ReelModal({
  isOpen,
  onClose,
  reels,
  activeIndex,
  onIndexChange,
}: ReelModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});

  const currentReel = reels[activeIndex];

  // Sync state and play video when active index changes
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          // Auto-mute on browser autoplay restrictions
          setIsMuted(true);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().then(() => setIsPlaying(true));
          }
        });
    }
  }, [activeIndex, isOpen]);

  // Handle keyboard events (Esc, Left/Right arrows)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex]);

  if (!isOpen || !currentReel) return null;

  const handlePrev = () => {
    if (activeIndex > 0) {
      onIndexChange(activeIndex - 1);
    } else {
      onIndexChange(reels.length - 1); // loop
    }
  };

  const handleNext = () => {
    if (activeIndex < reels.length - 1) {
      onIndexChange(activeIndex + 1);
    } else {
      onIndexChange(0); // loop
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress(dur > 0 ? (cur / dur) * 100 : 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const val = parseFloat(e.target.value);
    const newTime = (val / 100) * duration;
    videoRef.current.currentTime = newTime;
    setProgress(val);
  };

  const toggleLike = (id: string) => {
    setIsLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!isLiked[id]) {
      toast.success("Added to favorites!", { icon: "❤️" });
    }
  };

  const shareReel = (reel: ReelItem) => {
    const text = `Check out this beautiful keepsake reel: ${reel.title}!`;
    const url = window.location.origin + reel.productLink;
    if (navigator.share) {
      navigator.share({
        title: reel.title,
        text: text,
        url: url,
      }).catch(() => {});
    } else {
      // Copy to clipboard fallback
      navigator.clipboard.writeText(`${text} ${url}`);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/95 backdrop-blur-md p-0 sm:p-4 transition-all duration-300">
      {/* Dynamic Background Blur Glow */}
      <div className="absolute inset-0 bg-[#A65B62]/5 pointer-events-none filter blur-[120px] rounded-full scale-75" />

      {/* Global Close Button (top right for desktop) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 bg-stone-900/60 hover:bg-stone-800 text-stone-300 hover:text-white rounded-full transition-colors hidden md:block"
        aria-label="Close modal"
      >
        <X size={20} />
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl h-full sm:h-[90vh] max-h-[850px] bg-stone-900 sm:rounded-3xl border border-stone-850 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Video Player Area */}
        <div className="relative flex-grow bg-black flex items-center justify-center md:w-[60%] h-[55vh] md:h-full group">
          
          <video
            ref={videoRef}
            src={currentReel.videoUrl}
            loop
            playsInline
            autoPlay
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Mute Overlay Button (Top Left) */}
          <button
            onClick={toggleMute}
            className="absolute top-4 left-4 z-20 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-colors md:hidden"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Big Play/Pause Overlay Indicator on Hover */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
              <div className="p-4 rounded-full bg-black/40 text-white backdrop-blur-sm animate-ping duration-1000">
                <Play size={28} className="fill-current" />
              </div>
            </div>
          )}

          {/* Left/Right Floating Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/35 hover:bg-black/55 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
            aria-label="Previous reel"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/35 hover:bg-black/55 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
            aria-label="Next reel"
          >
            <ChevronRight size={20} />
          </button>

          {/* Bottom Interactive Seek Bar inside Video */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col gap-2 z-20">
            {/* Scroll percentage details for mobile */}
            <div className="md:hidden pr-12 text-white">
              <h4 className="font-display font-semibold text-sm leading-tight">{currentReel.title}</h4>
              <p className="font-sans-clean text-[10px] text-stone-300 mt-1 line-clamp-2">{currentReel.description}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-stone-300 font-sans-clean font-bold min-w-[30px] tabular-nums">
                {Math.floor(currentTime / 60)}:{( "0" + Math.floor(currentTime % 60) ).slice(-2)}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="flex-grow h-1 rounded-lg bg-stone-700 appearance-none cursor-pointer accent-[#A65B62] focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #A65B62 0%, #A65B62 ${progress}%, #44403c ${progress}%, #44403c 100%)`
                }}
              />
              <span className="text-[10px] text-stone-300 font-sans-clean font-bold min-w-[30px] tabular-nums">
                {Math.floor(duration / 60)}:{( "0" + Math.floor(duration % 60) ).slice(-2)}
              </span>
            </div>
          </div>

        </div>

        {/* Right Side: Reel Info & Metadata Side-Panel (Desktop only, overlays on mobile) */}
        <div className="md:w-[40%] bg-stone-950 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-850 flex-1 min-h-[45%] md:h-full">
          
          <div className="flex flex-col gap-4 overflow-y-auto">
            {/* Publisher Brand Info */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#A65B62]/10 border border-[#A65B62]/35 flex items-center justify-center font-display font-bold text-[#A65B62] text-xs shrink-0">
                SC
              </div>
              <div>
                <h4 className="font-sans-clean font-bold text-white text-xs tracking-wide">The Story Celler</h4>
                <p className="font-sans-clean text-[9px] text-[#A65B62] tracking-wider uppercase font-bold">Cinematic Recap Reels</p>
              </div>
            </div>

            {/* Title & Description */}
            <div className="hidden md:block">
              <h3 className="font-display font-bold text-lg text-white leading-tight mb-2">
                {currentReel.title}
              </h3>
              <p className="font-sans-clean text-xs text-stone-400 leading-relaxed">
                {currentReel.description}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-xs font-sans-clean text-stone-500 py-1.5 border-y border-stone-850/80">
              <span><strong>{currentReel.views}</strong> views</span>
              <span><strong>{currentReel.likes}</strong> likes</span>
            </div>
          </div>

          {/* Interactive CTA Controls Panel */}
          <div className="flex flex-col gap-3.5 mt-auto pt-4 border-t border-stone-850/60">
            {/* Social Interactions Bar */}
            <div className="flex items-center gap-2.5">
              
              {/* Like Button */}
              <button
                onClick={() => toggleLike(currentReel.id)}
                className={`flex-grow flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border font-sans-clean font-bold text-xs tracking-wider uppercase transition-all duration-300 ${
                  isLiked[currentReel.id]
                    ? "bg-rose-950/20 border-rose-500/30 text-rose-400"
                    : "bg-stone-900 border-stone-800 text-stone-300 hover:text-white hover:bg-stone-850"
                }`}
              >
                <Heart size={14} className={isLiked[currentReel.id] ? "fill-rose-500 text-rose-500" : ""} />
                {isLiked[currentReel.id] ? "Liked" : "Like Reel"}
              </button>

              {/* Share Button */}
              <button
                onClick={() => shareReel(currentReel)}
                className="flex items-center justify-center p-3.5 bg-stone-900 border border-stone-800 hover:bg-stone-850 text-stone-300 hover:text-white rounded-xl transition-all"
                title="Share Reel"
              >
                <Share2 size={14} />
              </button>

            </div>

            {/* Direct Shop Action Link */}
            <a
              href={currentReel.productLink}
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#A65B62] hover:bg-[#8F4A50] text-white font-sans-clean font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md shadow-[#A65B62]/10 hover:shadow-[#A65B62]/20"
            >
              <ShoppingBag size={14} /> Get This Keepsake
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
