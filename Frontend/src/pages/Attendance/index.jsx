import { motion } from "motion/react";
import { Calendar, Flame, Sparkles, Check } from "lucide-react";
import { Card } from "../../components/ui/card";
import { useAttendance } from "../../hooks/useAttendance";
import { AttendanceCalendar } from "./components/AttendanceCalendar";
import { StreakRewards } from "./components/StreakRewards";

export function Attendance() {
  const {
    attended, todayChecked, streak,
    nextMilestone, lastReached, daysUntilNext, progressPct,
    showReward, rewardAnim, earnedReward,
    checkIn, prevMonth, nextMonth,
    viewYear, viewMonth,
  } = useAttendance();

  const progressFrom = lastReached?.streak ?? 0;
  const progressTo   = nextMilestone?.streak ?? 30;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* 헤더 */}
      <div className="text-center space-y-3">
        <div className="inline-block p-4 rounded-2xl glass-strong neon-border-pink relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/20 to-[#00d9ff]/20" />
          <Calendar className="w-14 h-14 text-[#00d9ff] relative z-10" style={{ filter: "drop-shadow(0 0 16px rgba(0,217,255,0.9))" }} />
        </div>
        <h1 className="chrome-text text-4xl">출석체크</h1>
        <p className="text-[#00d9ff] neon-cyan">연속 출석으로 박스와 열쇠를 획득하세요</p>
      </div>

      {/* 스트릭 진행 카드 */}
      <Card className="p-6 glass-strong neon-border-pink relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/10 via-[#bd00e8]/10 to-[#00d9ff]/10" />
        <div className="absolute inset-0 scanlines opacity-5" />
        <div className="relative z-10 space-y-5">
          {/* 스트릭 + 다음 보상 */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6b00] to-[#ffaa00] flex items-center justify-center shrink-0" style={{ boxShadow: "0 0 20px rgba(255,107,0,0.55)" }}>
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-[#a393d1] text-xs tracking-widest uppercase">현재 연속 출석</p>
                <p className="text-4xl font-black chrome-text leading-none">
                  {streak}<span className="text-lg text-[#a393d1] ml-1">일</span>
                </p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div className="text-center sm:text-right">
              {nextMilestone ? (
                <>
                  <p className="text-[#a393d1] text-xs tracking-widest uppercase mb-0.5">다음 보상까지</p>
                  <p className="text-3xl font-black text-[#00ff88] leading-none" style={{ filter: "drop-shadow(0 0 8px rgba(0,255,136,0.7))" }}>
                    {daysUntilNext}<span className="text-base text-[#a393d1] ml-1">일</span>
                  </p>
                  <p className="text-xs text-[#a393d1] mt-1">
                    {nextMilestone.icon} {nextMilestone.label} ({nextMilestone.streak}일 연속)
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[#ffaa00] text-sm font-bold">🏆 모든 보상 달성!</p>
                  <p className="text-[#a393d1] text-xs mt-1">전설 달성자</p>
                </>
              )}
            </div>
          </div>

          {/* 진행 바 */}
          <div>
            <div className="flex justify-between text-xs text-[#a393d1] mb-1.5">
              <span>{progressFrom}일</span>
              <span>{progressTo}일 연속 → {nextMilestone?.icon} {nextMilestone?.label ?? "완주"}</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ background: "linear-gradient(90deg, #ff10f0, #bd00e8, #00d9ff)", boxShadow: "0 0 10px rgba(255,16,240,0.6)" }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#6b5b95] mt-1">
              <span>{streak}일 달성</span>
              <span>{nextMilestone ? `${nextMilestone.streak - streak}일 더 필요` : "완주!"}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 달력 */}
      <AttendanceCalendar
        attended={attended}
        viewYear={viewYear}
        viewMonth={viewMonth}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
      />

      {/* 출석체크 버튼 */}
      <div className="flex justify-center">
        <motion.button
          onClick={checkIn}
          disabled={todayChecked}
          whileHover={!todayChecked ? { scale: 1.04 } : {}}
          whileTap={!todayChecked ? { scale: 0.97 } : {}}
          className={`px-12 py-4 rounded-2xl font-bold tracking-widest transition-all duration-300 relative overflow-hidden text-lg ${
            todayChecked
              ? "glass border border-[#00ff88]/40 text-[#00ff88] cursor-default"
              : "glass-strong neon-border-pink text-white cursor-pointer"
          }`}
          style={!todayChecked ? {
            background: "linear-gradient(135deg,rgba(255,16,240,.25),rgba(189,0,232,.25),rgba(0,217,255,.25))",
            boxShadow: "0 0 24px rgba(255,16,240,.35), 0 0 48px rgba(255,16,240,.12)",
          } : {}}
        >
          <span className="relative z-10 flex items-center gap-2">
            {todayChecked ? (
              <><Check className="w-5 h-5" style={{ filter: "drop-shadow(0 0 6px rgba(0,255,136,.8))" }} />오늘 출석 완료!</>
            ) : (
              <><Sparkles className="w-5 h-5" style={{ filter: "drop-shadow(0 0 8px rgba(255,16,240,.8))" }} />오늘 출석체크</>
            )}
          </span>
        </motion.button>
      </div>

      {/* 연속 출석 보상 + 팝업 */}
      <StreakRewards
        streak={streak}
        nextMilestone={nextMilestone}
        daysUntilNext={daysUntilNext}
        showReward={showReward}
        rewardAnim={rewardAnim}
        earnedReward={earnedReward}
      />
    </div>
  );
}
