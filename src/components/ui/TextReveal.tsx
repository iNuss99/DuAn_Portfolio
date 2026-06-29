import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal = ({ text, className = "", delay = 0 }: TextRevealProps) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      }
    }
  };

  const childVariants = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`flex flex-wrap justify-center select-none ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="relative overflow-hidden inline-block mr-[0.25em] py-0.5">
          <motion.span variants={childVariants} className="inline-block origin-bottom">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};
