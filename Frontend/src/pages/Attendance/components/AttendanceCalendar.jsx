import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { toDateStr } from "../../../hooks/useAttendance";

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

export function AttendanceCalendar({ attended, viewYear, viewMonth, onPrevMonth, onNextMonth }) {
  const today      = new Date();
  const firstDay   = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth= new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday   = (d) => viewYear === today.getFullYear() && viewMonth === today.getMonth() && d === today.getDate();
  const isChecked = (d) => attended.includes(toDateStr(viewYear, viewMonth, d));
  const isFuture  = (d) => new Date(viewYear, viewMonth, d) > new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <Card className="p-6 glass-strong neon-border-cyan relative overflow-hidden">
      <div className="absolute inset-0 retro-grid opacity-10" />

      {/* 월 네비게이션 */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <button
          onClick={onPrevMonth}
          className="w-10 h-10 rounded-xl glass neon-border-cyan hover:neon-border-pink flex items-center justify-center text-[#00d9ff] hover:text-[#ff10f0] transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-white chrome-text tracking-widest">
          {viewYear}년 {viewMonth + 1}월
        </h2>
        <button
          onClick={onNextMonth}
          className="w-10 h-10 rounded-xl glass neon-border-cyan hover:neon-border-pink flex items-center justify-center text-[#00d9ff] hover:text-[#ff10f0] transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="relative z-10 grid grid-cols-7 mb-2">
        {DAY_LABELS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-semibold py-2 tracking-widest ${
              i === 0 ? "text-[#ff6b6b]" : i === 6 ? "text-[#00d9ff]" : "text-[#a393d1]"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="relative z-10 grid grid-cols-7 gap-1.5">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e-${idx}`} />;
          const checked = isChecked(day);
          const future  = isFuture(day);
          const today_  = isToday(day);
          const isSun   = idx % 7 === 0;
          const isSat   = idx % 7 === 6;

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.01, duration: 0.25 }}
              className={`
                relative aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5
                ${today_ ? "neon-border-pink" : "border border-white/10"}
                ${future ? "opacity-30" : ""}
                ${checked ? "bg-gradient-to-br from-[#00ff88]/15 to-[#00d9ff]/15" : "glass"}
                ${today_ ? "bg-gradient-to-br from-[#ff10f0]/15 to-[#00d9ff]/15" : ""}
                transition-all duration-200
              `}
              style={today_ ? { boxShadow: "0 0 12px rgba(255,16,240,0.4)" } : {}}
            >
              <span className={`text-sm font-semibold leading-none ${
                today_  ? "text-[#ff10f0] neon-pink" :
                checked ? "text-[#e0d9ff]" :
                future  ? "text-[#4a3a6a]" :
                isSun   ? "text-[#ff6b6b]" :
                isSat   ? "text-[#00d9ff]" :
                           "text-[#a393d1]"
              }`}>
                {day}
              </span>

              <AnimatePresence>
                {checked && (
                  <motion.div
                    key="chk"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00d9ff] flex items-center justify-center"
                    style={{ boxShadow: "0 0 8px rgba(0,255,136,0.7)" }}
                  >
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="relative z-10 flex items-center gap-5 mt-5 pt-4 border-t border-white/10 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00d9ff] flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          </div>
          <span className="text-xs text-[#a393d1]">출석 완료</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-xl border border-[#ff10f0]/60" style={{ boxShadow: "0 0 6px rgba(255,16,240,0.4)" }} />
          <span className="text-xs text-[#a393d1]">오늘</span>
        </div>
      </div>
    </Card>
  );
}
