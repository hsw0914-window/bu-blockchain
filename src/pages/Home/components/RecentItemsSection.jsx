import { Sparkles } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { RarityBadge } from "../../../components/common/RarityBadge";
import { SectionHeader } from "../../../components/common/SectionHeader";

const RECENT_ITEMS = [
  { id: 5, name: "웃음 밈 파편", rarity: "일반", image: "😂" },
  { id: 6, name: "신비한 박스",  rarity: "희귀", image: "📦" },
  { id: 7, name: "황금 열쇠",   rarity: "영웅", image: "🔑" },
];

export function RecentItemsSection() {
  return (
    <section>
      <SectionHeader
        icon={Sparkles}
        iconColor="#00ff88"
        iconGlow="rgba(0,255,136,0.8)"
        title="최신 획득 콘텐츠"
        titleClass="text-[#e0d9ff] neon-green"
      />
      <div className="space-y-3">
        {RECENT_ITEMS.map((item) => (
          <Card key={item.id} className="p-4 glass neon-border-cyan hover:neon-border-pink transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl glass-strong flex items-center justify-center text-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/20 to-[#00ff88]/20" />
                <span className="relative z-10">{item.image}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm mb-1 text-[#e0d9ff]">{item.name}</h3>
                <RarityBadge rarity={item.rarity} />
              </div>
              <span className="text-xs text-[#a393d1]">방금 전</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
