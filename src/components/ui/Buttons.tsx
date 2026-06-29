import React from 'react';
import { playHoverSound, playClickSound } from '../../utils/soundEffects';
import { motion } from 'framer-motion';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  className?: string;
}

export const ContactButton = ({
  onClick,
  label = "LIÊN HỆ VỚI TÔI",
  className = "",
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={(e) => {
        playClickSound();
        onClick?.(e);
      }}
      onMouseEnter={playHoverSound}
      className={`rounded-full uppercase font-heading font-bold tracking-widest text-white active:scale-95 transition-all duration-200 px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4.5 text-xs sm:text-sm btn-shimmer relative overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(182,0,168,0.3)] hover:shadow-[0_0_30px_rgba(182,0,168,0.5)] ${className}`}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
      }}
    >
      {label}
    </motion.button>
  );
};

export const LiveProjectButton = ({
  onClick,
  label = "XEM DỰ ÁN",
  className = "",
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96 }}
      onClick={(e) => {
        playClickSound();
        onClick?.(e);
      }}
      onMouseEnter={playHoverSound}
      className={`rounded-full border border-text-primary/30 hover:border-accent-magenta text-text-primary hover:text-white font-heading font-bold uppercase tracking-widest bg-white/5 hover:bg-accent-magenta/10 transition-all duration-200 px-6 py-2.5 sm:px-8 sm:py-3 text-[10px] sm:text-xs ${className}`}
    >
      {label}
    </motion.button>
  );
};
