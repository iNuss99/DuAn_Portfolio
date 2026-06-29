import { useEffect, useRef, useState, useCallback } from 'react';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  color: string;
}

export const ParticleSphere3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  
  // Rotation angles (radians)
  const angleX = useRef(0.2);
  const angleY = useRef(0.5);
  
  // Mouse interaction refs
  const lastMousePos = useRef({ x: 0, y: 0 });
  const mouseCanvasPos = useRef({ x: -9999, y: -9999 });
  const isHovered = useRef(false);
  const animFrameId = useRef<number>(0);
  
  // Constants
  const PARTICLE_COUNT = 320;
  const SPHERE_RADIUS = 130;
  const PERSPECTIVE = 300;
  const particles = useRef<Particle3D[]>([]);

  // Initialize particles once on sphere shell
  useEffect(() => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => {
      // Uniform distribution on sphere using Fibonacci spiral method
      const idx = Math.random() * PARTICLE_COUNT;
      const theta = Math.acos(-1 + (2 * idx) / PARTICLE_COUNT);
      const phi = Math.sqrt(PARTICLE_COUNT * Math.PI) * theta;

      const x = SPHERE_RADIUS * Math.sin(theta) * Math.cos(phi);
      const y = SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi);
      const z = SPHERE_RADIUS * Math.cos(theta);

      // Determine size and color (gradient-like feeling)
      const baseSize = Math.random() * 1.5 + 1.0;
      
      // Randomly assign accents: magenta, purple, orange, or cyan
      const rand = Math.random();
      let color = "182, 0, 168"; // accent-magenta
      if (rand < 0.25) color = "118, 33, 176"; // accent-purple
      else if (rand < 0.5) color = "190, 76, 0"; // accent-orange
      else if (rand < 0.75) color = "6, 182, 212"; // cyan

      return { x, y, z, baseSize, color };
    });
  }, []);

  // 3D rotation math helper
  const rotateX3D = (p: Particle3D, angle: number) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y1 = p.y * cos - p.z * sin;
    const z1 = p.z * cos + p.y * sin;
    p.y = y1;
    p.z = z1;
  };

  const rotateY3D = (p: Particle3D, angle: number) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x1 = p.x * cos - p.z * sin;
    const z1 = p.z * cos + p.x * sin;
    p.x = x1;
    p.z = z1;
  };

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = containerRef.current;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = 360;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Apply auto-rotation if not dragging
      if (!isDragging) {
        angleX.current = 0.003;
        angleY.current = 0.004;
      }

      // Rotate all particles
      for (const p of particles.current) {
        if (angleX.current !== 0) rotateX3D(p, angleX.current);
        if (angleY.current !== 0) rotateY3D(p, angleY.current);
      }

      // Reset step velocity back to idle speed dampening
      if (isDragging) {
        angleX.current = 0;
        angleY.current = 0;
      }

      // Sort particles by depth (Z index) so front ones render on top of back ones
      const sortedParticles = [...particles.current].sort((a, b) => b.z - a.z);

      // Project and draw particles
      const projected = sortedParticles.map(p => {
        // Perspective scaling
        const scale = PERSPECTIVE / (PERSPECTIVE + p.z);
        const sx = centerX + p.x * scale;
        const sy = centerY + p.y * scale;

        // Depth calculations for opacity and size
        // p.z is from -SPHERE_RADIUS to +SPHERE_RADIUS
        const depthNormalized = (p.z + SPHERE_RADIUS) / (2 * SPHERE_RADIUS); // 0 (front) to 1 (back)
        const opacity = Math.max(0.12, 1 - depthNormalized * 0.75);
        const size = p.baseSize * scale * (1.3 - depthNormalized * 0.5);

        return {
          p,
          sx,
          sy,
          size,
          opacity,
          z: p.z
        };
      });

      // Draw connection lines in 3D space to avoid 2D spaghetti overlaps
      // Only connect particles that are close in 3D distance
      const maxDistance3D = 48;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          // Compute 3D distance
          const dx = p1.p.x - p2.p.x;
          const dy = p1.p.y - p2.p.y;
          const dz = p1.p.z - p2.p.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < maxDistance3D) {
            const lineOpacity = (1 - dist3D / maxDistance3D) * 0.14 * Math.min(p1.opacity, p2.opacity);
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            
            // Set connection line color based on particle colors
            ctx.strokeStyle = `rgba(182, 0, 168, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse hover magnetism interaction (if hovered near particle)
        if (isHovered.current) {
          const mdx = p1.sx - mouseCanvasPos.current.x;
          const mdy = p1.sy - mouseCanvasPos.current.y;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDist < 80) {
            // Draw a connection to the mouse pointer
            const mouseLineOpacity = (1 - mouseDist / 80) * 0.25 * p1.opacity;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(mouseCanvasPos.current.x, mouseCanvasPos.current.y);
            ctx.strokeStyle = `rgba(${p1.p.color}, ${mouseLineOpacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Render the actual dots
      for (const item of projected) {
        ctx.beginPath();
        ctx.arc(item.sx, item.sy, item.size, 0, Math.PI * 2);
        
        // Add subtle radial glow around front dots
        if (item.z < 0) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${item.p.color}, ${item.opacity * 0.5})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${item.p.color}, ${item.opacity})`;
        ctx.fill();
      }

      // Reset shadow for subsequent drawings
      ctx.shadowBlur = 0;

      animFrameId.current = requestAnimationFrame(draw);
    };

    animFrameId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', resize);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    playClickSound();
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    // Track mouse coordinates on canvas for particle connection
    const rect = canvasRef.current.getBoundingClientRect();
    mouseCanvasPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    // Apply rotation based on mouse drag velocity
    const sensitivity = 0.007;
    angleY.current = deltaX * sensitivity;
    angleX.current = -deltaY * sensitivity;

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => {
        isHovered.current = true;
        playHoverSound();
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        mouseCanvasPos.current = { x: -9999, y: -9999 };
      }}
      className="w-full relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full block relative z-10"
      />
    </div>
  );
};
