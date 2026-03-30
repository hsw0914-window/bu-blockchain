import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { Card } from "../../../components/ui/card";

export function PurchaseResultModal({ result }) {
  return (
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <Card className="p-8 glass-strong neon-border-pink relative overflow-hidden max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/20 to-[#00d9ff]/20" />
              <div className="text-center relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Sparkles
                    className="w-16 h-16 text-[#00ff88] mx-auto mb-4"
                    style={{ filter: "drop-shadow(0 0 20px rgba(0,255,136,0.9))" }}
                  />
                </motion.div>

                <h2 className="mb-4 text-white neon-green">구매 완료!</h2>

                <div className="w-32 h-32 mx-auto mb-4 rounded-xl glass-strong flex items-center justify-center text-7xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/30 to-[#00d9ff]/30" />
                  <span className="relative z-10">{result.image}</span>
                </div>

                <h3 className="mb-2 text-white">{result.name}</h3>
                <p className="text-sm text-[#a393d1] mb-4">
                  {result.price} MEME 코인이 차감되었습니다
                </p>
                <p className="text-sm text-[#00d9ff]">인벤토리에서 확인하실 수 있습니다</p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
