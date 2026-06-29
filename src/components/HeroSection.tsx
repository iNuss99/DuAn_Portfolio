import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './ui/FadeIn';
import { Magnet } from './ui/Magnet';
import { ContactButton } from './ui/Buttons';
import { ParticleField } from './ui/ParticleField';
import { personalInfo, navLinks, decorative3D, stats } from '../data/portfolioData';
import * as Icons from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

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

// CyberOS Diagnostics Widget
const CyberDashboard = () => {
  const [time, setTime] = useState(new Date());
  const [ping, setPing] = useState(14);
  const [cpu, setCpu] = useState(12);

  useEffect(() => {
    const timeTimer = setInterval(() => setTime(new Date()), 1000);
    const diagTimer = setInterval(() => {
      setPing(Math.floor(Math.random() * 6) + 12); // 12-17ms
      setCpu(Math.floor(Math.random() * 15) + 8); // 8-22%
    }, 2000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(diagTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-[280px] bg-black/50 border border-white/10 rounded-2xl p-4 backdrop-blur-md text-left font-mono text-[10px] text-white/70 flex flex-col gap-2.5 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent-magenta to-transparent" />
      <div className="flex justify-between items-center border-b border-white/5 pb-2 text-white">
        <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[9px]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
          KHOA-OS DIAGNOSTICS
        </span>
        <span className="text-white/40 text-[9px]">v5.0</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[9px] uppercase tracking-wide">
        <div>
          <span className="text-white/40 block text-[8px]">SYS TIME</span>
          <span className="text-white font-bold">{time.toLocaleTimeString("vi-VN")}</span>
        </div>
        <div>
          <span className="text-white/40 block text-[8px]">PING RATE</span>
          <span className="text-white font-bold">{ping}ms <span className="text-green-400 font-mono text-[8px]">[EXC]</span></span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-[9px] uppercase">
          <span className="text-white/40">CPU CORE LOAD</span>
          <span className="text-accent-magenta font-bold">{cpu}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div animate={{ width: `${cpu}%` }} transition={{ duration: 0.5 }} className="h-full bg-accent-magenta" />
        </div>
      </div>

      <div className="border-t border-white/5 pt-2 flex flex-col gap-1 text-[8px] text-white/40 leading-relaxed max-h-[50px] overflow-hidden">
        <div className="text-green-400 font-bold">&gt; PORTFOLIO_INIT: OK</div>
        <div>&gt; HOVER_LIGHTENER: ON</div>
        <div>&gt; PARALLAX_3D_GPU: READY</div>
      </div>
    </div>
  );
};

// CyberOS Console Terminal stream
const CyberTerminal = () => {
  const [lines, setLines] = useState<string[]>([
    "SYS.LOG // STARTING PORTFOLIO OS",
    "API CONNECTOR: STABLE [OK]",
    "SHADER PIPELINE: SUCCESS [200]",
  ]);

  useEffect(() => {
    const termLogs = [
      "LOADING HOVER TRIGGERS... 100%",
      "3D MESH GRADIENTS: ACTIVE",
      "GRAVITY PARTICLES: ENGAGED",
      "SYSTEM DIAGNOSTICS: STABILIZED",
      "USER IP HANDSHAKE: SUCCESS",
      "PORTFOLIO LAUNCH SEQUENCE: OK",
    ];
    let logIdx = 0;
    
    const interval = setInterval(() => {
      if (logIdx < termLogs.length) {
        setLines(prev => [...prev.slice(-2), termLogs[logIdx]]);
        logIdx++;
      } else {
        logIdx = 0;
        setLines([
          "SYS.LOG // STREAM RESET",
          "API STATUS: STABLE [OK]",
        ]);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[280px] bg-black/50 border border-white/10 rounded-2xl p-4 backdrop-blur-md text-left font-mono text-[9px] text-green-400 flex flex-col gap-2 relative overflow-hidden shadow-2xl h-[126px]">
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-green-500 to-transparent" />
      <div className="flex justify-between items-center border-b border-white/5 pb-1.5 text-white/50">
        <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[9px]">
          CONSOLE LOG STREAM
        </span>
        <span className="text-white/20 text-[9px]">ttyS001</span>
      </div>
      <div className="flex-1 flex flex-col gap-1 overflow-hidden select-text pr-1 pt-1.5">
        {lines.map((line, idx) => (
          <div key={idx} className={idx === lines.length - 1 ? "animate-pulse font-bold" : "text-green-500/70"}>
            $ {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export const HeroSection = ({ onOpenContact }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = personalInfo.title; // "Khoa -- IT & Web Designer"

  useEffect(() => {
    let active = true;
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%#@$&*";
    
    // Sci-fi Matrix Decode scramble effect
    const interval = setInterval(() => {
      if (!active) return;

      setTypedTitle(
        fullTitle
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return fullTitle[index];
            }
            if (index === Math.floor(iteration)) {
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return "";
          })
          .join("")
      );

      // Increment decoding cursor
      iteration += 0.35;

      if (iteration >= fullTitle.length) {
        setTypedTitle(fullTitle);
        clearInterval(interval);
      }
    }, 30);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [fullTitle]);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Premium Zoom & Fade scroll transforms
  const heroScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const handleScrollDown = () => {
    playClickSound();
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-dark noise-overlay"
    >
      {/* Background Particle and Parallax Blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none z-0">
        <ParticleField particleCount={70} />
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
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative w-full max-w-7xl mx-auto flex-1 flex flex-col items-center justify-center px-6 z-20 pb-24 md:pb-28"
      >
        {/* Status Badge */}
        <FadeIn y={-10} delay={0.15} duration={0.7} className="mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] sm:text-xs font-bold tracking-widest uppercase text-text-primary">
            <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
            <span>Sẵn sàng hợp tác / Available for Work</span>
          </div>
        </FadeIn>

        {/* Dynamic Matrix Scramble Title */}
        <FadeIn y={-10} delay={0.25} duration={0.7} className="mb-1 h-6">
          <p className="text-accent-magenta font-mono text-xs sm:text-sm md:text-base font-black tracking-widest uppercase typing-cursor">
            {typedTitle}
          </p>
        </FadeIn>

        {/* Parallax Staggered Heading */}
        <motion.div
          className="w-full overflow-hidden flex items-center justify-center py-2"
          style={{ y: headingY }}
        >
          <HeroHeading text={personalInfo.greeting} />
        </motion.div>

        {/* Cinematic Dashboard Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6 z-10">
          
          {/* Left Column: Diagnostics (hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-start gap-4">
            <CyberDashboard />
            <div className="flex flex-col text-left font-mono text-[9px] text-white/40 gap-1.5 mt-2">
              <span>LOCATION: HANOI, VN</span>
              <span>NETWORK STATUS: SECURE</span>
              <span>OS KERNEL: VITE.REACT</span>
            </div>
          </div>

          {/* Center Column: Portrait with radar rings & Float Cards */}
          <div className="col-span-1 lg:col-span-6 flex justify-center relative">
            <motion.div
              className="relative z-10 w-[230px] sm:w-[270px] md:w-[320px] lg:w-[360px] aspect-square flex justify-center items-center pointer-events-auto"
              style={{ y: portraitY }}
            >
              <FadeIn y={30} delay={0.5} duration={0.9} className="w-full h-full flex justify-center items-center relative">
                
                {/* Glow pulse behind portrait */}
                <div
                  className="glow-pulse absolute inset-0 rounded-full z-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(182,0,168,0.2) 0%, rgba(118,33,176,0.1) 40%, transparent 70%)',
                    filter: 'blur(40px)',
                    transform: 'scale(1.1)',
                  }}
                />

                {/* Concentric radar scanner rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="absolute w-[112%] h-[112%] rounded-full border border-dashed border-accent-magenta/25 z-0 pointer-events-none"
                />
                
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                  className="absolute w-[124%] h-[124%] rounded-full border border-accent-purple/15 border-t-accent-magenta/30 border-b-accent-orange/30 z-0 pointer-events-none"
                />

                {/* Rotating hologram ring */}
                <div
                  className="hologram-ring absolute inset-0 z-0 rounded-full pointer-events-none"
                  style={{
                    border: '2px solid rgba(182, 0, 168, 0.25)',
                    boxShadow: '0 0 30px rgba(182, 0, 168, 0.15), inset 0 0 25px rgba(118, 33, 176, 0.1)',
                  }}
                />

                {/* Scan line */}
                <div
                  className="scan-line absolute left-[5%] right-[5%] h-[2.5px] z-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(182, 0, 168, 0.6), rgba(118, 33, 176, 0.8), rgba(182, 0, 168, 0.6), transparent)',
                    filter: 'blur(1px)',
                    boxShadow: '0 0 15px rgba(182, 0, 168, 0.5)',
                  }}
                />

                {/* Parallax Float Cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="absolute -top-2 -left-8 hidden md:flex items-center gap-2 bg-[#111111]/85 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-2xl pointer-events-none select-none z-20"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-magenta animate-pulse" />
                  <span className="font-heading font-bold text-[8px] tracking-widest text-white uppercase">TECH // REACT.TS</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-2 -left-12 hidden md:flex items-center gap-2 bg-[#111111]/85 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-2xl pointer-events-none select-none z-20"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                  <span className="font-heading font-bold text-[8px] tracking-widest text-white uppercase">STATUS // ACTIVE</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                  className="absolute top-10 -right-12 hidden md:flex items-center gap-2 bg-[#111111]/85 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-2xl pointer-events-none select-none z-20"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                  <span className="font-heading font-bold text-[8px] tracking-widest text-white uppercase">SYS // OPTIMAL</span>
                </motion.div>

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

          {/* Right Column: Console terminal (hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col items-end gap-4">
            <CyberTerminal />
            <div className="flex flex-col text-right font-mono text-[9px] text-white/40 gap-1.5 mt-2">
              <span>ENGINE: CANVAS_2D</span>
              <span>RENDER PIPELINE: OK</span>
              <span>FRAME RATE: ~60 FPS</span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Bottom Bar: Bio & Action Button & Stats Preview */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between px-6 pb-16 gap-8 z-20"
      >
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
      </motion.div>

      {/* Cyber Scroll-Down indicator */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
      >
        <button
          onClick={handleScrollDown}
          onMouseEnter={playHoverSound}
          className="flex flex-col items-center group focus:outline-none"
        >
          <span className="text-[8px] font-mono tracking-widest text-white/40 group-hover:text-white uppercase transition-colors mb-1.5">
            SCROLL TO DISCOVER // SYSTEM.DOWN
          </span>
          <div className="relative w-[18px] h-[30px] rounded-full border border-white/20 group-hover:border-accent-magenta transition-colors flex justify-center py-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-accent-magenta"
            />
            <div className="absolute inset-[-6px] rounded-full border border-accent-magenta/10 animate-ping pointer-events-none" />
          </div>
        </button>
      </motion.div>

      {/* Decorative gradient line divider at the bottom */}
      <div className="gradient-divider w-full" />
    </section>
  );
};
