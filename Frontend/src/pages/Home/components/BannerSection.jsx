import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Gift, Layers, Package, CalendarCheck, ChevronRight, Flame, Check } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { getAttendanceStreak } from "../../../hooks/useAttendance";

const BANNER_COUNT  = 3;
const INTERVAL_MS   = 5000;
const BANNER_COLORS = [
  "linear-gradient(90deg, #00d9ff, #00ff88)",
  "linear-gradient(90deg, #ff10f0, #ffaa00)",
  "linear-gradient(90deg, #bd00e8, #ff10f0)",
];
const DOT_COLORS = ["#00d9ff", "#ff10f0", "#bd00e8"];

// ── 배너 슬라이드 0: 조합 ─────────────────────────────────────────────────────
function CombineBanner() {
  return (
    <motion.div
      key="combine"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <Card className="p-8 bg-gradient-to-r from-[#00d9ff]/20 via-[#00ff88]/15 to-[#bd00e8]/20 glass-strong border-[#00d9ff]/40 relative overflow-hidden">
        <div className="absolute inset-0 scanlines opacity-10" />
        <div className="absolute inset-0 retro-grid opacity-15" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#00d9ff] rounded-full blur-[80px] opacity-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d9ff] to-[#00ff88] flex items-center justify-center shrink-0"
              style={{ boxShadow: "0 0 20px rgba(0,217,255,0.5)" }}
            >
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-white mb-1 neon-cyan">조합으로 새로운 밈을 만들어보세요!</h2>
              <p className="text-[#00d9ff]/80 text-sm">파편을 조합하여 희귀한 밈 NFT를 획득하세요</p>
            </div>
          </div>
          <Link to="/combine" className="shrink-0">
            <Button size="lg" className="glass-strong neon-border-cyan hover:neon-border-pink bg-gradient-to-r from-[#00d9ff]/30 to-[#00ff88]/30 text-white font-bold transition-all gap-2">
              <Sparkles className="w-5 h-5" />
              조합하러 가기
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

// ── 배너 슬라이드 1: 박스 개봉 ───────────────────────────────────────────────
function BoxOpenBanner() {
  return (
    <motion.div
      key="boxopen"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <Card className="p-8 bg-gradient-to-r from-[#ff10f0]/20 via-[#ffaa00]/15 to-[#ff6b00]/20 glass-strong border-[#ff10f0]/40 relative overflow-hidden">
        <div className="absolute inset-0 scanlines opacity-10" />
        <div className="absolute inset-0 retro-grid opacity-15" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#ffaa00] rounded-full blur-[80px] opacity-20 pointer-events-none" />
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#ffaa00]"
            style={{ left: `${20 + i * 18}%`, top: `${30 + (i % 2) * 40}%`, opacity: 0.6 }}
            animate={{ y: [-4, 4, -4], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffaa00] to-[#ff6b00] flex items-center justify-center shrink-0 relative overflow-hidden"
              style={{ boxShadow: "0 0 20px rgba(255,170,0,0.55)" }}
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, -8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2 }}
              >
                <Package className="w-7 h-7 text-white" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
            </div>
            <div>
              <h2 className="text-white mb-1" style={{ textShadow: "0 0 12px rgba(255,170,0,0.8), 0 0 24px rgba(255,170,0,0.4)" }}>
                신비한 박스를 개봉해보세요!
              </h2>
              <p className="text-[#ffaa00]/80 text-sm">상자를 열어 희귀한 NFT와 파편을 획득하세요</p>
            </div>
          </div>
          <Link to="/shop" className="shrink-0">
            <Button
              size="lg"
              className="glass-strong border-[#ffaa00]/50 hover:neon-border-pink bg-gradient-to-r from-[#ffaa00]/30 to-[#ff6b00]/30 text-white font-bold transition-all gap-2"
              style={{ boxShadow: "0 0 12px rgba(255,170,0,0.3)" }}
            >
              <Gift className="w-5 h-5" />
              박스 개봉하러 가기
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

// ── 배너 슬라이드 2: 출석체크 ─────────────────────────────────────────────────
function AttendanceBanner() {
  const info = getAttendanceStreak();

  return (
    <motion.div
      key="attendance"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <Card className="p-8 bg-gradient-to-r from-[#bd00e8]/20 via-[#ff10f0]/15 to-[#00d9ff]/20 glass-strong border-[#bd00e8]/40 relative overflow-hidden">
        <div className="absolute inset-0 scanlines opacity-10" />
        <div className="absolute inset-0 retro-grid opacity-15" />
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#bd00e8] rounded-full blur-[80px] opacity-20 pointer-events-none" />
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#ff10f0]"
            style={{ left: `${15 + i * 20}%`, top: `${25 + (i % 2) * 45}%`, opacity: 0.7 }}
            animate={{ y: [-5, 5, -5], opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
            transition={{ duration: 1.4 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#bd00e8] to-[#ff10f0] flex items-center justify-center shrink-0 relative overflow-hidden"
              style={{ boxShadow: "0 0 20px rgba(189,0,232,0.55)" }}
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <CalendarCheck className="w-7 h-7 text-white" />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
            </div>
            <div>
              <h2 className="text-white mb-1" style={{ textShadow: "0 0 12px rgba(189,0,232,0.8), 0 0 24px rgba(189,0,232,0.4)" }}>
                {info.todayChecked ? "오늘 출석 완료! 🎉" : "오늘 출석체크 하셨나요?"}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-sm text-[#ff10f0]/90">
                  <Flame className="w-4 h-4 text-[#ff6b00]" style={{ filter: "drop-shadow(0 0 6px rgba(255,107,0,.8))" }} />
                  {info.streak}일 연속 출석 중
                </span>
                {info.nextReward && (
                  <span className="text-sm text-[#c8b9f0]">
                    · {info.nextReward.icon} {info.nextReward.label}까지&nbsp;
                    <span className="text-white font-bold">{info.nextReward.streak - info.streak}일</span>&nbsp;남음
                  </span>
                )}
                {info.todayChecked && (
                  <span className="flex items-center gap-1 text-[#00ff88] text-sm" style={{ filter: "drop-shadow(0 0 6px rgba(0,255,136,.7))" }}>
                    <Check className="w-4 h-4" strokeWidth={3} /> 오늘 완료
                  </span>
                )}
              </div>
            </div>
          </div>
          <Link to="/attendance" className="shrink-0">
            <Button
              size="lg"
              className="glass-strong border-[#bd00e8]/50 hover:neon-border-pink bg-gradient-to-r from-[#bd00e8]/30 to-[#ff10f0]/30 text-white font-bold transition-all gap-2"
              style={{ boxShadow: "0 0 12px rgba(189,0,232,0.3)" }}
            >
              <CalendarCheck className="w-5 h-5" />
              {info.todayChecked ? "출석 현황 보기" : "출석체크 하러 가기"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

const BANNERS = [CombineBanner, BoxOpenBanner, AttendanceBanner];

// ── 메인 배너 섹션 ────────────────────────────────────────────────────────────
export function BannerSection() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [progress, setProgress]       = useState(0);

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(Math.min((elapsed / INTERVAL_MS) * 100, 100));
    }, 50);

    const switchTimer = setTimeout(() => {
      setBannerIndex((i) => (i + 1) % BANNER_COUNT);
    }, INTERVAL_MS);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(switchTimer);
    };
  }, [bannerIndex]);

  const CurrentBanner = BANNERS[bannerIndex];

  return (
    <section>
      <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: 130 }}>
        {/* 진행 바 */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: BANNER_COLORS[bannerIndex] }}
            transition={{ duration: 0.05, ease: "linear" }}
          />
        </div>

        {/* 도트 인디케이터 */}
        <div className="absolute bottom-3 right-4 z-20 flex gap-1.5">
          {DOT_COLORS.map((color, i) => (
            <button
              key={i}
              onClick={() => setBannerIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:  bannerIndex === i ? color : "rgba(255,255,255,0.25)",
                boxShadow:   bannerIndex === i ? `0 0 6px ${color}` : "none",
                transform:   bannerIndex === i ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <CurrentBanner key={bannerIndex} />
        </AnimatePresence>
      </div>
    </section>
  );
}
