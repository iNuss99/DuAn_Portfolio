import { useEffect, useRef, useState } from 'react';
import { playClickSound, playHoverSound, getMuteStatus } from '../../utils/soundEffects';

interface Laser {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Bug {
  x: number;
  y: number;
  speed: number;
  radius: number;
  label: string;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

interface ThrusterSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

const BUG_TYPES = [
  { label: "BUG", color: "#FF3366", speed: 1.4, radius: 14 },
  { label: "ERROR", color: "#B600A8", speed: 1.8, radius: 15 },
  { label: "CRASH", color: "#BE4C00", speed: 2.2, radius: 16 },
  { label: "LAG", color: "#06B6D4", speed: 1.2, radius: 13 }
];

export const CyberGame = () => {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER'>('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [shields, setShields] = useState(3);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 230 });
  const shipXRef = useRef(230); // Eased X position
  const isMouseDownRef = useRef(false); // Track click boost
  const animRef = useRef<number>(0);

  // Lists of active entities
  const lasersRef = useRef<Laser[]>([]);
  const bugsRef = useRef<Bug[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const thrustersRef = useRef<ThrusterSpark[]>([]);

  // Timer intervals for spawning and shooting
  const lastSpawnRef = useRef<number>(0);
  const lastShootRef = useRef<number>(0);

  // Load High Score on mount
  useEffect(() => {
    const saved = localStorage.getItem("khoa_portfolio_game_highscore");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Web Audio Synth for game sounds
  const playLaserSound = (boost: boolean) => {
    if (getMuteStatus()) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = boost ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(boost ? 600 : 450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(boost ? 200 : 100, ctx.currentTime + (boost ? 0.16 : 0.12));
      
      gain.gain.setValueAtTime(boost ? 0.05 : 0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (boost ? 0.16 : 0.12));
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (boost ? 0.16 : 0.12));
    } catch {}
  };

  const playExplodeSound = () => {
    if (getMuteStatus()) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {}
  };

  const playHurtSound = () => {
    if (getMuteStatus()) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.setValueAtTime(60, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {}
  };

  // Create explosion particles
  const spawnExplosion = (x: number, y: number, color: string) => {
    const count = 15;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.2 + Math.random() * 2,
        color,
        alpha: 1
      });
    }
  };

