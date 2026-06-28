import { useState } from 'react';
import { motion } from 'framer-motion';
import { toggleMute, getMuteStatus, playClickSound, playHoverSound } from '../../utils/soundEffects';

export const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(getMuteStatus());

  const handleToggle = () => {
    const newMuted = toggleMute();
    setIsMuted(newMuted);
    
    // Play a chirp to confirm audio activation
    if (!newMuted) {
      setTimeout(() => playClickSound(), 100);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      onMouseEnter={playHoverSound}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 left-8 z-40 w-11 h-11 rounded-full flex items-center justify-center bg-black/40 border border-white/10 text-white/80 backdrop-blur-md hover:bg-black/60 active:border-white/30 transition-colors shadow-2xl cursor-pointer"
      title={isMuted ? "Bật âm thanh hiệu ứng" : "Tắt âm thanh hiệu ứng"}
    >
      {isMuted ? (
        // Mute / Speaker X icon
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      ) : (
        // Unmute / Speaker Waves icon
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.724a1 1 0 01-1.707.707L5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v13.724z" />
        </svg>
      )}
    </motion.button>
  );
};
