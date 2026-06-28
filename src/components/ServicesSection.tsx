import { memo, useRef, useCallback } from 'react';
import { FadeIn } from './ui/FadeIn';
import { TiltCard } from './ui/TiltCard';
import { services } from '../data/portfolioData';
import { playHoverSound } from '../utils/soundEffects';

interface ServiceItemProps {
  service: typeof services[0];
  index: number;
}

/** Memoized service row with 3D Tilt and interactive mouse spotlight */
const ServiceItem = memo(({ service, index }: ServiceItemProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const row = rowRef.current;
    if (!row) return;
    const rect = row.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    row.style.setProperty('--mouse-x', `${x}px`);
    row.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  return (
    <FadeIn
      y={30}
      delay={index * 0.1}
      duration={0.7}
      className="border-b border-[#0C0C0C]/10"
    >
      <div
        ref={rowRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={playHoverSound}
        className="group relative rounded-2xl overflow-hidden px-4 transition-all duration-300 hover:bg-black/[0.02]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cursor spotlight layer */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(182, 0, 168, 0.04), transparent 60%)`
          }}
        />

        <TiltCard
          className="relative z-10 flex items-center justify-between py-8 sm:py-10 md:py-12 gap-6 sm:gap-10"
          maxTilt={3}
          perspective={1200}
        >
          {/* Left: Giant Number */}
          <span className="font-black leading-none text-[#0C0C0C] select-none text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[8.5rem] min-w-[2ch] transition-all duration-300 group-hover:text-[#B600A8] group-hover:scale-105">
            {service.num}
          </span>

          {/* Right: Info Stack */}
          <div className="flex-1 flex flex-col text-left">
            <h3 className="font-semibold uppercase tracking-tight text-base sm:text-xl md:text-2xl lg:text-3xl text-[#0C0C0C] transition-colors duration-300 group-hover:text-[#7621B0]">
              {service.name}
            </h3>
            <p className="mt-2 text-[#0C0C0C]/60 font-light leading-relaxed max-w-2xl text-[11px] sm:text-xs md:text-sm lg:text-base">
              {service.desc}
            </p>
          </div>
        </TiltCard>
      </div>
    </FadeIn>
  );
});

ServiceItem.displayName = 'ServiceItem';

export const ServicesSection = () => {
  return (
    <section id="services" className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20">
      <div className="max-w-5xl mx-auto flex flex-col">

        {/* Title */}
        <FadeIn y={30} delay={0} duration={0.8} className="text-center mb-16 sm:mb-20 md:mb-28">
          <h2 className="font-black uppercase leading-none tracking-tight text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] glitch-hover">
            DỊCH VỤ
          </h2>
        </FadeIn>

        {/* Services List with 3D Tilt and Spotlight */}
        <div className="flex flex-col border-t border-[#0C0C0C]/10">
          {services.map((service, i) => (
            <ServiceItem key={service.num} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};
