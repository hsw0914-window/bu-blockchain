import { Link } from "react-router";
import { TrendingUp } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { RarityBadge } from "../../../components/common/RarityBadge";
import { SectionHeader } from "../../../components/common/SectionHeader";

const POPULAR_NFTS = [
  { id: 1, name: "페페 밈 #1337", rarity: "전설", image: "🐸", price: "1,500" },
  { id: 2, name: "도지 밈 #420",  rarity: "영웅", image: "🐕", price: "890"   },
  { id: 3, name: "고양이 밈 #999",rarity: "희귀", image: "🐱", price: "650"   },
  { id: 4, name: "몽키 밈 #777",  rarity: "영웅", image: "🐵", price: "920"   },
];

export function PopularNFTsSection() {
  return (
    <section>
      <SectionHeader
        icon={TrendingUp}
        iconColor="#ff10f0"
        iconGlow="rgba(255,16,240,0.8)"
        title="인기 NFT"
        titleClass="text-[#e0d9ff] neon-pink"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {POPULAR_NFTS.map((nft) => (
          <Link key={nft.id} to={`/detail/${nft.id}`}>
            <Card className="p-4 glass neon-border-pink hover:neon-border-cyan transition-all group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/5 to-[#00d9ff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="aspect-square rounded-lg glass-strong mb-3 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/20 to-[#00d9ff]/20" />
                <span className="relative z-10">{nft.image}</span>
              </div>
              <h3 className="text-sm mb-1 text-[#e0d9ff]">{nft.name}</h3>
              <div className="flex items-center justify-between">
                <RarityBadge rarity={nft.rarity} />
                <span className="text-sm text-[#00d9ff] font-bold neon-cyan">{nft.price}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
