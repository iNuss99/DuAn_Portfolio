import { useRef, memo, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { LiveProjectButton } from './ui/Buttons';
import { projects } from '../data/portfolioData';
import { FadeIn } from './ui/FadeIn';
import { playHoverSound } from '../utils/soundEffects';

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  totalCards: number;
}

/** Memoized project card with sticky stacking, 3D tilt, and 3D layered parallax depth */
const ProjectCard = memo(({ project, index, totalCards }: ProjectCardProps) => {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ["start start", "end start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Spring values for smooth 3D tilt animation
  const tiltX = useSpring(0, { stiffness: 120, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 120, damping: 18 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxTilt = 6; // Maximum tilt angle in degrees
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    tiltX.set(rotateX);
    tiltY.set(rotateY);

    // Update CSS custom variables for neon glowing border sweep
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${percentX}%`);
    card.style.setProperty('--mouse-y', `${percentY}%`);
  }, [tiltX, tiltY]);

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  // Stack cards with an offset equal to the header height to show them as stacked tabs
  const topOffset = 80 + index * 120;
  // Offset the bottom boundary of each card so they don't collapse on top of each other at the bottom of the container
  const marginBottom = (totalCards - 1 - index) * 120;

  return (
    <div
      ref={cardContainerRef}
      className="h-[80vh] sm:h-[85vh] w-full flex items-center justify-center sticky"
      style={{
        top: `${topOffset}px`,
        zIndex: 10 + index,
        marginBottom: `${marginBottom}px`,
        perspective: "1200px" // Enable 3D perspective context
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={playHoverSound}
        onClick={() => window.open(project.liveUrl, '_blank')}
        style={{
          scale,
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d" // Enable 3D depth rendering
        }}
        className="w-full h-full border-2 border-text-primary/20 bg-[#0C0C0C] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] lg:rounded-[60px] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_40px_85px_rgba(118,33,176,0.25)] relative cursor-pointer"
      >
        {/* Neon border highlight sweep */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(182, 0, 168, 0.15), transparent 40%)`
          }}
        />

        {/* Top Row (Header) - Parallax Z Layer 1 */}
        <div
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-text-primary/15 pb-4 md:pb-6 select-none relative z-10"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-3xl sm:text-5xl md:text-6xl text-text-primary leading-none">
              {project.num}
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[9px] sm:text-[10px] text-text-primary/60 uppercase tracking-widest">
                {project.category}
              </span>
              <h3 className="font-semibold text-base sm:text-lg md:text-xl text-text-primary uppercase tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton
            label="XEM DỰ ÁN"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.liveUrl, '_blank');
            }}
          />
        </div>

        {/* Image Grid with 3D layers - Parallax Z Layer 2 & 3 */}
        <div
          style={{ transformStyle: "preserve-3d" }}
          className="grid grid-cols-10 gap-3 sm:gap-6 mt-4 md:mt-6 flex-1 items-stretch overflow-hidden relative z-10"
        >
          {/* Left Column (40%) — 2 stacked images (Z: 45px) */}
          <div
            style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
            className="col-span-4 flex flex-col gap-3 sm:gap-6 justify-between h-full"
          >
            <div className="flip-3d w-full flex-1 overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
              <img
                src={project.images.col1_1}
                alt={`${project.name} Screenshot 1`}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ maxHeight: "clamp(130px, 16vw, 230px)" }}
              />
            </div>
            <div className="flip-3d w-full flex-1 overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px]">
              <img
                src={project.images.col1_2}
                alt={`${project.name} Screenshot 2`}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ maxHeight: "clamp(160px, 22vw, 340px)" }}
              />
            </div>
          </div>

          {/* Right Column (60%) — 1 tall image (Z: 55px) */}
          <div
            style={{ transform: "translateZ(55px)" }}
            className="flip-3d col-span-6 h-full overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px]"
          >
            <img
              src={project.images.col2}
              alt={`${project.name} Showcase`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export const ProjectsSection = () => {
  return (
    <section id="projects" className="relative w-full bg-dark rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 pb-28 -mt-10 sm:-mt-12 md:-mt-14 z-20">
      <div className="max-w-5xl mx-auto flex flex-col">

        {/* Section Heading */}
        <FadeIn y={30} delay={0} duration={0.8} className="text-center mb-12 sm:mb-16">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[3rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] select-none glitch-hover">
            DỰ ÁN
          </h2>
        </FadeIn>

        {/* Stacking Cards */}
        <div className="relative w-full flex flex-col gap-24 sm:gap-32 pb-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.num}
              project={project}
              index={index}
              totalCards={projects.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
