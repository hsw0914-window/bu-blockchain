import { useState } from "react";
import { Coins, Sparkles } from "lucide-react";
import { MemeCoinCard } from "./components/MemeCoinCard";
import { MemeCoinModal } from "./components/MemeCoinModal";

const MEME_COINS = [
  { id: 1, name: "PEPE",   fullName: "Pepe the Frog", icon: "🐸", price: "₩2,450", change: "+15.3%", marketCap: "₩125B", volume: "₩8.5B",  description: "인터넷 밈 문화의 아이콘, 페페는 2000년대 중반부터 사랑받아온 전설적인 캐릭터입니다.", features: ["밈계의 레전드","높은 유동성","커뮤니티 활발"], history: "2005년 Matt Furie의 만화에서 처음 등장하여 인터넷 밈 문화의 상징이 되었습니다.", gradient: "from-[#00ff88] to-[#00d9ff]" },
  { id: 2, name: "DOGE",   fullName: "Dogecoin",      icon: "🐕", price: "₩1,890", change: "+8.7%",  marketCap: "₩89B",  volume: "₩5.2B",  description: "시바견 카보스를 모델로 한 도지코인은 재미와 친근함으로 전 세계인의 사랑을 받는 밈 코인입니다.", features: ["커뮤니티 중심","친근한 이미지","글로벌 인기"], history: "2013년 농담으로 시작되었지만 현재는 주요 암호화폐 중 하나로 성장했습니다.", gradient: "from-[#ffaa00] to-[#ff6b00]" },
  { id: 3, name: "SHIB",   fullName: "Shiba Inu",     icon: "🦊", price: "₩3,120", change: "+22.1%", marketCap: "₩156B", volume: "₩12.3B", description: "도지코인의 대항마로 등장한 시바이누는 강력한 커뮤니티와 생태계를 구축하며 급성장하고 있습니다.", features: ["디파이 생태계","NFT 통합","강력한 커뮤니티"], history: "2020년 익명의 개발자 Ryoshi가 만든 탈중앙화 밈 토큰입니다.", gradient: "from-[#ff10f0] to-[#bd00e8]" },
  { id: 4, name: "WOJAK",  fullName: "Wojak",         icon: "😢", price: "₩890",   change: "-2.4%",  marketCap: "₩34B",  volume: "₩2.1B",  description: "감정을 표현하는 대표적인 밈 캐릭터 보이잭은 공감과 유머를 담은 밈 코인입니다.", features: ["감성 마케팅","밈 다양성","커뮤니티 주도"], history: "2010년대 초 4chan에서 유명해진 감정 표현 밈 캐릭터입니다.", gradient: "from-[#a393d1] to-[#6b5b95]" },
  { id: 5, name: "FLOKI",  fullName: "Floki Inu",     icon: "🐶", price: "₩1,650", change: "+12.8%", marketCap: "₩67B",  volume: "₩4.8B",  description: "엘론 머스크의 강아지 이름에서 영감을 받은 플로키는 메타버스와 NFT를 결합한 혁신적인 프로젝트입니다.", features: ["메타버스 통합","NFT 게임","글로벌 마케팅"], history: "2021년 커뮤니티 주도로 시작되어 빠르게 성장한 밈 코인입니다.", gradient: "from-[#00d9ff] to-[#00ff88]" },
  { id: 6, name: "SPONGE", fullName: "SpongeBob",     icon: "🧽", price: "₩2,340", change: "+18.9%", marketCap: "₩98B",  volume: "₩7.2B",  description: "스폰지밥 밈을 기반으로 한 재미있고 활발한 커뮤니티를 가진 밈 코인입니다.", features: ["재미있는 밈","활발한 거래","젊은 층 인기"], history: "애니메이션 스폰지밥의 인기를 기반으로 한 밈 토큰입니다.", gradient: "from-[#ffaa00] to-[#00ff88]" },
];

export function MemeInfo() {
  const [selectedCoin, setSelectedCoin] = useState(null);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* 헤더 */}
      <div className="text-center space-y-4">
        <div className="inline-block p-4 rounded-2xl glass-strong neon-border-pink relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/20 to-[#00d9ff]/20" />
          <Coins className="w-16 h-16 text-[#ffaa00] relative z-10" style={{ filter: "drop-shadow(0 0 20px rgba(255,170,0,0.9))" }} />
        </div>
        <h1 className="chrome-text text-5xl">밈 코인 소개</h1>
        <p className="text-xl text-[#00d9ff] neon-cyan">다양한 밈 코인과 Y2K 유틸리티 토큰</p>
      </div>

      {/* 밈 코인 그리드 */}
      <section>
        <h2 className="mb-6 text-center text-[#e0d9ff] neon-pink">인기 밈 코인</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MEME_COINS.map((coin) => (
            <MemeCoinCard key={coin.id} coin={coin} onSelect={setSelectedCoin} />
          ))}
        </div>
      </section>

      {/* MEME 코인 획득 방법 */}
      <div className="p-8 glass-strong neon-border-pink rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff10f0]/10 via-[#00d9ff]/10 to-[#00ff88]/10" />
        <div className="absolute inset-0 scanlines opacity-10" />
        <div className="relative z-10 text-center space-y-4">
          <Sparkles className="w-12 h-12 text-[#ffaa00] mx-auto" style={{ filter: "drop-shadow(0 0 12px rgba(255,170,0,0.9))" }} />
          <h2 className="text-[#e0d9ff] neon-pink">MEME 코인 획득 방법</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              { emoji: "📦", title: "박스 개봉", desc: "박스 개봉 시 랜덤 코인 보상" },
              { emoji: "🎯", title: "파편 조합", desc: "NFT 조합 성공 시 보너스" },
              { emoji: "🎁", title: "일일 미션", desc: "매일 접속 및 활동 보상" },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="space-y-2">
                <div className="text-4xl">{emoji}</div>
                <h3 className="text-[#e0d9ff]">{title}</h3>
                <p className="text-sm text-[#a393d1]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 상세 모달 */}
      <MemeCoinModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
    </div>
  );
}
