const {
  connectWallet,
  getContractSyncLogs,
  getInventoryView,
  getNftStateList,
  getUserProfile,
} = require("../data/store");

function getUserSummary(userId) {
  const profile = getUserProfile(userId);
  const inventory = getInventoryView(userId);
  const nfts = getNftStateList(userId);

  return {
    profile,
    inventorySummary: {
      balance: inventory.balance,
      totalBoxes: inventory.totalBoxes,
      totalKeys: inventory.totalKeys,
      fragmentKinds: inventory.fragments.length,
      ownedNfts: inventory.nfts.length,
    },
    nftSyncSummary: {
      total: nfts.length,
      minted: nfts.filter((item) => item.mintStatus === "MINTED").length,
      revealed: nfts.filter((item) => item.revealStatus === "REVEALED").length,
      pending: nfts.filter((item) => item.mintStatus !== "MINTED" || item.revealStatus === "PENDING_REVEAL").length,
    },
  };
}

function linkWallet(userId, walletAddress) {
  return connectWallet(userId, walletAddress);
}

function getContractSyncState(userId) {
  return {
    profile: getUserProfile(userId),
    nfts: getNftStateList(userId),
    logs: getContractSyncLogs(userId),
  };
}

module.exports = {
  getUserSummary,
  linkWallet,
  getContractSyncState,
};
