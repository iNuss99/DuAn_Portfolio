import { useEffect, useRef, useCallback } from 'react';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  color: string;
  glowColor: string;
  hovered: boolean;
  pulse: number;
  pulseDir: number;
}

interface ClickWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

const TECHS = [
  { label: "React", color: "#61DAFB", glow: "rgba(97, 218, 251, 0.4)" },
  { label: "TypeScript", color: "#3178C6", glow: "rgba(49, 120, 198, 0.4)" },
  { label: "Tailwind", color: "#06B6D4", glow: "rgba(6, 182, 212, 0.4)" },
  { label: "Next.js", color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.3)" },
  { label: "Node.js", color: "#339933", glow: "rgba(51, 153, 51, 0.4)" },
  { label: "Figma", color: "#F24E1E", glow: "rgba(242, 78, 30, 0.4)" },
  { label: "Git", color: "#F05032", glow: "rgba(240, 80, 50, 0.4)" },
  { label: "UI/UX", color: "#B600A8", glow: "rgba(182, 0, 168, 0.4)" },
  { label: "Framer", color: "#7621B0", glow: "rgba(118, 33, 176, 0.4)" }
];

export const TechOrbit = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const wavesRef = useRef<ClickWave[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  // Initialize bubbles
  const initBubbles = useCallback((width: number, height: number) => {
    const isMobile = window.innerWidth < 640;
    const baseRadius = isMobile ? 32 : 46;

    bubblesRef.current = TECHS.map((tech, i) => {
      // Space them out initially
      const cols = 3;
      const col = i % cols;
      const row = Math.floor(i / cols);

      const cellW = width / cols;
      const cellH = height / cols;

      return {
        x: cellW * col + cellW / 2 + (Math.random() - 0.5) * 40,
        y: cellH * row + cellH / 2 + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: baseRadius + (Math.random() - 0.5) * 8,
        label: tech.label,
        color: tech.color,
        glowColor: tech.glow,
        hovered: false,
        pulse: 1,
        pulseDir: 0.005 + Math.random() * 0.005
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = 420; // Fixed visual container height
      initBubbles(canvas.width, canvas.height);
    };

    handleResize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bubbles = bubblesRef.current;
      const waves = wavesRef.current;
      const mouse = mouseRef.current;

      // 1. Update waves
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.radius += 2.5;
        w.alpha -= 0.03;
        if (w.alpha <= 0) {
          waves.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
        ctx.strokeStyle = w.color.replace('0.4', String(w.alpha));
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 2. Physics & Collisions
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        // Position drift
        b.x += b.vx;
        b.y += b.vy;

        // Border bounce
        if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx = Math.abs(b.vx);
        }
        if (b.x + b.radius > canvas.width) {
          b.x = canvas.width - b.radius;
          b.vx = -Math.abs(b.vx);
        }
        if (b.y - b.radius < 0) {
          b.y = b.radius;
          b.vy = Math.abs(b.vy);
        }
        if (b.y + b.radius > canvas.height) {
          b.y = canvas.height - b.radius;
          b.vy = -Math.abs(b.vy);
        }

        // Pulse scale animation
        b.pulse += b.pulseDir;
        if (b.pulse > 1.05 || b.pulse < 0.95) b.pulseDir *= -1;

        // Mouse repulsion force
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 150;

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          const angle = Math.atan2(dy, dx);
          // Gently modify velocity toward repulsion direction
          b.vx += Math.cos(angle) * force * 0.12;
          b.vy += Math.sin(angle) * force * 0.12;

          if (!b.hovered) {
            b.hovered = true;
            playHoverSound();
          }
        } else {
          b.hovered = false;
        }

        // Speed limit
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        const maxSpeed = 2.0;
        if (speed > maxSpeed) {
          b.vx = (b.vx / speed) * maxSpeed;
          b.vy = (b.vy / speed) * maxSpeed;
        }

        // Slow friction to stabilize
        b.vx *= 0.985;
        b.vy *= 0.985;

        // Elastic collisions with other bubbles
        for (let j = i + 1; j < bubbles.length; j++) {
          const ob = bubbles[j];
          const cdx = ob.x - b.x;
          const cdy = ob.y - b.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          const minDist = b.radius + ob.radius;

          if (cdist < minDist) {
            // Push them apart to prevent sticking
            const overlap = minDist - cdist;
            const angle = Math.atan2(cdy, cdx);
            b.x -= Math.cos(angle) * overlap * 0.5;
            b.y -= Math.sin(angle) * overlap * 0.5;
            ob.x += Math.cos(angle) * overlap * 0.5;
            ob.y += Math.sin(angle) * overlap * 0.5;

            // Elastic bounce physics response (swap velocity vectors along normal)
            const nx = cdx / cdist;
            const ny = cdy / cdist;
            const kx = b.vx - ob.vx;
            const ky = b.vy - ob.vy;
            const p = nx * kx + ny * ky;

            if (p > 0) {
              b.vx -= p * nx;
              b.vy -= p * ny;
              ob.vx += p * nx;
              ob.vy += p * ny;
            }
          }
        }

        // 3. Render Bubble
        const currentRadius = b.radius * b.pulse;

        // Draw shadow glow
        ctx.shadowColor = b.color;
        ctx.shadowBlur = b.hovered ? 25 : 12;

        // Draw bubble circle
        ctx.beginPath();
        ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(12, 12, 12, 0.9)"; // Dark semi-opaque body
        ctx.fill();

        ctx.lineWidth = b.hovered ? 2.5 : 1.5;
        ctx.strokeStyle = b.color;
        ctx.stroke();

        // Reset shadow for text drawing
        ctx.shadowBlur = 0;

        // Draw Text label
        ctx.fillStyle = "#D7E2EA";
        ctx.font = `500 ${window.innerWidth < 640 ? '11px' : '13px'} Kanit, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.label, b.x, b.y);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [initBubbles]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check if clicked inside any bubble
    for (const b of bubblesRef.current) {
      const dx = b.x - clickX;
      const dy = b.y - clickY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < b.radius) {
        // Shockwave expansion
        wavesRef.current.push({
          x: b.x,
          y: b.y,
          radius: b.radius,
          maxRadius: b.radius * 2.2,
          color: b.glowColor,
          alpha: 0.6
        });
        // Push velocity from click
        b.vx += (Math.random() - 0.5) * 4;
        b.vy += (Math.random() - 0.5) * 4;
        playClickSound();
        break;
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCanvasClick}
      className="w-full h-[420px] cursor-pointer"
    />
  );
};
