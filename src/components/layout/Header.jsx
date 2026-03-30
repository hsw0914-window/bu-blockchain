import { Link } from "react-router";
import { Package, Wallet } from "lucide-react";

export function Header({ nickname }) {
  const avatarChar = nickname.charAt(0);

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-[#ff10f0]/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff10f0] via-[#bd00e8] to-[#00d9ff] flex items-center justify-center neon-border-pink relative">
              <Package className="w-7 h-7 text-white drop-shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-xl" />
            </div>
            <h1 className="text-2xl font-bold chrome-text tracking-wider">그땐 그랬지</h1>
          </Link>

          {/* 유저 정보 */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl glass neon-border-cyan">
              <Wallet
                className="w-5 h-5 text-[#00d9ff]"
                style={{ filter: "drop-shadow(0 0 8px rgba(0,217,255,0.8))" }}
              />
              <span className="font-semibold text-[#00d9ff] neon-cyan">1,250 MEME</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:block text-[#a393d1] text-sm">{nickname}</span>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff10f0] to-[#bd00e8] flex items-center justify-center neon-border-pink relative overflow-hidden">
                <span className="text-white font-bold relative z-10">{avatarChar}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
