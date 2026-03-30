import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Plus, Package, Key, Unlock } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { RarityBadge } from "../../../components/common/RarityBadge";
import { RARITY_GRADIENT } from "../../../constants";

export function OpenBoxMode({ boxes, keys, selectedBox, selectedKey, opening, onSelectBox, onSelectKey, onOpenBox }) {
  const canOpen = selectedBox && selectedKey;

  return (
    <>
      <div>
        <h1 className="mb-2 text-[#e0d9ff] neon-pink">박스 개봉</h1>
        <p className="text-[#a393d1]">박스와 열쇠를 선택하여 개봉하세요</p>
      </div>

      {/* 안내 카드 */}
      <Card className="p-6 glass neon-border-cyan relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff10f0]/10 to-[#00d9ff]/10" />
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-[#00ff88]" style={{ filter: "drop-shadow(0 0 8px rgba(0,255,136,0.8))" }} />
          </div>
          <div>
            <h3 className="mb-2 text-[#00ff88] neon-green">박스 개봉 안내</h3>
            <ul className="space-y-1 text-sm text-[#a393d1]">
              <li>• 박스를 클릭하여 선택하고 열쇠를 선택하세요</li>
              <li>• 박스에서는 밈 파편 또는 완성된 NFT가 나올 수 있습니다</li>
              <li>• 희귀한 박스일수록 높은 등급의 아이템이 나올 확률이 높습니다</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* 개봉 영역 */}
      <Card className="p-8 glass-strong neon-border-pink relative overflow-hidden">
        <div className="absolute inset-0 scanlines opacity-10" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-center text-[#e0d9ff] neon-pink">개봉 준비</h2>

          {/* 선택 영역 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 박스 선택 */}
            <div className="space-y-3">
              <h3 className="text-center text-[#a393d1]">박스 선택</h3>
              <div className="space-y-2">
                {boxes.map((box) => (
                  <Card
                    key={box.id}
                    onClick={() => box.count > 0 && onSelectBox(box)}
                    className={`p-4 transition-all cursor-pointer ${
                      selectedBox?.id === box.id
                        ? "glass-strong neon-border-pink bg-[#ff10f0]/20"
                        : box.count > 0
                        ? "glass neon-border-cyan hover:neon-border-pink"
                        : "glass border-[#6b5b95]/30 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-4xl relative">
                        {box.image}
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#00d9ff] to-[#00ff88] flex items-center justify-center text-white text-xs font-bold">
                          {box.count}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm text-[#e0d9ff]">{box.name}</h4>
                        <RarityBadge rarity={box.rarity} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* 열쇠 선택 */}
            <div className="space-y-3">
              <h3 className="text-center text-[#a393d1]">열쇠 선택</h3>
              <div className="space-y-2">
                {keys.map((key) => (
                  <Card
                    key={key.id}
                    onClick={() => key.count > 0 && onSelectKey(key)}
                    className={`p-4 transition-all cursor-pointer ${
                      selectedKey?.id === key.id
                        ? "glass-strong neon-border-cyan bg-[#00d9ff]/20"
                        : key.count > 0
                        ? "glass neon-border-cyan hover:neon-border-pink"
                        : "glass border-[#6b5b95]/30 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-4xl relative">
                        {key.image}
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#ff10f0] to-[#bd00e8] flex items-center justify-center text-white text-xs font-bold">
                          {key.count}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm text-[#e0d9ff]">{key.name}</h4>
                        <RarityBadge rarity={key.rarity} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* 선택 프리뷰 */}
          {(selectedBox || selectedKey) && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-4 py-6">
              <div className={`w-32 h-32 rounded-xl flex items-center justify-center text-6xl ${selectedBox ? "glass-strong neon-border-pink" : "glass border-2 border-dashed border-[#6b5b95]"}`}>
                {selectedBox ? selectedBox.image : <Package className="w-16 h-16 text-[#6b5b95]" />}
              </div>
              <Plus className="w-8 h-8 text-[#a393d1]" />
              <div className={`w-32 h-32 rounded-xl flex items-center justify-center text-6xl ${selectedKey ? "glass-strong neon-border-cyan" : "glass border-2 border-dashed border-[#6b5b95]"}`}>
                {selectedKey ? selectedKey.image : <Key className="w-16 h-16 text-[#6b5b95]" />}
              </div>
            </motion.div>
          )}

          {/* 개봉 버튼 */}
          <div className="text-center">
            <Button
              onClick={onOpenBox}
              disabled={!canOpen || opening}
              size="lg"
              className={`px-12 py-6 font-bold text-lg transition-all ${
                canOpen
                  ? "glass-strong neon-border-pink hover:neon-border-cyan bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-white"
                  : "glass border-[#6b5b95]/30 text-[#6b5b95] cursor-not-allowed"
              }`}
            >
              <Unlock className="w-6 h-6 mr-2" />
              {opening ? "개봉 중..." : canOpen ? "박스 개봉하기!" : "박스와 열쇠를 선택하세요"}
            </Button>
          </div>
        </div>
      </Card>

      {/* 개봉 애니메이션 */}
      <AnimatePresence>
        {opening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotateY: [0, 360], scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-9xl">{selectedBox?.image}</div>
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Unlock className="w-24 h-24 text-[#00d9ff]" style={{ filter: "drop-shadow(0 0 20px rgba(0,217,255,0.9))" }} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
