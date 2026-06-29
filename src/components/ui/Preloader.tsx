import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playBootSound } from '../../utils/soundEffects';

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "SYSTEM: INITIALIZING KHOA-IT OS V5.0...",
  "CORE: LOADING GRAPHICAL SHELL & SHADERS...",
  "SECURITY: SECURING WORKSPACE API ACCESS...",
  "API: ESTABLISHING GOOGLE SHEETS CONNECTION...",
  "DATABASE: PARSING PORTFOLIO DATA STRUCTURES...",
  "GRAPHICS: SYNCHRONIZING INTERACTIVE 3D CANVAS...",
  "UI: STABILIZING FRAME RATE PIPELINE...",
  "OS: DEPLOYING USER INTERFACE OBJECTS...",
  "SYSTEM: BOOT SEQUENCE SUCCESSFUL [OK]"
];

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Sequence logic: count progress and push logs dynamically
    let progressTimer: any;
    const duration = 2400; // 2.4 seconds total boot time
    const interval = 20; // update frequency
    const steps = duration / interval;
    let currentStep = 0;

    const updateProgress = () => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      // Determine which logs to show based on progress percentage
      const logIndex = Math.floor((nextProgress / 100) * BOOT_LOGS.length);
      const currentLogsToShow = BOOT_LOGS.slice(0, Math.max(1, logIndex));
      setLogs(currentLogsToShow);

      if (nextProgress < 100) {
        progressTimer = setTimeout(updateProgress, interval);
      } else {
        // Boot completed
        // Play the boot sound chime
        playBootSound();
        // Wait a bit to let the user see "100%" and hear the chime, then exit
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    };

    progressTimer = setTimeout(updateProgress, interval);

    return () => {
      clearTimeout(progressTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -100,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] bg-[#070707] flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none font-mono text-white overflow-hidden"
    >
      {/* Background Matrix/Grid lines effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* Radial overlay glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]" />

      {/* Header Info */}
      <div className="flex justify-between items-start text-[10px] sm:text-xs text-white/40 relative z-10">
        <div className="flex flex-col gap-1 text-left">
          <span>HOST: KHOA.PORTFOLIO</span>
          <span>LOCATION: VIETNAM</span>
          <span>STATUS: ONLINE</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span>PORT: 8080</span>
          <span>RESOLUTION: {typeof window !== 'undefined' ? `${window.innerWidth}X${window.innerHeight}` : '1920X1080'}</span>
          <span>DATE: {new Date().toLocaleDateString('vi-VN')}</span>
        </div>
      </div>

      {/* Center Hologram Ring & Percentage */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 gap-6 my-10">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
          {/* Outer rotating HUD circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-accent-magenta/30"
          />

          {/* Inner counter-rotating HUD circle */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-accent-purple/20 border-t-accent-magenta/60 border-b-accent-purple/60"
          />

          {/* Core glow */}
          <div className="absolute inset-6 rounded-full bg-accent-magenta/5 filter blur-md" />

          {/* Percentage text */}
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white glow-text">
              {progress.toString().padStart(3, '0')}
              <span className="text-xs sm:text-sm text-accent-magenta">%</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-white/50 mt-1 font-bold">
              BOOTING OS
            </span>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h2 className="font-heading font-black tracking-[0.3em] text-sm sm:text-base text-white/90 uppercase">
            KHOA<span className="text-accent-magenta animate-pulse">.</span>DEVELOPER
          </h2>
        </div>
      </div>

      {/* Footer System Console Logs */}
      <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a]/80 border border-white/5 rounded-xl p-4 md:p-5 relative z-10 text-left min-h-[140px] sm:min-h-[160px] flex flex-col gap-1.5 justify-end">
        {/* Terminal Header */}
        <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2 text-[9px] uppercase text-white/35 font-bold tracking-widest">
          <span className="w-2 h-2 rounded-full bg-red-500/60" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <span className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="ml-2 font-mono">SYSTEM BOOT CONSOLE</span>
        </div>

        {/* Scrollable Logs list */}
        <div className="flex-1 flex flex-col gap-1 text-[10px] sm:text-xs overflow-y-auto custom-scrollbar font-mono text-white/70 select-text pr-2">
          <AnimatePresence>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`leading-relaxed ${
                  idx === logs.length - 1 
                    ? log.includes("SUCCESSFUL") || log.includes("[OK]") 
                      ? "text-green-400 font-bold" 
                      : "text-accent-magenta" 
                    : "text-white/60"
                }`}
              >
                <span className="text-white/30 mr-2">[{((idx * 0.28).toFixed(2))}s]</span>
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5 border border-white/10 rounded-full overflow-hidden mt-3">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-purple via-accent-magenta to-accent-orange rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
      
      {/* Glitch Overlay Styling (defined in index.css) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(182,0,168,0.03)_0%,transparent_70%)]" />
    </motion.div>
  );
};
