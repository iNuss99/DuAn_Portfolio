import { type ReactNode, useRef, useEffect, useCallback } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });

  const updateTransform = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const elCenterX = rect.left + rect.width / 2;
    const elCenterY = rect.top + rect.height / 2;
    const { x, y } = mousePos.current;

    const isWithinRange =
      x >= rect.left - padding &&
      x <= rect.right + padding &&
      y >= rect.top - padding &&
      y <= rect.bottom + padding;

    if (isWithinRange) {
      const translateX = (x - elCenterX) / strength;
      const translateY = (y - elCenterY) / strength;
      el.style.transition = activeTransition;
      el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`;
    } else {
      el.style.transition = inactiveTransition;
      el.style.transform = "translate3d(0px, 0px, 0px)";
    }
  }, [padding, strength, activeTransition, inactiveTransition]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    const handleMouseLeave = () => {
      const el = elementRef.current;
      if (!el) return;
      el.style.transition = inactiveTransition;
      el.style.transform = "translate3d(0px, 0px, 0px)";
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [updateTransform, inactiveTransition]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
};
