// src/components/StatsStrip.jsx
import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";

export default function StatsStrip() {
  const stats = [
    { k: "Live sessions", v: 3000 },
    { k: "Student rating", v: 4.7, suffix: "/5" },
    { k: "Learners", v: 100, suffix: "+" },
    { k: "Tech stack", v: "MERN + Cloud", isText: true },
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
                {s.isText ? (
                  s.v
                ) : (
                  <AnimatedCounter value={s.v} suffix={s.suffix} />
                )}
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

/* -------------------------------
   Animated Counter Component
--------------------------------- */
function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // total animation duration (ms)
    const increment = value / (duration / 16); // smooth frame-based increment
    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        clearInterval(interval);
        setCount(value);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [value]);

  // format count
  const formatted =
    typeof value === "number" && value % 1 !== 0
      ? count.toFixed(1)
      : Math.round(count);

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}
