const { getInventoryView } = require("../data/store");

function getInventory(_req, res, { userId, sendJson }) {
  const inventory = getInventoryView(userId);

  sendJson(res, 200, {
    success: true,
    message: "인벤토리 조회에 성공했습니다.",
    data: inventory,
  });
}

module.exports = {
  getInventory,
};
