"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const totalSteps = 7;

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

  const cameraZ = scrollProgress * 750;
  const cameraPanX = -scrollProgress * 280;
  const cameraPanY = -scrollProgress * 90;
  const cameraPitch = Math.sin(scrollProgress * Math.PI) * 2.5;
  const cameraRoll = Math.sin(scrollProgress * Math.PI * 0.7) * 1.2;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white select-none">
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
          <Image
            src="/1.png"
            alt="CYLIX Headquarters Entrance"
            fill
            priority
            className="object-cover object-center brightness-105 contrast-110"
          />

          <div
            className="absolute rounded-full pointer-events-none transition-opacity duration-700 blur-3xl"
            style={{
              top: "62%",
              left: "70%",
              width: "280px",
              height: "280px",
              background: "radial-gradient(circle, rgba(56, 189, 248, 0.45), rgba(249, 115, 22, 0.15), transparent 70%)",
              opacity: 0.3 + scrollProgress * 0.7,
              transform: `scale(${1 + scrollProgress * 0.8})`,
            }}
          />
        </div>

        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-t from-black/70 via-transparent to-black/40"
          style={{ opacity: 1 - scrollProgress * 0.4 }}
        />

        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 68% 68%, transparent 40%, rgba(0, 0, 0, 0.75) 100%)",
            opacity: 0.5 + scrollProgress * 0.4,
          }}
        />
      </div>

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

      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 opacity-80">
        <div className="h-7 w-4 rounded-full border border-gray-300 flex items-start justify-center p-1 backdrop-blur-xs">
          <div className="h-1.5 w-1 rounded-full bg-orange-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}