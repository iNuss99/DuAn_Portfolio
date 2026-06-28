import React from 'react';
import { playHoverSound, playClickSound } from '../../utils/soundEffects';

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
    <button
      onClick={(e) => {
        playClickSound();
        onClick?.(e);
      }}
      onMouseEnter={playHoverSound}
      className={`rounded-full uppercase font-medium tracking-widest text-white active:scale-95 transition-all duration-200 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid white",
        outlineOffset: "-3px",
      }}
    >
      {label}
    </button>
  );
};

export const LiveProjectButton = ({
  onClick,
  label = "XEM DỰ ÁN",
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={(e) => {
        playClickSound();
        onClick?.(e);
      }}
      onMouseEnter={playHoverSound}
      className={`rounded-full border-2 border-text-primary text-text-primary font-medium uppercase tracking-widest hover:bg-text-primary/10 active:scale-95 transition-all duration-200 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`}
    >
      {label}
    </button>
  );
};
