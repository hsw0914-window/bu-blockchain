import { Fragment }                from "react";
import { UserStatsSection }        from "./components/UserStatsSection";
import { BannerSection }           from "./components/BannerSection";
import { PopularNFTsSection }      from "./components/PopularNFTsSection";
import { RECENT_ITEMS, RecentItemCard, RecentItemsSectionHeader }             from "./components/RecentItemsSection";
import { RECOMMENDED_BOXES, RecommendedBoxCard, RecommendedBoxesSectionHeader } from "./components/RecommendedBoxesSection";
import { EventsSection }           from "./components/EventsSection";

export function Home() {
  return (
    <div className="space-y-8">
      <UserStatsSection />
      <BannerSection />
      <PopularNFTsSection />

      {/* 헤더 행 */}
      <div>
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <RecentItemsSectionHeader />
          <RecommendedBoxesSectionHeader />
        </div>

        {/* 아이템 행 — 좌우가 같은 그리드 행을 공유하므로 항상 수평 정렬 */}
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
          {RECENT_ITEMS.map((item, i) => (
            <Fragment key={item.id}>
              <RecentItemCard    item={item} />
              <RecommendedBoxCard box={RECOMMENDED_BOXES[i]} />
            </Fragment>
          ))}
        </div>
      </div>

      <EventsSection />
    </div>
  );
}
