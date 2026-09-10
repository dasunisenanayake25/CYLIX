"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const totalSteps = 14;

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

  // Phase 1: Camera approach towards entrance door (0% to 45%)
  const approachPhase = Math.min(scrollProgress / 0.45, 1);
  const cameraZ = approachPhase * 820;
  const cameraPanX = -approachPhase * 310;
  const cameraPanY = -approachPhase * 110;
  const cameraPitch = Math.sin(approachPhase * Math.PI) * 2.2;
  const cameraRoll = Math.sin(approachPhase * Math.PI * 0.7) * 1.0;

  // Phase 2: Door opening and entering transition (45% to 55%)
  const enterPhase =
    scrollProgress <= 0.45
      ? 0
      : scrollProgress >= 0.55
      ? 1
      : (scrollProgress - 0.45) / 0.1;

  // Phase 3: Stepping inside the interior room (55% to 100%)
  const insidePhase = Math.max((scrollProgress - 0.55) / 0.45, 0);
  const insideZoom = 1 + insidePhase * 0.35;
  const insidePanY = -insidePhase * 40;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white select-none">
      {/* Exterior 3D Viewport Rig (1.png) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700"
        style={{
          perspective: "1100px",
          perspectiveOrigin: "60% 65%",
          opacity: 1 - enterPhase,
        }}
      >
        <div
          className="absolute -inset-16 will-change-transform transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${cameraPanX}px, ${cameraPanY}px, ${cameraZ}px) rotateX(${cameraPitch}deg) rotateZ(${cameraRoll}deg)`,
            transformOrigin: "73% 72%",
          }}
        >
          <Image
            src="/1.png"
            alt="CYLIX Headquarters Entrance"
            fill
            priority
            className="object-cover object-center brightness-105 contrast-110"
          />

          {/* Ambient Door Glow */}
          <div
            className="absolute rounded-full pointer-events-none transition-opacity duration-700 blur-3xl"
            style={{
              top: "58%",
              left: "68%",
              width: "320px",
              height: "320px",
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.45), rgba(249, 115, 22, 0.15), transparent 70%)",
              opacity: 0.25 + approachPhase * 0.6,
              transform: `scale(${1 + approachPhase * 0.7})`,
            }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-t from-black/70 via-transparent to-black/40"
          style={{ opacity: 1 - approachPhase * 0.4 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 68% 68%, transparent 40%, rgba(0, 0, 0, 0.85) 100%)",
            opacity: 0.5 + approachPhase * 0.4,
          }}
        />
      </div>

      {/* Interior / Open Door Reveal Layer (2.png) */}
      <div
        className="fixed inset-0 z-10 pointer-events-none overflow-hidden transition-opacity duration-500 ease-out"
        style={{
          opacity: enterPhase,
        }}
      >
        <div
          className="absolute inset-0 will-change-transform transition-transform duration-500 ease-out"
          style={{
            transform: `scale(${insideZoom}) translateY(${insidePanY}px)`,
          }}
        >
          <Image
            src="/2.png"
            alt="CYLIX Interior Workspace"
            fill
            priority
            className="object-cover object-center brightness-110 contrast-105"
          />
        </div>

        {/* Ambient Warm Atmosphere for Interior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70" />

        {/* Welcome Text Tag inside */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
          style={{
            opacity: Math.max((insidePhase - 0.2) / 0.8, 0),
            transform: `translateY(${(1 - insidePhase) * 30}px)`,
          }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 font-semibold drop-shadow">
            Welcome To
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-white mt-2 drop-shadow-lg">
            CYLIX HEADQUARTERS
          </h2>
        </div>
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
            className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-gray-200 backdrop-blur-md transition hover:border-orange-500 hover:text-white"
          >
            Terminal
          </button>
        </div>
      </header>

      {/* Scroll Engine */}
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