import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Plus, Package, Key, Unlock } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { RarityBadge } from "../../../components/common/RarityBadge";

export function OpenBoxMode({ boxes, keys, selectedBox, selectedKey, opening, onSelectBox, onSelectKey, onOpenBox }) {
  const canOpen = selectedBox && selectedKey;

  return (
    <div className="space-y-4">

      {/* ── 제목 ──────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-[#e0d9ff] neon-pink mb-1">박스 개봉</h1>
        <p className="text-[#a393d1] text-sm">박스와 열쇠를 선택하여 개봉하세요</p>
      </div>

      {/* ── 박스 개봉 안내 ────────────────────────────────────────────────── */}
      <Card className="p-4 glass neon-border-cyan relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff]/8 to-[#00ff88]/8" />
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-9 h-9 rounded-lg glass-strong flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-[#00ff88]" style={{ filter: "drop-shadow(0 0 6px rgba(0,255,136,0.8))" }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#00ff88] mb-1.5" style={{ textShadow: "0 0 8px rgba(0,255,136,0.6)" }}>
              박스 개봉 안내
            </h3>
            <ul className="space-y-1 text-xs text-[#a393d1] leading-relaxed">
              <li>• 박스를 클릭하여 선택하고 열쇠를 선택하세요</li>
              <li>• 박스에서는 밈 파편 또는 완성된 NFT가 나올 수 있습니다</li>
              <li>• 희귀한 박스일수록 높은 등급의 아이템이 나올 확률이 높습니다</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* ── 개봉 메인 영역 ────────────────────────────────────────────────── */}
      <Card className="glass-strong neon-border-pink relative overflow-hidden">
        <div className="absolute inset-0 scanlines opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/5 via-transparent to-[#00d9ff]/5" />

        <div className="relative z-10 p-6 space-y-6">

          <h2 className="text-center text-sm font-semibold tracking-widest text-[#a393d1] uppercase">
            개봉 준비
          </h2>

          {/* 박스 + 열쇠 선택 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 박스 선택 */}
            <div className="space-y-2">
              <p className="text-xs text-center text-[#a393d1] tracking-widest uppercase">박스 선택</p>
              <div className="space-y-2">
                {boxes.map((box) => (
                  <Card
                    key={box.id}
                    onClick={() => box.count > 0 && onSelectBox(box)}
                    className={`p-3 transition-all cursor-pointer ${
                      selectedBox?.id === box.id
                        ? "glass-strong neon-border-pink bg-[#ff10f0]/15"
                        : box.count > 0
                        ? "glass neon-border-cyan hover:neon-border-pink"
                        : "glass border-[#6b5b95]/25 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex-shrink-0">
                        <span className="text-3xl">{box.image}</span>
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#00d9ff] to-[#00ff88] flex items-center justify-center text-white text-[10px] font-bold">
                          {box.count}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#e0d9ff] truncate">{box.name}</p>
                        <RarityBadge rarity={box.rarity} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* 열쇠 선택 */}
            <div className="space-y-2">
              <p className="text-xs text-center text-[#a393d1] tracking-widest uppercase">열쇠 선택</p>
              <div className="space-y-2">
                {keys.map((key) => (
                  <Card
                    key={key.id}
                    onClick={() => key.count > 0 && onSelectKey(key)}
                    className={`p-3 transition-all cursor-pointer ${
                      selectedKey?.id === key.id
                        ? "glass-strong neon-border-cyan bg-[#00d9ff]/15"
                        : key.count > 0
                        ? "glass neon-border-cyan hover:neon-border-pink"
                        : "glass border-[#6b5b95]/25 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex-shrink-0">
                        <span className="text-3xl">{key.image}</span>
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#ff10f0] to-[#bd00e8] flex items-center justify-center text-white text-[10px] font-bold">
                          {key.count}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#e0d9ff] truncate">{key.name}</p>
                        <RarityBadge rarity={key.rarity} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* 선택 프리뷰 */}
          <div className="flex items-center justify-center gap-4 py-2">
            <motion.div
              className={`w-[88px] h-[88px] rounded-xl flex items-center justify-center text-5xl transition-all ${
                selectedBox ? "glass-strong neon-border-pink" : "glass border-2 border-dashed border-[rgba(107,91,149,0.35)]"
              }`}
              animate={selectedBox ? {
                boxShadow: ["0 0 8px rgba(255,16,240,0.3)", "0 0 18px rgba(255,16,240,0.6)", "0 0 8px rgba(255,16,240,0.3)"],
              } : {}}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              {selectedBox ? selectedBox.image : <Package className="w-10 h-10 text-[#4a3a6a]" />}
            </motion.div>

            <Plus className="w-6 h-6 text-[#6b5b95]" />

            <motion.div
              className={`w-[88px] h-[88px] rounded-xl flex items-center justify-center text-5xl transition-all ${
                selectedKey ? "glass-strong neon-border-cyan" : "glass border-2 border-dashed border-[rgba(107,91,149,0.35)]"
              }`}
              animate={selectedKey ? {
                boxShadow: ["0 0 8px rgba(0,217,255,0.3)", "0 0 18px rgba(0,217,255,0.6)", "0 0 8px rgba(0,217,255,0.3)"],
              } : {}}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              {selectedKey ? selectedKey.image : <Key className="w-10 h-10 text-[#4a3a6a]" />}
            </motion.div>
          </div>

          {/* 개봉 버튼 */}
          <motion.button
            onClick={onOpenBox}
            disabled={!canOpen || opening}
            className="w-full py-4 rounded-xl font-bold tracking-widest text-base transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
            style={
              canOpen
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
            whileHover={canOpen ? { scale: 1.02 } : {}}
            whileTap={canOpen ? { scale: 0.97 } : {}}
          >
            {canOpen && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "linear", repeatDelay: 0.5 }}
              />
            )}
            <Unlock className="w-5 h-5 relative z-10" />
            <span className="relative z-10">
              {opening ? "개봉 중..." : canOpen ? "박스 개봉하기" : "박스와 열쇠를 선택하세요"}
            </span>
          </motion.button>

        </div>
      </Card>

      {/* ── 개봉 애니메이션 ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {opening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center w-40 h-40">
              <motion.div
                animate={{ rotateY: [0, 360], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-8xl"
              >
                {selectedBox?.image}
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Unlock
                  className="w-20 h-20 text-[#00d9ff]"
                  style={{ filter: "drop-shadow(0 0 20px rgba(0,217,255,0.9))" }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
