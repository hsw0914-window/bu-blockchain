const {
  getHealthSnapshot,
  getNftStateList,
  getNftTemplates,
  markMintConfirmed,
  markMintPrepared,
  markRevealConfirmed,
  markRevealPrepared,
} = require("../data/store");

function listNfts(userId) {
  return getNftStateList(userId);
}

function prepareMint(userId, nftRowId) {
  validateNftOwnership(userId, nftRowId);
  markMintPrepared(userId, nftRowId);

  return {
    nftRowId,
    status: "PENDING_ONCHAIN_MINT",
    message: "컨트랙트 담당자가 온체인 민팅을 진행할 수 있는 상태로 표시했습니다.",
  };
}

function confirmMint(userId, nftRowId, tokenId, txHash) {
  validateNftOwnership(userId, nftRowId);
  if (!tokenId || !txHash) {
    throw new Error("tokenId와 txHash가 필요합니다.");
  }

  markMintConfirmed(userId, nftRowId, { tokenId: String(tokenId), txHash: String(txHash) });

  return {
    nftRowId,
    tokenId: String(tokenId),
    txHash: String(txHash),
    status: "MINTED",
  };
}

function prepareReveal(userId, nftRowId) {
  validateNftOwnership(userId, nftRowId);
  markRevealPrepared(userId, nftRowId);

  return {
    nftRowId,
    status: "PENDING_REVEAL",
    message: "리빌 트랜잭션 대기 상태로 표시했습니다.",
  };
}

function confirmReveal(userId, nftRowId, txHash) {
  validateNftOwnership(userId, nftRowId);
  if (!txHash) {
    throw new Error("txHash가 필요합니다.");
  }

  markRevealConfirmed(userId, nftRowId, { txHash: String(txHash) });

  return {
    nftRowId,
    txHash: String(txHash),
    status: "REVEALED",
  };
}

function getIntegrationSummary() {
  return {
    chainReady: false,
    message: "컨트랙트 주소와 ABI가 아직 연결되지 않아 온체인 호출은 준비 상태까지만 구현되어 있습니다.",
    nftTemplates: Object.values(getNftTemplates()),
    backendHealth: getHealthSnapshot(),
    requiredFromContractTeam: [
      "컨트랙트 주소",
      "ABI",
      "민팅 함수명과 파라미터",
      "리빌 함수명과 파라미터",
      "이벤트 이름과 반환값 형식",
      "사용 네트워크 정보",
    ],
  };
}

function validateNftOwnership(userId, nftRowId) {
  const nft = getNftStateList(userId).find((item) => item.rowId === Number(nftRowId));
  if (!nft) {
    throw new Error("해당 NFT를 찾을 수 없습니다.");
  }
  return nft;
}

module.exports = {
  listNfts,
  prepareMint,
  confirmMint,
  prepareReveal,
  confirmReveal,
  getIntegrationSummary,
};
