import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playBootSound } from '../../utils/soundEffects';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
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
            className="flex-1 flex flex-col justify-center p-6 sm:p-12 md:p-16 relative z-10 w-full h-full pointer-events-auto"
          >

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


          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
