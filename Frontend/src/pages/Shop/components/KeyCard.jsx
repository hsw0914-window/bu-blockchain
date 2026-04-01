import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { RarityBadge } from "../../../components/common/RarityBadge";

export function KeyCard({ keyItem, onPurchase }) {
  return (
    <Card className="p-5 glass neon-border-cyan hover:neon-border-pink transition-all relative overflow-hidden group">
      <div className={`absolute inset-0 bg-gradient-to-br ${keyItem.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
      <div className="relative z-10">
        <div className="text-center mb-3">
          <div className="text-5xl mb-2 relative inline-block">
            {keyItem.image}
            {keyItem.count > 1 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-[#ff10f0] to-[#bd00e8] flex items-center justify-center text-white text-xs font-bold neon-border-pink">
                {keyItem.count}
              </div>
            )}
          </div>
          <h3 className="text-sm mb-1 text-[#e0d9ff]">{keyItem.name}</h3>
          <RarityBadge rarity={keyItem.rarity} />
        </div>

        <p className="text-xs text-[#a393d1] mb-3 min-h-[32px]">{keyItem.description}</p>

        <p className="text-xl font-bold text-[#00ff88] chrome-text mb-3 text-center">{keyItem.price} MEME</p>

        <Button
          onClick={() => onPurchase(keyItem, "key")}
          size="sm"
          className="w-full glass neon-border-cyan hover:neon-border-pink bg-gradient-to-r from-[#00d9ff]/30 to-[#00ff88]/30 text-white font-semibold"
        >
          구매
        </Button>
      </div>
    </Card>
  );
}
