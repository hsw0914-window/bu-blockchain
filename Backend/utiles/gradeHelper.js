const RARITY_ORDER = ["일반", "희귀", "영웅", "전설"];

function rarityOrderIndex(rarity) {
  return RARITY_ORDER.indexOf(rarity);
}

function getNextRarity(rarity) {
  const index = rarityOrderIndex(rarity);
  if (index < 0) return RARITY_ORDER[0];
  return RARITY_ORDER[Math.min(index + 1, RARITY_ORDER.length - 1)];
}

function rollFromEntries(entries) {
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  const roll = Math.random() * totalWeight;
  let cursor = 0;

  for (const entry of entries) {
    cursor += entry.weight;
    if (roll <= cursor) {
      return entry;
    }
  }

  return entries[entries.length - 1];
}

function pickRandomByRarity(items, rarity) {
  const filtered = items.filter((item) => item.rarity === rarity);
  if (filtered.length === 0) {
    throw new Error("해당 희귀도의 NFT 후보가 없습니다.");
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
}

module.exports = {
  RARITY_ORDER,
  rarityOrderIndex,
  getNextRarity,
  rollFromEntries,
  pickRandomByRarity,
};
