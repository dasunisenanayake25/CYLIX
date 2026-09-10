"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const totalSteps = 16;

export default function Page() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const maxScroll = container.scrollHeight - container.clientHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setScrollProgress(Math.min(Math.max(progress, 0), 1));
  };

  const handleReset = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const baseScale = 1 + scrollProgress * 4.8;
  const panX = -scrollProgress * 42;
  const panY = -scrollProgress * 26;

  const transitionPhase =
    scrollProgress <= 0.40
      ? 0
      : scrollProgress >= 0.46
      ? 1
      : (scrollProgress - 0.40) / 0.06;

  const blackFade = Math.max(1 - scrollProgress * 0.85, 0.1);
  const buildingBrightness = 1 + scrollProgress * 0.18;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white select-none">
      {/* 3D Unified Camera Viewport */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Closed Door Exterior (1.png) */}
        <div
          className="absolute inset-0 will-change-transform transition-[filter] duration-300"
          style={{
            transform: `translate3d(${panX}%, ${panY}%, 0) scale(${baseScale})`,
            transformOrigin: "72% 70%",
            opacity: 1 - transitionPhase,
            visibility: transitionPhase >= 1 ? "hidden" : "visible",
            filter: `brightness(${buildingBrightness}) contrast(1.06) saturate(1.15)`,
          }}
        >
          <Image
            src="/1.png"
            alt="CYLIX Exterior"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Cyan Glow on Top Logo / Signage Area */}
          <div
            className="absolute rounded-full pointer-events-none blur-3xl opacity-60 mix-blend-screen"
            style={{
              top: "22%",
              left: "68%",
              width: "320px",
              height: "220px",
              background:
                "radial-gradient(ellipse, rgba(6, 182, 212, 0.5) 0%, rgba(59, 130, 246, 0.25) 50%, transparent 80%)",
            }}
          />

          {/* Warm Amber Entrance Ground & Steps Accent Glow */}
          <div
            className="absolute rounded-full pointer-events-none blur-3xl opacity-50 mix-blend-screen"
            style={{
              top: "68%",
              left: "66%",
              width: "420px",
              height: "260px",
              background:
                "radial-gradient(ellipse, rgba(251, 146, 60, 0.4) 0%, rgba(234, 88, 12, 0.15) 50%, transparent 75%)",
            }}
          />

          {/* Vertical Blue Architectural Light Beam Accent */}
          <div
            className="absolute pointer-events-none blur-xl opacity-40 mix-blend-screen"
            style={{
              top: "40%",
              left: "58%",
              width: "40px",
              height: "350px",
              background: "linear-gradient(to bottom, rgba(56, 189, 248, 0.8), rgba(99, 102, 241, 0.4), transparent)",
            }}
          />
        </div>

        {/* Layer 2: Open Door Interior (2.png) */}
        <div
          className="absolute inset-0 will-change-transform transition-[filter] duration-300"
          style={{
            transform: `translate3d(${panX}%, ${panY}%, 0) scale(${baseScale})`,
            transformOrigin: "72% 70%",
            opacity: transitionPhase,
            visibility: transitionPhase <= 0 ? "hidden" : "visible",
            filter: `brightness(${buildingBrightness * 1.05}) contrast(1.05) saturate(1.18)`,
          }}
        >
          <Image
            src="/2.png"
            alt="CYLIX Open Door & Interior"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Vibrant Golden/Cyan Interior Room Radiance */}
          <div
            className="absolute rounded-full pointer-events-none blur-3xl transition-opacity duration-500 mix-blend-screen"
            style={{
              top: "60%",
              left: "72%",
              width: "480px",
              height: "480px",
              background:
                "radial-gradient(circle, rgba(251, 146, 60, 0.5) 0%, rgba(6, 182, 212, 0.35) 45%, transparent 70%)",
              opacity: Math.max((scrollProgress - 0.4) * 1.6, 0),
            }}
          />
        </div>

        {/* Subtle Ambient Night Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none bg-black/20 transition-opacity duration-300"
          style={{ opacity: blackFade }}
        />

        {/* Top/Bottom Cinematic Shading */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-gradient-to-t from-black/80 via-transparent to-black/60"
          style={{ opacity: blackFade * 0.85 }}
        />

        {/* Dynamic Vignette */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 72% 70%, transparent 40%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.95) 100%)",
            opacity: blackFade * 0.75,
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 md:px-16 pointer-events-none">
        <div className="pointer-events-auto cursor-pointer" onClick={handleReset}>
          <span className="text-xl font-black tracking-widest text-orange-500 drop-shadow">CYLIX</span>
        </div>
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-gray-200 backdrop-blur-md transition hover:border-orange-500 hover:text-white"
          >
            Terminal
          </button>
        </div>
      </header>

      {/* Smooth Continuous Scroll Engine */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="relative z-20 h-screen w-full overflow-y-scroll scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="h-screen w-full pointer-events-none" />
        ))}
      </main>

      {/* Mouse Indicator */}
      <div
        className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 transition-opacity duration-500"
        style={{ opacity: scrollProgress > 0.85 ? 0 : 0.8 }}
      >
        <div className="h-7 w-4 rounded-full border border-gray-300 flex items-start justify-center p-1 backdrop-blur-xs">
          <div className="h-1.5 w-1 rounded-full bg-orange-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}