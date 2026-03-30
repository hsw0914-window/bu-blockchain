import { Link } from "react-router";
import { motion } from "motion/react";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "../../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0014] via-[#1a0a2e] to-[#16001e] flex items-center justify-center relative overflow-hidden">
      {/* 배경 */}
      <div className="fixed inset-0 retro-grid opacity-20 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff10f0] rounded-full blur-[180px] opacity-10 pointer-events-none" />

      <motion.div
        className="text-center space-y-8 relative z-10 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 아이콘 */}
        <motion.div
          animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-[#ff10f0]/30 to-[#bd00e8]/30 glass-strong neon-border-pink flex items-center justify-center">
            <AlertTriangle
              className="w-12 h-12 text-[#ff10f0]"
              style={{ filter: "drop-shadow(0 0 12px rgba(255,16,240,0.8))" }}
            />
          </div>
        </motion.div>

        {/* 404 텍스트 */}
        <div className="space-y-3">
          <h1
            className="text-8xl font-black chrome-text"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            404
          </h1>
          <p className="text-2xl text-[#e0d9ff] neon-pink">페이지를 찾을 수 없습니다</p>
          <p className="text-[#a393d1] text-base max-w-md mx-auto leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
            <br />
            홈으로 돌아가서 다시 시작해보세요.
          </p>
        </div>

        {/* 홈 버튼 */}
        <Link to="/">
          <Button
            size="lg"
            className="glass-strong neon-border-pink hover:neon-border-cyan bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-white font-bold px-10 py-4 text-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            홈으로 돌아가기
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
