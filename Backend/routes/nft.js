const {
  confirmMint,
  confirmReveal,
  getIntegrationSummary,
  listNfts,
  prepareMint,
  prepareReveal,
} = require("../services/nftService");

function getNfts(_req, res, { params, sendJson }) {
  const result = listNfts(params.userId);

  sendJson(res, 200, {
    success: true,
    message: "NFT 상태 목록을 조회했습니다.",
    data: result,
  });
}

function prepareNftMint(_req, res, { body, sendJson }) {
  const { userId = "demo-user", nftRowId } = body || {};
  const result = prepareMint(userId, Number(nftRowId));

  sendJson(res, 200, {
    success: true,
    message: "민팅 준비 상태로 저장했습니다.",
    data: result,
  });
}

function confirmNftMint(_req, res, { body, sendJson }) {
  const { userId = "demo-user", nftRowId, tokenId, txHash } = body || {};
  const result = confirmMint(userId, Number(nftRowId), tokenId, txHash);

  sendJson(res, 200, {
    success: true,
    message: "민팅 완료 상태를 저장했습니다.",
    data: result,
  });
}

function prepareNftReveal(_req, res, { body, sendJson }) {
  const { userId = "demo-user", nftRowId } = body || {};
  const result = prepareReveal(userId, Number(nftRowId));

  sendJson(res, 200, {
    success: true,
    message: "리빌 준비 상태로 저장했습니다.",
    data: result,
  });
}

function confirmNftReveal(_req, res, { body, sendJson }) {
  const { userId = "demo-user", nftRowId, txHash } = body || {};
  const result = confirmReveal(userId, Number(nftRowId), txHash);

  sendJson(res, 200, {
    success: true,
    message: "리빌 완료 상태를 저장했습니다.",
    data: result,
  });
}

function getIntegrationInfo(_req, res, { sendJson }) {
  sendJson(res, 200, {
    success: true,
    message: "컨트랙트 연동 준비 정보를 조회했습니다.",
    data: getIntegrationSummary(),
  });
}

module.exports = {
  getNfts,
  prepareNftMint,
  confirmNftMint,
  prepareNftReveal,
  confirmNftReveal,
  getIntegrationInfo,
};
