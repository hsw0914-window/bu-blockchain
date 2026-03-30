import { BarChart3 } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export function MemeCoinCard({ coin, onSelect }) {
  const isPositive = coin.change.startsWith("+");

  return (
    <Card
      onClick={() => onSelect(coin)}
      className="p-6 glass neon-border-cyan hover:neon-border-pink transition-all cursor-pointer relative overflow-hidden group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${coin.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-5xl">{coin.icon}</div>
            <div>
              <h3 className="text-[#e0d9ff] font-bold">{coin.name}</h3>
              <p className="text-sm text-[#a393d1]">{coin.fullName}</p>
            </div>
          </div>
          <span className={`text-sm px-2 py-1 rounded-lg font-semibold ${
            isPositive ? "bg-[#00ff88]/20 text-[#00ff88]" : "bg-red-500/20 text-red-400"
          }`}>
            {coin.change}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {[
            { label: "현재 가격", value: coin.price,     className: "text-lg font-bold text-[#00d9ff] chrome-text" },
            { label: "시가총액",  value: coin.marketCap, className: "text-sm text-white" },
            { label: "거래량 (24h)", value: coin.volume, className: "text-sm text-white" },
          ].map(({ label, value, className }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-[#a393d1]">{label}</span>
              <span className={className}>{value}</span>
            </div>
          ))}
        </div>

        <Button size="sm" className="w-full glass neon-border-pink hover:neon-border-cyan bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-white font-semibold">
          <BarChart3 className="w-4 h-4 mr-2" />
          상세 보기
        </Button>
      </div>
    </Card>
  );
}
