const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const dbPath = path.join(__dirname, "meme-box.db");
const db = new DatabaseSync(dbPath);

function nowIso() {
  return new Date().toISOString();
}

function run(sql, ...params) {
  return db.prepare(sql).run(...params);
}

function get(sql, ...params) {
  return db.prepare(sql).get(...params);
}

function all(sql, ...params) {
  return db.prepare(sql).all(...params);
}

function transaction(fn) {
  run("BEGIN");
  try {
    const result = fn();
    run("COMMIT");
    return result;
  } catch (error) {
    run("ROLLBACK");
    throw error;
  }
}

function initializeDatabase() {
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      nickname TEXT NOT NULL,
      wallet_address TEXT UNIQUE,
      balance INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fragment_catalog (
      fragment_key TEXT PRIMARY KEY,
      display_order INTEGER NOT NULL,
      name TEXT NOT NULL,
      rarity TEXT NOT NULL,
      image TEXT NOT NULL,
      can_use INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS nft_templates (
      template_key TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      rarity TEXT NOT NULL,
      image TEXT NOT NULL,
      can_use INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS box_catalog (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      rarity TEXT NOT NULL,
      image TEXT NOT NULL,
      needs_key INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS key_catalog (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      rarity TEXT NOT NULL,
      image TEXT NOT NULL,
      price INTEGER NOT NULL,
      bundle_count INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_fragments (
      user_id TEXT NOT NULL,
      fragment_key TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (user_id, fragment_key),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (fragment_key) REFERENCES fragment_catalog(fragment_key)
    );

    CREATE TABLE IF NOT EXISTS user_boxes (
      user_id TEXT NOT NULL,
      box_id INTEGER NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (user_id, box_id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (box_id) REFERENCES box_catalog(id)
    );

    CREATE TABLE IF NOT EXISTS user_keys (
      user_id TEXT NOT NULL,
      key_type TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (user_id, key_type),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS user_nfts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      template_key TEXT NOT NULL,
      serial INTEGER NOT NULL,
      token_id TEXT,
      mint_status TEXT NOT NULL DEFAULT 'LOCAL_ONLY',
      reveal_status TEXT NOT NULL DEFAULT 'HIDDEN',
      mint_tx_hash TEXT,
      reveal_tx_hash TEXT,
      metadata_name TEXT NOT NULL,
      metadata_description TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (template_key) REFERENCES nft_templates(template_key)
    );

    CREATE TABLE IF NOT EXISTS purchase_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      item_type TEXT NOT NULL,
      item_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      total_price INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS box_open_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      box_id INTEGER NOT NULL,
      key_id INTEGER,
      reward_type TEXT NOT NULL,
      reward_key TEXT NOT NULL,
      reward_amount INTEGER,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS combine_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      fragment_ids_json TEXT NOT NULL,
      result_template_key TEXT NOT NULL,
      result_serial INTEGER NOT NULL,
      upgraded INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contract_sync_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      nft_row_id INTEGER NOT NULL,
      action_type TEXT NOT NULL,
      status TEXT NOT NULL,
      tx_hash TEXT,
      token_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  seedCatalogs();
  seedUsers();
  repairBrokenMetadata();
}

function seedCatalogs() {
  const fragments = [
    ["pepe", 1, "페페 밈 파편", "영웅", "🐸", 1],
    ["doge", 2, "도지 밈 파편", "희귀", "🐕", 1],
    ["cat", 3, "고양이 밈 파편", "희귀", "🐱", 1],
    ["laugh", 4, "웃음 밈 파편", "일반", "😂", 1],
    ["heart", 5, "하트 밈 파편", "일반", "❤️", 1],
    ["star", 6, "별 밈 파편", "일반", "⭐", 1],
    ["rocket", 7, "로켓 밈 파편", "일반", "🚀", 1],
    ["fire", 8, "불 밈 파편", "희귀", "🔥", 1],
  ];

  const nftTemplates = [
    ["pepeLegend", "페페 밈", "전설", "🐸", 0],
    ["dogeHero", "도지 밈", "영웅", "🐕", 0],
    ["catRare", "고양이 밈", "희귀", "🐱", 0],
  ];

  const boxes = [
    [1, "스타터 박스", "일반", "📦", 0],
    [2, "프리미엄 박스", "희귀", "🎁", 1],
    [3, "레전드 박스", "영웅", "💎", 1],
    [4, "미스터리 박스", "전설", "❓", 1],
  ];

  const keys = [
    [1, "일반 열쇠", "일반", "🔑", 50, 1],
    [2, "일반 열쇠 (5개)", "일반", "🔑", 200, 5],
    [3, "황금 열쇠", "희귀", "🗝️", 150, 1],
    [4, "황금 열쇠 (3개)", "희귀", "🗝️", 400, 3],
    [5, "마스터 키", "전설", "🔐", 500, 1],
  ];

  const insertFragment = db.prepare(`
    INSERT OR IGNORE INTO fragment_catalog
    (fragment_key, display_order, name, rarity, image, can_use)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  fragments.forEach((row) => insertFragment.run(...row));

  const insertTemplate = db.prepare(`
    INSERT OR IGNORE INTO nft_templates
    (template_key, name, rarity, image, can_use)
    VALUES (?, ?, ?, ?, ?)
  `);
  nftTemplates.forEach((row) => insertTemplate.run(...row));

  const insertBox = db.prepare(`
    INSERT OR IGNORE INTO box_catalog
    (id, name, rarity, image, needs_key)
    VALUES (?, ?, ?, ?, ?)
  `);
  boxes.forEach((row) => insertBox.run(...row));

  const insertKey = db.prepare(`
    INSERT OR IGNORE INTO key_catalog
    (id, name, rarity, image, price, bundle_count)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  keys.forEach((row) => insertKey.run(...row));
}

function seedUsers() {
  ["demo-user", "1"].forEach((userId) => ensureSeedUser(userId));
}

function ensureSeedUser(userId) {
  const existing = get(`SELECT id FROM users WHERE id = ?`, userId);
  if (existing) return;

  const now = nowIso();
  run(
    `INSERT INTO users (id, nickname, balance, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
    userId,
    "사용자",
    1250,
    now,
    now,
  );

  const fragments = {
    pepe: 2,
    doge: 3,
    cat: 2,
    laugh: 5,
    heart: 4,
    star: 3,
    rocket: 2,
    fire: 1,
  };

  Object.entries(fragments).forEach(([fragmentKey, count]) => {
    run(
      `INSERT INTO user_fragments (user_id, fragment_key, count) VALUES (?, ?, ?)`,
      userId,
      fragmentKey,
      count,
    );
  });

  const boxes = { 1: 2, 2: 1, 3: 0, 4: 0 };
  Object.entries(boxes).forEach(([boxId, count]) => {
    run(
      `INSERT INTO user_boxes (user_id, box_id, count) VALUES (?, ?, ?)`,
      userId,
      Number(boxId),
      count,
    );
  });

  [["normal", 8], ["gold", 4], ["master", 1]].forEach(([keyType, count]) => {
    run(
      `INSERT INTO user_keys (user_id, key_type, count) VALUES (?, ?, ?)`,
      userId,
      keyType,
      count,
    );
  });

  const starterNfts = [
    ["pepeLegend", 1337, "페페 밈 #1337", "전설 등급의 밈 NFT입니다."],
    ["dogeHero", 420, "도지 밈 #420", "영웅 등급의 밈 NFT입니다."],
    ["catRare", 999, "고양이 밈 #999", "희귀 등급의 밈 NFT입니다."],
  ];

  starterNfts.forEach(([templateKey, serial, metadataName, metadataDescription]) => {
    run(
      `INSERT INTO user_nfts
      (user_id, template_key, serial, mint_status, reveal_status, metadata_name, metadata_description, created_at, updated_at)
      VALUES (?, ?, ?, 'MINTED', 'REVEALED', ?, ?, ?, ?)`,
      userId,
      templateKey,
      serial,
      metadataName,
      metadataDescription,
      now,
      now,
    );
  });
}

function repairBrokenMetadata() {
  const brokenRows = all(`
    SELECT un.id, nt.name, nt.rarity, un.serial
    FROM user_nfts un
    JOIN nft_templates nt ON nt.template_key = un.template_key
    WHERE un.metadata_name LIKE '%undefined%'
  `);

  brokenRows.forEach((row) => {
    run(
      `UPDATE user_nfts
       SET metadata_name = ?, metadata_description = ?, updated_at = ?
       WHERE id = ?`,
      `${row.name} #${row.serial}`,
      `${row.rarity} 등급의 밈 NFT입니다.`,
      nowIso(),
      row.id,
    );
  });
}

module.exports = {
  db,
  dbPath,
  nowIso,
  run,
  get,
  all,
  transaction,
  initializeDatabase,
};
