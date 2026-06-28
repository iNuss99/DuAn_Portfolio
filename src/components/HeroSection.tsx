import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './ui/FadeIn';
import { Magnet } from './ui/Magnet';
import { ContactButton } from './ui/Buttons';
import { ParticleField } from './ui/ParticleField';
import { personalInfo, navLinks, decorative3D } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenContact: () => void;
}

/** Staggered 3D letter reveal for the hero heading */
const HeroHeading = ({ text }: { text: string }) => {
  const letters = text.split("");

  return (
    <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[13.5vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none"
      style={{ perspective: '800px' }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, rotateX: 90, y: 20 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{
            delay: 0.3 + i * 0.04,
            duration: 0.6,
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

export const HeroSection = ({ onOpenContact }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: heading moves up slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-dark"
    >
      {/* Particle Background */}
      <ParticleField particleCount={55} />

      {/* Navbar */}
      <FadeIn y={-20} delay={0} duration={0.8} as="nav" className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 z-30">
        <a href="#" className="font-bold tracking-widest text-text-primary text-sm md:text-lg lg:text-[1.4rem] uppercase hover:opacity-70 transition-opacity duration-200">
          KHOA
        </a>
        <div className="flex items-center gap-6 md:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-primary font-medium uppercase tracking-wider text-xs md:text-sm lg:text-[1.1rem] hover:opacity-70 transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Hero Heading with parallax + staggered 3D reveal */}
      <motion.div
        className="w-full overflow-hidden z-20 flex-1 flex items-center justify-center md:items-start md:pt-20"
        style={{ y: headingY }}
      >
        <HeroHeading text={personalInfo.greeting} />
      </motion.div>

      {/* Hero Portrait with Hologram 3D effect */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[260px] sm:w-[320px] md:w-[400px] lg:w-[480px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
        style={{ y: portraitY }}
      >
        <FadeIn y={30} delay={0.6} duration={0.9} className="w-full flex justify-center relative">
          {/* Glow pulse behind portrait */}
          <div
            className="glow-pulse absolute inset-0 rounded-full z-0"
            style={{
              background: 'radial-gradient(circle, rgba(118,33,176,0.35) 0%, rgba(182,0,168,0.15) 40%, transparent 70%)',
              filter: 'blur(40px)',
              transform: 'scale(1.3)',
            }}
          />

          {/* Rotating hologram ring */}
          <div
            className="hologram-ring absolute left-1/2 -translate-x-1/2 bottom-[15%] w-[85%] aspect-square z-0 rounded-full"
            style={{
              border: '2px solid rgba(118, 33, 176, 0.4)',
              boxShadow: '0 0 20px rgba(118, 33, 176, 0.25), inset 0 0 20px rgba(182, 0, 168, 0.15)',
            }}
          />

          {/* Scan line */}
          <div
            className="scan-line absolute left-[10%] right-[10%] h-[2px] z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(118, 33, 176, 0.6), rgba(182, 0, 168, 0.8), rgba(118, 33, 176, 0.6), transparent)',
              filter: 'blur(1px)',
              boxShadow: '0 0 12px rgba(118, 33, 176, 0.5)',
            }}
          />

          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center relative z-10"
          >
            <img
              src={decorative3D.portrait}
              alt="Khoa Portrait"
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          </Magnet>
        </FadeIn>
      </motion.div>

      {/* Bottom Bar */}
      <div className="w-full flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20 mt-auto">
        <FadeIn y={20} delay={0.35} duration={0.8}>
          <p className="text-text-primary font-light uppercase tracking-wide leading-snug text-left text-[10px] sm:text-xs md:text-sm lg:text-base max-w-[160px] sm:max-w-[220px] md:max-w-[260px] select-none">
            {personalInfo.bioShort}
          </p>
        </FadeIn>

        <FadeIn y={20} delay={0.5} duration={0.8}>
          <ContactButton onClick={onOpenContact} label="LIÊN HỆ NGAY" />
        </FadeIn>
      </div>
    </section>
  );
};
