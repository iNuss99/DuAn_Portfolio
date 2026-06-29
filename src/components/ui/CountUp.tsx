import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  to: number;
  duration?: number;
  suffix?: string;
}

export const CountUp = ({ to, duration = 1.8, suffix = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};
