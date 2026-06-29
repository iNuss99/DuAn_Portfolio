import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/portfolioData';
import { FadeIn } from './ui/FadeIn';
import { playClickSound, playHoverSound } from '../utils/soundEffects';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const timerRef = useRef<any>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const handlePrev = () => {
    playClickSound();
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playClickSound();
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    playClickSound();
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Variants for carousel sliding effect
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="relative w-full bg-dark px-5 sm:px-8 md:px-10 py-24 z-20 overflow-hidden noise-overlay border-t border-white/5">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="ambient-glow-4 opacity-50" />
        <div className="ambient-glow-5 opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 text-center">
        {/* Title */}
        <FadeIn y={30} delay={0} duration={0.8} className="mb-16">
          <span className="text-accent-magenta text-xs font-bold tracking-widest uppercase block mb-3 font-heading">
            ✦ Đánh giá từ đối tác / Client Testimonials ✦
          </span>
          <h2 className="font-heading font-black uppercase leading-none tracking-tight text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] glitch-hover hero-heading">
            PHẢN HỒI
          </h2>
        </FadeIn>

        {/* Carousel Card Container */}
        <FadeIn y={30} delay={0.2} duration={0.8} className="w-full relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center">
          
          {/* Decorative Quote Icon */}
          <div className="absolute top-0 left-6 text-white/5 pointer-events-none">
            <Quote size={120} className="transform -scale-x-100" />
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full p-8 sm:p-12 rounded-[32px] bg-[#141414]/30 border border-white/5 backdrop-blur-md flex flex-col justify-between items-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            >
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="star-filled fill-current" />
                ))}
              </div>

              {/* Feedback Content */}
              <p className="text-text-primary font-body font-light text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8 italic">
                "{activeTestimonial.content}"
              </p>

              {/* Client Info */}
              <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  className="w-14 h-14 rounded-full border border-white/10 object-cover shadow-lg"
                />
                <div className="text-center sm:text-left">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-white tracking-wide uppercase">
                    {activeTestimonial.name}
                  </h4>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-accent-magenta uppercase font-heading block mt-0.5">
                    {activeTestimonial.role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute -bottom-16 sm:bottom-auto sm:-left-6 sm:right-auto sm:top-1/2 sm:-translate-y-1/2 flex sm:block z-20 gap-4">
            <button
              onClick={handlePrev}
              onMouseEnter={playHoverSound}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center text-white transition-all shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute -bottom-16 sm:bottom-auto sm:-right-6 sm:left-auto sm:top-1/2 sm:-translate-y-1/2 flex sm:block z-20 gap-4">
            <button
              onClick={handleNext}
              onMouseEnter={playHoverSound}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 flex items-center justify-center text-white transition-all shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </FadeIn>

        {/* Carousel Dots */}
        <FadeIn y={10} delay={0.3} duration={0.8} className="flex gap-2.5 mt-20 sm:mt-12 z-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              onMouseEnter={playHoverSound}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-6 bg-accent-magenta shadow-[0_0_10px_rgba(182,0,168,0.5)]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </FadeIn>

      </div>
    </section>
  );
};
