const { openBox } = require("../services/boxService");

function openBoxRoute(_req, res, { body, sendJson }) {
  const { userId = "demo-user", boxId, keyId } = body || {};
  const result = openBox(userId, Number(boxId), keyId == null ? undefined : Number(keyId));

  sendJson(res, 200, {
    success: true,
    message: "박스 개봉이 완료되었습니다.",
    data: result,
  });
}

module.exports = {
  openBox: openBoxRoute,
};
