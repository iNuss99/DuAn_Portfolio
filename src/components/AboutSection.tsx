import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FadeIn } from './ui/FadeIn';
import { AnimatedText } from './ui/AnimatedText';
import { ContactButton } from './ui/Buttons';
import { TechCube3D } from './ui/TechCube3D';
import { ParticleSphere3D } from './ui/ParticleSphere3D';
import { personalInfo, decorative3D, skills, timeline } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

interface AboutSectionProps {
  onOpenContact: () => void;
}

/** Parallax floating 3D decorative object */
const FloatingDecor = ({
  src, alt, className, floatClass, speed,
}: {
  src: string;
  alt: string;
  className: string;
  floatClass: string;
  speed: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      <FadeIn x={speed > 0 ? 80 : -80} y={0} delay={0.15} duration={0.9}>
        <img src={src} alt={alt} className={`w-full h-auto ${floatClass}`} />
      </FadeIn>
    </motion.div>
  );
};

// Skill bar component with animated entrance
const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(level);
    }, 300 + index * 100);
    return () => clearTimeout(timer);
  }, [level, index]);

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <div className="flex justify-between text-xs sm:text-sm font-semibold">
        <span className="text-text-primary tracking-wide">{name}</span>
        <span className="text-accent-magenta font-mono">{width}%</span>
      </div>
      <div className="w-full h-2 bg-white/5 border border-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-purple via-accent-magenta to-accent-orange rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

export const AboutSection = ({ onOpenContact }: AboutSectionProps) => {
  const [activeTab, setActiveTab] = useState<'orbit' | 'sphere'>('orbit');

  const switchTab = (tab: 'orbit' | 'sphere') => {
    if (tab === activeTab) return;
    playClickSound();
    setActiveTab(tab);
  };

  return (
    <section id="about" className="relative w-full min-h-screen bg-dark flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 overflow-hidden z-20 noise-overlay">
      
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="ambient-glow-3" />
        <div className="ambient-glow-4" />
      </div>

      {/* Parallax Decorative 3D Images */}
      <FloatingDecor
        src={decorative3D.topLeftMoon}
        alt="Moon Decor"
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 w-[100px] sm:w-[130px] md:w-[180px] pointer-events-none select-none"
        floatClass="float-y"
        speed={-30}
      />
      <FloatingDecor
        src={decorative3D.bottomLeftObject}
        alt="Abstract Object"
        className="absolute bottom-[6%] left-[2%] sm:left-[4%] md:left-[8%] z-10 w-[80px] sm:w-[110px] md:w-[140px] pointer-events-none select-none"
        floatClass="float-rotate"
        speed={-50}
      />
      <FloatingDecor
        src={decorative3D.topRightLego}
        alt="Lego Decor"
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 w-[100px] sm:w-[130px] md:w-[180px] pointer-events-none select-none"
        floatClass="float-y"
        speed={25}
      />
      <FloatingDecor
        src={decorative3D.bottomRightGroup}
        alt="Object Group"
        className="absolute bottom-[6%] right-[2%] sm:right-[4%] md:right-[8%] z-10 w-[110px] sm:w-[140px] md:w-[180px] pointer-events-none select-none"
        floatClass="float-rotate"
        speed={40}
      />

      {/* Centered Contents */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-5xl text-center">
        
        {/* Title */}
        <FadeIn y={40} delay={0} duration={0.8}>
          <span className="text-accent-magenta text-xs font-bold tracking-widest uppercase block mb-3 font-heading">
            ✦ Khám phá bản thân / Get to know me ✦
          </span>
          <h2 className="font-heading font-black uppercase leading-none tracking-tight text-center text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] select-none mb-14 sm:mb-20 glitch-hover hero-heading">
            VỀ TÔI
          </h2>
        </FadeIn>

        {/* 2-Column Bio + Skills layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 w-full mb-20 text-left items-start">
          
          {/* Column 1: Main narrative text */}
          <div className="flex flex-col gap-6">
            <FadeIn y={20} delay={0.1} duration={0.8}>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary tracking-wide uppercase border-l-2 border-accent-magenta pl-4 mb-2">
                Hành trình & Đam mê
              </h3>
            </FadeIn>
            <AnimatedText
              text={personalInfo.bioLong}
              className="text-text-muted font-body font-normal leading-relaxed text-sm sm:text-base md:text-lg max-w-[480px]"
            />
          </div>

          {/* Column 2: Tech Skills & Performance bars */}
          <div className="flex flex-col gap-5 w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <FadeIn y={20} delay={0.15} duration={0.8}>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary tracking-wide uppercase border-l-2 border-accent-purple pl-4 mb-2">
                Kỹ năng chuyên môn
              </h3>
            </FadeIn>
            
            <div className="flex flex-col gap-5 w-full">
              {skills.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline / Journey Section */}
        <div className="w-full mb-20 text-left">
          <FadeIn y={20} delay={0.2} duration={0.8}>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary tracking-wide uppercase border-l-2 border-accent-orange pl-4 mb-10">
              Lịch sử & Cột mốc
            </h3>
          </FadeIn>

          <div className="relative border-l border-white/10 ml-4 md:ml-6 flex flex-col gap-10">
            {timeline.map((item, index) => (
              <FadeIn key={index} y={20} delay={index * 0.15} duration={0.8} className="relative pl-8 sm:pl-10">
                {/* Dot indicator */}
                <div className="absolute left-0 top-1.5 -translate-x-[9px] w-4.5 h-4.5 rounded-full border border-accent-orange bg-dark flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-1.5 max-w-3xl">
                  <span className="font-heading text-xs font-bold tracking-widest text-accent-orange uppercase">
                    {item.year}
                  </span>
                  <h4 className="font-heading text-base sm:text-lg font-bold text-text-primary uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-text-muted font-body text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Tab Selection Header */}
        <FadeIn y={20} delay={0.1} duration={0.8} className="flex gap-4 mb-6 z-30 relative select-none">
          <button
            onClick={() => switchTab('orbit')}
            onMouseEnter={playHoverSound}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
              activeTab === 'orbit'
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                : 'bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            📦 Hộp công nghệ 3D
          </button>
          <button
            onClick={() => switchTab('sphere')}
            onMouseEnter={playHoverSound}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
              activeTab === 'sphere'
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                : 'bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            🔮 Quả cầu số 3D
          </button>
        </FadeIn>

        {/* Tab Panel Content */}
        <FadeIn y={30} delay={0.2} duration={0.8} className="w-full mb-12 sm:mb-16 overflow-hidden">
          <div className="w-full bg-[#141414]/25 border border-white/5 backdrop-blur-sm rounded-[2rem] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[380px] flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {activeTab === 'orbit' ? (
                <motion.div
                  key="orbit"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <span className="text-[10px] font-bold text-text-primary/40 uppercase tracking-widest block mb-4 font-heading select-none">
                    📦 Nhấp và kéo chuột để xoay khối hộp công nghệ 3D tự do
                  </span>
                  <TechCube3D />
                </motion.div>
              ) : (
                <motion.div
                  key="sphere"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <span className="text-[10px] font-bold text-text-primary/40 uppercase tracking-widest block mb-4 font-heading select-none">
                    🔮 Nhấp và kéo chuột để xoay quả cầu hạt 3D tự do (rê chuột tương tác)
                  </span>
                  <ParticleSphere3D />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        <FadeIn y={20} delay={0.1} duration={0.8}>
          <ContactButton onClick={onOpenContact} label="LIÊN HỆ NGAY" className="btn-shimmer" />
        </FadeIn>
      </div>
    </section>
  );
};
