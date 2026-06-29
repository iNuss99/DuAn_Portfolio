import { useEffect, useRef, useState, useCallback } from 'react';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  color: string;
  glow: string;
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
  const PARTICLE_COUNT = 550; // Increased count for detail
  const SPHERE_RADIUS = 145; // Slightly larger for impact
  const PERSPECTIVE = 320;
  const particles = useRef<Particle3D[]>([]);

  // Concentric 3D gyro rings points
  const ring1Points = useRef<{x: number, y: number, z: number}[]>([]);
  const ring2Points = useRef<{x: number, y: number, z: number}[]>([]);

  // Initialize particles once on sphere shell & rings
  useEffect(() => {
    // Sphere particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, (_, idx) => {
      // Golden ratio spiral distribution on sphere (Fibonacci sphere)
      const theta = Math.acos(-1 + (2 * idx) / PARTICLE_COUNT);
      const phi = Math.sqrt(PARTICLE_COUNT * Math.PI) * theta;

      const x = SPHERE_RADIUS * Math.sin(theta) * Math.cos(phi);
      const y = SPHERE_RADIUS * Math.sin(theta) * Math.sin(phi);
      const z = SPHERE_RADIUS * Math.cos(theta);

      // Determine size
      const baseSize = Math.random() * 1.8 + 0.8;
      
      // Cyber neon color distribution based on latitude (y coordinate)
      // Cyan at the poles, magenta at the equator, purple in between
      const normY = Math.abs(y / SPHERE_RADIUS); // 0 (equator) to 1 (poles)
      let color = "238, 15, 15"; // Vivid Red
      let glow = "rgba(238, 15, 15, 0.4)";
      
      if (normY > 0.65) {
        color = "255, 0, 85"; // Neon Red
        glow = "rgba(255, 0, 85, 0.4)";
      } else if (normY > 0.3) {
        color = "255, 77, 0"; // Coral Orange
        glow = "rgba(255, 77, 0, 0.4)";
      } else {
        // Equator gets rose/crimson mix
        if (Math.random() < 0.25) {
          color = "225, 29, 72"; // Crimson Rose
          glow = "rgba(225, 29, 72, 0.4)";
        }
      }

      return { x, y, z, baseSize, color, glow };
    });

    // Outer gyro rings (3D circles)
    const RING_POINTS_COUNT = 60;
    const ring1: {x: number, y: number, z: number}[] = [];
    const ring2: {x: number, y: number, z: number}[] = [];
    const ring1Radius = SPHERE_RADIUS * 1.25;
    const ring2Radius = SPHERE_RADIUS * 1.25;

    for (let i = 0; i < RING_POINTS_COUNT; i++) {
      const angle = (i / RING_POINTS_COUNT) * Math.PI * 2;
      
      // Ring 1 in X-Z plane
      ring1.push({
        x: ring1Radius * Math.cos(angle),
        y: 0,
        z: ring1Radius * Math.sin(angle)
      });

      // Ring 2 in Y-Z plane
      ring2.push({
        x: 0,
        y: ring2Radius * Math.cos(angle),
        z: ring2Radius * Math.sin(angle)
      });
    }

    ring1Points.current = ring1;
    ring2Points.current = ring2;
  }, []);

  // 3D rotation math helpers
  const rotateX3D = (p: {x: number, y: number, z: number}, angle: number) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y1 = p.y * cos - p.z * sin;
    const z1 = p.z * cos + p.y * sin;
    p.y = y1;
    p.z = z1;
  };

  const rotateY3D = (p: {x: number, y: number, z: number}, angle: number) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x1 = p.x * cos - p.z * sin;
    const z1 = p.z * cos + p.x * sin;
    p.x = x1;
    p.z = z1;
  };

  const rotateZ3D = (p: {x: number, y: number, z: number}, angle: number) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x1 = p.x * cos - p.y * sin;
    const y1 = p.y * cos + p.x * sin;
    p.x = x1;
    p.y = y1;
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
      canvas.height = 420; // Slightly taller for gyro rings
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw Holographic Grid Background inside Sphere boundary
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, SPHERE_RADIUS * 1.35, 0, Math.PI * 2);
      ctx.clip();
      
      // Draw grid lines inside clip
      ctx.strokeStyle = "rgba(238, 15, 15, 0.04)";
      ctx.lineWidth = 1;
      for (let x = centerX - SPHERE_RADIUS * 1.5; x < centerX + SPHERE_RADIUS * 1.5; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, centerY - SPHERE_RADIUS * 1.5);
        ctx.lineTo(x, centerY + SPHERE_RADIUS * 1.5);
        ctx.stroke();
      }
      for (let y = centerY - SPHERE_RADIUS * 1.5; y < centerY + SPHERE_RADIUS * 1.5; y += 15) {
        ctx.beginPath();
        ctx.moveTo(centerX - SPHERE_RADIUS * 1.5, y);
        ctx.lineTo(centerX + SPHERE_RADIUS * 1.5, y);
        ctx.stroke();
      }
      ctx.restore();

      // Draw Glowing Core at Center
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, SPHERE_RADIUS * 0.5);
      glowGrad.addColorStop(0, 'rgba(238, 15, 15, 0.22)');
      glowGrad.addColorStop(0.3, 'rgba(255, 0, 85, 0.12)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, SPHERE_RADIUS * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Gentle auto-rotation around a diagonal axis if not dragging
      if (!isDragging) {
        // Multi-axis rotation speeds
        angleX.current = 0.002;
        angleY.current = 0.0035;
      }

      // Rotate sphere particles
      for (const p of particles.current) {
        if (angleX.current !== 0) rotateX3D(p, angleX.current);
        if (angleY.current !== 0) rotateY3D(p, angleY.current);
      }

      // Rotate Gyro Rings (Ring 1 and Ring 2 rotate differently)
      for (const p of ring1Points.current) {
        // Ring 1 rotates slightly faster
        rotateY3D(p, isDragging ? angleY.current : 0.005);
        rotateX3D(p, isDragging ? angleX.current : 0.001);
      }
      for (const p of ring2Points.current) {
        // Ring 2 rotates opposite and around different axes
        rotateX3D(p, isDragging ? angleX.current : 0.004);
        rotateZ3D(p, isDragging ? angleY.current * 0.5 : 0.002);
      }

      // Dampen velocity to zero if dragging (updated frame by frame via mousemove)
      if (isDragging) {
        angleX.current = 0;
        angleY.current = 0;
      }

      // Project Gyro Rings to 2D
      const projRing1 = ring1Points.current.map(p => {
        const scale = PERSPECTIVE / (PERSPECTIVE + p.z);
        return {
          sx: centerX + p.x * scale,
          sy: centerY + p.y * scale,
          opacity: Math.max(0.08, 1 - (p.z + SPHERE_RADIUS * 1.3) / (2.6 * SPHERE_RADIUS) * 0.8),
          z: p.z
        };
      });

      const projRing2 = ring2Points.current.map(p => {
        const scale = PERSPECTIVE / (PERSPECTIVE + p.z);
        return {
          sx: centerX + p.x * scale,
          sy: centerY + p.y * scale,
          opacity: Math.max(0.08, 1 - (p.z + SPHERE_RADIUS * 1.3) / (2.6 * SPHERE_RADIUS) * 0.8),
          z: p.z
        };
      });

      // Draw back segments of Ring 1 & Ring 2 (Z > 0)
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 0;
      
      const drawRingSegments = (projPoints: typeof projRing1, colorStr: string) => {
        for (let i = 0; i < projPoints.length; i++) {
          const p1 = projPoints[i];
          const p2 = projPoints[(i + 1) % projPoints.length];
          
          // Connect consecutive points on the ring
          const midZ = (p1.z + p2.z) / 2;
          const avgOpacity = (p1.opacity + p2.opacity) / 2;
          
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          
          // Highlight with higher opacity in front (Z < 0) and dim in back (Z > 0)
          ctx.strokeStyle = `rgba(${colorStr}, ${avgOpacity * (midZ > 0 ? 0.15 : 0.45)})`;
          ctx.stroke();

          // Draw small decorative nodes on the ring at intervals
          if (i % 6 === 0) {
            ctx.beginPath();
            ctx.arc(p1.sx, p1.sy, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorStr}, ${p1.opacity * (p1.z > 0 ? 0.2 : 0.7)})`;
            ctx.fill();
          }
        }
      };

      // Draw Ring 1 (Neon Red Theme)
      drawRingSegments(projRing1, "255, 0, 85");
      // Draw Ring 2 (Vivid Red Theme)
      drawRingSegments(projRing2, "238, 15, 15");

      // Sort sphere particles by depth (Z index) so front ones render on top of back ones
      const sortedParticles = [...particles.current].sort((a, b) => b.z - a.z);

      // Project and draw particles
      const projected = sortedParticles.map(p => {
        // Perspective scaling
        const scale = PERSPECTIVE / (PERSPECTIVE + p.z);
        let sx = centerX + p.x * scale;
        let sy = centerY + p.y * scale;

        // Depth calculations for opacity and size
        const depthNormalized = (p.z + SPHERE_RADIUS) / (2 * SPHERE_RADIUS); // 0 (front) to 1 (back)
        let opacity = Math.max(0.12, 1 - depthNormalized * 0.75);
        let size = p.baseSize * scale * (1.3 - depthNormalized * 0.55);

        // --- MAGNETIC MOUSE PUSH (RIPPLE EFFECT) ---
        if (isHovered.current) {
          const dx = sx - mouseCanvasPos.current.x;
          const dy = sy - mouseCanvasPos.current.y;
          const mouseDist = Math.sqrt(dx * dx + dy * dy);

          if (mouseDist < 90 && mouseDist > 0) {
            // Push intensity decays linearly
            const force = (90 - mouseDist) / 90;
            // Particles push away in 2D space
            const pushX = (dx / mouseDist) * force * 16 * (p.z < 0 ? 1.3 : 0.6); // Front particles push more
            const pushY = (dy / mouseDist) * force * 16 * (p.z < 0 ? 1.3 : 0.6);

            sx += pushX;
            sy += pushY;
            
            // Highlight hovered particles
            opacity = Math.min(1.0, opacity * 1.35);
            size *= 1.25;
          }
        }

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
      const maxDistance3D = 38; // Slightly tighter connection limit for denser look
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
            const lineOpacity = (1 - dist3D / maxDistance3D) * 0.16 * Math.min(p1.opacity, p2.opacity);
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            
            // Interpolate line colors or use accent-gold
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineOpacity})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }

        // Mouse hover magnetism interaction (if hovered near particle)
        if (isHovered.current) {
          const mdx = p1.sx - mouseCanvasPos.current.x;
          const mdy = p1.sy - mouseCanvasPos.current.y;
          const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mouseDist < 85) {
            // Draw a connection from particle to the mouse pointer
            const mouseLineOpacity = (1 - mouseDist / 85) * 0.28 * p1.opacity;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(mouseCanvasPos.current.x, mouseCanvasPos.current.y);
            ctx.strokeStyle = `rgba(${p1.p.color}, ${mouseLineOpacity})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Render the actual dots
      for (const item of projected) {
        ctx.beginPath();
        ctx.arc(item.sx, item.sy, item.size, 0, Math.PI * 2);
        
        // Add subtle glowing shadow around front dots
        if (item.z < 0) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${item.p.color}, ${item.opacity * 0.55})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(${item.p.color}, ${item.opacity})`;
        ctx.fill();
      }

      // Reset shadow for subsequent drawings
      ctx.shadowBlur = 0;

      // Draw central holographic gyroscope rings on top of back particles, but below front ones
      // Since we already drew rings, it gives a nice integrated 3D layered depth!

      animRef();
    };

    const animRef = () => {
      animFrameId.current = requestAnimationFrame(draw);
    };

    animRef();

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
    const sensitivity = 0.008;
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
