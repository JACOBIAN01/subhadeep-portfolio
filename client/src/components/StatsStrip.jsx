// src/components/StatsStrip.jsx
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function StatsStrip() {
  const stats = [
    { k: "Live sessions", v: 3000 },
    { k: "Student rating", v: 4.7, suffix: "/5" },
    { k: "Learners", v: 100, suffix: "+" },
    { k: "Tech stack", v: "MERN + Cloud", isText: true },
  ];

  return (
    <div className="bg-canvas">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-hairline">
          {stats.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="text-center px-4 py-8 md:py-0"
            >
              <div className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
                {s.isText ? s.v : <AnimatedCounter value={s.v} suffix={s.suffix} />}
              </div>
              <div className="text-sm text-subtle mt-2">{s.k}</div>
            </motion.div>
          ))}
        </div>
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
      ? count.toFixed(1)
      : Math.round(count);

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}
