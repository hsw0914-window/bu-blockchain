import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { RarityBadge } from "./RarityBadge";
import { RARITY_GRADIENT } from "../../constants";

export function ResultModal({ open, title, itemImage, itemName, itemRarity, description, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.7 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-8 glass-strong neon-border-pink relative overflow-hidden max-w-md w-full">
              <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_GRADIENT[itemRarity] ?? "from-[#a393d1] to-[#6b5b95]"} opacity-20`} />
              <div className="text-center relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles
                    className="w-12 h-12 text-[#ffaa00] mx-auto mb-4"
                    style={{ filter: "drop-shadow(0 0 12px rgba(255,170,0,0.9))" }}
                  />
                </motion.div>

                <h2 className="mb-4 text-white neon-pink">{title}</h2>

                <div className="w-48 h-48 mx-auto mb-6 rounded-xl glass-strong flex items-center justify-center text-8xl relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_GRADIENT[itemRarity] ?? "from-[#a393d1] to-[#6b5b95]"} opacity-30`} />
                  <div className="absolute inset-0 scanlines opacity-20" />
                  <span className="relative z-10">{itemImage}</span>
                </div>

                <h3 className="mb-2 text-white">{itemName}</h3>
                <RarityBadge rarity={itemRarity} className="mb-4 inline-block" />

                {description && (
                  <p className="text-sm text-[#a393d1] mb-6">{description}</p>
                )}

                <Button
                  onClick={onClose}
                  className="w-full glass neon-border-cyan hover:neon-border-pink bg-gradient-to-r from-[#00d9ff]/30 to-[#00ff88]/30 text-white font-bold"
                >
                  확인
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
