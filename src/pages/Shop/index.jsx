import { useState } from "react";
import { ShoppingBag, Package, Key, Gem, Coins, Gift } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { BoxCard } from "./components/BoxCard";
import { KeyCard } from "./components/KeyCard";
import { BundleCard } from "./components/BundleCard";
import { PurchaseResultModal } from "./components/PurchaseResultModal";

const BOXES = [
  { id: 1, name: "스타터 박스",  rarity: "일반", image: "📦", price: 100,  description: "기본적인 밈 파편과 NFT를 얻을 수 있는 입문용 박스", rewards: ["일반 파편 2-3개", "희귀 파편 10% 확률"], gradient: "from-[#a393d1] to-[#6b5b95]", needsKey: false },
  { id: 2, name: "프리미엄 박스", rarity: "희귀", image: "🎁", price: 500,  description: "더 나은 보상이 들어있는 프리미엄 박스", rewards: ["희귀 파편 2-3개", "영웅 파편 30% 확률", "전설 파편 5% 확률"], gradient: "from-[#00d9ff] to-[#0088cc]", needsKey: true },
  { id: 3, name: "레전드 박스",  rarity: "영웅", image: "💎", price: 2000, description: "최고급 보상이 보장되는 레전더리 박스", rewards: ["영웅 파편 2-3개", "전설 파편 50% 확률", "완성된 NFT 10% 확률"], gradient: "from-[#ff10f0] to-[#bd00e8]", needsKey: true },
  { id: 4, name: "미스터리 박스", rarity: "전설", image: "❓", price: 3500, description: "무엇이 나올지 알 수 없는 신비로운 박스", rewards: ["전설 파편 보장", "완성된 NFT 30% 확률", "특별 보상 ???"], gradient: "from-[#ffaa00] to-[#ff6b00]", needsKey: true },
];

const KEYS = [
  { id: 1, name: "일반 열쇠",       rarity: "일반", image: "🔑", price: 50,  description: "일반 박스를 여는 데 사용할 수 있는 기본 열쇠", count: 1, gradient: "from-[#a393d1] to-[#6b5b95]" },
  { id: 2, name: "일반 열쇠 (5개)", rarity: "일반", image: "🔑", price: 200, description: "일반 박스를 여는 데 사용할 수 있는 기본 열쇠 5개 묶음", count: 5, gradient: "from-[#a393d1] to-[#6b5b95]" },
  { id: 3, name: "황금 열쇠",       rarity: "희귀", image: "🗝️", price: 150, description: "프리미엄 박스 이상을 여는 데 필요한 황금 열쇠", count: 1, gradient: "from-[#00d9ff] to-[#0088cc]" },
  { id: 4, name: "황금 열쇠 (3개)", rarity: "희귀", image: "🗝️", price: 400, description: "프리미엄 박스 이상을 여는 데 필요한 황금 열쇠 3개 묶음", count: 3, gradient: "from-[#00d9ff] to-[#0088cc]" },
  { id: 5, name: "마스터 키",       rarity: "전설", image: "🔐", price: 500, description: "모든 박스를 열 수 있는 만능 열쇠", count: 1, gradient: "from-[#ffaa00] to-[#ff6b00]" },
];

const BUNDLES = [
  { id: 1, name: "스타터 패키지",  items: ["스타터 박스 3개", "일반 열쇠 5개"], originalPrice: 550,  price: 400,  discount: 27, gradient: "from-[#00ff88] to-[#00d9ff]" },
  { id: 2, name: "프리미엄 패키지", items: ["프리미엄 박스 2개", "황금 열쇠 3개"], originalPrice: 1400, price: 1100, discount: 21, gradient: "from-[#ff10f0] to-[#00d9ff]" },
  { id: 3, name: "레전드 패키지",  items: ["레전드 박스 2개", "미스터리 박스 1개", "마스터 키 3개"], originalPrice: 9000, price: 7500, discount: 17, gradient: "from-[#ffaa00] to-[#ff10f0]" },
];

export function Shop() {
  const [purchaseResult, setPurchaseResult] = useState(null);

  const handlePurchase = (item, type) => {
    setPurchaseResult({ name: item.name, type, price: item.price, image: item.image || "🎁" });
    setTimeout(() => setPurchaseResult(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <div className="inline-block p-4 rounded-2xl glass-strong neon-border-pink relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/20 to-[#00d9ff]/20" />
          <ShoppingBag className="w-16 h-16 text-[#ff10f0] relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,16,240,0.9))" }} />
        </div>
        <h1 className="chrome-text text-5xl">상점</h1>
        <p className="text-xl text-[#00d9ff] neon-cyan">박스와 열쇠를 구매하고 새로운 밈 NFT를 획득하세요!</p>
      </div>

      {/* 보유 잔액 */}
      <Card className="p-6 glass-strong neon-border-cyan relative overflow-hidden">
        <div className="absolute inset-0 retro-grid opacity-20" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <Coins className="w-8 h-8 text-[#00ff88]" style={{ filter: "drop-shadow(0 0 10px rgba(0,255,136,0.8))" }} />
            <div>
              <p className="text-sm text-[#a393d1]">보유 MEME 코인</p>
              <p className="text-3xl font-bold chrome-text">1,250 MEME</p>
            </div>
          </div>
          <Button className="glass neon-border-pink hover:neon-border-cyan bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-white font-bold">
            <Gem className="w-5 h-5 mr-2" />
            충전하기
          </Button>
        </div>
      </Card>

      {/* 특별 패키지 */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Gift className="w-7 h-7 text-[#ffaa00]" style={{ filter: "drop-shadow(0 0 10px rgba(255,170,0,0.8))" }} />
          <h2 className="text-[#e0d9ff]" style={{ textShadow: "0 0 10px rgba(255,170,0,0.8)" }}>특별 패키지</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BUNDLES.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} onPurchase={handlePurchase} />
          ))}
        </div>
      </section>

      {/* 박스 상점 */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Package className="w-7 h-7 text-[#ff10f0]" style={{ filter: "drop-shadow(0 0 10px rgba(255,16,240,0.8))" }} />
          <h2 className="text-[#e0d9ff] neon-pink">박스 상점</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOXES.map((box) => (
            <BoxCard key={box.id} box={box} onPurchase={handlePurchase} />
          ))}
        </div>
      </section>

      {/* 열쇠 상점 */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Key className="w-7 h-7 text-[#00d9ff]" style={{ filter: "drop-shadow(0 0 10px rgba(0,217,255,0.8))" }} />
          <h2 className="text-[#e0d9ff] neon-cyan">열쇠 상점</h2>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {KEYS.map((keyItem) => (
            <KeyCard key={keyItem.id} keyItem={keyItem} onPurchase={handlePurchase} />
          ))}
        </div>
      </section>

      <PurchaseResultModal result={purchaseResult} />
    </div>
  );
}
