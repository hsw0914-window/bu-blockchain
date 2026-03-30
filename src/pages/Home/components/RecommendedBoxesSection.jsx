import { Link } from "react-router";
import { Gift, Key } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { SectionHeader } from "../../../components/common/SectionHeader";

const RECOMMENDED_BOXES = [
  { id: 1, name: "스타터 박스",  price: "100",   required: false },
  { id: 2, name: "프리미엄 박스", price: "500",   required: true  },
  { id: 3, name: "레전드 박스",  price: "2,000", required: true  },
];

export function RecommendedBoxesSection() {
  return (
    <section>
      <SectionHeader
        icon={Gift}
        iconColor="#ffaa00"
        iconGlow="rgba(255,170,0,0.8)"
        title="추천 박스"
        titleClass="text-[#e0d9ff]"
      />
      <div className="space-y-3">
        {RECOMMENDED_BOXES.map((box) => (
          <Link key={box.id} to="/shop">
            <Card className="p-4 glass neon-border-cyan hover:neon-border-pink transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl glass-strong flex items-center justify-center text-3xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ffaa00]/20 to-[#ff6b00]/20" />
                    <span className="relative z-10">📦</span>
                  </div>
                  <div>
                    <h3 className="text-sm mb-1 text-[#e0d9ff]">{box.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#00d9ff] font-bold">{box.price} MEME</span>
                      {box.required && (
                        <div className="flex items-center gap-1 text-xs text-[#ffaa00]">
                          <Key className="w-3 h-3" />
                          <span>열쇠 필요</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Button size="sm" className="glass neon-border-cyan hover:neon-border-pink bg-gradient-to-r from-[#00d9ff]/30 to-[#00ff88]/30 text-white font-semibold">
                  구매
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