  const handleStartGame = () => {
    playClickSound();
    setScore(0);
    setShields(3);
    lasersRef.current = [];
    bugsRef.current = [];
    particlesRef.current = [];
    thrustersRef.current = [];
    shipXRef.current = 230;
    mouseRef.current = { x: 230 };
    setGameState('PLAYING');
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = (timestamp: number) => {
      // Clear frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Smooth Ship Inertia (Easing)
      const targetX = mouseRef.current.x;
      const dx = targetX - shipXRef.current;
      const velocityX = dx * 0.13; // Easing coefficient (quán tính)
      shipXRef.current += velocityX;

      // 2. Spaceship Tilt angle (max 22 degrees)
      const tiltAngle = Math.max(-0.38, Math.min(0.38, velocityX * 0.055));

      const shipY = canvas.height - 25;

      // 3. Spawning Invaders
      if (timestamp - lastSpawnRef.current > 700) {
        const typeIndex = Math.floor(Math.random() * BUG_TYPES.length);
        const type = BUG_TYPES[typeIndex];
        bugsRef.current.push({
          x: type.radius + Math.random() * (canvas.width - type.radius * 2),
          y: -20,
          speed: type.speed + (score * 0.015), // Accelerate over score
          radius: type.radius,
          label: type.label,
          color: type.color
        });
        lastSpawnRef.current = timestamp;
      }

      // 4. Fire Lasers (Normal vs Click-Boost Triple Laser)
      const isBoosted = isMouseDownRef.current;
      const fireInterval = isBoosted ? 140 : 180;

      if (timestamp - lastShootRef.current > fireInterval) {
        if (isBoosted) {
          // Triple Laser Spread
          lasersRef.current.push(
            { x: shipXRef.current, y: shipY - 14, vx: 0, vy: -7.5 },
            { x: shipXRef.current - 5, y: shipY - 10, vx: -1.3, vy: -7.2 },
            { x: shipXRef.current + 5, y: shipY - 10, vx: 1.3, vy: -7.2 }
          );
          playLaserSound(true);
        } else {
          // Single Straight Laser
          lasersRef.current.push({
            x: shipXRef.current,
            y: shipY - 14,
            vx: 0,
            vy: -6.5
          });
          playLaserSound(false);
        }
        lastShootRef.current = timestamp;
      }

      // 5. Fire Thruster Flame particles
      // Generate sparks that drift behind
      if (Math.random() < 0.8) {
        const flameOffset = Math.sin(timestamp * 0.05) * 2;
        thrustersRef.current.push({
          x: shipXRef.current + flameOffset,
          y: shipY + 8,
          // Sparks blow backward and drift opposite to movement
          vx: -velocityX * 0.18 + (Math.random() - 0.5) * 0.6,
          vy: 1.5 + Math.random() * 2.5,
          radius: 1.5 + Math.random() * 2,
          color: Math.random() < 0.5 ? '#06B6D4' : '#3178C6',
          alpha: 0.9
        });
      }

      // 6. Update & Draw Thruster Sparks
      for (let i = thrustersRef.current.length - 1; i >= 0; i--) {
        const t = thrustersRef.current[i];
        t.x += t.vx;
        t.y += t.vy;
        t.alpha -= 0.045;

        if (t.alpha <= 0) {
          thrustersRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.globalAlpha = t.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = t.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      // 7. Update & Draw Lasers
      ctx.fillStyle = isBoosted ? "#00FFFF" : "#FF66FF";
      ctx.shadowBlur = 8;
      ctx.shadowColor = isBoosted ? "#00FFFF" : "#FF66FF";
      for (let i = lasersRef.current.length - 1; i >= 0; i--) {
        const l = lasersRef.current[i];
        l.x += l.vx;
        l.y += l.vy;

        // Draw tilted lasers
        ctx.fillRect(l.x - 1.5, l.y, 3, 10);

        // Remove offscreen
        if (l.y < -10 || l.x < -10 || l.x > canvas.width + 10) {
          lasersRef.current.splice(i, 1);
        }
      }
      ctx.shadowBlur = 0; // Reset shadow

      // 8. Update & Draw Bugs
      for (let i = bugsRef.current.length - 1; i >= 0; i--) {
        const b = bugsRef.current[i];
        b.y += b.speed;

        // Draw bug body glowing
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.fillStyle = "rgba(12, 12, 12, 0.9)";
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = b.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow

        // Draw Bug Label inside
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 8px font-mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.label, b.x, b.y);

        // Check if reaches bottom
        if (b.y - b.radius > canvas.height) {
          bugsRef.current.splice(i, 1);
          setShields((prev) => {
            const next = prev - 1;
            playHurtSound();
            if (next <= 0) {
              setGameState('GAMEOVER');
            }
            return next;
          });
        }
      }

      // 9. Update & Draw Laser Hit Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset
      }

      // 10. Collision Detection (Laser vs Bug)
      for (let li = lasersRef.current.length - 1; li >= 0; li--) {
        const l = lasersRef.current[li];
        for (let bi = bugsRef.current.length - 1; bi >= 0; bi--) {
          const b = bugsRef.current[bi];

          const dx = l.x - b.x;
          const dy = l.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < b.radius + 3) {
            // Collision!
            spawnExplosion(b.x, b.y, b.color);
            playExplodeSound();
            bugsRef.current.splice(bi, 1);
            lasersRef.current.splice(li, 1);
            setScore((prev) => {
              const next = prev + 10;
              if (next > highScore) {
                setHighScore(next);
                localStorage.setItem("khoa_portfolio_game_highscore", String(next));
              }
              return next;
            });
            break; // Exit inner loop
          }
        }
      }

      // 11. Draw Player Ship with Tilt Rotation
      ctx.save();
      ctx.translate(shipXRef.current, shipY);
      ctx.rotate(tiltAngle);

      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = isBoosted ? "#00FFFF" : "#61DAFB";
      ctx.fillStyle = isBoosted ? "#00FFFF" : "#61DAFB";

      ctx.beginPath();
      // Draw a sleek spaceship triangle
      ctx.moveTo(0, -15);
      ctx.lineTo(-12, 8);
      ctx.lineTo(12, 8);
      ctx.closePath();
      ctx.fill();

      // Mini wings accent lines
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(-12, 8);
      ctx.moveTo(6, 0);
      ctx.lineTo(12, 8);
      ctx.stroke();

      ctx.restore();

      animRef.current = requestAnimationFrame(gameLoop);
    };

    animRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [gameState, score, highScore]);

  // Handle ship control X movement
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    // Bound target position inside screen boundaries
    mouseRef.current.x = Math.max(15, Math.min(canvas.width - 15, relativeX));
  };

  const handleMouseDown = () => {
    isMouseDownRef.current = true;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center select-none font-mono">
      
      {/* Game Header Panel */}
      <div className="w-full flex items-center justify-between px-2 mb-2 text-xs border-b border-white/5 pb-2">
        <div className="flex items-center gap-1">
          <span className="text-white/40">SCORE:</span>
          <span className="text-green-400 font-bold">{score}</span>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-2.5 rounded-sm border ${
                i < shields ? 'bg-red-500 border-red-500 shadow-[0_0_5px_#ef4444]' : 'bg-transparent border-white/10'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-white/40">HI-SCORE:</span>
          <span className="text-yellow-400 font-bold">{highScore}</span>
        </div>
      </div>

      {/* Screen Frame */}
      <div className="w-full relative h-[320px] bg-black border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
        
        {/* Glow indicator at the top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-[#B600A8] to-cyan-400 opacity-60" />

        {gameState === 'START' && (
          <div className="absolute z-10 flex flex-col items-center gap-6 px-4 text-center">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#B600A8] uppercase">
                CYBER BUG BLASTER
              </h3>
              <p className="text-[10px] text-white/40 leading-relaxed font-sans mt-1">
                Di chuyển chuột để trượt mượt mà. 
                <br />
                <span className="text-cyan-400 font-semibold">👉 CLICK & GIỮ CHUỘT</span> để bắn súng 3 nòng siêu tốc!
              </p>
            </div>
            <button
              onClick={handleStartGame}
              onMouseEnter={playHoverSound}
              className="px-6 py-2 rounded-full border border-white text-black bg-white hover:bg-transparent hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.25)]"
            >
              BẮT ĐẦU CHƠI
            </button>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <canvas
            ref={canvasRef}
            width={460}
            height={320}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full h-full cursor-none bg-gradient-to-b from-black via-black to-[#05000a]"
          />
        )}

        {gameState === 'GAMEOVER' && (
          <div className="absolute z-10 flex flex-col items-center gap-4 px-4 text-center">
            <div className="flex flex-col gap-1">
              <h3 className="text-red-500 text-base font-extrabold tracking-widest uppercase">
                THẤT BẠI (GAME OVER)
              </h3>
              <p className="text-xs text-white/50">
                Các lỗi đã vượt qua lớp phòng thủ của bạn!
              </p>
              <div className="flex justify-center gap-6 mt-3 text-xs">
                <div>
                  <span className="text-white/40 block text-[10px]">ĐIỂM ĐẠT:</span>
                  <span className="text-green-400 font-bold text-sm">{score}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">KỶ LỤC:</span>
                  <span className="text-yellow-400 font-bold text-sm">{highScore}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleStartGame}
              onMouseEnter={playHoverSound}
              className="mt-2 px-6 py-2 rounded-full border border-red-500 text-white bg-red-500/20 hover:bg-red-500 font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.25)]"
            >
              CHƠI LẠI
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
