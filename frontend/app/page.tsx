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

  // Continuous camera forward movement
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

  // Cinematic deep-black progressive scale
  const blackVibeIntensity = Math.min(scrollProgress * 1.25, 0.95);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white select-none">
      {/* 3D Unified Camera Viewport */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Layer 1: Closed Door Exterior (1.png) */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(${panX}%, ${panY}%, 0) scale(${baseScale})`,
            transformOrigin: "72% 70%",
            opacity: 1 - transitionPhase,
            visibility: transitionPhase >= 1 ? "hidden" : "visible",
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

          {/* Exterior Entrance Flare */}
          <div
            className="absolute rounded-full pointer-events-none blur-3xl"
            style={{
              top: "58%",
              left: "68%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(249, 115, 22, 0.15) 50%, transparent 70%)",
              opacity: Math.min(scrollProgress * 2, 0.6),
            }}
          />
        </div>

        {/* Layer 2: Open Door Interior (2.png) */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(${panX}%, ${panY}%, 0) scale(${baseScale})`,
            transformOrigin: "72% 70%",
            opacity: transitionPhase,
            visibility: transitionPhase <= 0 ? "hidden" : "visible",
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

          {/* Interior Illumination */}
          <div
            className="absolute rounded-full pointer-events-none blur-3xl"
            style={{
              top: "60%",
              left: "72%",
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(circle, rgba(251, 146, 60, 0.35) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 70%)",
              opacity: Math.max((scrollProgress - 0.45) * 1.8, 0),
            }}
          />
        </div>

        {/* Global Ambient Dark Base Tint */}
        <div className="absolute inset-0 pointer-events-none bg-black/25" />

        {/* Top/Bottom Cinematic Cinema-Scope Letterbox Shading */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-gradient-to-t from-black/90 via-transparent to-black/75"
          style={{ opacity: 0.7 + blackVibeIntensity * 0.3 }}
        />

        {/* Left Peripheral City Dimmer (Keeps eye drawn to the entrance) */}
        <div className="absolute inset-y-0 left-0 w-2/5 pointer-events-none bg-gradient-to-r from-black/60 to-transparent" />

        {/* Deep Peripheral Radial Black Vignette */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 72% 70%, transparent 18%, rgba(0, 0, 0, 0.75) 55%, rgba(0, 0, 0, 0.98) 100%)",
            opacity: 0.55 + blackVibeIntensity * 0.45,
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 md:px-16 pointer-events-none">
        <div className="pointer-events-auto cursor-pointer" onClick={handleReset}>
          <span className="text-xl font-black tracking-widest text-orange-500">CYLIX</span>
        </div>
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-white/20 bg-black/50 px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-gray-200 backdrop-blur-md transition hover:border-orange-500 hover:text-white"
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

      {/* Mouse Scroll Indicator */}
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