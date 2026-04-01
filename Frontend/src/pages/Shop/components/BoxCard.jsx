import { Key, Star } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { RarityBadge } from "../../../components/common/RarityBadge";

export function BoxCard({ box, onPurchase }) {
  return (
    <Card className="p-6 glass neon-border-cyan hover:neon-border-pink transition-all relative overflow-hidden group flex flex-col">
      <div className={`absolute inset-0 bg-gradient-to-br ${box.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
      <div className="relative z-10 flex flex-col flex-1">

        {/* 아이콘 + 이름 + 뱃지 */}
        <div className="text-center mb-4">
          <div className="text-7xl mb-3">{box.image}</div>
          <h3 className="mb-1 text-[#e0d9ff]">{box.name}</h3>
          <RarityBadge rarity={box.rarity} />
        </div>

        {/* 설명 — min-h 고정으로 줄바꿈 차이 흡수 */}
        <p className="text-sm text-[#a393d1] mb-3 min-h-[48px]">{box.description}</p>

        {/* 보상 목록 — min-h 고정으로 아이템 수 차이 흡수 */}
        <div className="space-y-1 mb-4 min-h-[72px]">
          <p className="text-xs text-[#00d9ff] font-semibold">보상 목록:</p>
          {box.rewards.map((reward, index) => (
            <div key={index} className="flex items-center gap-1 text-xs text-[#a393d1]">
              <Star className="w-3 h-3 text-[#ffaa00] flex-shrink-0" />
              <span>{reward}</span>
            </div>
          ))}
        </div>

        {/* 가격 + 버튼 — mt-auto 로 항상 카드 하단 고정 */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-[#00ff88] chrome-text">{box.price} MEME</p>
            {box.needsKey && (
              <div className="flex items-center gap-1 text-xs text-[#ffaa00]">
                <Key className="w-4 h-4 flex-shrink-0" />
                <span>열쇠 필요</span>
              </div>
            )}
          </div>

          <Button
            onClick={() => onPurchase(box, "box")}
            className="w-full glass neon-border-pink hover:neon-border-cyan bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-white font-bold"
          >
            구매하기
          </Button>
        </div>
      </div>
    </Card>
  );
}
