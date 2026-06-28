import { useState, useEffect, useRef, type FormEvent } from 'react';
import { playClickSound, playHoverSound } from '../../utils/soundEffects';

interface TerminalLine {
  text: string;
  type: 'system' | 'input' | 'output' | 'error';
}

const BOOT_SEQUENCE = [
  "Initializing Khoa-IT OS v4.0.0...",
  "Loading packages: [React 18, TypeScript 5, Tailwind v3, Framer Motion]... SUCCESS",
  "Verifying Google Sheets API integration... ONLINE",
  "Active session: GUEST_USER@NETLIFY",
  "Gõ 'help' để xem danh sách câu lệnh hệ thống."
];

export const CyberTerminal = () => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const historyEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Run boot sequence on mount
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setHistory((prev) => [...prev, { text: BOOT_SEQUENCE[currentLine], type: 'system' }]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom on updates
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const newHistory: TerminalLine[] = [
      ...history,
      { text: `khoa-it@OS:~$ ${cmd}`, type: 'input' }
    ];

    if (!cleanCmd) {
      setHistory(newHistory);
      return;
    }

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          text: "Các câu lệnh khả dụng:\n  - about: Giới thiệu bản thân Khoa\n  - skills: Danh sách kỹ năng chuyên môn\n  - contact: Thông tin liên hệ trực tiếp\n  - clear: Xóa màn hình terminal\n  - system: Xem thông số hệ điều hành",
          type: 'output'
        });
        break;
      case 'about':
        newHistory.push({
          text: "Tôi là sinh viên Công nghệ thông tin & Web Designer chuyên nghiệp. Đam mê thiết kế các trang web có hoạt ảnh 3D cao cấp và tối ưu hóa trải nghiệm tương tác của người dùng.",
          type: 'output'
        });
        break;
      case 'skills':
        newHistory.push({
          text: "KỸ NĂNG CHUYÊN MÔN:\n  • Lập trình: React, TypeScript, Node.js, HTML5, CSS3\n  • Thiết kế: UI/UX, Figma Mockup, Motion Design\n  • Cơ sở dữ liệu & API: RESTful APIs, Google Sheets Database, MongoDB\n  • Công cụ: Git, Vite, Tailwind CSS",
          type: 'output'
        });
        break;
      case 'contact':
        newHistory.push({
          text: "THÔNG TIN LIÊN HỆ:\n  • Email: khoa.itdeveloper@gmail.com\n  • Portfolio: khoa-it.netlify.app\n  👉 Nhấp nút 'LIÊN HỆ NGAY' phía dưới để gửi tin nhắn trực tiếp!",
          type: 'output'
        });
        break;
      case 'system':
        newHistory.push({
          text: `HỆ THỐNG:\n  • Kernel: React-Vite-Node v5.4.21\n  • Platform: Browser (Netlify CDN)\n  • Status: 100% OPERATIONAL\n  • Ambient Color: PURPLE_NEON_MORPH`,
          type: 'output'
        });
        break;
      case 'clear':
        setHistory([]);
        setInputVal("");
        return;
      default:
        newHistory.push({
          text: `Lệnh không tìm thấy: '${cleanCmd}'. Gõ 'help' để xem danh sách câu lệnh.`,
          type: 'error'
        });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    playClickSound();
    handleCommand(inputVal);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={focusInput}
      onMouseEnter={playHoverSound}
      className="w-full h-[320px] bg-black/75 border border-white/5 rounded-2xl p-4 font-mono text-left overflow-y-auto flex flex-col justify-between text-xs sm:text-sm custom-scrollbar shadow-2xl relative"
    >
      {/* Glow highlight */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-magenta-500 to-orange-500 opacity-60" />

      {/* Screen Log */}
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1 mb-3 custom-scrollbar">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === 'system' ? 'text-purple-400/80' :
              line.type === 'input' ? 'text-white' :
              line.type === 'output' ? 'text-green-400' :
              'text-red-400'
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={historyEndRef} />
      </div>

      {/* Input Line */}
      <form onSubmit={onSubmit} className="flex items-center gap-1.5 border-t border-white/5 pt-3">
        <span className="text-purple-400 font-bold shrink-0">khoa-it@OS:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 bg-transparent text-white focus:outline-none placeholder-white/20 select-text"
          placeholder="Nhập lệnh..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {/* Blinking CLI Cursor */}
        <span className="w-2 h-4 bg-green-400 animate-[pulse_1s_infinite] shrink-0" />
      </form>
    </div>
  );
};
