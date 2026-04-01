import { motion, AnimatePresence } from "motion/react";
import { Gift, Check } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { STREAK_REWARDS } from "../../../constants";

export function StreakRewards({ streak, nextMilestone, daysUntilNext, showReward, rewardAnim, earnedReward }) {
  return (
    <>
      {/* 연속 출석 보상 카드 */}
      <Card className="p-6 glass neon-border-cyan relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/5 to-[#00ff88]/5" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-5">
            <Gift className="w-5 h-5 text-[#ffaa00]" style={{ filter: "drop-shadow(0 0 8px rgba(255,170,0,.8))" }} />
            <h3 className="text-[#e0d9ff]">연속 출석 보상</h3>
            <span className="ml-auto text-xs text-[#a393d1] bg-white/5 px-2 py-1 rounded-lg border border-white/10">
              현재 {streak}일 연속
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {STREAK_REWARDS.map((r) => {
              const reached = streak >= r.streak;
              const isNext  = nextMilestone?.streak === r.streak;
              return (
                <motion.div
                  key={r.streak}
                  whileHover={{ scale: 1.05 }}
                  className={`rounded-2xl p-3 text-center border relative overflow-hidden transition-all ${
                    reached ? "border-[#00ff88]/50 bg-gradient-to-br from-[#00ff88]/15 to-[#00d9ff]/15"
                    : isNext ? "border-[#ff10f0]/60 bg-gradient-to-br from-[#ff10f0]/10 to-[#bd00e8]/10"
                             : "glass border-white/10"
                  }`}
                  style={reached ? { boxShadow: `0 0 14px ${r.glow}` } : isNext ? { boxShadow: "0 0 12px rgba(255,16,240,.3)" } : {}}
                >
                  {reached && (
                    <div className="absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(circle at 50% 30%, ${r.glow.replace("0.6","0.15")}, transparent 70%)` }} />
                  )}
                  <div className="relative z-10">
                    <div className="text-3xl mb-1">{r.icon}</div>
                    <p className={`text-[10px] font-bold tracking-wide ${reached ? "text-[#00ff88]" : isNext ? "text-[#ff10f0]" : "text-[#6b5b95]"}`}>
                      {r.streak}일 연속
                    </p>
                    <p className={`text-[10px] mt-0.5 ${reached ? "text-[#e0d9ff]" : isNext ? "text-[#c8b9f0]" : "text-[#4a3a6a]"}`}>
                      {r.label}
                    </p>
                    {reached ? (
                      <div className="mt-1.5 flex justify-center">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00d9ff] flex items-center justify-center" style={{ boxShadow: "0 0 8px rgba(0,255,136,.7)" }}>
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      </div>
                    ) : isNext ? (
                      <div className="mt-1.5">
                        <span className="text-[9px] text-[#ff10f0] bg-[#ff10f0]/15 px-1.5 py-0.5 rounded-full border border-[#ff10f0]/30">
                          D-{daysUntilNext}
                        </span>
                      </div>
                    ) : (
                      <div className="mt-1.5 w-5 h-5 mx-auto rounded-full border border-white/10" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* 보상 팝업 */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 40 }}
              animate={{ scale: rewardAnim ? 1 : 0.85, opacity: rewardAnim ? 1 : 0, y: rewardAnim ? 0 : -50 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="glass-strong rounded-3xl p-10 text-center relative overflow-hidden"
              style={{
                border: earnedReward ? `1px solid ${earnedReward.color}60` : "1px solid rgba(255,16,240,.5)",
                boxShadow: earnedReward
                  ? `0 0 60px ${earnedReward.glow}, 0 0 120px ${earnedReward.glow.replace("0.6","0.2")}`
                  : "0 0 60px rgba(255,16,240,.5)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/15 via-[#bd00e8]/15 to-[#00d9ff]/15" />
              <div className="absolute inset-0 scanlines opacity-10" />
              <div className="relative z-10">
                {earnedReward ? (
                  <>
                    <motion.div
                      animate={{ rotate: [0, -15, 15, -10, 0], scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.7 }}
                      className="text-8xl mb-3"
                    >
                      {earnedReward.icon}
                    </motion.div>
                    <h2 className="chrome-text text-2xl mb-1 neon-pink">보상 획득!</h2>
                    <p className="text-white font-bold text-xl mb-1">{earnedReward.label}</p>
                    <p className="text-[#a393d1] text-sm">{earnedReward.streak}일 연속 출석 달성 🎉</p>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                      className="text-7xl mb-3"
                    >✅</motion.div>
                    <h2 className="chrome-text text-2xl mb-1 neon-cyan">출석 완료!</h2>
                    <p className="text-[#00d9ff]">{streak}일 연속 출석 중</p>
                    {nextMilestone && (
                      <p className="text-[#a393d1] text-sm mt-1">
                        {nextMilestone.icon} {nextMilestone.label}까지 {daysUntilNext}일 남음
                      </p>
                    )}
                  </>
                )}
                <div className="mt-4 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-lg"
                      initial={{ y: 0, opacity: 1 }}
                      animate={{ y: -28, opacity: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.9, repeat: Infinity, repeatDelay: 0.4 }}
                    >
                      ✨
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
