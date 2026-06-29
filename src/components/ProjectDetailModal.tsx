import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound, playHoverSound } from '../utils/soundEffects';
import * as Icons from 'lucide-react';

interface Project {
  num: string;
  category: string;
  name: string;
  liveUrl: string;
  githubUrl?: string;
  tags: string[];
  featured: boolean;
  longDesc: string;
  challenge: string;
  solution: string;
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
}

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          {/* Main Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-4xl bg-[#0f0f0f]/90 border border-white/10 rounded-[2.5rem] p-6 md:p-10 text-white relative my-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top neon ambient line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-magenta via-accent-purple to-accent-orange" />

            {/* Close button */}
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              onMouseEnter={playHoverSound}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all z-20"
            >
              <Icons.X size={18} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mt-4">
              {/* Left Column: Images (col-5) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* Main image */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
                  <img
                    src={project.images.col2}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Sub screenshots */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-white/5">
                    <img
                      src={project.images.col1_1}
                      alt={`${project.name} screenshot 1`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-white/5">
                    <img
                      src={project.images.col1_2}
                      alt={`${project.name} screenshot 2`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Metadata & Detailed Info (col-7) */}
              <div className="lg:col-span-7 flex flex-col justify-between text-left">
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-accent-magenta uppercase tracking-widest font-heading">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[8px] bg-accent-magenta/20 text-accent-magenta border border-accent-magenta/30 px-2 py-0.5 rounded-full font-heading font-black tracking-widest uppercase">
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-4">
                    {project.name}
                  </h2>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-white/10 mb-5" />

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-heading mb-1.5">
                      Tổng quan dự án / Overview
                    </h4>
                    <p className="text-sm text-text-muted leading-relaxed font-body">
                      {project.longDesc}
                    </p>
                  </div>

                  {/* Challenge & Solution Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left">
                      <div className="flex items-center gap-2 mb-2 text-accent-orange">
                        <Icons.AlertTriangle size={14} />
                        <h5 className="text-[10px] font-bold uppercase tracking-widest font-heading">Thách thức</h5>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed font-body">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left">
                      <div className="flex items-center gap-2 mb-2 text-green-400">
                        <Icons.CheckCircle size={14} />
                        <h5 className="text-[10px] font-bold uppercase tracking-widest font-heading">Giải pháp</h5>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed font-body">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="mb-8">
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-heading mb-3">
                      Công nghệ sử dụng / Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold tracking-widest text-text-primary bg-white/5 border border-white/10 px-3 py-1 rounded-md font-heading uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-wrap items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="flex-1 min-w-[140px] text-center bg-white text-black hover:bg-white/90 active:scale-95 transition-all text-xs font-bold font-heading uppercase py-3.5 px-6 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Icons.ExternalLink size={14} />
                    <span>Xem trực tiếp</span>
                  </a>

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="flex-1 min-w-[140px] text-center bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all text-xs font-bold font-heading uppercase py-3.5 px-6 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Icons.Github size={14} />
                      <span>Xem mã nguồn</span>
                    </a>
                  ) : (
                    <span className="flex-1 min-w-[140px] text-center bg-white/5 border border-white/5 text-white/30 text-xs font-bold font-heading uppercase py-3.5 px-6 rounded-xl cursor-not-allowed select-none">
                      Private Repository
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
