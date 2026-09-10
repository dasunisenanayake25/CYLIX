"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const sections = [
  {
    id: "gateway",
    name: "Gateway",
    title: "CYLIX",
    subtitle: "INNOVATION PLATFORM",
    description:
      "Empowering modern engineering systems through robust architectures, distributed cloud components, and automated data pipelines.",
  },
  {
    id: "chapters",
    name: "Chapters",
    title: "SYSTEM MODULES",
    subtitle: "CORE ARCHITECTURE",
    description:
      "Explore structured foundational blocks designed for high concurrency, real-time sync, and enterprise reliability.",
  },
  {
    id: "treasury",
    name: "Treasury",
    title: "RESOURCES",
    subtitle: "ASSETS & TOOLING",
    description:
      "Access centralized developer libraries, API contracts, reusable UI component toolkits, and infrastructure scripts.",
  },
  {
    id: "journey",
    name: "Journey",
    title: "DEVELOPMENT ROADMAP",
    subtitle: "TIMELINE & GOALS",
    description:
      "Track quarterly releases, scheduled database migrations, feature rollouts, and engineering milestones.",
  },
  {
    id: "partners",
    name: "Partners",
    title: "NETWORK",
    subtitle: "COLLABORATION ECOSYSTEM",
    description:
      "Working together with enterprise platforms, developer communities, and cloud providers across industry sectors.",
  },
  {
    id: "mentors",
    name: "Mentors",
    title: "LEADERSHIP",
    subtitle: "TECHNICAL ADVISORS",
    description:
      "Guiding system scalability, site reliability engineering, and agile delivery standards throughout production life cycles.",
  },
  {
    id: "faq",
    name: "FAQ",
    title: "KNOWLEDGE BASE",
    subtitle: "COMMON QUESTIONS",
    description:
      "Find immediate answers regarding platform integration, environment configurations, security specs, and deployments.",
  },
];

const HomePage = () => {
  const [activeSection, setActiveSection] = useState("gateway");
  const containerRef = useRef<HTMLElement>(null);

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

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black text-white select-none">
      {/* Background Image Layer with Reduced Darkness */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/1.png"
          alt="CYLIX Headquarters"
          fill
          priority
          className="object-cover object-right md:object-center brightness-105 contrast-105 transition-all duration-1000 ease-out"
        />
        
        {/* Soft Left-To-Right Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent w-full md:w-3/5" />
        
        {/* Subtle Bottom Glow for Bottom Navigation */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Very Light Top Header Vignette */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
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

      {/* Snap Scrollable Content */}
      <main
        ref={containerRef}
        className="relative z-20 h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {sections.map((item, index) => (
          <section
            key={item.id}
            id={item.id}
            className="relative flex h-screen w-full snap-start flex-col justify-center px-8 md:px-20 lg:px-28"
          >
            <div className="max-w-xl z-10">
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-6 bg-orange-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500 drop-shadow">
                  {item.subtitle}
                </span>
              </div>

              <h1 className="mt-4 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase drop-shadow-md">
                {item.title}
              </h1>

              <p className="mt-6 max-w-lg text-sm md:text-base leading-relaxed text-gray-200 drop-shadow">
                {item.description}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const nextIndex = (index + 1) % sections.length;
                    handleScrollTo(sections[nextIndex].id);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-orange-500/50 bg-black/40 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-orange-400 backdrop-blur-md transition-all hover:bg-orange-500 hover:text-white"
                >
                  Proceed Next &gt;&gt;
                </button>
              </div>
            </div>

            <div className="absolute right-12 bottom-24 hidden lg:block select-none pointer-events-none opacity-20">
              <span className="text-[180px] font-black leading-none text-white drop-shadow-lg">
                0{index + 1}
              </span>
            </div>
          </section>
        ))}
      </main>

      {/* Mouse Indicator */}
      <div className="pointer-events-none absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 opacity-80">
        <div className="h-7 w-4 rounded-full border border-gray-300 flex items-start justify-center p-1 backdrop-blur-xs">
          <div className="h-1.5 w-1 rounded-full bg-orange-500 animate-bounce" />
        </div>
      </div>

      {/* Bottom Nav */}
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
};

export default HomePage;