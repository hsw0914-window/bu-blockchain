import { Link, useLocation } from "react-router";
import { Home, ShoppingBag, Layers, Book, Coins, Bell, CalendarCheck } from "lucide-react";

const NAV_ITEMS = [
  { path: "/",           label: "홈",       Icon: Home },
  { path: "/shop",       label: "상점",     Icon: ShoppingBag },
  { path: "/combine",    label: "조합",     Icon: Layers },
  { path: "/collection", label: "도감",     Icon: Book },
  { path: "/meme-info",  label: "밈 코인",  Icon: Coins },
  { path: "/notice",     label: "공지사항", Icon: Bell },
  { path: "/attendance", label: "출석체크", Icon: CalendarCheck },
];

export function Navigation() {
  const location = useLocation();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav className="sticky top-[73px] z-40 glass border-b border-[#ff10f0]/20">
      <div className="container mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto">
          {NAV_ITEMS.map(({ path, label, Icon }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-6 py-3.5 transition-all relative group ${
                  active ? "text-[#ff10f0]" : "text-[#a393d1] hover:text-[#00d9ff]"
                }`}
              >
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff10f0]/20 via-[#bd00e8]/20 to-[#00d9ff]/20 rounded-t-lg border-b-2 border-[#ff10f0] neon-border-pink" />
                )}
                <Icon
                  className={`w-5 h-5 relative z-10 ${active ? "drop-shadow-[0_0_8px_rgba(255,16,240,0.8)]" : ""}`}
                />
                <span className={`whitespace-nowrap relative z-10 font-medium ${active ? "neon-pink" : ""}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
