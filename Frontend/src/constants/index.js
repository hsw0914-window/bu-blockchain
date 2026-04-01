// ─── 등급별 그라디언트 클래스 (Tailwind) ─────────────────────────────────────
export const RARITY_GRADIENT = {
  전설: "from-[#ffaa00] to-[#ff6b00]",
  영웅: "from-[#ff10f0] to-[#bd00e8]",
  희귀: "from-[#00d9ff] to-[#0088cc]",
  일반: "from-[#a393d1] to-[#6b5b95]",
};

// ─── 연속 출석 보상 마일스톤 ──────────────────────────────────────────────────
export const STREAK_REWARDS = [
  { streak: 5,  label: "일반 박스",  icon: "📦", color: "#00d9ff",  glow: "rgba(0,217,255,0.6)"  },
  { streak: 7,  label: "열쇠",       icon: "🔑", color: "#ffaa00",  glow: "rgba(255,170,0,0.6)"  },
  { streak: 10, label: "희귀 박스",  icon: "🎁", color: "#00ff88",  glow: "rgba(0,255,136,0.6)"  },
  { streak: 14, label: "영웅 박스",  icon: "⭐", color: "#ff10f0",  glow: "rgba(255,16,240,0.6)" },
  { streak: 21, label: "전설 박스",  icon: "🌟", color: "#bd00e8",  glow: "rgba(189,0,232,0.6)"  },
  { streak: 30, label: "황금 열쇠",  icon: "🗝️", color: "#ffaa00",  glow: "rgba(255,170,0,0.6)"  },
];

// ─── 네비게이션 아이템 경로 목록 ─────────────────────────────────────────────
export const NAV_PATHS = [
  { path: "/",           label: "홈" },
  { path: "/shop",       label: "상점" },
  { path: "/combine",    label: "조합" },
  { path: "/collection", label: "도감" },
  { path: "/meme-info",  label: "밈 코인" },
  { path: "/notice",     label: "공지사항" },
  { path: "/attendance", label: "출석체크" },
];
