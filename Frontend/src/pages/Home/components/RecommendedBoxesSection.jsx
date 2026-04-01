import { Link } from "react-router";
import { Gift, Key } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export const RECOMMENDED_BOXES = [
  { id: 1, name: "스타터 박스",  price: "100",   required: false },
  { id: 2, name: "프리미엄 박스", price: "500",   required: true  },
  { id: 3, name: "레전드 박스",  price: "2,000", required: true  },
];

export function RecommendedBoxCard({ box }) {
  return (
    <Link to="/shop" className="block h-full">
      <Card className="px-5 py-4 glass neon-border-cyan hover:neon-border-pink transition-all cursor-pointer h-full">
        <div className="flex items-center justify-between gap-4 h-full">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-xl glass-strong flex items-center justify-center text-3xl relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffaa00]/20 to-[#ff6b00]/20" />
              <span className="relative z-10">📦</span>
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold mb-2 text-[#e0d9ff]">{box.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#00d9ff] font-bold">{box.price} MEME</span>
                {box.required && (
                  <div className="flex items-center gap-1 text-xs text-[#ffaa00]">
                    <Key className="w-3 h-3 flex-shrink-0" />
                    <span>열쇠 필요</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button size="sm" className="glass neon-border-cyan hover:neon-border-pink bg-gradient-to-r from-[#00d9ff]/30 to-[#00ff88]/30 text-white font-semibold flex-shrink-0 px-5">
            구매
          </Button>
        </div>
      </Card>
    </Link>
  );
}

export function RecommendedBoxesSectionHeader() {
  return (
    <div className="flex items-center gap-2">
      <Gift
        className="w-6 h-6"
        style={{ color: "#ffaa00", filter: "drop-shadow(0 0 8px rgba(255,170,0,0.8))" }}
      />
      <h2 className="text-[#e0d9ff]" style={{ textShadow: "0 0 10px rgba(255,170,0,0.8)" }}>
        추천 박스
      </h2>
    </div>
  );
}
