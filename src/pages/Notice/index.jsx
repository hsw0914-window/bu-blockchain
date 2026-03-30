import { useState } from "react";
import { Bell, Pin } from "lucide-react";
import { NoticeCard } from "./components/NoticeCard";
import { NoticeModal } from "./components/NoticeModal";

const NOTICES = [
  {
    id: 1,
    title: "신규 유저 환영 이벤트 안내",
    content:
      "신규 가입 유저 분들께 스타터 박스 1개와 황금 열쇠 3개를 무료로 지급해드립니다! 이벤트 기간: ~2026.03.31까지\n\n참여 방법:\n1. 회원가입 완료\n2. 상점 방문\n3. 이벤트 보상 자동 지급\n\n이 기회를 놓치지 마세요!",
    date: "2026.03.30",
    type: "이벤트",
    isPinned: true,
  },
  {
    id: 2,
    title: "봄맞이 밈 파편 2배 이벤트",
    content:
      "따뜻한 봄을 맞이하여 특별한 이벤트를 준비했습니다!\n\n이벤트 기간 동안 박스를 개봉하면 밈 파편을 2배로 획득할 수 있습니다.\n\n이벤트 기간: 2026.03.25 - 2026.04.05\n대상: 모든 박스\n\n많은 참여 부탁드립니다!",
    date: "2026.03.25",
    type: "이벤트",
    isPinned: true,
  },
  {
    id: 3,
    title: "조합 시스템 업데이트 안내",
    content:
      "조합 시스템이 업데이트되었습니다.\n\n주요 변경사항:\n- UI/UX 개선\n- 조합 성공률 표시 추가\n- 칭호 시스템 추가\n- 도감 기능 추가\n\n더욱 편리해진 조합 시스템을 경험해보세요!",
    date: "2026.03.28",
    type: "업데이트",
  },
  {
    id: 4,
    title: "정기 점검 안내",
    content:
      "서비스 안정화를 위한 정기 점검이 진행됩니다.\n\n점검 일시: 2026.04.01 02:00 ~ 06:00 (4시간)\n\n점검 중에는 서비스 이용이 불가능하니 양해 부탁드립니다.\n점검 후 접속 시 보상 아이템을 지급해드릴 예정입니다.",
    date: "2026.03.27",
    type: "공지",
  },
  {
    id: 5,
    title: "새로운 레전드 박스 출시",
    content:
      "전설적인 밈을 획득할 수 있는 레전드 박스가 출시되었습니다!\n\n레전드 박스에서는:\n- 전설 등급 확률 10%\n- 영웅 등급 확률 30%\n- 희귀 등급 이상 100% 보장\n\n상점에서 지금 바로 만나보세요!",
    date: "2026.03.26",
    type: "업데이트",
  },
];

const TABS = [
  { key: "all",    label: "전체" },
  { key: "notice", label: "공지" },
  { key: "event",  label: "이벤트" },
];

const TAB_ACTIVE = {
  all:    "bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-[#ff10f0] neon-pink",
  notice: "bg-gradient-to-r from-[#00ff88]/30 to-[#00cc6a]/30 text-[#00ff88] neon-green",
  event:  "bg-gradient-to-r from-[#00d9ff]/30 to-[#0088cc]/30 text-[#00d9ff] neon-cyan",
};

export function Notice() {
  const [selectedTab,    setSelectedTab]    = useState("all");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const filtered = NOTICES.filter((n) => {
    if (selectedTab === "all")    return true;
    if (selectedTab === "notice") return n.type === "공지";
    if (selectedTab === "event")  return n.type === "이벤트" || n.type === "업데이트";
    return true;
  });

  const pinned  = filtered.filter((n) => n.isPinned);
  const regular = filtered.filter((n) => !n.isPinned);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff10f0] to-[#bd00e8] flex items-center justify-center neon-border-pink relative overflow-hidden">
          <Bell className="w-6 h-6 text-white drop-shadow-lg relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
        </div>
        <h1 className="chrome-text">공지사항</h1>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 p-1 glass-strong rounded-xl neon-border-pink">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key)}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              selectedTab === key
                ? TAB_ACTIVE[key]
                : "text-[#a393d1] hover:text-[#00d9ff]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 고정 공지 */}
      {pinned.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Pin
              className="w-5 h-5 text-[#ffaa00]"
              style={{ filter: "drop-shadow(0 0 8px rgba(255,170,0,0.8))" }}
            />
            <h2
              className="text-lg text-[#e0d9ff]"
              style={{ textShadow: "0 0 10px rgba(255,170,0,0.8)" }}
            >
              고정된 공지
            </h2>
          </div>
          {pinned.map((notice, i) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              index={i}
              isPinned
              onClick={setSelectedNotice}
            />
          ))}
        </div>
      )}

      {/* 일반 공지 */}
      <div className="space-y-3">
        {regular.map((notice, i) => (
          <NoticeCard
            key={notice.id}
            notice={notice}
            index={pinned.length + i}
            isPinned={false}
            onClick={setSelectedNotice}
          />
        ))}
      </div>

      {/* 상세 모달 */}
      <NoticeModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
    </div>
  );
}
