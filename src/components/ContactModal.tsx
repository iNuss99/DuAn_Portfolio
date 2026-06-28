import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { playSuccessSound, playClickSound, playHoverSound } from '../utils/soundEffects';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Submission {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  timestamp: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("ui-ux");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const sheetUrl = personalInfo.googleSheetUrl;
  const hasSheetUrl =
    sheetUrl &&
    sheetUrl !== "YOUR_GOOGLE_SHEETS_APPS_SCRIPT_URL" &&
    sheetUrl.startsWith("http");

  useEffect(() => {
    const savedSubs = JSON.parse(localStorage.getItem("khoa_portfolio_submissions") || "[]");
    setSubmissions(savedSubs);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const payload: Submission = {
      fullName,
      phone,
      email,
      projectType:
        projectType === "ui-ux" ? "Thiết kế UI/UX" :
        projectType === "frontend" ? "Lập trình Frontend (React / TypeScript)" :
        projectType === "interactive" ? "Thiết kế Tương tác & Animation" :
        projectType === "backend" ? "Lập trình Backend & API" :
        projectType === "fullstack" ? "Phát triển Fullstack Web App" : "Khác",
      message,
      timestamp: new Date().toLocaleString("vi-VN"),
    };

    if (hasSheetUrl) {
      try {
        await fetch(sheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const updated = [payload, ...submissions];
        localStorage.setItem("khoa_portfolio_submissions", JSON.stringify(updated));
        setSubmissions(updated);

        setSuccess(true);
        playSuccessSound();
        setFullName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } catch (err) {
        console.error(err);
        setError("Có lỗi khi kết nối với Google Sheet. Vui lòng kiểm tra lại URL.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Local simulation when Google Sheets URL is not configured yet
      setTimeout(() => {
        const updated = [payload, ...submissions];
        localStorage.setItem("khoa_portfolio_submissions", JSON.stringify(updated));
        setSubmissions(updated);

        setSuccess(true);
        playSuccessSound();
        setFullName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setIsSubmitting(false);
      }, 1200);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          {/* Form Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-xl bg-[#141414] border border-[#2d2d2d] rounded-[2rem] p-6 md:p-8 text-white relative my-8"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 flex items-center gap-3">
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                onMouseEnter={playHoverSound}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all"
              >
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Title */}
            <div className="mb-6 pr-20 text-left">
              <h2 className="font-heading italic text-4xl tracking-tight text-white leading-none font-bold">
                GỬI TIN NHẮN
              </h2>
              <p className="text-xs text-white/50 font-sans mt-2">
                Hãy để lại lời nhắn, Khoa sẽ phản hồi bạn trong thời gian sớm nhất.
              </p>
            </div>

            {/* Success View */}
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading italic text-3xl font-bold text-white tracking-tight">
                  Đã nhận thông tin!
                </h3>
                <p className="text-sm text-white/70 max-w-sm font-sans font-light leading-relaxed">
                  Cảm ơn bạn đã liên hệ. Khoa sẽ phản hồi bạn qua Email hoặc Số điện thoại trong vòng 24 giờ tới.
                </p>
                {hasSheetUrl && (
                  <p className="text-xs text-green-400 font-sans font-semibold">
                    [Đã gửi dữ liệu trực tiếp vào Google Sheet]
                  </p>
                )}
                <button
                  onClick={() => {
                    playClickSound();
                    setSuccess(false);
                  }}
                  onMouseEnter={playHoverSound}
                  className="mt-6 bg-white text-black text-sm font-semibold rounded-full px-6 py-2 hover:bg-white/90 active:scale-95 transition-all"
                >
                  Gửi tin nhắn khác
                </button>
              </motion.div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                {error && (
                  <div className="p-3 bg-red-950/50 border border-red-500/20 text-red-300 text-xs rounded-xl">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-xs font-semibold text-white/70 font-sans">
                    Họ và Tên
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-white/70 font-sans">
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="0912345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-white/70 font-sans">
                      Địa chỉ Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectType" className="text-xs font-semibold text-white/70 font-sans">
                    Dịch vụ quan tâm
                  </label>
                  <div className="relative">
                    <select
                      id="projectType"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-black/30 border border-[#2d2d2d] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 cursor-pointer appearance-none"
                    >
                      <option value="ui-ux" className="bg-[#141414]">01 — Thiết kế UI/UX (UI/UX Design)</option>
                      <option value="frontend" className="bg-[#141414]">02 — Lập trình Frontend (React / TypeScript)</option>
                      <option value="interactive" className="bg-[#141414]">03 — Thiết kế Tương tác &amp; Animation</option>
                      <option value="backend" className="bg-[#141414]">04 — Lập trình Backend &amp; API</option>
                      <option value="fullstack" className="bg-[#141414]">05 — Phát triển Fullstack Web App</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/40">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-white/70 font-sans">
                    Nội dung yêu cầu
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    required
                    placeholder="Mô tả dự án hoặc gửi lời chào đến Khoa..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={playHoverSound}
                  className="mt-4 bg-white text-black font-semibold text-sm rounded-full py-3.5 flex items-center justify-center gap-2 hover:bg-white/90 active:scale-95 disabled:bg-white/50 disabled:scale-100 transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý tin nhắn...
                    </>
                  ) : (
                    "Xác nhận gửi thông tin"
                  )}
                </button>
              </form>
            )}

            {/* Local submissions log preview */}
            {submissions.length > 0 && !success && (
              <div className="mt-8 pt-6 border-t border-white/10 text-left">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-3 font-sans">
                  Tin nhắn đã gửi nháp ({submissions.length}):
                </span>
                <div className="max-h-[100px] overflow-y-auto flex flex-col gap-2 pr-1 custom-scrollbar">
                  {submissions.map((sub, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-2.5 rounded-lg text-[10px] flex justify-between items-center font-sans">
                      <div>
                        <span className="font-semibold text-white/80">{sub.fullName}</span>
                        <span className="text-white/40 ml-2">({sub.projectType})</span>
                      </div>
                      <span className="text-white/40">{sub.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
