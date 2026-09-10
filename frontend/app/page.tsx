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

  // Monotonic forward camera trajectory
  const baseScale = 1 + scrollProgress * 4.8;
  const panX = -scrollProgress * 42;
  const panY = -scrollProgress * 26;

  // Door opening transition between 0.40 and 0.46
  const transitionPhase =
    scrollProgress <= 0.40
      ? 0
      : scrollProgress >= 0.46
      ? 1
      : (scrollProgress - 0.40) / 0.06;

  // As we approach/enter, blackness fades out and building glow brightens
  const blackFade = Math.max(1 - scrollProgress * 0.85, 0.1);
  const buildingBrightness = 1 + scrollProgress * 0.18; // Enhances building light

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
            filter: `brightness(${buildingBrightness}) contrast(1.05)`,
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

          {/* Exterior Entrance Ambient Flare */}
          <div
            className="absolute rounded-full pointer-events-none blur-3xl transition-all duration-300"
            style={{
              top: "58%",
              left: "68%",
              width: "360px",
              height: "360px",
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.6) 0%, rgba(249, 115, 22, 0.25) 45%, transparent 70%)",
              opacity: 0.3 + scrollProgress * 0.7,
              transform: `scale(${1 + scrollProgress * 0.8})`,
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
            filter: `brightness(${buildingBrightness * 1.05}) contrast(1.04)`,
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

          {/* Golden/Cyan Interior Room Radiance */}
          <div
            className="absolute rounded-full pointer-events-none blur-3xl transition-opacity duration-500"
            style={{
              top: "60%",
              left: "72%",
              width: "480px",
              height: "480px",
              background:
                "radial-gradient(circle, rgba(251, 146, 60, 0.5) 0%, rgba(56, 189, 248, 0.35) 45%, transparent 70%)",
              opacity: Math.max((scrollProgress - 0.4) * 1.6, 0),
            }}
          />
        </div>

        {/* Soft Dimming Base (Dissolves as you approach) */}
        <div 
          className="absolute inset-0 pointer-events-none bg-black/30 transition-opacity duration-300"
          style={{ opacity: blackFade }}
        />

        {/* Cinematic Vertical Frame Shading (Fades down dynamically) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-gradient-to-t from-black/80 via-transparent to-black/60"
          style={{ opacity: blackFade * 0.9 }}
        />

        {/* Dynamic Vignette (Opens up widely as building gets closer) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 72% 70%, transparent 40%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.95) 100%)",
            opacity: blackFade * 0.8,
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