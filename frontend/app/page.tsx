"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const totalSteps = 12;

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

  // Phase 1: Reach the door (0% to 45%)
  const approachPhase = Math.min(scrollProgress / 0.45, 1);
  const cameraZ = approachPhase * 820;
  const cameraPanX = -approachPhase * 310;
  const cameraPanY = -approachPhase * 110;
  const cameraPitch = Math.sin(approachPhase * Math.PI) * 2.2;
  const cameraRoll = Math.sin(approachPhase * Math.PI * 0.7) * 1.0;

  // Phase 2: Open the door (45% to 50%)
  const doorOpenPhase =
    scrollProgress <= 0.45
      ? 0
      : scrollProgress >= 0.5
      ? 1
      : (scrollProgress - 0.45) / 0.05;

  const doorSlideLeft = -doorOpenPhase * 105;
  const doorSlideRight = doorOpenPhase * 105;
  const interiorLightOpacity = doorOpenPhase * 0.95;

  // Phase 3: Remaining headroom (50% to 100%)
  const remainingPhase = Math.max((scrollProgress - 0.5) / 0.5, 0);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white select-none">
      {/* 3D Viewport Rig */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ perspective: "1100px", perspectiveOrigin: "60% 65%" }}
      >
        <div
          className="absolute -inset-16 will-change-transform transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${cameraPanX}px, ${cameraPanY}px, ${cameraZ}px) rotateX(${cameraPitch}deg) rotateZ(${cameraRoll}deg)`,
            transformOrigin: "73% 72%",
          }}
        >
          {/* Main Headquarters Exterior Layer */}
          <Image
            src="/1.png"
            alt="CYLIX Headquarters Entrance"
            fill
            priority
            className="object-cover object-center brightness-105 contrast-110"
          />

          {/* Interactive Door Portal Mask Layer */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: "56%",
              left: "67%",
              width: "18%",
              height: "32%",
            }}
          >
            {/* Interior Reveal Stage */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#0a1829] via-[#0d2a4d] to-[#040912] flex flex-col items-center justify-center transition-opacity duration-300"
              style={{ opacity: doorOpenPhase > 0.05 ? 1 : 0 }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{
                  transform: `scale(${1 + doorOpenPhase * 0.4})`,
                  backgroundImage:
                    "radial-gradient(ellipse at center 60%, rgba(56, 189, 248, 0.4) 0%, rgba(14, 165, 233, 0.15) 45%, transparent 70%), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 30px)",
                }}
              />

              <div
                className="relative z-10 flex flex-col items-center gap-2 transition-all duration-500"
                style={{
                  opacity: interiorLightOpacity,
                  transform: `translateY(${(1 - doorOpenPhase) * 20}px)`,
                }}
              >
                <div className="h-8 w-8 rounded-lg border border-cyan-400/60 bg-cyan-500/20 shadow-[0_0_25px_rgba(34,211,238,0.8)] backdrop-blur-sm flex items-center justify-center">
                  <span className="text-cyan-300 text-xs font-bold font-mono">CX</span>
                </div>
                <span className="text-[9px] tracking-[0.3em] font-semibold text-cyan-200/80 uppercase">
                  Workspace
                </span>
              </div>
            </div>

            {/* Left Sliding Glass Panel */}
            <div
              className="absolute top-0 bottom-0 left-0 w-1/2 border-r border-cyan-400/40 bg-gradient-to-r from-slate-900/40 to-slate-800/60 backdrop-blur-xs transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${doorSlideLeft}%)`,
              }}
            >
              <div className="absolute inset-y-6 right-2 w-[1.5px] bg-cyan-400/50 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            </div>

            {/* Right Sliding Glass Panel */}
            <div
              className="absolute top-0 bottom-0 right-0 w-1/2 border-l border-cyan-400/40 bg-gradient-to-l from-slate-900/40 to-slate-800/60 backdrop-blur-xs transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${doorSlideRight}%)`,
              }}
            >
              <div className="absolute inset-y-6 left-2 w-[1.5px] bg-cyan-400/50 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            </div>
          </div>

          {/* Dynamic Light Beam Emitter */}
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-500 blur-3xl"
            style={{
              top: "56%",
              left: "67%",
              width: "360px",
              height: "360px",
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.7) 0%, rgba(249, 115, 22, 0.25) 40%, transparent 70%)",
              opacity: 0.2 + approachPhase * 0.4 + doorOpenPhase * 0.5,
              transform: `scale(${1 + approachPhase * 0.6 + doorOpenPhase * 0.6})`,
            }}
          />
        </div>

        {/* Global Atmospheric Haze */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-t from-black/70 via-transparent to-black/40"
          style={{ opacity: 1 - approachPhase * 0.4 }}
        />

        {/* Cinematic Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 68% 68%, transparent 40%, rgba(0, 0, 0, 0.85) 100%)",
            opacity: 0.5 + approachPhase * 0.4,
          }}
        />
      </div>

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 md:px-16 pointer-events-none">
        <div className="pointer-events-auto cursor-pointer" onClick={handleReset}>
          <span className="text-xl font-black tracking-widest text-orange-500">CYLIX</span>
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

      {/* Continuous Wheel Scroll Engine */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="relative z-20 h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: totalSteps }).map((_, index) => (
          <section
            key={index}
            className="relative flex h-screen w-full snap-start items-center justify-center pointer-events-none"
          />
        ))}
      </main>

      {/* Mouse Indicator */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 opacity-80">
        <div className="h-7 w-4 rounded-full border border-gray-300 flex items-start justify-center p-1 backdrop-blur-xs">
          <div className="h-1.5 w-1 rounded-full bg-orange-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}