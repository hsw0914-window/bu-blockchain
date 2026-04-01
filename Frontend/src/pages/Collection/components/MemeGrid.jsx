import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { RarityBadge } from "../../../components/common/RarityBadge";
import { RARITY_GRADIENT } from "../../../constants";

export function MemeGrid({ memes }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {memes.map((meme, index) => (
        <motion.div
          key={meme.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className={`p-4 glass transition-all relative overflow-hidden ${
            meme.collected
              ? "neon-border-cyan hover:neon-border-pink cursor-pointer group"
              : "opacity-60 neon-border-pink"
          }`}>
            {!meme.collected && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-[#a393d1]" />
                  <p className="text-xs text-[#a393d1]">미획득</p>
                </div>
              </div>
            )}
            <div className={`aspect-square rounded-lg glass-strong mb-3 flex items-center justify-center text-6xl relative overflow-hidden ${meme.collected ? "group-hover:scale-110" : ""} transition-transform`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_GRADIENT[meme.rarity]} opacity-20`} />
              <span className="relative z-10" style={{ filter: meme.collected ? "none" : "grayscale(100%)" }}>
                {meme.image}
              </span>
            </div>
            <h3 className="text-sm mb-2 text-[#e0d9ff] truncate">{meme.name}</h3>
            <div className="flex items-center justify-between">
              <RarityBadge rarity={meme.rarity} />
              {meme.collected && meme.count && (
                <span className="text-xs text-[#00d9ff] font-bold">×{meme.count}</span>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
