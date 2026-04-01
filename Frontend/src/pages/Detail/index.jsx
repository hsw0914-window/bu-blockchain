import { useParams, Link } from "react-router";
import {
  ArrowLeft, Share2, ShoppingCart, Layers,
  TrendingUp, Calendar, User,
} from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { RarityBadge } from "../../components/common/RarityBadge";
import { RARITY_GRADIENT } from "../../constants";

// 거래 이력 테이블
function TradeHistory({ history }) {
  return (
    <section>
      <h2 className="mb-4 text-[#e0d9ff] neon-pink">거래 이력</h2>
      <Card className="glass neon-border-cyan overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                {["날짜", "판매자", "구매자", "가격"].map((h) => (
                  <th
                    key={h}
                    className={`px-6 py-3 text-sm text-[#a393d1] font-semibold ${h === "가격" ? "text-right" : "text-left"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((trade, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-[#a393d1]">{trade.date}</td>
                  <td className="px-6 py-4 text-sm text-[#00d9ff]">{trade.from}</td>
                  <td className="px-6 py-4 text-sm text-[#00d9ff]">{trade.to}</td>
                  <td className="px-6 py-4 text-sm text-right text-white font-bold">
                    {trade.price} MEME
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}

// 유사 아이템 그리드
function SimilarItems({ items }) {
  return (
    <section>
      <h2 className="mb-4 text-[#e0d9ff] neon-cyan">비슷한 아이템</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((similar) => (
          <Link key={similar.id} to={`/detail/${similar.id}`}>
            <Card className="p-4 glass neon-border-cyan hover:neon-border-pink transition-all group cursor-pointer">
              <div className="aspect-square rounded-lg glass-strong mb-3 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_GRADIENT[similar.rarity]} opacity-20`} />
                <span className="relative z-10">{similar.image}</span>
              </div>
              <h3 className="text-sm mb-2 text-[#e0d9ff] truncate">{similar.name}</h3>
              <div className="flex items-center justify-between">
                <RarityBadge rarity={similar.rarity} />
                <span className="text-sm text-[#00d9ff] font-bold">{similar.price} MEME</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── 메인 페이지 ────────────────────────────────────────────────────────────────
export function Detail() {
  const { id } = useParams();

  // 실제 앱에서는 id 기반으로 API 호출
  const item = {
    id: id || "1",
    name: "페페 밈 #1337",
    rarity: "전설",
    image: "🐸",
    type: "NFT",
    description:
      "2010년대 초반 인터넷을 강타했던 전설적인 페페 밈입니다. 희귀한 표정과 독특한 스타일로 많은 사랑을 받았던 밈 NFT입니다.",
    owner: "User#1234",
    creator: "MemeArtist#777",
    mintDate: "2026.01.15",
    lastTrade: "2026.03.10",
    tradeCount: 12,
    price: "1,500",
    stats: { views: 1247, likes: 384, shares: 92 },
  };

  const tradeHistory = [
    { date: "2026.03.10", from: "User#5555",       to: "User#1234",  price: "1,500" },
    { date: "2026.02.20", from: "User#3333",       to: "User#5555",  price: "1,200" },
    { date: "2026.02.01", from: "User#2222",       to: "User#3333",  price: "1,000" },
    { date: "2026.01.20", from: "MemeArtist#777",  to: "User#2222",  price: "800"   },
  ];

  const similarItems = [
    { id: 2, name: "페페 밈 #1338", rarity: "영웅", image: "🐸", price: "890" },
    { id: 3, name: "페페 밈 #1339", rarity: "영웅", image: "🐸", price: "920" },
    { id: 4, name: "도지 밈 #420",  rarity: "영웅", image: "🐕", price: "850" },
  ];

  const INFO_ROWS = [
    { Icon: User,       label: "소유자",   value: item.owner,      color: "#00d9ff" },
    { Icon: User,       label: "제작자",   value: item.creator,    color: "#00d9ff" },
    { Icon: Calendar,   label: "생성일",   value: item.mintDate,   color: "#e0d9ff" },
    { Icon: TrendingUp, label: "거래 횟수", value: `${item.tradeCount}회`, color: "#e0d9ff" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 뒤로가기 */}
      <Link to="/">
        <Button variant="outline" className="glass neon-border-cyan hover:neon-border-pink text-[#00d9ff]">
          <ArrowLeft className="w-4 h-4 mr-2" />
          홈으로 돌아가기
        </Button>
      </Link>

      {/* 메인 콘텐츠 */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 이미지 + 통계 */}
        <Card className="p-8 glass neon-border-pink">
          <div className={`aspect-square rounded-xl bg-gradient-to-br ${RARITY_GRADIENT[item.rarity]} opacity-30 flex items-center justify-center text-[12rem] mb-6 relative overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_GRADIENT[item.rarity]} opacity-30`} />
            <div className="absolute inset-0 scanlines opacity-10" />
            <span className="relative z-10" style={{ fontSize: "8rem" }}>{item.image}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "조회수", value: item.stats.views  },
              { label: "좋아요", value: item.stats.likes  },
              { label: "공유",   value: item.stats.shares },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-white chrome-text">{value.toLocaleString()}</p>
                <p className="text-sm text-[#a393d1]">{label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* 정보 패널 */}
        <div className="space-y-6">
          {/* 제목 & 등급 */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[#e0d9ff] chrome-text">{item.name}</h1>
              <RarityBadge rarity={item.rarity} className="text-sm px-3 py-1" />
            </div>
            <p className="text-[#a393d1]">{item.type}</p>
          </div>

          {/* 가격 & 액션 */}
          <Card className="p-6 glass-strong neon-border-cyan relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_GRADIENT[item.rarity]} opacity-10`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-[#a393d1] mb-1">현재 가격</p>
                  <p className="text-3xl font-bold text-[#00d9ff] chrome-text">
                    {item.price} MEME
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#00ff88]" style={{ filter: "drop-shadow(0 0 8px rgba(0,255,136,0.8))" }} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button className="glass neon-border-pink hover:neon-border-cyan bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-white font-bold">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  구매하기
                </Button>
                <Button variant="outline" className="glass neon-border-cyan hover:neon-border-pink text-[#00d9ff]">
                  <Share2 className="w-4 h-4 mr-2" />
                  공유
                </Button>
              </div>
            </div>
          </Card>

          {/* 설명 */}
          <Card className="p-6 glass neon-border-cyan">
            <h3 className="mb-3 text-[#00d9ff] neon-cyan">설명</h3>
            <p className="text-[#e0d9ff] leading-relaxed">{item.description}</p>
          </Card>

          {/* 상세 정보 */}
          <Card className="p-6 glass neon-border-pink">
            <h3 className="mb-4 text-[#ff10f0] neon-pink">상세 정보</h3>
            <div className="space-y-3">
              {INFO_ROWS.map(({ Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#a393d1]">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </div>
                  <span style={{ color }} className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 퀵 액션 */}
          <div className="grid grid-cols-2 gap-3">
            <Link to="/combine" className="block">
              <Button variant="outline" className="w-full glass neon-border-cyan hover:neon-border-pink text-[#00d9ff]">
                <Layers className="w-4 h-4 mr-2" />
                조합에 사용
              </Button>
            </Link>
            <Button variant="outline" className="glass neon-border-pink hover:neon-border-cyan text-[#ff10f0]">
              <TrendingUp className="w-4 h-4 mr-2" />
              판매 등록
            </Button>
          </div>
        </div>
      </div>

      <TradeHistory  history={tradeHistory} />
      <SimilarItems  items={similarItems}   />
    </div>
  );
}
