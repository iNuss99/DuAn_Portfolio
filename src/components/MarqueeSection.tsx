import { useEffect, useRef } from 'react';
import { marqueeImages } from '../data/portfolioData';
import { playHoverSound } from '../utils/soundEffects';
import { FadeIn } from './ui/FadeIn';

export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  
  // Animation offsets
  const autoOffsetRef = useRef<number>(0);
  const scrollOffsetRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const gameLoop = () => {
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (!section || !row1 || !row2) {
        animRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      // Calculate scroll speed / velocity
      const currentScrollY = window.scrollY;
      const scrollVelocity = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Add velocity momentum to scroll offset, then apply friction decay
      scrollOffsetRef.current += scrollVelocity * 0.45;
      scrollOffsetRef.current *= 0.93; // Friction (slowly decay to 0)

      // Constant slow auto-movement
      autoOffsetRef.current += 0.8;

      // Total translations
      const trans1 = (autoOffsetRef.current + scrollOffsetRef.current) * 0.7;
      const trans2 = -(autoOffsetRef.current - scrollOffsetRef.current) * 0.7;

      // Infinite loop reset using modulo based on estimated width (11 items * 432px spacing = 4752px)
      const modWidth = 4752; 
      const row1Translate = trans1 % modWidth;
      const row2Translate = trans2 % modWidth;

      row1.style.transform = `translate3d(${row1Translate}px, 0, 0)`;
      row2.style.transform = `translate3d(${row2Translate}px, 0, 0)`;

      animRef.current = requestAnimationFrame(gameLoop);
    };

    animRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Duplicate items for seamless continuous looping coverage
  const tripledRow1 = [...marqueeImages.row1, ...marqueeImages.row1, ...marqueeImages.row1];
  const tripledRow2 = [...marqueeImages.row2, ...marqueeImages.row2, ...marqueeImages.row2];

  return (
    <div
      ref={sectionRef}
      className="relative bg-dark pt-32 pb-16 overflow-hidden select-none z-20 noise-overlay"
      style={{ perspective: '1200px' }}
    >
      {/* Title / Section Header */}
      <div className="max-w-5xl mx-auto px-6 mb-16 text-center">
        <FadeIn y={30} delay={0} duration={0.8}>
          <span className="text-accent-magenta text-xs font-bold tracking-widest uppercase block mb-3 font-heading">
            ✦ Trải nghiệm tương tác / Interactive Showcase ✦
          </span>
          <h2 className="font-heading font-black uppercase leading-none tracking-tight text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] glitch-hover hero-heading">
            SHOWCASE
          </h2>
        </FadeIn>
      </div>
      
      {/* Soft gradient overlays at screen borders (v4.6 Edge Fade) */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-64 bg-gradient-to-r from-dark via-dark/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-64 bg-gradient-to-l from-dark via-dark/70 to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-6 w-full relative z-0">
        
        {/* Row 1 — Auto-Moves RIGHT, slight 3D tilt */}
        <div className="overflow-hidden w-full" style={{ transform: 'rotateY(-2.5deg)', transformOrigin: 'center' }}>
          <div
            ref={row1Ref}
            className="flex gap-6 whitespace-nowrap"
            style={{ willChange: 'transform', marginLeft: '-2400px' }}
          >
            {tripledRow1.map((item, i) => (
              <div
                key={`row1-${i}`}
                onMouseEnter={playHoverSound}
                className="relative w-[380px] sm:w-[420px] h-[240px] sm:h-[270px] rounded-3xl overflow-hidden flex-shrink-0 group border border-white/5 hover:border-accent-magenta/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(182,0,168,0.25)] cursor-pointer bg-white/[0.01]"
              >
                {/* Image overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 transition-opacity duration-300 opacity-80 group-hover:opacity-40" />
                
                <img
                  src={item.url}
                  alt={item.tag}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 filter brightness-[0.8] group-hover:brightness-[0.95]"
                />
                
                {/* Neon HUD Info Tag on hover */}
                <div className="absolute bottom-5 left-5 right-5 bg-dark-card/90 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-350 flex items-center justify-between shadow-2xl z-20">
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#D7E2EA] uppercase font-heading">{item.tag}</span>
                  <svg className="w-4 h-4 text-accent-magenta animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — Auto-Moves LEFT, opposite 3D tilt */}
        <div className="overflow-hidden w-full" style={{ transform: 'rotateY(2.5deg)', transformOrigin: 'center' }}>
          <div
            ref={row2Ref}
            className="flex gap-6 whitespace-nowrap"
            style={{ willChange: 'transform', marginLeft: '-1200px' }}
          >
            {tripledRow2.map((item, i) => (
              <div
                key={`row2-${i}`}
                onMouseEnter={playHoverSound}
                className="relative w-[380px] sm:w-[420px] h-[240px] sm:h-[270px] rounded-3xl overflow-hidden flex-shrink-0 group border border-white/5 hover:border-accent-purple/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(118,33,176,0.25)] cursor-pointer bg-white/[0.01]"
              >
                {/* Image overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 transition-opacity duration-300 opacity-80 group-hover:opacity-40" />

                <img
                  src={item.url}
                  alt={item.tag}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 filter brightness-[0.8] group-hover:brightness-[0.95]"
                />
                
                {/* Neon HUD Info Tag on hover */}
                <div className="absolute bottom-5 left-5 right-5 bg-dark-card/90 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-350 flex items-center justify-between shadow-2xl z-20">
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#D7E2EA] uppercase font-heading">{item.tag}</span>
                  <svg className="w-4 h-4 text-accent-purple animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
