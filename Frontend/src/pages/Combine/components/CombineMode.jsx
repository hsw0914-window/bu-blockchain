import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowDown } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { RarityBadge } from "../../../components/common/RarityBadge";
import { RARITY_GRADIENT } from "../../../constants";

export function CombineMode({ fragments, selectedFragments, combining, onCombine }) {
  const canCombine   = selectedFragments.length === 3;
  const selectedItems = selectedFragments.map((id) => fragments.find((f) => f.id === id));

  return (
    <div className="space-y-4">

      {/* ── 제목 ──────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-[#e0d9ff] neon-pink mb-1">파편 조합</h1>
        <p className="text-[#a393d1] text-sm">3개의 파편을 선택하여 새로운 NFT를 생성하세요</p>
      </div>

      {/* ── 조합 시스템 안내 ──────────────────────────────────────────────── */}
      <Card className="p-4 glass neon-border-cyan relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff10f0]/8 to-[#00d9ff]/8" />
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-9 h-9 rounded-lg glass-strong flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#00ff88]" style={{ filter: "drop-shadow(0 0 6px rgba(0,255,136,0.8))" }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#00ff88] mb-1.5" style={{ textShadow: "0 0 8px rgba(0,255,136,0.6)" }}>
              조합 시스템 안내
            </h3>
            <ul className="space-y-1 text-xs text-[#a393d1] leading-relaxed">
              <li>• 동일한 희귀도의 파편 3개를 조합하면 상위 희귀도 NFT를 획득할 수 있습니다</li>
              <li>• 서로 다른 희귀도의 파편을 조합하면 랜덤 희귀도 NFT가 생성됩니다</li>
              <li>• 조합 후 선택한 파편은 소멸되며 복구할 수 없습니다</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* ── 조합 미리보기 메인 영역 ──────────────────────────────────────── */}
      <Card className="glass-strong neon-border-pink relative overflow-hidden">
        <div className="absolute inset-0 scanlines opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/5 via-transparent to-[#00d9ff]/5" />

        <div className="relative z-10 p-6 space-y-6">

          {/* 조합 미리보기 헤더 */}
          <h2 className="text-center text-sm font-semibold tracking-widest text-[#a393d1] uppercase">
            조합 미리보기
          </h2>

          {/* 파편 슬롯 3개 */}
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2].map((i) => {
              const item = selectedItems[i];
              return (
                <div key={i} className="flex items-center gap-3">
                  <motion.div
                    className={`w-[88px] h-[88px] rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
                      item
                        ? "glass-strong neon-border-pink"
                        : "glass border-2 border-dashed border-[rgba(107,91,149,0.4)]"
                    }`}
                    animate={item ? { boxShadow: ["0 0 8px rgba(255,16,240,0.3)", "0 0 18px rgba(255,16,240,0.6)", "0 0 8px rgba(255,16,240,0.3)"] } : {}}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    {item ? (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_GRADIENT[item.rarity]} opacity-25`} />
                        <span className="text-4xl relative z-10">{item.image}</span>
                      </>
                    ) : (
                      <span className="text-2xl text-[#6b5b95]/50">+</span>
                    )}
                  </motion.div>
                  {i < 2 && (
                    <span className="text-[#6b5b95] text-lg font-light">+</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 선택된 파편 정보 (슬롯 아래) */}
          <div className="flex justify-center gap-2 flex-wrap min-h-[28px]">
            {selectedItems.map((item, i) =>
              item ? (
                <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 glass rounded-lg neon-border-pink">
                  <span className="text-sm">{item.image}</span>
                  <span className="text-xs text-[#e0d9ff]">{item.name}</span>
                  <RarityBadge rarity={item.rarity} />
                </div>
              ) : null
            )}
            {selectedFragments.length === 0 && (
              <p className="text-xs text-[#6b5b95]">좌측 인벤토리에서 파편을 선택하세요</p>
            )}
          </div>

          {/* 화살표 */}
          <div className="flex flex-col items-center gap-1">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#ff10f0]/50 to-transparent" />
            <motion.div
              animate={canCombine ? { y: [0, 4, 0] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowDown
                className="w-6 h-6"
                style={{
                  color: canCombine ? "#ff10f0" : "#4a3a6a",
                  filter: canCombine ? "drop-shadow(0 0 8px rgba(255,16,240,0.8))" : "none",
                }}
              />
            </motion.div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#00d9ff]/50 to-transparent" />
          </div>

          {/* 결과 NFT 슬롯 */}
          <div className="flex justify-center">
            <motion.div
              className={`w-[120px] h-[120px] rounded-xl flex items-center justify-center relative overflow-hidden transition-all duration-500 ${
                canCombine
                  ? "glass-strong neon-border-cyan"
                  : "glass border-2 border-dashed border-[rgba(107,91,149,0.3)] opacity-40"
              }`}
              animate={canCombine ? {
                boxShadow: [
                  "0 0 12px rgba(0,217,255,0.3)",
                  "0 0 28px rgba(0,217,255,0.7)",
                  "0 0 12px rgba(0,217,255,0.3)",
                ],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {canCombine ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/15 to-[#ff10f0]/15" />
                  <motion.span
                    className="text-5xl relative z-10"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </>
              ) : (
                <Sparkles className="w-10 h-10 text-[#4a3a6a]" />
              )}
            </motion.div>
          </div>

          {/* 조합 버튼 */}
          <motion.button
            onClick={onCombine}
            disabled={!canCombine || combining}
            className="w-full py-4 rounded-xl font-bold tracking-widest text-base transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
            style={
              canCombine
                ? {
                    background: "linear-gradient(135deg, rgba(255,16,240,0.25), rgba(189,0,232,0.25))",
                    border: "1px solid rgba(255,16,240,0.6)",
                    color: "#fff",
                    boxShadow: "0 0 20px rgba(255,16,240,0.35)",
                  }
                : {
                    background: "rgba(42,26,62,0.4)",
                    border: "1px solid rgba(107,91,149,0.25)",
                    color: "rgba(107,91,149,0.6)",
                    cursor: "not-allowed",
                  }
            }
            whileHover={canCombine ? { scale: 1.02 } : {}}
            whileTap={canCombine ? { scale: 0.97 } : {}}
          >
            {canCombine && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear", repeatDelay: 0.5 }}
              />
            )}
            <Sparkles className="w-5 h-5 relative z-10" />
            <span className="relative z-10">
              {combining
                ? "조합 중..."
                : canCombine
                ? "파편 조합하기"
                : `파편 ${3 - selectedFragments.length}개 더 선택하세요`}
            </span>
          </motion.button>

        </div>
      </Card>

      {/* ── 조합 애니메이션 ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {combining && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center w-48 h-48">
              {selectedItems.map((fragment, index) => {
                if (!fragment) return null;
                const angle = (index * 120) * (Math.PI / 180);
                return (
                  <motion.div
                    key={index}
                    className="absolute text-5xl"
                    initial={{ x: Math.cos(angle) * 90, y: Math.sin(angle) * 90, scale: 1 }}
                    animate={{ x: 0, y: 0, scale: 0, rotate: 360 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  >
                    {fragment.image}
                  </motion.div>
                );
              })}
              <motion.div
                animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles
                  className="w-20 h-20 text-[#ffaa00]"
                  style={{ filter: "drop-shadow(0 0 20px rgba(255,170,0,0.9))" }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
