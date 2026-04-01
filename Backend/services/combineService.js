const {
  consumeFragments,
  getFragmentById,
  getInventoryView,
  getNftTemplates,
  logCombine,
  transaction,
} = require("../data/store");
const { getNextRarity, pickRandomByRarity, rarityOrderIndex } = require("../utiles/gradeHelper");
const { mintNft } = require("./mintService");
const { revealCombinedNftResult } = require("./revealService");

function combineFragments(userId, fragmentIds) {
  return transaction(() => {
    if (!Array.isArray(fragmentIds) || fragmentIds.length !== 3) {
      throw new Error("fragmentIds는 3개의 항목을 가진 배열이어야 합니다.");
    }

    const selected = fragmentIds.map((id) => {
      const fragment = getFragmentById(userId, id);

      if (!fragment) {
        throw new Error("존재하지 않는 파편이 포함되어 있습니다.");
      }

      if (fragment.count <= 0) {
        throw new Error(`보유 수량이 부족한 파편입니다: ${fragment.name}`);
      }

      return fragment;
    });

    const requiredCounts = selected.reduce((acc, fragment) => {
      acc[fragment.baseKey] = (acc[fragment.baseKey] || 0) + 1;
      return acc;
    }, {});

    consumeFragments(userId, requiredCounts);

    const upgraded = selected.every((fragment) => fragment.rarity === selected[0].rarity);
    const targetRarity = upgraded
      ? getNextRarity(selected[0].rarity)
      : selected
          .slice()
          .sort((left, right) => rarityOrderIndex(right.rarity) - rarityOrderIndex(left.rarity))[0].rarity;

    const nftTemplates = Object.values(getNftTemplates());
    const chosenTemplate = pickRandomByRarity(nftTemplates, targetRarity);
    const mintedNft = mintNft(userId, chosenTemplate);

    logCombine(userId, {
      fragmentIds,
      resultTemplateKey: chosenTemplate.baseKey,
      resultSerial: mintedNft.serial,
      upgraded,
    });

    return {
      usedFragments: selected.map(({ id, name, rarity, image }) => ({ id, name, rarity, image })),
      result: revealCombinedNftResult(mintedNft, upgraded),
      inventory: getInventoryView(userId),
    };
  });
}

module.exports = {
  combineFragments,
};
