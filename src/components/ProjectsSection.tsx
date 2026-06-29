import { useRef, memo, useCallback, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { LiveProjectButton } from './ui/Buttons';
import { projects } from '../data/portfolioData';
import { FadeIn } from './ui/FadeIn';
import { playHoverSound, playClickSound } from '../utils/soundEffects';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  totalCards: number;
  onCardClick: (project: typeof projects[0]) => void;
}

/** Memoized project card with sticky stacking, 3D tilt, and 3D layered parallax depth */
const ProjectCard = memo(({ project, index, totalCards, onCardClick }: ProjectCardProps) => {
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

  return (
    <div
      ref={cardContainerRef}
      className="w-full h-full flex items-center justify-center"
      style={{
        perspective: "1200px" // Enable 3D perspective context
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={playHoverSound}
        onClick={() => onCardClick(project)}
        style={{
          scale,
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d" // Enable 3D depth rendering
        }}
        className="w-full h-full border-2 border-white/10 bg-[#111111]/90 backdrop-blur-md rounded-[30px] sm:rounded-[40px] md:rounded-[50px] p-5 sm:p-7 md:p-10 flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_40px_85px_rgba(182,0,168,0.2)] cursor-pointer relative"
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
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 md:pb-6 select-none relative z-10"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-heading font-black text-4xl sm:text-6xl text-text-primary leading-none">
              {project.num}
            </span>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] sm:text-[10px] text-accent-magenta uppercase tracking-widest font-heading font-bold">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-[8px] bg-accent-magenta/20 text-accent-magenta border border-accent-magenta/30 px-2 py-0.5 rounded-full font-heading font-black tracking-widest uppercase">
                    FEATURED
                  </span>
                )}
              </div>
              <h3 className="font-heading font-bold text-lg sm:text-2xl text-text-primary uppercase tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tech stack Tags inside Card Header */}
            <div className="hidden sm:flex flex-wrap gap-2 mr-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-[8px] sm:text-[9px] font-bold tracking-widest text-text-muted bg-white/5 border border-white/5 px-2 py-0.5 rounded uppercase font-heading">
                  {tag}
                </span>
              ))}
            </div>
            <LiveProjectButton
              label="XEM CHI TIẾT"
              onClick={(e) => {
                e.stopPropagation();
                onCardClick(project);
              }}
            />
          </div>
        </div>

        {/* Image Grid with 3D layers - Parallax Z Layer 2 & 3 */}
        <div
          style={{ transformStyle: "preserve-3d" }}
          className="grid grid-cols-10 gap-3 sm:gap-6 mt-5 md:mt-8 flex-1 items-stretch overflow-hidden relative z-10"
        >
          {/* Left Column (40%) — 2 stacked images (Z: 45px) */}
          <div
            style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
            className="col-span-4 flex flex-col gap-3 sm:gap-6 justify-between h-full"
          >
            <div className="flip-3d w-full flex-1 overflow-hidden rounded-[20px] sm:rounded-[30px] border border-white/5">
              <img
                src={project.images.col1_1}
                alt={`${project.name} Screenshot 1`}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ maxHeight: "clamp(130px, 16vw, 230px)" }}
              />
            </div>
            <div className="flip-3d w-full flex-1 overflow-hidden rounded-[20px] sm:rounded-[30px] border border-white/5">
              <img
                src={project.images.col1_2}
                alt={`${project.name} Screenshot 2`}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ maxHeight: "clamp(160px, 22vw, 340px)" }}
              />
            </div>
          </div>

          <div
            style={{ transform: "translateZ(55px)" }}
            className="flip-3d col-span-6 h-full overflow-hidden rounded-[20px] sm:rounded-[30px] border border-white/5"
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

const FILTERS = ["Tất cả", "Lập trình Web", "Thiết kế UI/UX", "Phát triển Fullstack"];

export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = useCallback((project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleFilterClick = (filter: string) => {
    playClickSound();
    setActiveFilter(filter);
  };

  const filteredProjects = projects.filter(project => {
    if (activeFilter === "Tất cả") return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="relative w-full bg-dark rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-24 pb-32 -mt-10 sm:-mt-12 md:-mt-14 z-20 noise-overlay border-t border-white/5">

      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="ambient-glow-2 opacity-85" />
        <div className="ambient-glow-5 opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col relative z-10">

        <FadeIn y={30} delay={0} duration={0.8} className="text-center mb-10">
          <span className="text-accent-magenta text-xs font-bold tracking-widest uppercase block mb-3 font-heading">
            ✦ Dự án thực tế / Case Studies ✦
          </span>
          <h2 className="font-heading font-black uppercase leading-none tracking-tight text-[3.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] select-none glitch-hover hero-heading">
            DỰ ÁN
          </h2>
        </FadeIn>

        {/* Advanced filter tabs */}
        <FadeIn y={20} delay={0.15} duration={0.8} className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-20">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                onMouseEnter={playHoverSound}
                className={`px-5 py-2.5 rounded-full text-xs font-bold font-heading uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "bg-white/5 text-text-muted border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </FadeIn>

        {/* Filtered stacked projects */}
        <div className="relative w-full flex flex-col gap-24 sm:gap-32 pb-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.num}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[80vh] sm:h-[85vh] w-full flex items-center justify-center sticky"
                  style={{
                    top: `${100 + index * 100}px`,
                    zIndex: 10 + index,
                    marginBottom: `${(filteredProjects.length - 1 - index) * 100}px`,
                    perspective: "1200px"
                  }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    totalCards={filteredProjects.length}
                    onCardClick={handleCardClick}
                  />
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center py-20 border border-white/5 rounded-3xl bg-white/[0.01]">
                <p className="text-sm text-text-muted">Không tìm thấy dự án nào trong danh mục này.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
