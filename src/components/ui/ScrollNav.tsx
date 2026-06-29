import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

const SECTIONS = [
  { id: "hero", label: "ĐẦU TRANG" },
  { id: "about", label: "GIỚI THIỆU" },
  { id: "services", label: "DỊCH VỤ" },
  { id: "projects", label: "DỰ ÁN" },
  { id: "testimonials", label: "ĐÁNH GIÁ" }
];

export const ScrollNav = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Track page scroll progress
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Hide on mobile screens
    if (window.innerWidth < 1024) return;

    // Track active section on scroll
    const observers = SECTIONS.map((section) => {
      const el = document.getElementById(section.id) || (section.id === "hero" ? document.querySelector('section') : null);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { threshold: 0.35, rootMargin: "-10% 0px -40% 0px" }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleScrollTo = (id: string) => {
    playClickSound();
    const el = id === "hero" ? document.querySelector('section') : document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hide scroll indicator on smaller screens
  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return null;
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center gap-4 select-none">
      
      {/* Scroll Progress Tube */}
      <div className="relative w-[3px] h-[180px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-accent-magenta via-accent-purple to-accent-orange origin-top rounded-full"
          style={{ scaleY, height: "100%" }}
        />
      </div>

      {/* Dots and Labels */}
      <div className="flex flex-col gap-5 justify-between py-1 h-[180px]">
        {SECTIONS.map((sec, idx) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={sec.id}
              className="relative flex items-center justify-end cursor-pointer group"
              onMouseEnter={() => {
                setHoveredIdx(idx);
                playHoverSound();
              }}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => handleScrollTo(sec.id)}
            >
              {/* Tooltip Label */}
              <span
                className={`absolute right-6 text-[10px] font-bold tracking-widest font-heading transition-all duration-300 pointer-events-none ${
                  isHovered ? 'opacity-85 translate-x-0' : 'opacity-0 translate-x-2'
                } ${isActive ? 'text-white' : 'text-text-muted'}`}
              >
                {sec.label}
              </span>

              {/* Dot Ring Indicator */}
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isActive
                    ? 'border-accent-magenta bg-accent-magenta/20 scale-110 shadow-[0_0_10px_rgba(182,0,168,0.5)]'
                    : 'border-white/20 hover:border-white/50'
                }`}
              >
                {/* Center Core Dot */}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#D7E2EA] scale-110' : 'bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
