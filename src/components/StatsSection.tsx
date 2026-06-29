import { FadeIn } from './ui/FadeIn';
import { stats } from '../data/portfolioData';
import { playHoverSound } from '../utils/soundEffects';
import * as Icons from 'lucide-react';

import { CountUp } from './ui/CountUp';

// Single counter item with scroll trigger
const StatCard = ({ stat }: { stat: typeof stats[0] }) => {
  // Dynamically load Lucide icon
  const IconComponent = (Icons as any)[stat.icon.charAt(0).toUpperCase() + stat.icon.slice(1)] || Icons.Activity;

  return (
    <div
      onMouseEnter={playHoverSound}
      className="relative flex flex-col justify-between items-center p-6 sm:p-8 rounded-[24px] bg-[#141414]/30 border border-white/5 backdrop-blur-md hover:border-accent-magenta/25 hover:shadow-[0_20px_40px_rgba(182,0,168,0.15)] transition-all duration-300 group text-center cursor-pointer"
    >
      {/* Icon Area */}
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-magenta mb-6 group-hover:scale-110 transition-transform duration-300">
        <IconComponent size={24} />
      </div>

      {/* Number Area */}
      <h3 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-2 counter-number">
        <CountUp to={stat.value} suffix={stat.suffix} />
      </h3>

      {/* Label Area */}
      <span className="text-[10px] sm:text-xs font-bold tracking-widest text-text-muted uppercase font-heading group-hover:text-text-primary transition-colors">
        {stat.label}
      </span>
    </div>
  );
};

export const StatsSection = () => {
  return (
    <section id="stats" className="relative w-full bg-dark px-5 sm:px-8 md:px-10 py-20 sm:py-24 z-20 overflow-hidden noise-overlay border-t border-white/5">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="ambient-glow-1 opacity-40" />
        <div className="ambient-glow-2 opacity-30" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <FadeIn key={index} y={30} delay={index * 0.1} duration={0.8}>
              <StatCard stat={stat} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
