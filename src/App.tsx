import { useState, useCallback } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { CursorGlow } from './components/ui/CursorGlow';
import { ScrollNav } from './components/ui/ScrollNav';
import { SoundToggle } from './components/ui/SoundToggle';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  return (
    <div className="bg-dark min-h-screen w-full text-white font-sans overflow-x-clip relative">

      {/* Global Helper Elements */}
      <CursorGlow />
      <ScrollNav />
      <SoundToggle />

      {/* 1. Hero Section */}
      <HeroSection onOpenContact={openContact} />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onOpenContact={openContact} />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* Footer */}
      <footer id="contact" className="bg-dark py-16 px-6 border-t border-text-primary/10 text-center select-none z-20 relative">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-xs sm:text-sm text-text-primary/40 uppercase tracking-widest">
            © {new Date().getFullYear()} KHOA. TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.
          </p>
          <button
            onClick={openContact}
            className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-text-primary hover:text-white transition-colors duration-200"
          >
            LIÊN HỆ HỢP TÁC VỚI KHOA
          </button>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />

    </div>
  );
}

export default App;
