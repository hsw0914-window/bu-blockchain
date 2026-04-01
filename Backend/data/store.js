const { all, get, nowIso, run, transaction } = require("./database");

function ensureUser(userId) {
  if (!userId) {
    throw new Error("userId가 필요합니다.");
  }

  let user = get(`SELECT * FROM users WHERE id = ?`, userId);
  if (user) return user;

  const now = nowIso();
  run(
    `INSERT INTO users (id, nickname, balance, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
    userId,
    "사용자",
    1250,
    now,
    now,
  );

  all(`SELECT fragment_key FROM fragment_catalog ORDER BY display_order`).forEach((row) => {
    run(
      `INSERT INTO user_fragments (user_id, fragment_key, count) VALUES (?, ?, 0)`,
      userId,
      row.fragment_key,
    );
  });

  all(`SELECT id FROM box_catalog ORDER BY id`).forEach((row) => {
    run(
      `INSERT INTO user_boxes (user_id, box_id, count) VALUES (?, ?, 0)`,
      userId,
      row.id,
    );
  });

  ["normal", "gold", "master"].forEach((keyType) => {
    run(
      `INSERT INTO user_keys (user_id, key_type, count) VALUES (?, ?, 0)`,
      userId,
      keyType,
    );
  });

  user = get(`SELECT * FROM users WHERE id = ?`, userId);
  return user;
}

function getUserProfile(userId) {
  const user = ensureUser(userId);

  return {
    userId: user.id,
    nickname: user.nickname,
    walletAddress: user.wallet_address,
    balance: user.balance,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
}

function connectWallet(userId, walletAddress) {
  const normalized = String(walletAddress || "").trim().toLowerCase();
  if (!/^0x[a-f0-9]{40}$/.test(normalized)) {
    throw new Error("유효한 지갑 주소가 아닙니다.");
  }

  ensureUser(userId);
  const duplicated = get(
    `SELECT id FROM users WHERE wallet_address = ? AND id != ?`,
    normalized,
    userId,
  );

  if (duplicated) {
    throw new Error("이미 다른 유저에 연결된 지갑 주소입니다.");
  }

  run(
    `UPDATE users SET wallet_address = ?, updated_at = ? WHERE id = ?`,
    normalized,
    nowIso(),
    userId,
  );

  return getUserProfile(userId);
}

function getBoxCatalog() {
  const rows = all(`SELECT * FROM box_catalog ORDER BY id`);
  return Object.fromEntries(rows.map((row) => [row.id, mapBox(row)]));
}

function getKeyCatalog() {
  const rows = all(`SELECT * FROM key_catalog ORDER BY id`);
  return Object.fromEntries(rows.map((row) => [row.id, mapKeyCatalog(row)]));
}

function getFragmentTemplates() {
  const rows = all(`SELECT * FROM fragment_catalog ORDER BY display_order`);
  return Object.fromEntries(rows.map((row) => [row.fragment_key, mapFragmentTemplate(row)]));
}

function getNftTemplates() {
  const rows = all(`SELECT * FROM nft_templates ORDER BY template_key`);
  return Object.fromEntries(rows.map((row) => [row.template_key, mapNftTemplate(row)]));
}

function getFragmentList(userId) {
  ensureUser(userId);

  return all(`
    SELECT fc.fragment_key, fc.display_order, fc.name, fc.rarity, fc.image, fc.can_use, uf.count
    FROM fragment_catalog fc
    LEFT JOIN user_fragments uf
      ON uf.fragment_key = fc.fragment_key AND uf.user_id = ?
    ORDER BY fc.display_order
  `, userId).map((row, index) => ({
    id: index + 1,
    baseKey: row.fragment_key,
    name: row.name,
    rarity: row.rarity,
    image: row.image,
    canUse: Boolean(row.can_use),
    count: row.count || 0,
  }));
}

function getFragmentById(userId, fragmentId) {
  return getFragmentList(userId).find((item) => item.id === fragmentId) || null;
}

function getInventoryView(userId) {
  const user = ensureUser(userId);
  const fragments = getFragmentList(userId);

  const boxes = all(`
    SELECT bc.id, bc.name, bc.rarity, bc.image, COALESCE(ub.count, 0) AS count
    FROM box_catalog bc
    LEFT JOIN user_boxes ub
      ON ub.box_id = bc.id AND ub.user_id = ?
    ORDER BY bc.id
  `, userId).map((row) => ({
    id: row.id,
    name: row.name,
    rarity: row.rarity,
    image: row.image,
    count: row.count,
  }));

  const keyCountMap = Object.fromEntries(
    all(`SELECT key_type, count FROM user_keys WHERE user_id = ?`, userId).map((row) => [row.key_type, row.count]),
  );

  const keys = [
    { id: 1, name: "일반 열쇠", rarity: "일반", image: "🔑", count: keyCountMap.normal || 0 },
    { id: 2, name: "황금 열쇠", rarity: "희귀", image: "🗝️", count: keyCountMap.gold || 0 },
    { id: 3, name: "마스터 키", rarity: "전설", image: "🔐", count: keyCountMap.master || 0 },
  ];

  const nfts = all(`
    SELECT un.id, un.serial, un.token_id, un.mint_status, un.reveal_status,
           nt.template_key, nt.name, nt.rarity, nt.image, nt.can_use
    FROM user_nfts un
    JOIN nft_templates nt ON nt.template_key = un.template_key
    WHERE un.user_id = ?
    ORDER BY un.id
  `, userId).map((row, index) => ({
    id: index + 1,
    rowId: row.id,
    instanceId: `nft-${row.serial}`,
    serial: row.serial,
    tokenId: row.token_id,
    mintStatus: row.mint_status,
    revealStatus: row.reveal_status,
    baseKey: row.template_key,
    name: `${row.name} #${row.serial}`,
    rarity: row.rarity,
    image: row.image,
    canUse: Boolean(row.can_use),
  }));

  return {
    userId: user.id,
    nickname: user.nickname,
    walletAddress: user.wallet_address,
    balance: user.balance,
    fragments,
    nfts,
    boxes,
    keys,
    totalBoxes: boxes.reduce((sum, row) => sum + row.count, 0),
    totalKeys: keys.reduce((sum, row) => sum + row.count, 0),
  };
}

