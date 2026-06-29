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
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let progressTimer: any;
    const duration = 2400; // 2.4 seconds total boot time
    const interval = 20; // update frequency
    const steps = duration / interval;
    let currentStep = 0;

    const updateProgress = () => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      const logIndex = Math.floor((nextProgress / 100) * BOOT_LOGS.length);
      const currentLogsToShow = BOOT_LOGS.slice(0, Math.max(1, logIndex));
      setLogs(currentLogsToShow);

      if (nextProgress < 100) {
        progressTimer = setTimeout(updateProgress, interval);
      } else {
        // Boot completed
        playBootSound();
        setIsDone(true);
        setTimeout(() => {
          onComplete();
        }, 1000); // Give time for curtain transition
      }
    };

    progressTimer = setTimeout(updateProgress, interval);

    return () => {
      clearTimeout(progressTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden select-none font-mono text-white flex flex-col justify-between pointer-events-none">
      
      {/* 1. TOP CURTAIN PANEL */}
      <motion.div 
        initial={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="absolute top-0 left-0 right-0 h-[50vh] bg-[#070707] border-b border-white/5 pointer-events-auto"
      >
        {/* Background Grid Lines (Top half) */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        {/* Diagnostics (Top Left & Right) */}
        <div className="absolute top-6 sm:top-12 left-6 sm:left-12 text-[9px] text-white/30 text-left">
          <div>HOST: KHOA.PORTFOLIO</div>
          <div>LOC: VIETNAM // CORE</div>
          <div>STATUS: BOOTING</div>
        </div>
        <div className="absolute top-6 sm:top-12 right-6 sm:right-12 text-[9px] text-white/30 text-right">
          <div>PORT: 8080</div>
          <div>DEV: ACTIVE</div>
          <div>{new Date().toLocaleDateString('vi-VN')}</div>
        </div>
      </motion.div>

      {/* 2. BOTTOM CURTAIN PANEL */}
      <motion.div 
        initial={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[#070707] border-t border-white/5 pointer-events-auto"
      >
        {/* Background Grid Lines (Bottom half) */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </motion.div>

      {/* 3. CENTER CONTENT (Fades out when done) */}
      <AnimatePresence>
        {!isDone && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex-1 flex flex-col justify-between p-6 sm:p-12 md:p-16 relative z-10 w-full h-full pointer-events-auto"
          >
            {/* Filler space for alignment */}
            <div className="h-10" />

            {/* Center Cinematic Title & Progress */}
            <div className="flex flex-col items-center justify-center relative">
              {/* Soft Red Ambient Radial Glow */}
              <div className="absolute w-[300px] h-[300px] rounded-full bg-[#FF0055]/5 filter blur-[80px] -z-10 animate-pulse duration-[3s]" />
              
              {/* Large low-opacity counting watermark */}
              <div className="absolute text-[12vw] font-black text-white/[0.01] tracking-widest select-none pointer-events-none select-none font-mono leading-none z-0">
                {progress.toString().padStart(3, '0')}
              </div>

              {/* Cinematic expandable title */}
              <motion.h1 
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.5em", opacity: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-black text-xl sm:text-2xl md:text-3xl tracking-[0.5em] text-white/90 uppercase text-center relative z-10 pl-[0.5em]"
              >
                MINH KHOA
              </motion.h1>

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#FF0055] font-bold mt-2 z-10">
                SYSTEM INITIALIZING
              </span>

              {/* Minimalist Horizontal Progress Line */}
              <div className="w-[180px] sm:w-[240px] h-[1.5px] bg-white/5 rounded-full overflow-hidden mt-6 relative z-10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#EE0F0F] via-[#FF0055] to-[#FF4D00] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                />
              </div>

              {/* Mini electronic progress number */}
              <div className="text-[10px] text-white/40 mt-3 font-mono">
                [ {progress.toString().padStart(3, '0')}% ]
              </div>
            </div>

            {/* Bottom System Console Logs */}
            <div className="w-full max-w-xl mx-auto bg-[#0a0a0a]/30 border border-white/5 rounded-2xl p-4 md:p-5 text-left h-[100px] sm:h-[120px] flex flex-col gap-1 relative z-10">
              <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2 text-[8px] uppercase text-white/20 font-bold tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EE0F0F] animate-pulse" />
                <span className="font-mono">SYS.BOOT // LOG_STREAM</span>
              </div>

              <div className="flex-1 flex flex-col gap-0.5 text-[9px] overflow-y-auto custom-scrollbar font-mono text-white/40 select-text pr-2 leading-relaxed">
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                    className={
                      idx === logs.length - 1 
                        ? log.includes("SUCCESSFUL") || log.includes("[OK]") 
                          ? "text-green-400 font-bold" 
                          : "text-[#FF0055]" 
                        : "text-white/40"
                    }
                  >
                    <span className="text-white/20 mr-1.5">[{((idx * 0.28).toFixed(2))}s]</span>
                    {log}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
