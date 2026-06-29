import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { StatsSection } from './components/StatsSection';
import { ContactModal } from './components/ContactModal';
import { CursorGlow } from './components/ui/CursorGlow';
import { ScrollNav } from './components/ui/ScrollNav';
import { CyberDock } from './components/ui/CyberDock';
import { Preloader } from './components/ui/Preloader';
import { CyberBackground } from './components/ui/CyberBackground';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ReactLenis } from '@studio-freight/react-lenis';
import { socialLinks } from './data/portfolioData';
import { playClickSound, playHoverSound } from './utils/soundEffects';
import * as Icons from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  const handleScrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ReactLenis root>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-dark min-h-screen w-full text-white font-body overflow-x-clip relative noise-overlay"
        >
          {/* Scroll progress neon indicator */}
          <ScrollProgress />

          {/* Premium Cyber Grid & Mesh Glow Background */}
          <CyberBackground />

          {/* Global Helper Elements */}
          <CursorGlow />
          <ScrollNav />
          <CyberDock onOpenContact={openContact} />

          {/* 1. Hero Section */}
          <HeroSection onOpenContact={openContact} />

          {/* 2. About Section */}
          <AboutSection onOpenContact={openContact} />

          {/* 3. Stats Section */}
          <StatsSection />

          {/* 4. Services Section */}
          <ServicesSection />

          {/* 5. Projects Section */}
          <ProjectsSection />

          {/* 6. Marquee Section */}
          <MarqueeSection />

          {/* Footer Premium Redesign */}
          <footer id="contact" className="bg-[#090909] py-20 px-6 sm:px-10 border-t border-white/5 relative z-20 select-none">

            {/* Animated Gradient Line Divider at the top of the footer */}
            <div className="gradient-divider absolute top-0 left-0 right-0" />

            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-left">
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#FF0055] uppercase block mb-2 font-heading">✦ HÃY HỢP TÁC CÙNG TÔI ✦</span>
                <h3 className="font-heading font-black uppercase text-2xl sm:text-3xl tracking-wide mb-3">MINH KHOA</h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-sm">Tạo ra các giao diện web mượt mà, chuyên nghiệp và có hiệu ứng tương tác điện ảnh cao cấp.</p>
              </div>

              {/* Central CTA Button */}
              <div className="relative">
                <button
                  onClick={openContact}
                  onMouseEnter={playHoverSound}
                  className="px-10 py-5 bg-[#EE0F0F] hover:bg-[#FF0055] text-white rounded-2xl font-bold font-heading text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(238,15,15,0.4)] hover:shadow-[0_0_45px_rgba(255,0,85,0.65)] active:scale-95"
                >
                  LIÊN HỆ NGAY
                </button>
              </div>

              {/* Social icons grid with red accent hover */}
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = (Icons as any)[link.icon.charAt(0).toUpperCase() + link.icon.slice(1)];
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-[#FF0055] hover:bg-[#FF0055]/10 transition-all duration-300"
                    >
                      {Icon ? <Icon size={18} /> : null}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="max-w-5xl mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-text-muted font-mono uppercase tracking-widest">
              <div>© {new Date().getFullYear()} KHOA.DEV. ALL RIGHTS RESERVED.</div>
              <div className="flex items-center gap-6">
                <a href="#about" className="hover:text-white transition-colors">Giới thiệu</a>
                <a href="#projects" className="hover:text-white transition-colors">Dự án</a>

                <button
                  onClick={handleScrollToTop}
                  onMouseEnter={playHoverSound}
                  className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest text-text-muted hover:text-white uppercase transition-colors"
                >
                  <span>Về đầu trang</span>
                  <Icons.ChevronUp size={16} className="animate-bounce" />
                </button>
              </div>
            </div>
          </footer>

          {/* Contact Form Modal */}
          <ContactModal isOpen={isContactOpen} onClose={closeContact} />

        </motion.div>
      )}
    </ReactLenis>
  );
}

export default App;
