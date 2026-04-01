import { useState } from "react";
import { Book } from "lucide-react";
import { Card } from "../../components/ui/card";
import { MemeGrid } from "./components/MemeGrid";
import { TitlesGrid } from "./components/TitlesGrid";

const MEMES = [
  { id: 1,  name: "페페 밈 #1337",  rarity: "전설", image: "🐸", collected: true,  count: 2 },
  { id: 2,  name: "도지 밈 #420",   rarity: "영웅", image: "🐕", collected: true,  count: 1 },
  { id: 3,  name: "고양이 밈 #999", rarity: "희귀", image: "🐱", collected: true,  count: 3 },
  { id: 4,  name: "몽키 밈 #777",   rarity: "영웅", image: "🐵", collected: true,  count: 1 },
  { id: 5,  name: "웃음 밈",        rarity: "일반", image: "😂", collected: true,  count: 5 },
  { id: 6,  name: "생각하는 밈",    rarity: "희귀", image: "🤔", collected: false },
  { id: 7,  name: "화난 밈",        rarity: "영웅", image: "😡", collected: false },
  { id: 8,  name: "드래곤 밈",      rarity: "전설", image: "🐉", collected: false },
  { id: 9,  name: "유니콘 밈",      rarity: "전설", image: "🦄", collected: false },
  { id: 10, name: "로켓 밈",        rarity: "희귀", image: "🚀", collected: true,  count: 2 },
  { id: 11, name: "다이아 밈",      rarity: "영웅", image: "💎", collected: false },
  { id: 12, name: "별 밈",          rarity: "일반", image: "⭐", collected: true,  count: 8 },
];

const TITLES = [
  { id: 1, name: "밈 초보자",    description: "첫 번째 밈을 획득했습니다",          tier: "브론즈",   icon: "🥉", obtained: true,  condition: "밈 1개 획득" },
  { id: 2, name: "밈 수집가",    description: "10개 이상의 밈을 수집했습니다",       tier: "실버",     icon: "🥈", obtained: true,  condition: "밈 10개 획득" },
  { id: 3, name: "밈 마스터",    description: "50개 이상의 밈을 수집했습니다",       tier: "골드",     icon: "🥇", obtained: false, condition: "밈 50개 획득" },
  { id: 4, name: "전설의 수집가", description: "전설 등급 밈을 3개 이상 보유했습니다", tier: "플래티넘", icon: "💎", obtained: false, condition: "전설 밈 3개 획득" },
  { id: 5, name: "조합의 달인",  description: "100번 이상 조합에 성공했습니다",      tier: "골드",     icon: "⚡", obtained: false, condition: "조합 100회 성공" },
  { id: 6, name: "행운의 손",    description: "연속으로 5번 조합에 성공했습니다",    tier: "실버",     icon: "🍀", obtained: true,  condition: "연속 조합 5회 성공" },
  { id: 7, name: "박스 개척자",  description: "모든 종류의 박스를 개봉했습니다",     tier: "골드",     icon: "📦", obtained: false, condition: "모든 박스 종류 개봉" },
  { id: 8, name: "밈의 황제",    description: "모든 밈을 수집했습니다",             tier: "다이아",   icon: "👑", obtained: false, condition: "모든 밈 획득" },
];

export function Collection() {
  const [selectedTab, setSelectedTab] = useState("memes");

  const collectedCount      = MEMES.filter((m) => m.collected).length;
  const obtainedTitlesCount = TITLES.filter((t) => t.obtained).length;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d9ff] to-[#0088cc] flex items-center justify-center neon-border-cyan relative overflow-hidden">
          <Book className="w-6 h-6 text-white drop-shadow-lg relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
        </div>
        <h1 className="chrome-text">도감</h1>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 glass neon-border-cyan">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#a393d1] mb-1">수집한 밈</p>
              <p className="text-2xl font-bold text-[#00d9ff] neon-cyan">{collectedCount} / {MEMES.length}</p>
            </div>
            <div className="text-4xl">🎨</div>
          </div>
        </Card>
        <Card className="p-5 glass neon-border-pink">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#a393d1] mb-1">획득한 칭호</p>
              <p className="text-2xl font-bold text-[#ff10f0] neon-pink">{obtainedTitlesCount} / {TITLES.length}</p>
            </div>
            <div className="text-4xl">🏆</div>
          </div>
        </Card>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 p-1 glass-strong rounded-xl neon-border-pink">
        {[{ key: "memes", label: "밈" }, { key: "titles", label: "칭호" }].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key)}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
              selectedTab === key
                ? key === "memes"
                  ? "bg-gradient-to-r from-[#00d9ff]/30 to-[#0088cc]/30 text-[#00d9ff] neon-cyan neon-border-cyan"
                  : "bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-[#ff10f0] neon-pink neon-border-pink"
                : "text-[#a393d1] hover:text-[#00d9ff]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {selectedTab === "memes"  && <MemeGrid  memes={MEMES}   />}
      {selectedTab === "titles" && <TitlesGrid titles={TITLES} />}
    </div>
  );
}
