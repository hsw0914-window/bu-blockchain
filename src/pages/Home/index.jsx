import { UserStatsSection }        from "./components/UserStatsSection";
import { BannerSection }           from "./components/BannerSection";
import { PopularNFTsSection }      from "./components/PopularNFTsSection";
import { RecentItemsSection }      from "./components/RecentItemsSection";
import { RecommendedBoxesSection } from "./components/RecommendedBoxesSection";
import { EventsSection }           from "./components/EventsSection";

export function Home() {
  return (
    <div className="space-y-8">
      <UserStatsSection />
      <BannerSection />
      <PopularNFTsSection />

      <div className="grid md:grid-cols-2 gap-6">
        <RecentItemsSection />
        <RecommendedBoxesSection />
      </div>

      <EventsSection />
    </div>
  );
}
