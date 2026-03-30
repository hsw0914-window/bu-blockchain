import { motion } from "motion/react";
import { Lock, Star, Award, Trophy, Crown, Zap } from "lucide-react";
import { Card } from "../../../components/ui/card";

const TIER_GRADIENT = {
  다이아:   "from-[#00d9ff] to-[#0088cc]",
  플래티넘: "from-[#a393d1] to-[#6b5b95]",
  골드:     "from-[#ffaa00] to-[#ff6b00]",
  실버:     "from-[#e0d9ff] to-[#a393d1]",
  브론즈:   "from-[#ff6b00] to-[#cc5500]",
};

const TIER_COLOR = {
  다이아:   "#00d9ff",
  골드:     "#ffaa00",
  default:  "#a393d1",
};

const TIER_GLOW = {
  다이아: "rgba(0,217,255,0.8)",
  골드:   "rgba(255,170,0,0.8)",
  default:"rgba(163,147,209,0.8)",
};

const TIER_ICON = { 다이아: Crown, 플래티넘: Trophy, 골드: Award, 실버: Star, 브론즈: Zap };

export function TitlesGrid({ titles }) {
  const tiers = ["다이아", "플래티넘", "골드", "실버", "브론즈"];

  return (
    <div className="space-y-6">
      {tiers.map((tier) => {
        const tierTitles = titles.filter((t) => t.tier === tier);
        if (tierTitles.length === 0) return null;
        const TierIcon = TIER_ICON[tier] ?? Zap;
        const color = TIER_COLOR[tier] ?? TIER_COLOR.default;
        const glow  = TIER_GLOW[tier]  ?? TIER_GLOW.default;

        return (
          <div key={tier} className="space-y-3">
            {/* 티어 헤더 */}
            <div className="flex items-center gap-2">
              <TierIcon className="w-5 h-5" style={{ color, filter: `drop-shadow(0 0 8px ${glow})` }} />
              <h3 className="text-lg font-medium" style={{ color, textShadow: `0 0 10px ${glow}` }}>
                {tier}
              </h3>
            </div>

            {tierTitles.map((title, index) => (
              <motion.div
                key={title.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-5 glass transition-all relative overflow-hidden ${
                  title.obtained
                    ? "neon-border-cyan hover:neon-border-pink cursor-pointer group"
                    : "opacity-60 neon-border-pink"
                }`}>
                  {!title.obtained && (
                    <div className="absolute top-4 right-4 z-10">
                      <Lock className="w-6 h-6 text-[#a393d1]" />
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl glass-strong flex items-center justify-center text-4xl flex-shrink-0 relative overflow-hidden ${title.obtained ? "" : "grayscale"}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${TIER_GRADIENT[title.tier] ?? "from-[#a393d1] to-[#6b5b95]"} opacity-20`} />
                      <span className="relative z-10">{title.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold mb-1 ${title.obtained ? "text-white chrome-text" : "text-[#a393d1]"}`}>
                        {title.name}
                      </h4>
                      <p className="text-sm text-[#a393d1]">{title.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`px-2 py-1 rounded-lg bg-gradient-to-r ${TIER_GRADIENT[title.tier] ?? "from-[#a393d1] to-[#6b5b95]"} text-white text-xs font-semibold`}>
                          {title.tier}
                        </span>
                        <span className="text-xs text-[#a393d1]">{title.condition}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
