/**
 * Futuristic UI Sound Synthesizer using the browser's Web Audio API.
 * Synthesizes sounds dynamically so no external audio files are required.
 */

let isMuted = true;
let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const toggleMute = (): boolean => {
  isMuted = !isMuted;
  // Initialize context on user interaction
  if (!isMuted) {
    getAudioContext();
  }
  return isMuted;
};

export const getMuteStatus = (): boolean => {
  return isMuted;
};

/** Plays a subtle metallic hover sound (low-frequency pitch slide) */
export const playHoverSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn("AudioContext error: ", e);
  }
};

/** Plays a snappy metallic click sound */
export const playClickSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.warn("AudioContext error: ", e);
  }
};

/** Plays a futuristic double-chirp success chime */
export const playSuccessSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;

    // First chirp
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, time); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, time + 0.1); // E5
    gain1.gain.setValueAtTime(0.08, time);
    gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(time);
    osc1.stop(time + 0.1);

    // Second chirp
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(783.99, time + 0.08); // G5
    osc2.frequency.exponentialRampToValueAtTime(1046.50, time + 0.2); // C6
    gain2.gain.setValueAtTime(0.08, time + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(time + 0.08);
    osc2.stop(time + 0.2);
  } catch (e) {
    console.warn("AudioContext error: ", e);
  }
};

/** Plays a sci-fi system startup sound (boot sound) */
export const playBootSound = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const time = ctx.currentTime;

    // A futuristic rising power-up sweep with high-pass filtered noise/tones
    const chord = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(freq * 2, time + 0.6);

      gain.gain.setValueAtTime(0.01, time);
      gain.gain.linearRampToValueAtTime(0.04, time + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.6);
    });

    // An extra laser chime sweep on top
    const oscSweep = ctx.createOscillator();
    const gainSweep = ctx.createGain();
    oscSweep.type = 'sine';
    oscSweep.frequency.setValueAtTime(800, time + 0.2);
    oscSweep.frequency.exponentialRampToValueAtTime(1600, time + 0.5);

    gainSweep.gain.setValueAtTime(0.05, time + 0.2);
    gainSweep.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

    oscSweep.connect(gainSweep);
    gainSweep.connect(ctx.destination);
    oscSweep.start(time + 0.2);
    oscSweep.stop(time + 0.5);
  } catch (e) {
    console.warn("AudioContext error: ", e);
  }
};

