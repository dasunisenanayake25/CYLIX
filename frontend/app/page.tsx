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

  // Phase 1: Camera approach to exterior entrance door (0% to 50%)
  const approachPhase = Math.min(scrollProgress / 0.5, 1);
  const cameraZ = approachPhase * 850;
  const cameraPanX = -approachPhase * 315;
  const cameraPanY = -approachPhase * 115;
  const cameraPitch = Math.sin(approachPhase * Math.PI) * 2.0;
  const cameraRoll = Math.sin(approachPhase * Math.PI * 0.7) * 0.8;

  // Phase 2: Ultra smooth cross-fade blend between 1.png and 2.png (44% to 56%)
  const blendRaw =
    scrollProgress <= 0.44
      ? 0
      : scrollProgress >= 0.56
      ? 1
      : (scrollProgress - 0.44) / 0.12;
  // Cosine smooth-step easing to eliminate abrupt image switching
  const blendEased = 0.5 - Math.cos(blendRaw * Math.PI) / 2;

  // Phase 3: Stepping through the open door and moving deeper inside (50% to 100%)
  const insidePhase = Math.max((scrollProgress - 0.5) / 0.5, 0);
  const insideScale = 1.15 + insidePhase * 0.45;
  const insideTranslateX = -insidePhase * 40;
  const insideTranslateY = -insidePhase * 30;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white select-none">
      {/* Exterior Layer (1.png) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden will-change-transform"
        style={{
          perspective: "1100px",
          perspectiveOrigin: "60% 65%",
          opacity: 1 - blendEased,
        }}
      >
        <div
          className="absolute -inset-16 will-change-transform"
          style={{
            transform: `translate3d(${cameraPanX}px, ${cameraPanY}px, ${cameraZ}px) rotateX(${cameraPitch}deg) rotateZ(${cameraRoll}deg)`,
            transformOrigin: "73% 72%",
          }}
        >
          <Image
            src="/1.png"
            alt="CYLIX Headquarters Exterior"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-105 contrast-110"
          />

          {/* Entrance Door Ambient Flare */}
          <div
            className="absolute rounded-full pointer-events-none transition-opacity duration-500 blur-3xl"
            style={{
              top: "58%",
              left: "68%",
              width: "320px",
              height: "320px",
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(249, 115, 22, 0.2) 40%, transparent 70%)",
              opacity: 0.2 + approachPhase * 0.6,
              transform: `scale(${1 + approachPhase * 0.6})`,
            }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/40"
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

      {/* Seamless Open Door / Interior Layer (2.png) */}
      <div
        className="fixed inset-0 z-10 pointer-events-none overflow-hidden will-change-transform"
        style={{
          opacity: blendEased,
        }}
      >
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${insideScale}) translate3d(${insideTranslateX}px, ${insideTranslateY}px, 0)`,
            transformOrigin: "68% 65%",
          }}
        >
          <Image
            src="/2.png"
            alt="CYLIX Open Door Entrance"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-105 contrast-105"
          />
        </div>

        {/* Ambient Match Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />
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

      {/* Scroll Track */}
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