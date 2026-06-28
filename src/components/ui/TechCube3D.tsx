import { useEffect, useRef, useState, useCallback } from 'react';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

interface CubeFace {
  title: string;
  items: string[];
  gradient: string;
  glow: string;
}

const CUBE_FACES: CubeFace[] = [
  {
    title: "⚡ FRONTEND",
    items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    gradient: "from-[#3178C6]/20 to-[#61DAFB]/20",
    glow: "rgba(97, 218, 251, 0.3)"
  },
  {
    title: "🟢 BACKEND",
    items: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth"],
    gradient: "from-[#339933]/20 to-[#3178C6]/20",
    glow: "rgba(51, 153, 51, 0.3)"
  },
  {
    title: "💾 DATABASE",
    items: ["MongoDB", "SQL Server", "Google Sheets", "Local Storage"],
    gradient: "from-[#BE4C00]/20 to-[#FFA500]/20",
    glow: "rgba(254, 76, 0, 0.3)"
  },
  {
    title: "🎨 UI/UX DESIGN",
    items: ["Figma Mockups", "Wireframing", "Holograms", "Prototyping"],
    gradient: "from-[#B600A8]/20 to-[#7621B0]/20",
    glow: "rgba(182, 0, 168, 0.3)"
  },
  {
    title: "📁 VERSION",
    items: ["Git Versioning", "GitHub Repos", "Vercel Deploy", "Netlify Hosting"],
    gradient: "from-red-600/20 to-orange-500/20",
    glow: "rgba(239, 68, 68, 0.3)"
  },
  {
    title: "🛠️ DEV TOOLS",
    items: ["Vite Bundler", "npm / npx", "Chrome DevTools", "TypeScript compiler"],
    gradient: "from-slate-600/20 to-slate-400/20",
    glow: "rgba(255, 255, 255, 0.2)"
  }
];

export const TechCube3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(45);
  const [isDragging, setIsDragging] = useState(false);

  const startMouseRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const animFrameId = useRef<number>(0);

  // Auto-rotation when idle
  useEffect(() => {
    if (isDragging) return;

    const autoRotate = () => {
      setRotX((prev) => (prev + 0.12) % 360);
      setRotY((prev) => (prev + 0.16) % 360);
      animFrameId.current = requestAnimationFrame(autoRotate);
    };

    animFrameId.current = requestAnimationFrame(autoRotate);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    playClickSound();
    startMouseRef.current = { x: e.clientX, y: e.clientY };
    startRotRef.current = { x: rotX, y: rotY };
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startMouseRef.current.x;
    const deltaY = e.clientY - startMouseRef.current.y;

    // Convert mouse movement to degrees (dampened)
    const factor = 0.45;
    setRotX(startRotRef.current.x - deltaY * factor);
    setRotY(startRotRef.current.y + deltaX * factor);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Set up global listeners during dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseEnter={playHoverSound}
      className="w-full h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Cube Wrapper */}
      <div
        className="w-[200px] h-[200px] relative transition-transform duration-75"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`
        }}
      >
        {CUBE_FACES.map((face, index) => {
          // Calculate rotate style based on face index
          let transformStyle = "";
          switch (index) {
            case 0: transformStyle = "rotateY(0deg) translateZ(100px)"; break; // Front
            case 1: transformStyle = "rotateY(180deg) translateZ(100px)"; break; // Back
            case 2: transformStyle = "rotateY(-90deg) translateZ(100px)"; break; // Left
            case 3: transformStyle = "rotateY(90deg) translateZ(100px)"; break; // Right
            case 4: transformStyle = "rotateX(90deg) translateZ(100px)"; break; // Top
            case 5: transformStyle = "rotateX(-90deg) translateZ(100px)"; break; // Bottom
          }

          return (
            <div
              key={index}
              className={`absolute w-[200px] h-[200px] border border-white/10 bg-[#0C0C0C]/90 backdrop-blur-md rounded-2xl flex flex-col justify-between p-4 shadow-2xl transition-all duration-300 hover:border-white/30`}
              style={{
                transform: transformStyle,
                backfaceVisibility: "visible",
                boxShadow: `inset 0 0 25px ${face.glow}`
              }}
            >
              {/* Face Title */}
              <div className="text-[11px] font-bold tracking-widest text-[#D7E2EA] border-b border-white/5 pb-1.5 text-center uppercase font-mono">
                {face.title}
              </div>

              {/* Items List */}
              <div className="flex-1 flex flex-col justify-center gap-1.5 py-2">
                {face.items.map((item, i) => (
                  <div key={i} className="text-[10px] text-white/70 font-semibold font-sans text-center">
                    {item}
                  </div>
                ))}
              </div>

              {/* Holographic grid indicator at bottom */}
              <div className="text-[8px] font-bold text-white/30 text-center font-mono">
                KHOA-IT OS
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
