import { useEffect, useRef } from 'react';

/**
 * Premium, high-end tech portfolio background (similar to Vercel/Linear).
 * Combines:
 * 1. A repeating grid layout and dot matrix.
 * 2. Interactive mouse spotlight (the grid lines and dots light up around the cursor).
 * 3. Drifting mesh gradient glows.
 * 4. Technical sci-fi ornaments (+ signs, corner lines) scattered along the layout borders.
 */
export const CyberBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg || 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse coordinates relative to the screen/viewport
      // and set custom CSS properties for the grid hover spotlight
      const rect = bg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      bg.style.setProperty('--bg-mouse-x', `${x}px`);
      bg.style.setProperty('--bg-mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 w-full h-full min-h-screen overflow-hidden pointer-events-none z-0 bg-[#070707]"
      style={{
        // Default cursor variables
        ['--bg-mouse-x' as any]: '-9999px',
        ['--bg-mouse-y' as any]: '-9999px',
      }}
    >
      {/* 1. Repeating Fine Dot Matrix Background */}
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(rgba(255,255,255,0.45)_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* 2. repeating Tech Grid Lines */}
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* 3. Interactive Neon Grid Spotlight (lights up Vercel-style around cursor) */}
      <div 
        className="absolute inset-0 opacity-100 hidden md:block"
        style={{
          background: `radial-gradient(
            350px circle at var(--bg-mouse-x) var(--bg-mouse-y),
            rgba(255, 0, 85, 0.12) 0%,
            rgba(238, 15, 15, 0.06) 50%,
            transparent 100%
          )`,
        }}
      />
      <div 
        className="absolute inset-0 opacity-100 hidden md:block"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 0, 85, 0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 85, 0.16) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: `radial-gradient(280px circle at var(--bg-mouse-x) var(--bg-mouse-y), black 20%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(280px circle at var(--bg-mouse-x) var(--bg-mouse-y), black 20%, transparent 100%)`,
        }}
      />

      {/* 4. Drifting Mesh Gradient Blobs (Upgraded Premium Color Scheme) */}
      <div className="absolute inset-0 opacity-60">
        {/* Deep Vivid Red Glow Top Left */}
        <div 
          className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full filter blur-[150px] animate-mesh-drift-1"
          style={{ background: 'radial-gradient(circle, rgba(238, 15, 15, 0.22) 0%, transparent 70%)' }}
        />
        
        {/* Neon Pink/Red Glow Mid Right */}
        <div 
          className="absolute top-[35%] right-[-10%] w-[55vw] h-[55vw] rounded-full filter blur-[160px] animate-mesh-drift-2"
          style={{ background: 'radial-gradient(circle, rgba(255, 0, 85, 0.18) 0%, transparent 75%)' }}
        />

        {/* Coral Orange Glow Bottom Left */}
        <div 
          className="absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[140px] animate-mesh-drift-3"
          style={{ background: 'radial-gradient(circle, rgba(255, 77, 0, 0.15) 0%, transparent 70%)' }}
        />

        {/* Rose Accent Glow Mid Left */}
        <div 
          className="absolute top-[15%] left-[20%] w-[45vw] h-[45vw] rounded-full filter blur-[130px] animate-mesh-drift-4"
          style={{ background: 'radial-gradient(circle, rgba(225, 29, 72, 0.15) 0%, transparent 70%)' }}
        />

        {/* Neon Rose Glow Bottom Right */}
        <div 
          className="absolute bottom-[-5%] right-[10%] w-[50vw] h-[50vw] rounded-full filter blur-[150px] animate-mesh-drift-5"
          style={{ background: 'radial-gradient(circle, rgba(255, 0, 85, 0.12) 0%, transparent 70%)' }}
        />
      </div>

      {/* 5. Sci-Fi HUD Ornaments (Subtle '+' markers and details) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
        {/* Top-left area */}
        <div className="absolute top-[12vh] left-[6%] font-mono text-[9px] text-white/40 tracking-widest flex items-center gap-1.5 animate-pulse duration-[4s]">
          <span>+</span>
          <span>SYS.GRID.01</span>
        </div>
        
        {/* Mid-left area */}
        <div className="absolute top-[48vh] left-[4%] text-white/35 font-mono text-sm leading-none select-none">
          +
        </div>

        {/* Bottom-left area */}
        <div className="absolute bottom-[25vh] left-[5%] text-white/35 font-mono text-sm leading-none select-none animate-ping duration-[6s]">
          +
        </div>

        {/* Top-right area */}
        <div className="absolute top-[28vh] right-[6%] text-white/35 font-mono text-sm leading-none select-none">
          +
        </div>
        
        {/* Mid-right area */}
        <div className="absolute top-[68vh] right-[4%] font-mono text-[9px] text-white/40 tracking-widest flex items-center gap-1.5 animate-pulse duration-[5s]">
          <span>COORD: 109.84 // 12.30</span>
          <span>+</span>
        </div>

        {/* Bottom-right area */}
        <div className="absolute bottom-[18vh] right-[8%] text-white/35 font-mono text-sm leading-none select-none">
          +
        </div>

        {/* Glowing vertical neon rules along screen borders */}
        <div className="absolute top-[10vh] bottom-[10vh] left-2 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-[10vh] bottom-[10vh] right-2 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
};
