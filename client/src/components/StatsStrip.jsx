// src/components/StatsStrip.jsx
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function StatsStrip() {
  const stats = [
    { k: "Live Sessions", v: 3000, suffix: "+" },
    { k: "Student Rating", v: 4.7, suffix: "/5" },
    { k: "Learners", v: 100, suffix: "+" },
    { k: "Tech Stack", v: "MERN + Cloud", isText: true },
    { k: "Offline Lectures", v: 100, suffix: "+" },
    { k: "Workshops & Masterclasses", v: 5, suffix: "+" },
    { k: "CSAT", v: 91.55, suffix: "%" },
  ];

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-canvas">
      <div className="py-20 md:py-28">
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex gap-6 px-6"
            animate={isHovered ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 24, repeat: Infinity }}
          >
            {stats.map((s) => (
              <StatCard key={s.k} s={s} />
            ))}
            <div className="flex gap-6" aria-hidden="true" inert={true}>
              {stats.map((s) => (
                <StatCard key={`dup-${s.k}`} s={s} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ s }) {
  return (
    <div className="shrink-0 w-64 bg-white border border-hairline rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="text-4xl font-semibold tracking-tight text-ink">
        {s.isText ? s.v : <AnimatedCounter value={s.v} suffix={s.suffix} />}
      </div>
      <div className="text-sm text-subtle mt-3">{s.k}</div>
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
    const duration = 1600;
    const increment = value / (duration / 16);
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

  const formatted =
    typeof value === "number" && value % 1 !== 0
      ? count.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")
      : Math.round(count);

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}
