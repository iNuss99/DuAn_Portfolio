import { memo } from 'react';
import { FadeIn } from './ui/FadeIn';
import { TiltCard } from './ui/TiltCard';
import { services } from '../data/portfolioData';

/** Memoized service row to prevent unnecessary re-renders */
const ServiceItem = memo(({ service, index }: { service: typeof services[0]; index: number }) => (
  <FadeIn
    y={30}
    delay={index * 0.1}
    duration={0.7}
    className="border-b border-[#0C0C0C]/15"
  >
    <TiltCard
      className="relative flex items-center justify-between py-8 sm:py-10 md:py-12 gap-6 sm:gap-10 rounded-2xl overflow-hidden"
      maxTilt={4}
      perspective={1200}
    >
      {/* Left: Giant Number */}
      <span className="font-black leading-none text-[#0C0C0C] select-none text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[8.5rem] min-w-[2ch]">
        {service.num}
      </span>

      {/* Right: Info Stack */}
      <div className="flex-1 flex flex-col text-left">
        <h3 className="font-medium uppercase tracking-tight text-base sm:text-xl md:text-2xl lg:text-3xl">
          {service.name}
        </h3>
        <p className="mt-2 text-[#0C0C0C]/60 font-light leading-relaxed max-w-2xl text-[11px] sm:text-xs md:text-sm lg:text-base">
          {service.desc}
        </p>
      </div>
    </TiltCard>
  </FadeIn>
));

ServiceItem.displayName = 'ServiceItem';

export const ServicesSection = () => {
  return (
    <section id="services" className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20">
      <div className="max-w-5xl mx-auto flex flex-col">

        {/* Title */}
        <FadeIn y={30} delay={0} duration={0.8} className="text-center mb-16 sm:mb-20 md:mb-28">
          <h2 className="font-black uppercase leading-none tracking-tight text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem]">
            DỊCH VỤ
          </h2>
        </FadeIn>

        {/* Services List with 3D Tilt */}
        <div className="flex flex-col border-t border-[#0C0C0C]/15">
          {services.map((service, i) => (
            <ServiceItem key={service.num} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};
