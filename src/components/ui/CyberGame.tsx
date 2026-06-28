import { useEffect, useRef, useState } from 'react';
import { playClickSound, playHoverSound, getMuteStatus } from '../../utils/soundEffects';

interface Laser {
  x: number;
  y: number;
  speed: number;
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
  const mouseRef = useRef({ x: 150 });
  const animRef = useRef<number>(0);

  // Lists of active entities
  const lasersRef = useRef<Laser[]>([]);
  const bugsRef = useRef<Bug[]>([]);
  const particlesRef = useRef<Particle[]>([]);

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
  const playLaserSound = () => {
    if (getMuteStatus()) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  };

  const playExplodeSound = () => {
    if (getMuteStatus()) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Synthesize noise buffer for explosion
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
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.5 + Math.random() * 2,
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

      // 1. Spawning Invaders
      if (timestamp - lastSpawnRef.current > 750) {
        const typeIndex = Math.floor(Math.random() * BUG_TYPES.length);
        const type = BUG_TYPES[typeIndex];
        bugsRef.current.push({
          x: type.radius + Math.random() * (canvas.width - type.radius * 2),
          y: -20,
          speed: type.speed + (score * 0.02), // Accelerate as score increases
          radius: type.radius,
          label: type.label,
          color: type.color
        });
        lastSpawnRef.current = timestamp;
      }

      // 2. Shooting Lasers
      if (timestamp - lastShootRef.current > 180) {
        lasersRef.current.push({
          x: mouseRef.current.x,
          y: canvas.height - 35,
          speed: 6
        });
        playLaserSound();
        lastShootRef.current = timestamp;
      }

      // 3. Update & Draw Lasers
      ctx.fillStyle = "#FF66FF";
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#FF66FF";
      for (let i = lasersRef.current.length - 1; i >= 0; i--) {
        const l = lasersRef.current[i];
        l.y -= l.speed;

        // Draw laser beam
        ctx.fillRect(l.x - 1.5, l.y, 3, 10);

        // Remove offscreen
        if (l.y < 0) {
          lasersRef.current.splice(i, 1);
        }
      }
      ctx.shadowBlur = 0; // Reset shadow

      // 4. Update & Draw Bugs
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

      // 5. Update & Draw Particles
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

      // 6. Collision Detection (Laser vs Bug)
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
            break; // Laser is destroyed, exit inner loop
          }
        }
      }

      // 7. Draw Player Ship
      const shipX = mouseRef.current.x;
      const shipY = canvas.height - 25;

      ctx.shadowBlur = 12;
      ctx.shadowColor = "#61DAFB";
      ctx.fillStyle = "#61DAFB";
      ctx.beginPath();
      // Draw a sleek spaceship triangle
      ctx.moveTo(shipX, shipY - 14);
      ctx.lineTo(shipX - 12, shipY + 8);
      ctx.lineTo(shipX + 12, shipY + 8);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0; // Reset

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
    // Bound position inside screen boundaries
    mouseRef.current.x = Math.max(15, Math.min(canvas.width - 15, relativeX));
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
                Di chuyển chuột sang 2 bên để di chuyển phi thuyền và tiêu diệt các lỗi hệ thống trước khi chúng vượt qua lớp giáp bảo vệ!
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
