import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { playClickSound, playHoverSound, toggleMute, getMuteStatus } from '../../utils/soundEffects';

interface DockIconProps {
  mouseX: any;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}

const DockIcon = ({ mouseX, label, onClick, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Compute distance from mouse pointer to the center of the icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Map distance to width and height transformations (magnification range: 44px to 72px)
  const widthTransform = useTransform(distance, [-150, 0, 150], [44, 72, 44]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [44, 72, 44]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 200, damping: 15 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <div
      ref={ref}
      onMouseMove={() => mouseX.set(mouseX.get())}
      onMouseEnter={() => {
        setHovered(true);
        playHoverSound();
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        playClickSound();
        onClick();
      }}
      className="relative flex items-center justify-center cursor-pointer"
    >
      <motion.div
        style={{ width, height }}
        className="rounded-full bg-white/5 border border-white/10 hover:bg-white/15 active:scale-90 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-150 relative shadow-lg"
      >
        {children}

        {/* Hover label tooltip */}
        {hovered && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase font-bold text-white whitespace-nowrap shadow-xl">
            {label}
          </div>
        )}
      </motion.div>
    </div>
  );
};

interface CyberDockProps {
  onOpenContact: () => void;
}

export const CyberDock = ({ onOpenContact }: CyberDockProps) => {
  const mouseX = useMotionValue(Infinity);
  const [isMuted, setIsMuted] = useState(getMuteStatus());

  const handleScrollTo = (id: string) => {
    const el = id === "hero" ? document.querySelector('section') : document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const nextMuted = toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      className="fixed bottom-6 left-1/2 z-40 flex items-end gap-3 px-4 py-3 rounded-3xl bg-[#141414]/30 border border-white/5 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.6)] select-none pointer-events-auto"
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {/* Home / Hero */}
      <DockIcon mouseX={mouseX} label="ĐẦU TRANG" onClick={() => handleScrollTo("hero")}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </DockIcon>

      {/* About */}
      <DockIcon mouseX={mouseX} label="GIỚI THIỆU" onClick={() => handleScrollTo("about")}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </DockIcon>

      {/* Services */}
      <DockIcon mouseX={mouseX} label="DỊCH VỤ" onClick={() => handleScrollTo("services")}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </DockIcon>

      {/* Projects */}
      <DockIcon mouseX={mouseX} label="DỰ ÁN" onClick={() => handleScrollTo("projects")}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </DockIcon>

      {/* Contact Form */}
      <DockIcon mouseX={mouseX} label="LIÊN HỆ" onClick={onOpenContact}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </DockIcon>

      {/* Sound Toggle (Separated inside the dock) */}
      <div className="w-[1px] h-8 bg-white/10 self-center mx-1" />

      <DockIcon mouseX={mouseX} label={isMuted ? "BẬT MUTE" : "TẮT MUTE"} onClick={handleToggleSound}>
        {isMuted ? (
          <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.724a1 1 0 01-1.707.707L5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v13.724z" />
          </svg>
        )}
      </DockIcon>
    </motion.div>
  );
};
