const { getContractSyncState, getUserSummary, linkWallet } = require("../services/userService");

function getUser(req, res, { params, sendJson }) {
  const result = getUserSummary(params.userId);

  sendJson(res, 200, {
    success: true,
    message: "유저 정보를 조회했습니다.",
    data: result,
  });
}

function connectUserWallet(_req, res, { body, sendJson }) {
  const { userId = "demo-user", walletAddress } = body || {};
  const result = linkWallet(userId, walletAddress);

  sendJson(res, 200, {
    success: true,
    message: "지갑 연결이 저장되었습니다.",
    data: result,
  });
}

function getUserSyncState(_req, res, { params, sendJson }) {
  const result = getContractSyncState(params.userId);

  sendJson(res, 200, {
    success: true,
    message: "컨트랙트 연동 상태를 조회했습니다.",
    data: result,
  });
}

module.exports = {
  getUser,
  connectUserWallet,
  getUserSyncState,
};
