import { RARITY_GRADIENT } from "../../constants";

export function RarityBadge({ rarity, className = "" }) {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-lg bg-gradient-to-r ${RARITY_GRADIENT[rarity] ?? "from-[#a393d1] to-[#6b5b95]"} text-white font-semibold ${className}`}
    >
      {rarity}
    </span>
  );
}
