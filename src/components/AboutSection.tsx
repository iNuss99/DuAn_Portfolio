import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FadeIn } from './ui/FadeIn';
import { AnimatedText } from './ui/AnimatedText';
import { ContactButton } from './ui/Buttons';
import { TechCube3D } from './ui/TechCube3D';
import { CyberGame } from './ui/CyberGame';
import { personalInfo, decorative3D } from '../data/portfolioData';
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

export const AboutSection = ({ onOpenContact }: AboutSectionProps) => {
  const [activeTab, setActiveTab] = useState<'orbit' | 'game'>('orbit');

  const switchTab = (tab: 'orbit' | 'game') => {
    if (tab === activeTab) return;
    playClickSound();
    setActiveTab(tab);
  };

  return (
    <section id="about" className="relative w-full min-h-screen bg-dark flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 overflow-hidden z-20">

      {/* Parallax Decorative 3D Images */}
      <FloatingDecor
        src={decorative3D.topLeftMoon}
        alt="Moon Decor"
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none"
        floatClass="float-y"
        speed={-40}
      />
      <FloatingDecor
        src={decorative3D.bottomLeftObject}
        alt="Abstract Object"
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none"
        floatClass="float-rotate"
        speed={-60}
      />
      <FloatingDecor
        src={decorative3D.topRightLego}
        alt="Lego Decor"
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none"
        floatClass="float-y"
        speed={30}
      />
      <FloatingDecor
        src={decorative3D.bottomRightGroup}
        alt="Object Group"
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none"
        floatClass="float-rotate"
        speed={50}
      />

      {/* Centered Contents */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-4xl text-center">
        <FadeIn y={40} delay={0} duration={0.8}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] select-none mb-10 sm:mb-14 md:mb-16 glitch-hover">
            VỀ TÔI
          </h2>
        </FadeIn>

        <AnimatedText
          text={personalInfo.bioLong}
          className="text-text-primary font-medium text-center leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl max-w-[720px] mb-12 sm:mb-16 select-none"
        />

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
            onClick={() => switchTab('game')}
            onMouseEnter={playHoverSound}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
              activeTab === 'game'
                ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                : 'bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            🎮 Game Diệt Bug
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
                  <span className="text-[10px] font-bold text-text-primary/40 uppercase tracking-widest block mb-4 font-sans select-none">
                    📦 Nhấp và kéo chuột để xoay khối hộp công nghệ 3D tự do
                  </span>
                  <TechCube3D />
                </motion.div>
              ) : (
                <motion.div
                  key="game"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  <span className="text-[10px] font-bold text-text-primary/40 uppercase tracking-widest block mb-4 font-sans select-none">
                    🎮 Di chuyển chuột trên màn hình game để bắn hạ Bug
                  </span>
                  <CyberGame />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        <FadeIn y={20} delay={0.1} duration={0.8}>
          <ContactButton onClick={onOpenContact} label="LIÊN HỆ NGAY" />
        </FadeIn>
      </div>
    </section>
  );
};
