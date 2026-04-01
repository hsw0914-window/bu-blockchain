const {
  addFragment,
  consumeKeyForBox,
  decrementBox,
  getBoxCatalog,
  getFragmentTemplates,
  getInventoryView,
  getNftTemplates,
  logBoxOpen,
  transaction,
} = require("../data/store");
const { mintNft } = require("./mintService");
const { revealFragmentResult, revealMintedNftResult } = require("./revealService");
const { rollFromEntries } = require("../utiles/gradeHelper");

const BOX_RESULT_TABLE = {
  1: [
    { kind: "fragment", key: "laugh", amount: 2, weight: 80 },
    { kind: "fragment", key: "doge", amount: 1, weight: 20 },
  ],
  2: [
    { kind: "fragment", key: "fire", amount: 1, weight: 65 },
    { kind: "fragment", key: "pepe", amount: 1, weight: 30 },
    { kind: "nft", key: "dogeHero", weight: 5 },
  ],
  3: [
    { kind: "fragment", key: "pepe", amount: 2, weight: 50 },
    { kind: "fragment", key: "fire", amount: 2, weight: 40 },
    { kind: "nft", key: "pepeLegend", weight: 10 },
  ],
  4: [
    { kind: "fragment", key: "pepe", amount: 2, weight: 70 },
    { kind: "nft", key: "pepeLegend", weight: 30 },
  ],
};

function openBox(userId, boxId, keyId) {
  return transaction(() => {
    const boxCatalog = getBoxCatalog();
    const box = boxCatalog[boxId];

    if (!box) {
      throw new Error("존재하지 않는 박스입니다.");
    }

    consumeKeyForBox(userId, boxId, keyId);
    decrementBox(userId, boxId);

    const result = drawBoxReward(userId, boxId);

    logBoxOpen(userId, {
      boxId,
      keyId,
      rewardType: result.type,
      rewardKey: result.type === "fragment" ? result.name : result.metadata.name,
      rewardAmount: result.amount || null,
    });

    return {
      openedBox: {
        id: box.id,
        name: box.name,
        rarity: box.rarity,
        image: box.image,
      },
      result,
      inventory: getInventoryView(userId),
    };
  });
}

function drawBoxReward(userId, boxId) {
  const reward = rollFromEntries(BOX_RESULT_TABLE[boxId]);
  const fragmentTemplates = getFragmentTemplates();
  const nftTemplates = getNftTemplates();

  if (reward.kind === "fragment") {
    const fragment = fragmentTemplates[reward.key];
    addFragment(userId, reward.key, reward.amount);
    return revealFragmentResult(fragment, reward.amount);
  }

  const mintedNft = mintNft(userId, nftTemplates[reward.key]);
  return revealMintedNftResult(mintedNft);
}

module.exports = {
  openBox,
};
