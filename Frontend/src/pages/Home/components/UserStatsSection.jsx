import { Key, Gem, Package, Image as ImageIcon } from "lucide-react";
import { Card } from "../../../components/ui/card";

const USER_STATS = [
  { label: "보유 NFT",   value: "24", Icon: ImageIcon, color: "#ff10f0" },
  { label: "밈 파편",    value: "48", Icon: Gem,        color: "#00d9ff" },
  { label: "미개봉 박스", value: "3",  Icon: Package,    color: "#00ff88" },
  { label: "열쇠",       value: "12", Icon: Key,        color: "#ffaa00" },
];

export function UserStatsSection() {
  return (
    <section>
      <h2 className="mb-4 text-[#e0d9ff] neon-pink">내 자산 현황</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {USER_STATS.map(({ label, value, Icon, color }) => (
          <Card key={label} className="p-6 glass neon-border-pink hover:neon-border-cyan transition-all group cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center relative overflow-hidden">
                <Icon
                  className="w-6 h-6 relative z-10"
                  style={{ color, filter: `drop-shadow(0 0 8px ${color})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              </div>
              <div>
                <p className="text-sm text-[#a393d1]">{label}</p>
                <p className="text-2xl font-bold text-white chrome-text">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
