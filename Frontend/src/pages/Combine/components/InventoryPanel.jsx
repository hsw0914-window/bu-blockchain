import { motion } from "motion/react";
import { Package, Key, Gem, Image as ImageIcon } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { RarityBadge } from "../../../components/common/RarityBadge";
import { RARITY_GRADIENT } from "../../../constants";

export function InventoryPanel({ fragments, nfts, selectedFragments, onSelectFragment, viewMode, activeTab, onTabChange, totalBoxes, totalKeys }) {
  return (
    <div className="space-y-4">
      {/* 보유 자원 카운터 */}
      <Card className="p-4 glass-strong neon-border-pink">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
              <Package className="w-5 h-5 text-[#ffaa00]" style={{ filter: "drop-shadow(0 0 8px rgba(255,170,0,0.8))" }} />
            </div>
            <div>
              <p className="text-xs text-[#a393d1]">박스</p>
              <p className="text-lg font-bold text-[#ffaa00] chrome-text">{totalBoxes}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
              <Key className="w-5 h-5 text-[#00d9ff]" style={{ filter: "drop-shadow(0 0 8px rgba(0,217,255,0.8))" }} />
            </div>
            <div>
              <p className="text-xs text-[#a393d1]">열쇠</p>
              <p className="text-lg font-bold text-[#00d9ff] chrome-text">{totalKeys}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 인벤토리 탭 */}
      <Card className="glass-strong neon-border-cyan overflow-hidden">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass border-b border-[#ff10f0]/20">
            <TabsTrigger value="fragments" className="data-[state=active]:neon-border-pink data-[state=active]:text-[#ff10f0] data-[state=active]:bg-[#ff10f0]/20">
              <Gem className="w-4 h-4 mr-2" />파편
            </TabsTrigger>
            <TabsTrigger value="nfts" className="data-[state=active]:neon-border-cyan data-[state=active]:text-[#00d9ff] data-[state=active]:bg-[#00d9ff]/20">
              <ImageIcon className="w-4 h-4 mr-2" />원본
            </TabsTrigger>
          </TabsList>

          {/* 파편 탭 */}
          <TabsContent value="fragments" className="p-4 max-h-[600px] overflow-y-auto">
            <div className="space-y-2">
              {fragments.map((fragment) => {
                const isSelected = selectedFragments.includes(fragment.id);
                const canSelect  = fragment.count > 0 && (isSelected || selectedFragments.length < 3) && viewMode === "combine";
                return (
                  <motion.div key={fragment.id} whileHover={canSelect ? { x: 4 } : {}} whileTap={canSelect ? { scale: 0.98 } : {}}>
                    <Card
                      onClick={() => canSelect && onSelectFragment(fragment.id)}
                      className={`p-3 transition-all relative overflow-hidden ${
                        isSelected   ? "glass-strong neon-border-pink bg-[#ff10f0]/20 cursor-pointer"
                        : canSelect  ? "glass neon-border-cyan hover:neon-border-pink cursor-pointer"
                                     : "glass border-[#6b5b95]/30 opacity-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-lg glass-strong flex items-center justify-center text-3xl relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_GRADIENT[fragment.rarity]} opacity-30`} />
                            <span className="relative z-10">{fragment.image}</span>
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#00d9ff] to-[#00ff88] flex items-center justify-center text-white text-xs font-bold">
                            {fragment.count}
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#ff10f0] to-[#bd00e8] flex items-center justify-center text-white text-xs font-bold"
                            >
                              ✓
                            </motion.div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm text-[#e0d9ff] truncate mb-1">{fragment.name}</h4>
                          <RarityBadge rarity={fragment.rarity} />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* 원본 NFT 탭 */}
          <TabsContent value="nfts" className="p-4 max-h-[600px] overflow-y-auto">
            <div className="space-y-2">
              {nfts.map((nft) => (
                <Card key={nft.id} className="p-3 glass neon-border-cyan opacity-70 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg glass-strong flex items-center justify-center text-3xl relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_GRADIENT[nft.rarity]} opacity-30`} />
                      <span className="relative z-10">{nft.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-[#e0d9ff] truncate mb-1">{nft.name}</h4>
                      <RarityBadge rarity={nft.rarity} />
                    </div>
                  </div>
                  <p className="text-xs text-[#a393d1] mt-2 text-center">원본은 조합에 사용할 수 없습니다</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
