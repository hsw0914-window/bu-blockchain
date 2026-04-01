import { Sparkles } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { RarityBadge } from "../../../components/common/RarityBadge";

export const RECENT_ITEMS = [
  { id: 5, name: "웃음 밈 파편", rarity: "일반", image: "😂" },
  { id: 6, name: "신비한 박스",  rarity: "희귀", image: "📦" },
  { id: 7, name: "황금 열쇠",   rarity: "영웅", image: "🔑" },
];

export function RecentItemCard({ item }) {
  return (
    <Card className="px-5 py-4 glass neon-border-cyan hover:neon-border-pink transition-all cursor-pointer h-full">
      <div className="flex items-center gap-4 h-full">
        <div className="w-14 h-14 rounded-xl glass-strong flex items-center justify-center text-3xl relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff88]/20" />
          <span className="relative z-10">{item.image}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold mb-2 text-[#e0d9ff]">{item.name}</h3>
          <RarityBadge rarity={item.rarity} />
        </div>
        <span className="text-xs text-[#a393d1] flex-shrink-0 ml-4">방금 전</span>
      </div>
    </Card>
  );
}

export function RecentItemsSectionHeader() {
  return (
    <div className="flex items-center gap-2">
      <Sparkles
        className="w-6 h-6"
        style={{ color: "#00ff88", filter: "drop-shadow(0 0 8px rgba(0,255,136,0.8))" }}
      />
      <h2 className="text-[#e0d9ff] neon-green">최신 획득 콘텐츠</h2>
    </div>
  );
}
