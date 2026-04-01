import { motion } from "motion/react";
import { Calendar, Bell, Megaphone } from "lucide-react";
import { Card } from "../../../components/ui/card";

const TYPE_GRADIENT = {
  이벤트:  "from-[#ff10f0] to-[#bd00e8]",
  업데이트:"from-[#00d9ff] to-[#0088cc]",
  공지:    "from-[#00ff88] to-[#00cc6a]",
};

const TYPE_ICON = { 이벤트: Megaphone, 업데이트: Bell, 공지: Bell };

const TYPE_COLOR = {
  이벤트:  { color: "#ff10f0", glow: "rgba(255,16,240,0.8)" },
  업데이트:{ color: "#00d9ff", glow: "rgba(0,217,255,0.8)"  },
  공지:    { color: "#00ff88", glow: "rgba(0,255,136,0.8)"  },
};

export function NoticeCard({ notice, index, isPinned, onClick }) {
  const Icon  = TYPE_ICON[notice.type]    ?? Bell;
  const style = TYPE_COLOR[notice.type]  ?? TYPE_COLOR["공지"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className={`p-5 glass transition-all cursor-pointer group relative overflow-hidden ${
          isPinned
            ? "neon-border-pink hover:neon-border-cyan"
            : "neon-border-cyan hover:neon-border-pink"
        }`}
        onClick={() => onClick(notice)}
      >
        {isPinned && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffaa00]/5 to-transparent opacity-50" />
        )}
        {!isPinned && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/5 to-[#00d9ff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            <Icon
              className="w-6 h-6 relative z-10"
              style={{ color: isPinned ? "#ffaa00" : style.color, filter: `drop-shadow(0 0 8px ${isPinned ? "rgba(255,170,0,0.8)" : style.glow})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-[#e0d9ff] font-medium group-hover:text-[#00d9ff] transition-colors">{notice.title}</h3>
              <span className={`px-2 py-1 rounded-lg bg-gradient-to-r ${TYPE_GRADIENT[notice.type]} text-white text-xs font-semibold whitespace-nowrap flex-shrink-0`}>
                {notice.type}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#a393d1]">
              <Calendar className="w-4 h-4" />
              <span>{notice.date}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
