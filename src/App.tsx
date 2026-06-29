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
import { socialLinks, navLinks } from './data/portfolioData';
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
    <>
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

      {/* Premium Cyber Grid & Mesh Glow Background */}
      <CyberBackground />

      {/* Global Helper Elements */}
      <CursorGlow />
      <ScrollNav />
      <CyberDock onOpenContact={openContact} />

      {/* 1. Hero Section */}
      <HeroSection onOpenContact={openContact} />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onOpenContact={openContact} />

      {/* 4. Stats Section */}
      <StatsSection />

      {/* 5. Services Section */}
      <ServicesSection />

      {/* 6. Projects Section */}
      <ProjectsSection />



      {/* Footer Premium Redesign */}
      <footer id="contact" className="bg-[#090909] py-20 px-6 sm:px-10 border-t border-white/5 relative z-20 select-none">
        
        {/* Animated Gradient Line Divider at the top of the footer */}
        <div className="gradient-divider absolute top-0 left-0 right-0" />

        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          
          {/* Top part: Brand, Nav & Socials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-left">
            
            {/* Brand Logo & Bio tag */}
            <div className="flex flex-col gap-4">
              <a href="#" className="font-heading font-black text-2xl tracking-widest text-white uppercase hover:text-accent-magenta transition-colors duration-300">
                KHOA<span className="text-accent-magenta">.</span>
              </a>
              <p className="text-xs text-text-muted leading-relaxed max-w-[280px]">
                Kiến tạo các sản phẩm kỹ thuật số hiện đại, mượt mà và tối ưu hiệu suất cho doanh nghiệp của bạn.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white">Liên kết nhanh</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onMouseEnter={playHoverSound}
                    className="text-text-muted hover:text-accent-magenta hover:translate-x-1 transition-all duration-200 uppercase font-semibold"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={openContact}
                  onMouseEnter={playHoverSound}
                  className="text-left text-text-muted hover:text-accent-magenta hover:translate-x-1 transition-all duration-200 uppercase font-semibold"
                >
                  Gửi yêu cầu
                </button>
              </div>
            </div>

            {/* Social Links & Contact */}
            <div className="flex flex-col gap-4">
              <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white">Mạng xã hội</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = (Icons as any)[social.icon.charAt(0).toUpperCase() + social.icon.slice(1)] || Icons.Globe;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-accent-magenta/40 hover:bg-accent-magenta/15 hover:shadow-[0_0_15px_rgba(182,0,168,0.3)] transition-all duration-300"
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
              </div>
              <span className="text-[10px] text-text-muted select-text">
                Email: khoa.itdeveloper@gmail.com
              </span>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-[1px] bg-white/5" />

          {/* Bottom part: Copyright & Scroll to Top */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <p className="text-[10px] sm:text-xs text-text-muted uppercase tracking-widest">
              © {new Date().getFullYear()} KHOA. TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.
            </p>

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
    </>
  );
}

export default App;
