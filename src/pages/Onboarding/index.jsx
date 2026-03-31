import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Package, Wallet, CheckCircle, Loader2, Sparkles } from "lucide-react";

// ── 배경 효과 ─────────────────────────────────────────────────────────────────
function OnboardingBackground() {
  return (
    <>
      <div className="fixed inset-0 retro-grid opacity-25 pointer-events-none" />
      <div className="fixed inset-0 scanlines pointer-events-none opacity-20 z-[1]" />
      <div className="fixed top-10 left-[10%] w-[500px] h-[500px] bg-[#ff10f0] rounded-full blur-[140px] opacity-[0.12] animate-pulse pointer-events-none" />
      <div
        className="fixed bottom-10 right-[10%] w-[500px] h-[500px] bg-[#00d9ff] rounded-full blur-[140px] opacity-[0.10] animate-pulse pointer-events-none"
        style={{ animationDelay: "1.2s" }}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7700bb] rounded-full blur-[180px] opacity-[0.08] pointer-events-none" />

      {/* 코너 장식 */}
      <div className="fixed top-6 left-6 text-[#ff10f0]/20 text-xs tracking-[0.3em] font-mono pointer-events-none select-none">
        SYS://MEMORY.VAULT_v2.0K
      </div>
      <div className="fixed top-6 right-6 text-[#00d9ff]/20 text-xs tracking-[0.3em] font-mono pointer-events-none select-none">
        NFT_CHAIN://CONNECT
      </div>
      <div className="fixed bottom-6 left-6 text-[#a393d1]/20 text-xs tracking-[0.3em] font-mono pointer-events-none select-none">
        © 2026 그땐그랬지
      </div>
      <div className="fixed bottom-6 right-6 text-[#a393d1]/20 text-xs tracking-[0.3em] font-mono pointer-events-none select-none">
        [LOADING_MEMORIES...]
      </div>
    </>
  );
}

