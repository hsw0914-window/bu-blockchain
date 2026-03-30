import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Plus, ArrowRight } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { RarityBadge } from "../../../components/common/RarityBadge";
import { RARITY_GRADIENT } from "../../../constants";

export function CombineMode({ fragments, selectedFragments, combining, onCombine }) {
  const canCombine = selectedFragments.length === 3;
  const selectedItems = selectedFragments.map((id) => fragments.find((f) => f.id === id));

  return (
    <>
      <div>
        <h1 className="mb-2 text-[#e0d9ff] neon-pink">파편 조합</h1>
        <p className="text-[#a393d1]">파편 3개를 선택하여 새로운 밈 NFT로 조합하세요</p>
      </div>

      {/* 안내 카드 */}
      <Card className="p-6 glass neon-border-cyan relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff10f0]/10 to-[#00d9ff]/10" />
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-[#00ff88]" style={{ filter: "drop-shadow(0 0 8px rgba(0,255,136,0.8))" }} />
          </div>
          <div>
            <h3 className="mb-2 text-[#00ff88] neon-green">조합 안내</h3>
            <ul className="space-y-1 text-sm text-[#a393d1]">
              <li>• 왼쪽 인벤토리에서 파편을 3개 선택하세요</li>
              <li>• 선택한 파편이 합쳐져 새로운 밈 NFT가 탄생합니다</li>
              <li>• 높은 등급의 파편을 조합할수록 희귀한 NFT가 나올 확률이 높습니다</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* 조합 작업 공간 */}
      <Card className="p-8 glass-strong neon-border-pink relative overflow-hidden">
        <div className="absolute inset-0 scanlines opacity-10" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-center text-[#e0d9ff] neon-pink">조합 슬롯</h2>

          {/* 선택된 파편 슬롯 3개 */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {[0, 1, 2].map((slotIndex) => {
              const item = selectedItems[slotIndex];
              return (
                <div key={slotIndex} className="flex items-center gap-4">
                  <div className={`w-32 h-32 rounded-xl flex items-center justify-center text-6xl transition-all ${
                    item ? "glass-strong neon-border-pink" : "glass border-2 border-dashed border-[#6b5b95]"
                  }`}>
                    {item ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${RARITY_GRADIENT[item.rarity]} opacity-20`} />
                        <span className="relative z-10">{item.image}</span>
                      </div>
                    ) : (
                      <span className="text-[#6b5b95] text-2xl">?</span>
                    )}
                  </div>
                  {slotIndex < 2 && <Plus className="w-8 h-8 text-[#a393d1]" />}
                </div>
              );
            })}
          </div>

          {/* 선택된 파편 정보 */}
          {selectedFragments.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <p className="text-center text-sm text-[#a393d1]">선택된 파편 ({selectedFragments.length}/3)</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {selectedItems.map((item, i) => item && (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg neon-border-pink">
                    <span>{item.image}</span>
                    <span className="text-xs text-[#e0d9ff]">{item.name}</span>
                    <RarityBadge rarity={item.rarity} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 결과 영역 */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ff10f0]/50 to-transparent" />
            <ArrowRight className="w-8 h-8 text-[#ff10f0]" style={{ filter: "drop-shadow(0 0 8px rgba(255,16,240,0.8))" }} />
            <div className={`w-40 h-40 rounded-xl flex items-center justify-center text-7xl transition-all ${
              canCombine ? "glass-strong neon-border-cyan" : "glass border-2 border-dashed border-[#6b5b95] opacity-40"
            }`}>
              {canCombine ? (
                <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>✨</motion.span>
              ) : (
                <span className="text-[#6b5b95] text-3xl">?</span>
              )}
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00d9ff]/50 to-transparent" />
          </div>

          {/* 조합 버튼 */}
          <div className="text-center">
            <Button
              onClick={onCombine}
              disabled={!canCombine || combining}
              size="lg"
              className={`px-12 py-6 font-bold text-lg transition-all ${
                canCombine
                  ? "glass-strong neon-border-pink hover:neon-border-cyan bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-white"
                  : "glass border-[#6b5b95]/30 text-[#6b5b95] cursor-not-allowed"
              }`}
            >
              <Sparkles className="w-6 h-6 mr-2" />
              {combining ? "조합 중..." : canCombine ? "조합하기!" : `파편 ${3 - selectedFragments.length}개 더 선택하세요`}
            </Button>
          </div>
        </div>
      </Card>

      {/* 조합 애니메이션 */}
      <AnimatePresence>
        {combining && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          >
            <div className="relative">
              {selectedItems.map((fragment, index) => {
                if (!fragment) return null;
                const angle = (index * 120) * (Math.PI / 180);
                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    initial={{ x: 0, y: 0, scale: 1 }}
                    animate={{ x: [Math.cos(angle) * 100, 0], y: [Math.sin(angle) * 100, 0], scale: [1, 0], rotate: [0, 360] }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  >
                    <div className="text-6xl">{fragment.image}</div>
                  </motion.div>
                );
              })}
              <motion.div
                animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-24 h-24 text-[#ffaa00]" style={{ filter: "drop-shadow(0 0 20px rgba(255,170,0,0.9))" }} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
