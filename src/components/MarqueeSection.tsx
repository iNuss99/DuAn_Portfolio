import { useEffect, useRef } from 'react';
import { marqueeImages } from '../data/portfolioData';

/**
 * Two-row parallax marquee with 3D perspective tilt.
 * Uses requestAnimationFrame for smooth 60fps scroll-driven translation.
 */
export const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const updateTransforms = () => {
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (!section || !row1 || !row2) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      const row1Translate = offset - 200;
      const row2Translate = -(offset - 200);

      row1.style.transform = `translate3d(${row1Translate}px, 0, 0)`;
      row2.style.transform = `translate3d(${row2Translate}px, 0, 0)`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTransforms(); // Align on mount

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Triple items for seamless coverage
  const tripledRow1 = [...marqueeImages.row1, ...marqueeImages.row1, ...marqueeImages.row1];
  const tripledRow2 = [...marqueeImages.row2, ...marqueeImages.row2, ...marqueeImages.row2];

  return (
    <div
      ref={sectionRef}
      className="relative bg-dark pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
      style={{ perspective: '1200px' }}
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1 — Moves RIGHT, slight 3D tilt */}
        <div className="overflow-hidden w-full" style={{ transform: 'rotateY(-2deg)', transformOrigin: 'center' }}>
          <div
            ref={row1Ref}
            className="flex gap-3 whitespace-nowrap"
            style={{ willChange: 'transform', marginLeft: '-1200px' }}
          >
            {tripledRow1.map((url, i) => (
              <img
                key={`row1-${i}`}
                src={url}
                alt="Web Design Preview"
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0 hover:scale-[1.03] transition-transform duration-300"
              />
            ))}
          </div>
        </div>

        {/* Row 2 — Moves LEFT, opposite 3D tilt */}
        <div className="overflow-hidden w-full" style={{ transform: 'rotateY(2deg)', transformOrigin: 'center' }}>
          <div
            ref={row2Ref}
            className="flex gap-3 whitespace-nowrap"
            style={{ willChange: 'transform', marginLeft: '-600px' }}
          >
            {tripledRow2.map((url, i) => (
              <img
                key={`row2-${i}`}
                src={url}
                alt="Web Design Preview"
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0 hover:scale-[1.03] transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
