import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, ExternalLink } from "lucide-react";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export function MemeCoinModal({ coin, onClose }) {
  return (
    <AnimatePresence>
      {coin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full"
          >
            <Card className="p-8 glass-strong neon-border-pink relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${coin.gradient} opacity-20`} />
              <div className="absolute inset-0 scanlines opacity-10" />

              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full glass neon-border-cyan hover:neon-border-pink flex items-center justify-center text-[#00d9ff] hover:text-[#ff10f0] transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                {/* 헤더 */}
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4">{coin.icon}</div>
                  <h2 className="mb-2 text-white chrome-text">{coin.fullName}</h2>
                  <p className="text-xl text-[#00d9ff] neon-cyan font-bold">{coin.name}</p>
                </div>

                {/* 가격 정보 그리드 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card className="p-4 glass neon-border-cyan">
                    <p className="text-sm text-[#a393d1] mb-1">현재 가격</p>
                    <p className="text-2xl font-bold text-[#00ff88] chrome-text">{coin.price}</p>
                    <span className={`text-sm font-semibold ${coin.change.startsWith("+") ? "text-[#00ff88]" : "text-red-400"}`}>
                      {coin.change}
                    </span>
                  </Card>
                  <Card className="p-4 glass neon-border-cyan">
                    <p className="text-sm text-[#a393d1] mb-1">시가총액</p>
                    <p className="text-2xl font-bold text-white chrome-text">{coin.marketCap}</p>
                  </Card>
                  <Card className="p-4 glass neon-border-pink">
                    <p className="text-sm text-[#a393d1] mb-1">거래량 (24h)</p>
                    <p className="text-xl font-bold text-white">{coin.volume}</p>
                  </Card>
                  <Card className="p-4 glass neon-border-pink">
                    <p className="text-sm text-[#a393d1] mb-1">순위</p>
                    <p className="text-xl font-bold text-[#ff10f0]">#{coin.id}</p>
                  </Card>
                </div>

                {/* 설명 */}
                <Card className="p-5 glass neon-border-cyan mb-4">
                  <h3 className="mb-3 text-[#00d9ff] neon-cyan">설명</h3>
                  <p className="text-[#e0d9ff] leading-relaxed mb-3">{coin.description}</p>
                  <div className="pt-3 border-t border-[#ff10f0]/20">
                    <h4 className="text-sm text-[#a393d1] mb-2">역사</h4>
                    <p className="text-sm text-[#e0d9ff]">{coin.history}</p>
                  </div>
                </Card>

                {/* 주요 특징 */}
                <Card className="p-5 glass neon-border-pink mb-6">
                  <h3 className="mb-3 text-[#ff10f0] neon-pink">주요 특징</h3>
                  <div className="flex flex-wrap gap-2">
                    {coin.features.map((feature, index) => (
                      <span key={index} className="px-3 py-1.5 rounded-lg glass neon-border-cyan text-sm text-[#00d9ff] font-semibold">
                        {feature}
                      </span>
                    ))}
                  </div>
                </Card>

                {/* 액션 버튼 */}
                <div className="grid grid-cols-2 gap-3">
                  <Button className="glass neon-border-cyan hover:neon-border-pink bg-gradient-to-r from-[#00d9ff]/30 to-[#00ff88]/30 text-white font-bold">
                    <TrendingUp className="w-4 h-4 mr-2" />차트 보기
                  </Button>
                  <Button className="glass neon-border-pink hover:neon-border-cyan bg-gradient-to-r from-[#ff10f0]/30 to-[#bd00e8]/30 text-white font-bold">
                    <ExternalLink className="w-4 h-4 mr-2" />거래소 이동
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