// ── 인용구 카드 ───────────────────────────────────────────────────────────────
function QuoteCard({ blankFilled }) {
  return (
    <motion.div
      className="w-full rounded-2xl p-7 text-center relative"
      style={{
        background: "rgba(255,16,240,0.04)",
        border: "1px solid rgba(255,16,240,0.25)",
        boxShadow: "0 0 20px rgba(255,16,240,0.08), inset 0 0 20px rgba(255,16,240,0.04)",
      }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <p className="text-[#c8b9f0] text-base leading-relaxed">사람은 언제 죽는다고 생각하냐,</p>
      <p className="text-[#c8b9f0] text-base leading-relaxed flex items-center justify-center gap-2 flex-wrap mt-1.5">
        <span>바로 사람들에게</span>

        {/* 빈칸 → 채워지는 단어 */}
        <span className="relative inline-flex items-center justify-center min-w-[82px] h-[1.4em]">
          <AnimatePresence mode="wait">
            {blankFilled ? (
              <motion.span
                key="filled"
                className="neon-pink absolute inset-0 flex items-center justify-center"
                style={{
                  color: "#ff10f0",
                  fontWeight: 700,
                  textShadow:
                    "0 0 10px rgba(255,16,240,0.9), 0 0 20px rgba(255,16,240,0.7), 0 0 40px rgba(255,16,240,0.4)",
                }}
                initial={{ opacity: 0, filter: "blur(12px)", scale: 1.2 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                잊혀졌을
              </motion.span>
            ) : (
              <motion.span
                key="blank"
                className="absolute inset-0 flex items-end justify-center pb-0.5"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-[76px] border-b-2" style={{ borderColor: "rgba(255,16,240,0.45)" }} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <span>때다</span>
      </p>
      <p className="text-[#a393d1]/40 text-xs mt-4 tracking-widest">— 원피스, 화이트비어드</p>
    </motion.div>
  );
}

// ── 캐릭터 애프터이미지 오버레이 ──────────────────────────────────────────────
function CharacterAfterimage({ show, fading }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="character-overlay"
          className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: fading ? 0 : 1 }}
          transition={{ duration: fading ? 3.2 : 1.8, ease: "easeInOut" }}
        >
          {/* 실제 캐릭터 이미지 - 잔상/기억 효과 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 1.08, filter: "blur(18px)" }}
            animate={{
              scale: fading ? 1.15 : 1.02,
              filter: fading ? "blur(28px) saturate(0)" : "blur(6px) saturate(0.15)",
            }}
            transition={{ duration: fading ? 3.2 : 1.8, ease: "easeInOut" }}
          >
            <img
              src="/whitebeard.png"
              alt="화이트비어드"
              className="w-full h-full object-cover object-top"
              style={{
                mixBlendMode: "screen",
                filter: "grayscale(100%) contrast(0.6) brightness(0.5)",
              }}
            />
          </motion.div>

          {/* 기억 속 장면처럼 — 위아래 그라데이션 비네팅 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 40%, transparent 30%, #0a0014 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, #0a0014 0%, transparent 25%, transparent 60%, #0a0014 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #0a0014 0%, transparent 20%, transparent 80%, #0a0014 100%)",
            }}
          />

          {/* 핑크빛 기억 틴트 */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(255,16,240,0.03)", mixBlendMode: "screen" }}
          />

          {/* 스캔라인 노이즈 */}
          <div className="absolute inset-0 scanlines opacity-30" />

          {/* "잊혀짐" 텍스트 잔상 */}
          <motion.p
            className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-white/20 text-sm tracking-[0.6em] font-mono whitespace-nowrap select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: fading ? 0 : 0.35 }}
            transition={{ duration: 1.2, delay: fading ? 0 : 0.6 }}
          >
            MEMORY_LOADING... 기억을 불러오는 중
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────────────────────────
export function Onboarding() {
  const navigate = useNavigate();
  const [nickname,        setNickname]        = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [isConnecting,    setIsConnecting]    = useState(false);
  const [isAnimating,     setIsAnimating]     = useState(false);
  const [blankFilled,     setBlankFilled]     = useState(false);
  const [showCharacter,   setShowCharacter]   = useState(false);
  const [characterFading, setCharacterFading] = useState(false);
  const [pageFading,      setPageFading]      = useState(false);
  const [inputFocused,    setInputFocused]    = useState(false);
  const [mounted,         setMounted]         = useState(false);

  useEffect(() => {
    if (localStorage.getItem("onboarded")) {
      navigate("/", { replace: true });
      return;
    }
    setMounted(true);
  }, [navigate]);

  const canEnter = nickname.trim().length > 0 && walletConnected && !isAnimating;

  const handleMetaMaskConnect = useCallback(async () => {
    if (walletConnected || isConnecting) return;
    setIsConnecting(true);
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setWalletConnected(true);
    setIsConnecting(false);
  }, [walletConnected, isConnecting]);

  const handleEnter = useCallback(() => {
    if (!canEnter) return;
    setIsAnimating(true);

    // 1단계: 빈칸에 "잊혀졌을" 채워짐
    setBlankFilled(true);

    // 2단계: 0.9초 후 캐릭터 잔상 등장
    setTimeout(() => {
      setShowCharacter(true);

      // 3단계: 2.4초간 잔상 유지 후 서서히 사라짐
      setTimeout(() => {
        setCharacterFading(true);

        // 4단계: 잔상이 사라지며 페이지 페이드아웃 시작
        setTimeout(() => {
          setPageFading(true);

          // 5단계: 홈 화면으로 전환
          setTimeout(() => {
            localStorage.setItem("onboarded", "true");
            localStorage.setItem("nickname", nickname);
            navigate("/");
          }, 1300);
        }, 2000);
      }, 2400);
    }, 900);
  }, [canEnter, nickname, navigate]);

  const helperText = () => {
    if (isAnimating) return "";
    if (!nickname.trim() && !walletConnected) return "닉네임 입력 및 메타마스크 연결 후 입장 가능합니다";
    if (!nickname.trim()) return "닉네임을 입력해주세요";
    if (!walletConnected) return "메타마스크를 연결해주세요";
    return "✦ 준비 완료! 추억 속으로 입장하세요 ✦";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#130820] to-[#0d001a] relative overflow-hidden flex items-center justify-center">
      <OnboardingBackground />

      {/* 캐릭터 잔상 오버레이 */}
      <CharacterAfterimage show={showCharacter} fading={characterFading} />

      {/* 페이지 페이드아웃 */}
      <AnimatePresence>
        {pageFading && (
          <motion.div
            key="page-fade"
            className="fixed inset-0 z-50 bg-[#0a0014]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>

      {/* 메인 카드 */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 w-full max-w-[520px] px-6"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 28 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        {/* 아이콘 */}
        <motion.div
          className="relative"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.9, type: "spring", stiffness: 120 }}
        >
          <div className="absolute -inset-6 rounded-3xl bg-[#ff10f0] opacity-20 blur-2xl animate-pulse" />
          <div className="absolute -inset-4 rounded-3xl bg-[#bd00e8] opacity-25 blur-xl" />
          <div
            className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#ff10f0] via-[#bd00e8] to-[#00d9ff] flex items-center justify-center relative overflow-hidden"
            style={{
              boxShadow:
                "0 0 30px rgba(255,16,240,0.6), 0 0 60px rgba(255,16,240,0.3), inset 0 0 30px rgba(255,255,255,0.15)",
            }}
          >
            <Package className="w-14 h-14 text-white relative z-10 drop-shadow-lg" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
          </div>
        </motion.div>

        {/* 타이틀 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          <h1
            className="text-6xl font-black chrome-text tracking-widest leading-tight"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            그땐 그랬지
          </h1>
          <motion.p
            className="text-[#a393d1] text-sm tracking-[0.5em] uppercase mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Y2K · NFT · Memory Platform
          </motion.p>
        </motion.div>

        {/* 인용구 */}
        <QuoteCard blankFilled={blankFilled} />

        {/* 닉네임 입력 */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="relative">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="닉네임을 입력하세요"
              disabled={isAnimating}
              maxLength={16}
              className="w-full px-6 py-5 rounded-xl text-[#e0d9ff] placeholder-[#a393d1]/50 outline-none transition-all disabled:opacity-50 text-lg"
              style={{
                background: "rgba(26,10,46,0.85)",
                border: `1px solid ${inputFocused ? "#ff10f0" : "rgba(255,16,240,0.3)"}`,
                boxShadow: inputFocused
                  ? "0 0 15px rgba(255,16,240,0.35), inset 0 0 15px rgba(255,16,240,0.08)"
                  : "0 0 10px rgba(255,16,240,0.1), inset 0 0 10px rgba(255,16,240,0.04)",
                backdropFilter: "blur(12px)",
              }}
            />
            {nickname.trim().length > 0 && (
              <motion.div
                className="absolute right-5 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-5 h-5 text-[#ff10f0]" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* 메타마스크 연결 버튼 */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
        >
          <button
            onClick={handleMetaMaskConnect}
            disabled={walletConnected || isConnecting || isAnimating}
            className="w-full py-5 px-7 rounded-xl flex items-center justify-center gap-3 font-semibold transition-all duration-300 text-lg"
            style={
              walletConnected
                ? { background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.45)", color: "#00ff88", boxShadow: "0 0 18px rgba(0,255,136,0.25)", cursor: "default" }
                : isConnecting
                ? { background: "rgba(0,217,255,0.08)", border: "1px solid rgba(0,217,255,0.35)", color: "#00d9ff", boxShadow: "0 0 15px rgba(0,217,255,0.2)", cursor: "wait" }
                : { background: "rgba(0,217,255,0.07)", border: "1px solid rgba(0,217,255,0.4)", color: "#00d9ff", boxShadow: "0 0 12px rgba(0,217,255,0.15)", cursor: "pointer" }
            }
          >
            {isConnecting  ? <><Loader2    className="w-6 h-6 animate-spin" /><span>메타마스크 연결 중...</span></>
            : walletConnected ? <><CheckCircle className="w-6 h-6" /><span>메타마스크 연결 완료</span></>
            :                   <><Wallet     className="w-6 h-6" /><span>메타마스크 연결</span></>}
          </button>
        </motion.div>

        {/* 입장 버튼 */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <motion.button
            onClick={handleEnter}
            disabled={!canEnter}
            className="w-full py-5 px-7 rounded-xl font-bold tracking-widest transition-all duration-300 relative overflow-hidden text-lg"
            style={
              canEnter
                ? { background: "linear-gradient(135deg, #ff10f0, #bd00e8, #7700bb)", color: "#fff", boxShadow: "0 0 25px rgba(255,16,240,0.55), 0 0 50px rgba(255,16,240,0.25), inset 0 0 20px rgba(255,255,255,0.1)", cursor: "pointer" }
                : { background: "rgba(42,26,62,0.6)", border: "1px solid rgba(255,16,240,0.15)", color: "rgba(163,147,209,0.4)", cursor: "not-allowed" }
            }
            whileHover={canEnter ? { scale: 1.02 } : {}}
            whileTap={canEnter ? { scale: 0.97 } : {}}
          >
            {canEnter && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
              />
            )}
            <span className="relative z-10">
              {isAnimating ? "..." : "추억 속으로 입장하기"}
            </span>
          </motion.button>
        </motion.div>

        {/* 안내 텍스트 */}
        <motion.p
          key={helperText()}
          className="text-[#a393d1]/45 text-sm text-center tracking-wider min-h-[1.4em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {helperText()}
        </motion.p>
      </motion.div>
    </div>
  );
}
