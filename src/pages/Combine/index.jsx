import { useState } from "react";
import { Package, Layers } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ResultModal } from "../../components/common/ResultModal";
import { InventoryPanel } from "./components/InventoryPanel";
import { CombineMode } from "./components/CombineMode";
import { OpenBoxMode } from "./components/OpenBoxMode";

const NFTS = [
  { id: 1, name: "페페 밈 #1337", rarity: "전설", image: "🐸", canUse: false },
  { id: 2, name: "도지 밈 #420",  rarity: "영웅", image: "🐕", canUse: false },
  { id: 3, name: "고양이 밈 #999",rarity: "희귀", image: "🐱", canUse: false },
];

const FRAGMENTS = [
  { id: 1, name: "페페 밈 파편",  rarity: "영웅", image: "🐸", count: 2, canUse: true },
  { id: 2, name: "도지 밈 파편",  rarity: "희귀", image: "🐕", count: 3, canUse: true },
  { id: 3, name: "고양이 밈 파편",rarity: "희귀", image: "🐱", count: 2, canUse: true },
  { id: 4, name: "웃음 밈 파편",  rarity: "일반", image: "😂", count: 5, canUse: true },
  { id: 5, name: "하트 밈 파편",  rarity: "일반", image: "❤️", count: 4, canUse: true },
  { id: 6, name: "별 밈 파편",    rarity: "일반", image: "⭐", count: 3, canUse: true },
  { id: 7, name: "로켓 밈 파편",  rarity: "일반", image: "🚀", count: 2, canUse: true },
  { id: 8, name: "불 밈 파편",    rarity: "희귀", image: "🔥", count: 1, canUse: true },
];

const BOXES = [
  { id: 1, name: "스타터 박스",  rarity: "일반", image: "📦", count: 2 },
  { id: 2, name: "프리미엄 박스",rarity: "희귀", image: "🎁", count: 1 },
];

const KEYS = [
  { id: 1, name: "일반 열쇠", rarity: "일반", image: "🔑", count: 8 },
  { id: 2, name: "황금 열쇠", rarity: "희귀", image: "🗝️", count: 4 },
];

export function Combine() {
  const [viewMode, setViewMode]             = useState("combine");
  const [activeTab, setActiveTab]           = useState("fragments");
  const [selectedFragments, setSelectedFragments] = useState([]);
  const [combining, setCombining]           = useState(false);
  const [result, setResult]                 = useState(null);
  const [selectedBox, setSelectedBox]       = useState(null);
  const [selectedKey, setSelectedKey]       = useState(null);
  const [opening, setOpening]               = useState(false);
  const [openResult, setOpenResult]         = useState(null);

  const totalBoxes = BOXES.reduce((s, b) => s + b.count, 0);
  const totalKeys  = KEYS.reduce((s, k) => s + k.count, 0);

  // ── 파편 선택 토글 ───────────────────────────────────────────────────────
  const handleSelectFragment = (id) => {
    setSelectedFragments((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  // ── 조합 실행 ────────────────────────────────────────────────────────────
  const handleCombine = () => {
    setCombining(true);
    setTimeout(() => {
      setResult({ name: "레어 페페 NFT", rarity: "전설", image: "🐸", upgraded: true });
      setCombining(false);
    }, 2500);
  };

  const handleCloseCombineResult = () => {
    setResult(null);
    setSelectedFragments([]);
  };

  // ── 박스 개봉 ────────────────────────────────────────────────────────────
  const handleOpenBox = () => {
    if (!selectedBox || !selectedKey) return;
    setOpening(true);
    setTimeout(() => {
      const isFragment  = Math.random() > 0.3;
      const rarities    = ["일반", "희귀", "영웅", "전설"];
      const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
      setOpenResult({
        type: isFragment ? "fragment" : "nft",
        name: isFragment ? "밈 파편" : "완성된 NFT",
        rarity: randomRarity,
        image: isFragment ? "💎" : "🎨",
        description: isFragment
          ? `${randomRarity} 등급의 밈 파편을 획득했습니다!`
          : `${randomRarity} 등급의 완성된 NFT를 획득했습니다!`,
      });
      setOpening(false);
      setSelectedBox(null);
      setSelectedKey(null);
    }, 3000);
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* 모드 선택 버튼 */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <Button
          onClick={() => setViewMode("openBox")}
          className={`glass ${viewMode === "openBox" ? "neon-border-pink bg-[#ff10f0]/20 text-[#ff10f0]" : "neon-border-cyan text-[#a393d1] hover:text-[#00d9ff]"}`}
        >
          <Package className="w-5 h-5 mr-2" />
          박스 개봉
        </Button>
        <Button
          onClick={() => setViewMode("combine")}
          className={`glass ${viewMode === "combine" ? "neon-border-pink bg-[#ff10f0]/20 text-[#ff10f0]" : "neon-border-cyan text-[#a393d1] hover:text-[#00d9ff]"}`}
        >
          <Layers className="w-5 h-5 mr-2" />
          파편 조합
        </Button>
      </div>

      {/* 2열 레이아웃: 좌측 인벤토리 + 우측 작업 공간 */}
      <div className="grid lg:grid-cols-[400px_1fr] gap-6">
        {/* 좌측: 인벤토리 패널 */}
        <InventoryPanel
          fragments={FRAGMENTS}
          nfts={NFTS}
          selectedFragments={selectedFragments}
          onSelectFragment={handleSelectFragment}
          viewMode={viewMode}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          totalBoxes={totalBoxes}
          totalKeys={totalKeys}
        />

        {/* 우측: 작업 공간 */}
        <div className="space-y-6">
          {viewMode === "openBox" ? (
            <OpenBoxMode
              boxes={BOXES}
              keys={KEYS}
              selectedBox={selectedBox}
              selectedKey={selectedKey}
              opening={opening}
              onSelectBox={setSelectedBox}
              onSelectKey={setSelectedKey}
              onOpenBox={handleOpenBox}
            />
          ) : (
            <CombineMode
              fragments={FRAGMENTS}
              selectedFragments={selectedFragments}
              combining={combining}
              onCombine={handleCombine}
            />
          )}
        </div>
      </div>

      {/* 조합 결과 모달 */}
      {result && (
        <ResultModal
          open={!!result && !combining}
          title={result.upgraded ? "희귀도 상승!" : "조합 성공!"}
          itemImage={result.image}
          itemName={result.name}
          itemRarity={result.rarity}
          description="조합이 완료되어 인벤토리에 추가되었습니다"
          onClose={handleCloseCombineResult}
        />
      )}

      {/* 박스 개봉 결과 모달 */}
      {openResult && (
        <ResultModal
          open={!!openResult && !opening}
          title={openResult.type === "fragment" ? "파편 획득!" : "NFT 획득!"}
          itemImage={openResult.image}
          itemName={openResult.name}
          itemRarity={openResult.rarity}
          description={openResult.description}
          onClose={() => setOpenResult(null)}
        />
      )}
    </div>
  );
}
