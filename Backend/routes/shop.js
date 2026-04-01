const { addPurchasedKeys, chargeUser, getInventoryView, getKeyCatalog } = require("../data/store");

function purchaseKeyRoute(_req, res, { body, sendJson }) {
  const { userId = "demo-user", keyId, quantity = 1 } = body || {};
  const parsedKeyId = Number(keyId);
  const parsedQuantity = Number(quantity);
  const keyCatalog = getKeyCatalog();
  const keyItem = keyCatalog[parsedKeyId];

  if (!keyItem) {
    throw new Error("존재하지 않는 열쇠 상품입니다.");
  }

  if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
    throw new Error("quantity는 1 이상의 정수여야 합니다.");
  }

  const totalPrice = keyItem.price * parsedQuantity;
  chargeUser(userId, totalPrice);
  const addedCount = addPurchasedKeys(userId, parsedKeyId, parsedQuantity);

  const result = {
    purchased: {
      id: keyItem.id,
      name: keyItem.name,
      rarity: keyItem.rarity,
      image: keyItem.image,
      price: totalPrice,
      addedCount,
      quantity: parsedQuantity,
    },
    inventory: getInventoryView(userId),
  };

  sendJson(res, 200, {
    success: true,
    message: "열쇠 구매가 완료되었습니다.",
    data: result,
  });
}

module.exports = {
  purchaseKey: purchaseKeyRoute,
};
