import { marqueeImages } from '../data/portfolioData';
import { playHoverSound } from '../utils/soundEffects';
import { FadeIn } from './ui/FadeIn';

export const MarqueeSection = () => {
  // Duplicate items once for seamless continuous CSS looping coverage
  const doubledRow1 = [...marqueeImages.row1, ...marqueeImages.row1];
  const doubledRow2 = [...marqueeImages.row2, ...marqueeImages.row2];

  return (
    <div
      className="relative bg-dark pt-24 pb-16 overflow-hidden select-none z-20 noise-overlay w-full"
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
      <div className="absolute inset-y-0 left-0 w-24 sm:w-60 bg-gradient-to-r from-dark via-dark/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-60 bg-gradient-to-l from-dark via-dark/80 to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-8 w-full relative z-0">
        
        {/* Row 1 — Auto-Moves RIGHT (animated via CSS) */}
        <div className="overflow-hidden w-full" style={{ transform: 'rotateY(-2.5deg)', transformOrigin: 'center' }}>
          <div className="animate-marquee-container gap-6">
            {doubledRow1.map((item, i) => (
              <div
                key={`row1-${i}`}
                onMouseEnter={playHoverSound}
                className="relative w-[340px] sm:w-[380px] h-[200px] sm:h-[240px] rounded-3xl overflow-hidden flex-shrink-0 group border border-white/5 hover:border-accent-purple/40 transition-all duration-350 hover:shadow-[0_0_30px_rgba(255,0,85,0.25)] cursor-pointer bg-white/[0.01]"
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

        {/* Row 2 — Auto-Moves LEFT (animated via CSS) */}
        <div className="overflow-hidden w-full" style={{ transform: 'rotateY(2.5deg)', transformOrigin: 'center' }}>
          <div className="animate-marquee-container-reverse gap-6">
            {doubledRow2.map((item, i) => (
              <div
                key={`row2-${i}`}
                onMouseEnter={playHoverSound}
                className="relative w-[340px] sm:w-[380px] h-[200px] sm:h-[240px] rounded-3xl overflow-hidden flex-shrink-0 group border border-white/5 hover:border-accent-magenta/40 transition-all duration-350 hover:shadow-[0_0_30px_rgba(238,15,15,0.25)] cursor-pointer bg-white/[0.01]"
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

      </div>
    </div>
  );
};