function getNftStateList(userId) {
  ensureUser(userId);

  return all(`
    SELECT un.id, un.template_key, un.serial, un.token_id, un.mint_status, un.reveal_status,
           un.mint_tx_hash, un.reveal_tx_hash, un.metadata_name, un.metadata_description,
           un.created_at, un.updated_at, nt.rarity, nt.image
    FROM user_nfts un
    JOIN nft_templates nt ON nt.template_key = un.template_key
    WHERE un.user_id = ?
    ORDER BY un.id DESC
  `, userId).map((row) => ({
    rowId: row.id,
    templateKey: row.template_key,
    serial: row.serial,
    tokenId: row.token_id,
    mintStatus: row.mint_status,
    revealStatus: row.reveal_status,
    mintTxHash: row.mint_tx_hash,
    revealTxHash: row.reveal_tx_hash,
    name: row.metadata_name,
    description: row.metadata_description,
    rarity: row.rarity,
    image: row.image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

function chargeUser(userId, amount) {
  const user = ensureUser(userId);
  if (user.balance < amount) {
    throw new Error("MEME 코인이 부족합니다.");
  }

  run(
    `UPDATE users SET balance = balance - ?, updated_at = ? WHERE id = ?`,
    amount,
    nowIso(),
    userId,
  );
}

function addPurchasedKeys(userId, keyId, quantity) {
  ensureUser(userId);
  const keyItem = getKeyCatalog()[keyId];
  if (!keyItem) {
    throw new Error("존재하지 않는 열쇠 상품입니다.");
  }

  const totalCount = keyItem.count * quantity;
  const keyType = keyId === 1 || keyId === 2 ? "normal" : keyId === 3 || keyId === 4 ? "gold" : "master";

  run(
    `UPDATE user_keys SET count = count + ? WHERE user_id = ? AND key_type = ?`,
    totalCount,
    userId,
    keyType,
  );

  run(
    `INSERT INTO purchase_logs (user_id, item_type, item_id, quantity, total_price, created_at)
     VALUES (?, 'key', ?, ?, ?, ?)`,
    userId,
    String(keyId),
    quantity,
    keyItem.price * quantity,
    nowIso(),
  );

  return totalCount;
}

function decrementBox(userId, boxId) {
  ensureUser(userId);
  const row = get(`SELECT count FROM user_boxes WHERE user_id = ? AND box_id = ?`, userId, boxId);
  if (!row || row.count <= 0) {
    throw new Error("보유한 박스가 없습니다.");
  }

  run(`UPDATE user_boxes SET count = count - 1 WHERE user_id = ? AND box_id = ?`, userId, boxId);
}

function consumeKeyForBox(userId, boxId, keyId) {
  ensureUser(userId);
  const box = getBoxCatalog()[boxId];
  if (!box) {
    throw new Error("존재하지 않는 박스입니다.");
  }

  if (box.needsKey) {
    if (keyId === 3) return decrementUserKey(userId, "gold", "해당 박스를 열 수 있는 열쇠가 없습니다.");
    if (keyId === 5) return decrementUserKey(userId, "master", "해당 박스를 열 수 있는 열쇠가 없습니다.");
    throw new Error("해당 박스를 열 수 있는 열쇠가 없습니다.");
  }

  if (keyId && keyId !== 1 && keyId !== 5) {
    throw new Error("스타터 박스에는 일반 열쇠 또는 마스터 키만 사용할 수 있습니다.");
  }

  if (keyId === 1) decrementUserKey(userId, "normal", "일반 열쇠가 없습니다.");
  if (keyId === 5) decrementUserKey(userId, "master", "마스터 키가 없습니다.");
}

function decrementUserKey(userId, keyType, errorMessage) {
  const row = get(`SELECT count FROM user_keys WHERE user_id = ? AND key_type = ?`, userId, keyType);
  if (!row || row.count <= 0) {
    throw new Error(errorMessage);
  }

  run(`UPDATE user_keys SET count = count - 1 WHERE user_id = ? AND key_type = ?`, userId, keyType);
}

function addFragment(userId, fragmentKey, amount) {
  ensureUser(userId);
  run(
    `UPDATE user_fragments SET count = count + ? WHERE user_id = ? AND fragment_key = ?`,
    amount,
    userId,
    fragmentKey,
  );
}

function consumeFragments(userId, requiredCounts) {
  ensureUser(userId);

  Object.entries(requiredCounts).forEach(([fragmentKey, count]) => {
    const row = get(
      `SELECT count FROM user_fragments WHERE user_id = ? AND fragment_key = ?`,
      userId,
      fragmentKey,
    );

    if (!row || row.count < count) {
      throw new Error("선택한 파편 수량이 부족합니다.");
    }
  });

  Object.entries(requiredCounts).forEach(([fragmentKey, count]) => {
    run(
      `UPDATE user_fragments SET count = count - ? WHERE user_id = ? AND fragment_key = ?`,
      count,
      userId,
      fragmentKey,
    );
  });
}

function createLocalNft(userId, templateKey, metadataInput) {
  ensureUser(userId);
  const serial = getNextSerial(userId);
  const metadata = typeof metadataInput === "function" ? metadataInput(serial) : metadataInput;
  const now = nowIso();

  const result = run(
    `INSERT INTO user_nfts
     (user_id, template_key, serial, mint_status, reveal_status, metadata_name, metadata_description, created_at, updated_at)
     VALUES (?, ?, ?, 'LOCAL_ONLY', 'HIDDEN', ?, ?, ?, ?)`,
    userId,
    templateKey,
    serial,
    metadata.name,
    metadata.description,
    now,
    now,
  );

  return {
    rowId: Number(result.lastInsertRowid),
    serial,
    templateKey,
    metadata,
  };
}

function markMintPrepared(userId, nftRowId) {
  ensureUser(userId);
  updateNftState(userId, nftRowId, {
    mintStatus: "PENDING_ONCHAIN_MINT",
  });

  insertContractSyncLog(userId, nftRowId, "MINT", "PENDING");
}

function markMintConfirmed(userId, nftRowId, { tokenId, txHash }) {
  ensureUser(userId);
  updateNftState(userId, nftRowId, {
    mintStatus: "MINTED",
    revealStatus: "HIDDEN",
    tokenId,
    mintTxHash: txHash,
  });

  updateLatestContractSyncLog(userId, nftRowId, "MINT", {
    status: "CONFIRMED",
    tokenId,
    txHash,
  });
}

function markRevealPrepared(userId, nftRowId) {
  ensureUser(userId);
  updateNftState(userId, nftRowId, {
    revealStatus: "PENDING_REVEAL",
  });

  insertContractSyncLog(userId, nftRowId, "REVEAL", "PENDING");
}

function markRevealConfirmed(userId, nftRowId, { txHash }) {
  ensureUser(userId);
  updateNftState(userId, nftRowId, {
    revealStatus: "REVEALED",
    revealTxHash: txHash,
  });

  updateLatestContractSyncLog(userId, nftRowId, "REVEAL", {
    status: "CONFIRMED",
    txHash,
  });
}

function logBoxOpen(userId, { boxId, keyId, rewardType, rewardKey, rewardAmount }) {
  run(
    `INSERT INTO box_open_logs
     (user_id, box_id, key_id, reward_type, reward_key, reward_amount, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    userId,
    boxId,
    keyId || null,
    rewardType,
    rewardKey,
    rewardAmount ?? null,
    nowIso(),
  );
}

function logCombine(userId, { fragmentIds, resultTemplateKey, resultSerial, upgraded }) {
  run(
    `INSERT INTO combine_logs
     (user_id, fragment_ids_json, result_template_key, result_serial, upgraded, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    userId,
    JSON.stringify(fragmentIds),
    resultTemplateKey,
    resultSerial,
    upgraded ? 1 : 0,
    nowIso(),
  );
}

function getContractSyncLogs(userId) {
  ensureUser(userId);
  return all(
    `SELECT id, nft_row_id, action_type, status, tx_hash, token_id, created_at, updated_at
     FROM contract_sync_logs
     WHERE user_id = ?
     ORDER BY id DESC`,
    userId,
  );
}

function getNextSerial(userId) {
  const row = get(
    `SELECT COALESCE(MAX(serial), 999) + 1 AS next_serial FROM user_nfts WHERE user_id = ?`,
    userId,
  );
  return row.next_serial;
}

function updateNftState(userId, nftRowId, updates) {
  const fields = [];
  const params = [];

  if (updates.mintStatus) {
    fields.push(`mint_status = ?`);
    params.push(updates.mintStatus);
  }
  if (updates.revealStatus) {
    fields.push(`reveal_status = ?`);
    params.push(updates.revealStatus);
  }
  if (updates.tokenId !== undefined) {
    fields.push(`token_id = ?`);
    params.push(updates.tokenId);
  }
  if (updates.mintTxHash !== undefined) {
    fields.push(`mint_tx_hash = ?`);
    params.push(updates.mintTxHash);
  }
  if (updates.revealTxHash !== undefined) {
    fields.push(`reveal_tx_hash = ?`);
    params.push(updates.revealTxHash);
  }

  fields.push(`updated_at = ?`);
  params.push(nowIso(), nftRowId, userId);

  run(
    `UPDATE user_nfts SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`,
    ...params,
  );
}

function insertContractSyncLog(userId, nftRowId, actionType, status) {
  const now = nowIso();
  run(
    `INSERT INTO contract_sync_logs
     (user_id, nft_row_id, action_type, status, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    userId,
    nftRowId,
    actionType,
    status,
    now,
    now,
  );
}

function updateLatestContractSyncLog(userId, nftRowId, actionType, updates) {
  const latest = get(
    `SELECT id FROM contract_sync_logs
     WHERE user_id = ? AND nft_row_id = ? AND action_type = ?
     ORDER BY id DESC LIMIT 1`,
    userId,
    nftRowId,
    actionType,
  );

  if (!latest) {
    insertContractSyncLog(userId, nftRowId, actionType, updates.status || "CONFIRMED");
    return;
  }

  run(
    `UPDATE contract_sync_logs
     SET status = ?, tx_hash = ?, token_id = ?, updated_at = ?
     WHERE id = ?`,
    updates.status || "CONFIRMED",
    updates.txHash || null,
    updates.tokenId || null,
    nowIso(),
    latest.id,
  );
}

function getHealthSnapshot() {
  const counts = {
    users: get(`SELECT COUNT(*) AS count FROM users`).count,
    nfts: get(`SELECT COUNT(*) AS count FROM user_nfts`).count,
    purchaseLogs: get(`SELECT COUNT(*) AS count FROM purchase_logs`).count,
    boxOpenLogs: get(`SELECT COUNT(*) AS count FROM box_open_logs`).count,
    combineLogs: get(`SELECT COUNT(*) AS count FROM combine_logs`).count,
  };

  return {
    database: "sqlite",
    counts,
  };
}

function mapBox(row) {
  return {
    id: row.id,
    name: row.name,
    rarity: row.rarity,
    image: row.image,
    needsKey: Boolean(row.needs_key),
  };
}

function mapKeyCatalog(row) {
  return {
    id: row.id,
    name: row.name,
    rarity: row.rarity,
    image: row.image,
    price: row.price,
    count: row.bundle_count,
  };
}

function mapFragmentTemplate(row) {
  return {
    baseKey: row.fragment_key,
    name: row.name,
    rarity: row.rarity,
    image: row.image,
    canUse: Boolean(row.can_use),
  };
}

function mapNftTemplate(row) {
  return {
    baseKey: row.template_key,
    name: row.name,
    rarity: row.rarity,
    image: row.image,
    canUse: Boolean(row.can_use),
  };
}

module.exports = {
  transaction,
  ensureUser,
  getUserProfile,
  connectWallet,
  getBoxCatalog,
  getKeyCatalog,
  getFragmentTemplates,
  getNftTemplates,
  getFragmentList,
  getFragmentById,
  getInventoryView,
  getNftStateList,
  chargeUser,
  addPurchasedKeys,
  decrementBox,
  consumeKeyForBox,
  addFragment,
  consumeFragments,
  createLocalNft,
  markMintPrepared,
  markMintConfirmed,
  markRevealPrepared,
  markRevealConfirmed,
  logBoxOpen,
  logCombine,
  getContractSyncLogs,
  getHealthSnapshot,
};
