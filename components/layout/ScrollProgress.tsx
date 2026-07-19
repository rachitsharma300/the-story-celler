"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalHeight = scrollHeight - clientHeight;

      if (totalHeight <= 0) {
        setScrollPercentage(0);
        setIsVisible(false);
        return;
      }

      const scrolled = (window.scrollY / totalHeight) * 100;
      setScrollPercentage(Math.min(100, Math.max(0, Math.round(scrolled))));

      // Show indicator after scrolling 80px
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initially
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  // SVG parameters
  const radius = 22;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div
      className="fixed bottom-6 left-6 z-50 transition-all duration-500 ease-out transform"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
      }}
    >
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-stone-900/90 text-stone-100 hover:bg-[#A65B62]/95 hover:text-white border border-stone-800/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(166,91,98,0.3)] backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A65B62] focus:ring-offset-2 focus:ring-offset-stone-900"
        title="Scroll to Top"
        aria-label={`Scroll to top, current progress: ${scrollPercentage}%`}
      >
        {/* Progress Circle Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            className="stroke-stone-700/40 fill-none"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            className="stroke-rose-400 hover:stroke-white fill-none transition-all duration-300 ease-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Content */}
        <div className="relative z-10 font-sans-clean font-bold tracking-tight text-xs">
          {isHovered ? (
            <ArrowUp
              size={18}
              className="animate-bounce"
              style={{ animationDuration: "1.5s" }}
            />
          ) : (
            <span className="tabular-nums">{scrollPercentage}%</span>
          )}
        </div>
      </button>
    </div>
  );
}
