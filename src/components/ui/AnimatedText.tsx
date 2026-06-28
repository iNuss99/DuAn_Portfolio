import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedCharProps {
  char: string;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}

/**
 * Single animated character — safely calls useTransform at the top level
 * of its own component (Rules of Hooks compliant).
 */
const AnimatedChar = ({ char, progress, rangeStart, rangeEnd }: AnimatedCharProps) => {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.2, 1]);

  return (
    <motion.span style={{ opacity, willChange: 'opacity' }}>
      {char}
    </motion.span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
}

/**
 * Scroll-driven text reveal animation.
 * Each character's opacity transitions from 0.2 → 1 based on scroll progress.
 */
export const AnimatedText = ({ text, className = "" }: AnimatedTextProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  // Pre-compute character layout (deterministic — same text = same layout)
  const words = text.split(" ");
  let totalChars = 0;
  for (const word of words) {
    totalChars += word.length;
  }

  let charIndex = 0;

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block mr-[0.28em] whitespace-nowrap">
          {word.split("").map((char, cIdx) => {
            const gi = charIndex++;
            const rangeStart = gi / totalChars;
            const rangeEnd = Math.min((gi + 1.25) / totalChars, 1);

            return (
              <AnimatedChar
                key={`${wIdx}-${cIdx}`}
                char={char}
                progress={scrollYProgress}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
              />
            );
          })}
        </span>
      ))}
    </p>
  );
};
