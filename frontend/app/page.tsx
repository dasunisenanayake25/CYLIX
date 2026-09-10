"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "gateway", name: "Gateway" },
  { id: "chapters", name: "Chapters" },
  { id: "treasury", name: "Treasury" },
  { id: "journey", name: "Journey" },
  { id: "partners", name: "Partners" },
  { id: "mentors", name: "Mentors" },
  { id: "faq", name: "FAQ" },
];

export default function Page() {
  const [activeSection, setActiveSection] = useState("gateway");
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    const sectionElements = container.querySelectorAll("section");
    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Circular arc path calculations based on scroll progress
  const scale = 1 + scrollProgress * 1.85;
  const translateX = -Math.sin(scrollProgress * Math.PI * 0.8) * 18 - scrollProgress * 22;
  const translateY = -Math.sin(scrollProgress * Math.PI * 0.5) * 8 - scrollProgress * 12;
  const rotate = Math.sin(scrollProgress * Math.PI) * 1.5;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white select-none">
      {/* Dynamic 3D Curved Scroll Camera Rig */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform transition-transform duration-300 ease-out"
          style={{
            transform: `translate3d(${translateX}%, ${translateY}%, 0) scale(${scale}) rotate(${rotate}deg)`,
            transformOrigin: "72% 70%",
          }}
        >
          <Image
            src="/1.png"
            alt="CYLIX Building Entrance"
            fill
            priority
            className="object-cover object-center brightness-105 contrast-105"
          />
        </div>

        {/* Ambient Lighting Vignettes */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 md:px-16 pointer-events-none">
        <div className="pointer-events-auto cursor-pointer">
          <span className="text-xl font-black tracking-widest text-orange-500">CYLIX</span>
        </div>
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => handleScrollTo("gateway")}
            className="rounded-full border border-white/20 bg-black/30 px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-gray-200 backdrop-blur-md transition hover:border-orange-500 hover:text-white"
          >
            Terminal
          </button>
        </div>
      </header>

      {/* Scrollable Container */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="relative z-20 h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {sections.map((item) => (
          <section
            key={item.id}
            id={item.id}
            className="relative flex h-screen w-full snap-start items-center justify-center pointer-events-none"
          />
        ))}
      </main>

      {/* Mouse Indicator */}
      <div className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 opacity-80">
        <div className="h-7 w-4 rounded-full border border-gray-300 flex items-start justify-center p-1 backdrop-blur-xs">
          <div className="h-1.5 w-1 rounded-full bg-orange-500 animate-bounce" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 sm:gap-6 px-6 py-2 overflow-x-auto max-w-full backdrop-blur-sm rounded-full bg-black/20 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => handleScrollTo(sec.id)}
              className="group flex flex-col items-center gap-1.5 py-1 text-xs font-medium tracking-wide transition-all outline-none"
            >
              <span
                className={`transition-colors duration-200 ${
                  isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                {sec.name}
              </span>
              <span
                className={`h-1 rounded-full transition-all duration-300 ${
                  isActive ? "w-4 bg-orange-500" : "w-1 bg-transparent group-hover:bg-gray-400"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}