const http = require("http");
const { URL } = require("url");
const { dbPath, initializeDatabase } = require("./data/database");

const inventoryRoute = require("./routes/inventory");
const boxRoute = require("./routes/box");
const combineRoute = require("./routes/combine");
const shopRoute = require("./routes/shop");
const userRoute = require("./routes/user");
const nftRoute = require("./routes/nft");

const PORT = process.env.PORT || 4000;

initializeDatabase();

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(res, statusCode, payload) {
  setCorsHeaders(res);
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("요청 본문이 너무 큽니다."));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!data) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(new Error("JSON 형식이 올바르지 않습니다."));
      }
    });

    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const path = url.pathname;

  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    if (req.method === "GET" && path === "/api/health") {
      sendJson(res, 200, {
        success: true,
        message: "백엔드가 정상 동작 중입니다.",
        data: {
          port: Number(PORT),
          databasePath: dbPath,
        },
      });
      return;
    }

    if (req.method === "GET" && /^\/api\/inventory\/[^/]+$/.test(path)) {
      const userId = decodeURIComponent(path.split("/").pop());
      inventoryRoute.getInventory(req, res, { userId, sendJson });
      return;
    }

    if (req.method === "GET" && /^\/api\/users\/[^/]+$/.test(path)) {
      const userId = decodeURIComponent(path.split("/").pop());
      userRoute.getUser(req, res, { params: { userId }, sendJson });
      return;
    }

    if (req.method === "GET" && /^\/api\/users\/[^/]+\/sync-state$/.test(path)) {
      const parts = path.split("/");
      const userId = decodeURIComponent(parts[3]);
      userRoute.getUserSyncState(req, res, { params: { userId }, sendJson });
      return;
    }

    if (req.method === "GET" && /^\/api\/nfts\/[^/]+$/.test(path)) {
      const userId = decodeURIComponent(path.split("/").pop());
      nftRoute.getNfts(req, res, { params: { userId }, sendJson });
      return;
    }

    if (req.method === "GET" && path === "/api/integration/contract") {
      nftRoute.getIntegrationInfo(req, res, { sendJson });
      return;
    }

    if (req.method === "POST" && path === "/api/box/open") {
      const body = await readJsonBody(req);
      boxRoute.openBox(req, res, { body, sendJson });
      return;
    }

    if (req.method === "POST" && path === "/api/combine") {
      const body = await readJsonBody(req);
      combineRoute.combineFragments(req, res, { body, sendJson });
      return;
    }

    if (req.method === "POST" && path === "/api/shop/key") {
      const body = await readJsonBody(req);
      shopRoute.purchaseKey(req, res, { body, sendJson });
      return;
    }

    if (req.method === "POST" && path === "/api/users/wallet/connect") {
      const body = await readJsonBody(req);
      userRoute.connectUserWallet(req, res, { body, sendJson });
      return;
    }

    if (req.method === "POST" && path === "/api/nft/mint/prepare") {
      const body = await readJsonBody(req);
      nftRoute.prepareNftMint(req, res, { body, sendJson });
      return;
    }

    if (req.method === "POST" && path === "/api/nft/mint/confirm") {
      const body = await readJsonBody(req);
      nftRoute.confirmNftMint(req, res, { body, sendJson });
      return;
    }

    if (req.method === "POST" && path === "/api/nft/reveal/prepare") {
      const body = await readJsonBody(req);
      nftRoute.prepareNftReveal(req, res, { body, sendJson });
      return;
    }

    if (req.method === "POST" && path === "/api/nft/reveal/confirm") {
      const body = await readJsonBody(req);
      nftRoute.confirmNftReveal(req, res, { body, sendJson });
      return;
    }

    sendJson(res, 404, {
      success: false,
      message: "존재하지 않는 API입니다.",
      availableEndpoints: [
        "GET /api/health",
        "GET /api/inventory/:userId",
        "GET /api/users/:userId",
        "GET /api/users/:userId/sync-state",
        "GET /api/nfts/:userId",
        "GET /api/integration/contract",
        "POST /api/box/open",
        "POST /api/combine",
        "POST /api/shop/key",
        "POST /api/users/wallet/connect",
        "POST /api/nft/mint/prepare",
        "POST /api/nft/mint/confirm",
        "POST /api/nft/reveal/prepare",
        "POST /api/nft/reveal/confirm",
      ],
    });
  } catch (error) {
    sendJson(res, 500, {
      success: false,
      message: error.message || "서버 오류가 발생했습니다.",
    });
  }
});

server.listen(PORT, () => {
  console.log(`meme-box-backend listening on http://localhost:${PORT}`);
  console.log(`sqlite db: ${dbPath}`);
});
