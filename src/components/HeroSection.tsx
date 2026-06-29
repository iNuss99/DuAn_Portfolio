import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './ui/FadeIn';
import { Magnet } from './ui/Magnet';
import { ContactButton } from './ui/Buttons';
import { ParticleField } from './ui/ParticleField';
import { personalInfo, navLinks, decorative3D, stats } from '../data/portfolioData';
import * as Icons from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
}

/** Staggered 3D letter reveal for the hero heading */
const HeroHeading = ({ text }: { text: string }) => {
  const letters = text.split("");

  return (
    <h1 className="hero-heading font-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap w-full text-center text-[11vw] sm:text-[13vw] md:text-[14vw] lg:text-[15vw] select-none"
      style={{ perspective: '1000px' }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block hover:text-accent-magenta transition-colors duration-200"
          initial={{ opacity: 0, rotateX: 90, y: 30 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{
            delay: 0.2 + i * 0.03,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: 'bottom center',
            display: char === ' ' ? 'inline' : 'inline-block',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
};

// Animated counter component
const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 1500;
    let incrementTime = Math.abs(Math.floor(totalDuration / end));

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="counter-number">
      {count}
      {suffix}
    </span>
  );
};

export const HeroSection = ({ onOpenContact }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = personalInfo.title; // "Jack -- IT & Web Designer"

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedTitle((prev) => prev + fullTitle.charAt(index));
      index++;
      if (index >= fullTitle.length) {
        clearInterval(interval);
      }
    }, 75);
    return () => clearInterval(interval);
  }, []);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-dark noise-overlay"
    >
      {/* Background Particle and Parallax Blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        <ParticleField particleCount={60} />
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
        <div className="ambient-glow-5" />
      </motion.div>

      {/* Glassmorphic Sticky Header / Navbar */}
      <FadeIn y={-20} delay={0} duration={0.8} as="nav" className="w-full sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-[#0C0C0C]/40 backdrop-blur-md border-b border-white/5">
        <a href="#" className="font-heading font-bold tracking-widest text-text-primary text-base md:text-xl lg:text-[1.5rem] uppercase hover:text-accent-magenta transition-all duration-300">
          KHOA<span className="text-accent-magenta">.</span>
        </a>
        <div className="flex items-center gap-6 md:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-primary font-body font-medium uppercase tracking-widest text-xs md:text-sm hover:text-accent-magenta hover:-translate-y-[1px] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Main Hero Container */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center px-6 z-20 pb-16 md:pb-24">
        
        {/* Status Badge */}
        <FadeIn y={-10} delay={0.15} duration={0.7} className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] sm:text-xs font-bold tracking-widest uppercase text-text-primary">
            <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
            <span>Sẵn sàng hợp tác / Available for Work</span>
          </div>
        </FadeIn>

        {/* Dynamic Typing Title */}
        <FadeIn y={-10} delay={0.25} duration={0.7} className="mb-2 h-6">
          <p className="text-accent-magenta font-heading text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase typing-cursor">
            {typedTitle}
          </p>
        </FadeIn>

        {/* Parallax Staggered Heading */}
        <motion.div
          className="w-full overflow-hidden flex items-center justify-center py-4"
          style={{ y: headingY }}
        >
          <HeroHeading text={personalInfo.greeting} />
        </motion.div>

        {/* Hero Portrait with pulsing ring and scanline */}
        <motion.div
          className="relative z-10 w-[240px] sm:w-[280px] md:w-[350px] lg:w-[410px] aspect-square flex justify-center items-center pointer-events-auto mt-6"
          style={{ y: portraitY }}
        >
          <FadeIn y={30} delay={0.5} duration={0.9} className="w-full h-full flex justify-center relative">
            {/* Glow pulse behind portrait */}
            <div
              className="glow-pulse absolute inset-0 rounded-full z-0"
              style={{
                background: 'radial-gradient(circle, rgba(13,148,136,0.3) 0%, rgba(212,175,55,0.15) 40%, transparent 70%)',
                filter: 'blur(50px)',
                transform: 'scale(1.2)',
              }}
            />

            {/* Rotating hologram ring */}
            <div
              className="hologram-ring absolute inset-0 z-0 rounded-full"
              style={{
                border: '2px solid rgba(13, 148, 136, 0.3)',
                boxShadow: '0 0 30px rgba(13, 148, 136, 0.2), inset 0 0 25px rgba(212, 175, 55, 0.15)',
              }}
            />

            {/* Scan line */}
            <div
              className="scan-line absolute left-[5%] right-[5%] h-[2.5px] z-20 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(13, 148, 136, 0.6), rgba(212, 175, 55, 0.8), rgba(13, 148, 136, 0.6), transparent)',
                filter: 'blur(1px)',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
              }}
            />

            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="w-[85%] h-[85%] flex justify-center items-center relative z-10"
            >
              <img
                src={decorative3D.portrait}
                alt="Khoa Portrait"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-300"
              />
            </Magnet>
          </FadeIn>
        </motion.div>
      </div>

      {/* Bottom Bar: Bio & Action Button & Stats Preview */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between px-6 pb-12 gap-8 z-20">
        
        {/* Short Bio */}
        <FadeIn y={20} delay={0.4} duration={0.8} className="max-w-[280px] sm:max-w-[340px] text-center md:text-left">
          <p className="text-text-muted font-body font-light uppercase tracking-widest leading-relaxed text-[10px] sm:text-xs select-none">
            {personalInfo.bioShort}
          </p>
        </FadeIn>

        {/* Hero Stats */}
        <FadeIn y={20} delay={0.5} duration={0.8} className="hidden lg:flex items-center gap-8 bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl">
          {stats.slice(0, 3).map((stat, i) => {
            const IconComponent = (Icons as any)[stat.icon.charAt(0).toUpperCase() + stat.icon.slice(1)];
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-accent-magenta">
                  {IconComponent && <IconComponent size={18} />}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-lg font-heading font-black text-text-primary">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-text-muted">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </FadeIn>

        {/* CTA Button */}
        <FadeIn y={20} delay={0.6} duration={0.8}>
          <ContactButton onClick={onOpenContact} label="LIÊN HỆ NGAY" className="btn-shimmer" />
        </FadeIn>
      </div>

      {/* Decorative gradient line divider at the bottom */}
      <div className="gradient-divider w-full" />
    </section>
  );
};
