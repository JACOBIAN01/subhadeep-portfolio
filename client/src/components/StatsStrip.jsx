// src/components/StatsStrip.jsx
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function StatsStrip() {
  const stats = [
    { k: "Live sessions", v: "3000+" },
    { k: "Student rating", v: "4.7/5" },
    { k: "Learners", v: "100+" },
    { k: "Tech stack", v: "MERN + Cloud" },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 mt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.k}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <GlassCard className="py-5 text-center bg-white/20 backdrop-blur-lg border border-white/20 shadow-lg">
              <div className="text-3xl font-semibold text-white drop-shadow-lg">
                {s.v}
              </div>
              <div className="text-sm text-white/80 mt-1 tracking-wide">
                {s.k}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
