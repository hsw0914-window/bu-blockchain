const { combineFragments } = require("../services/combineService");

function combineFragmentsRoute(_req, res, { body, sendJson }) {
  const { userId = "demo-user", fragmentIds = [] } = body || {};
  const result = combineFragments(
    userId,
    fragmentIds.map((id) => Number(id)),
  );

  sendJson(res, 200, {
    success: true,
    message: "파편 조합이 완료되었습니다.",
    data: result,
  });
}

module.exports = {
  combineFragments: combineFragmentsRoute,
};
