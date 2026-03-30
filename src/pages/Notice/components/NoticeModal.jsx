import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { Button } from "../../../components/ui/button";

const TYPE_GRADIENT = {
  이벤트:  "from-[#ff10f0] to-[#bd00e8]",
  업데이트:"from-[#00d9ff] to-[#0088cc]",
  공지:    "from-[#00ff88] to-[#00cc6a]",
};

export function NoticeModal({ notice, onClose }) {
  if (!notice) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl glass-strong neon-border-pink rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-lg bg-gradient-to-r ${TYPE_GRADIENT[notice.type]} text-white text-sm font-semibold`}>
                {notice.type}
              </span>
              <div className="flex items-center gap-2 text-sm text-[#a393d1]">
                <Calendar className="w-4 h-4" />
                <span>{notice.date}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#a393d1] hover:text-[#ff10f0] transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          <h2 className="text-2xl font-bold text-white chrome-text mb-6">{notice.title}</h2>

          <div className="text-[#e0d9ff] whitespace-pre-line leading-relaxed">
            {notice.content}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={onClose}
              className="glass neon-border-cyan hover:neon-border-pink bg-gradient-to-r from-[#00d9ff]/30 to-[#00ff88]/30 text-white font-semibold"
            >
              확인
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
