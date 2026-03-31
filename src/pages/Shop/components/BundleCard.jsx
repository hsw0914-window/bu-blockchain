import { Sparkles } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export function BundleCard({ bundle, onPurchase }) {
  return (
    <Card className="p-6 glass-strong neon-border-pink hover:neon-border-cyan transition-all relative overflow-hidden group flex flex-col">
      <div className={`absolute inset-0 bg-gradient-to-br ${bundle.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
      <div className="relative z-10 flex flex-col flex-1">
        {/* 할인 뱃지 */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#ff10f0] to-[#bd00e8] text-white text-xs font-bold px-3 py-1 rounded-full neon-border-pink">
          {bundle.discount}% OFF
        </div>

        {/* 아이콘 + 상품명 */}
        <div className="text-center mb-4">
          <div className="text-6xl mb-3">🎁</div>
          <h3 className="mb-2 text-[#e0d9ff]">{bundle.name}</h3>
        </div>

        {/* 구성 설명 — 최소 높이 고정으로 카드간 정렬 기준 통일 */}
        <div className="space-y-2 mb-4 min-h-[72px]">
          {bundle.items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-[#a393d1]">
              <Sparkles className="w-4 h-4 text-[#00ff88] flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* 가격 + 버튼 — mt-auto 로 항상 카드 하단에 고정 */}
        <div className="mt-auto space-y-4">
          <div>
            <p className="text-xs text-[#a393d1] line-through">{bundle.originalPrice} MEME</p>
            <p className="text-2xl font-bold text-[#00ff88] neon-green">{bundle.price} MEME</p>
          </div>

          <Button
            onClick={() => onPurchase(bundle, "bundle")}
            className="w-full glass neon-border-cyan hover:neon-border-pink bg-gradient-to-r from-[#00d9ff]/30 to-[#00ff88]/30 text-white font-bold"
          >
            구매하기
          </Button>
        </div>
      </div>
    </Card>
  );
}
