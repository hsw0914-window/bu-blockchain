import { Link } from "react-router";
import { Calendar } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { SectionHeader } from "../../../components/common/SectionHeader";

const EVENTS = [
  { id: 1, title: "신규 유저 환영 이벤트", date: "~2026.03.31",              badge: "NEW" },
  { id: 2, title: "봄맞이 밈 파편 2배",    date: "2026.03.25 - 04.05",       badge: "HOT" },
];

export function EventsSection() {
  return (
    <section>
      <SectionHeader
        icon={Calendar}
        iconColor="#ff10f0"
        iconGlow="rgba(255,16,240,0.8)"
        title="진행 중인 이벤트"
        titleClass="text-[#e0d9ff] neon-pink"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {EVENTS.map((event) => (
          <Link key={event.id} to="/notice">
            <Card className="p-6 glass neon-border-pink hover:neon-border-cyan transition-all cursor-pointer relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff10f0]/10 to-[#bd00e8]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between mb-2 relative z-10">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#ff10f0] to-[#bd00e8] text-white text-xs font-bold neon-border-pink">
                  {event.badge}
                </span>
                <span className="text-xs text-[#a393d1]">{event.date}</span>
              </div>
              <h3 className="text-[#e0d9ff] relative z-10">{event.title}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
