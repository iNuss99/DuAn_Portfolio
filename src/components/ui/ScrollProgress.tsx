import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#EE0F0F] via-[#FF0055] to-[#FF4D00] z-[99999] origin-left shadow-[0_0_10px_rgba(255,0,85,0.5)]"
      style={{ scaleX }}
    />
  );
};
