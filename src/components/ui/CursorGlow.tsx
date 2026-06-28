import { useEffect, useRef } from 'react';

/**
 * Full-page cursor glow effect — a soft gradient blob that follows the mouse.
 * Uses direct DOM manipulation for zero React re-renders.
 * Hidden on touch devices.
 */
export const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const visible = useRef(false);

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window) return;

    const glow = glowRef.current;
    if (!glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!visible.current) {
          glow.style.opacity = '1';
          visible.current = true;
        }
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      });
    };

    const handleMouseLeave = () => {
      if (glow) {
        glow.style.opacity = '0';
        visible.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" style={{ opacity: 0 }} />;
};
