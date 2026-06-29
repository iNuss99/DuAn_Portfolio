import { memo } from 'react';
import { FadeIn } from './ui/FadeIn';
import { services } from '../data/portfolioData';
import { playHoverSound } from '../utils/soundEffects';
import * as Icons from 'lucide-react';

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

/** Memoized service card with 3D hover glow and glassmorphism styling */
const ServiceCard = memo(({ service, index }: ServiceCardProps) => {
  // Get corresponding Lucide Icon
  const IconComponent = (Icons as any)[service.icon.charAt(0).toUpperCase() + service.icon.slice(1)] || Icons.Sparkles;

  return (
    <FadeIn
      y={30}
      delay={index * 0.1}
      duration={0.7}
      className="flex h-full"
    >
      <div
        onMouseEnter={playHoverSound}
        className="service-card-glow relative w-full flex flex-col justify-between p-6 sm:p-8 rounded-[24px] bg-[#141414]/40 border border-white/5 backdrop-blur-md hover:border-accent-purple/20 transition-all duration-300 hover:shadow-card-hover group cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow spotlight on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px] bg-[radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(182,0,168,0.06),transparent_60%)] z-0" />

        {/* Card Header: Icon & Big Number */}
        <div className="flex items-center justify-between gap-4 mb-8 z-10" style={{ transform: 'translateZ(20px)' }}>
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-magenta group-hover:bg-accent-magenta/15 group-hover:border-accent-magenta/30 transition-all duration-300">
            <IconComponent size={24} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-heading font-black text-4xl sm:text-5xl text-white/5 transition-colors duration-300 group-hover:text-accent-magenta/20 select-none">
            {service.num}
          </span>
        </div>

        {/* Card Body: Info */}
        <div className="text-left flex-1 flex flex-col justify-between z-10" style={{ transform: 'translateZ(30px)' }}>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-accent-purple uppercase block mb-1 font-heading">
              {service.subtitle}
            </span>
            <h3 className="font-heading font-bold uppercase tracking-wide text-lg sm:text-xl text-text-primary group-hover:text-white transition-colors duration-200 mb-3">
              {service.name}
            </h3>
            <p className="text-text-muted font-body font-light text-xs sm:text-sm leading-relaxed mb-6">
              {service.desc}
            </p>
          </div>

          {/* Tech stack Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {service.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[9px] font-bold tracking-widest text-text-primary/60 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md font-heading uppercase group-hover:bg-white/10 group-hover:text-white transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
});

ServiceCard.displayName = 'ServiceCard';

export const ServicesSection = () => {
  return (
    <section id="services" className="relative w-full bg-dark px-5 sm:px-8 md:px-10 py-24 sm:py-32 z-20 overflow-hidden noise-overlay border-t border-white/5">
      
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="ambient-glow-1 opacity-70" />
        <div className="ambient-glow-3 opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col relative z-10">

        {/* Title */}
        <FadeIn y={30} delay={0} duration={0.8} className="text-center mb-16 sm:mb-24">
          <span className="text-accent-magenta text-xs font-bold tracking-widest uppercase block mb-3 font-heading">
            ✦ Lĩnh vực hoạt động / Core Services ✦
          </span>
          <h2 className="font-heading font-black uppercase leading-none tracking-tight text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] glitch-hover hero-heading">
            DỊCH VỤ
          </h2>
        </FadeIn>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};
