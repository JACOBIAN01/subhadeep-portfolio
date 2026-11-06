// src/components/StatsStrip.jsx
import { useEffect, useState } from "react";
import Marquee from "./Marquee";
import { METRICS } from "../data/profileData";

// Rendered inside Experience.jsx as a subsection, not its own top-level
// section, since it restates facts already covered by the EXPERIENCE
// timeline just above it.
export function TeachingStatsMarquee() {
  const stats = [
    { k: "Live Sessions (Codingal)", v: 2500, suffix: "+" },
    { k: "Student Rating (Newton)", v: METRICS.rating, suffix: "/5" },
    { k: "Learners", v: parseInt(METRICS.learners, 10), suffix: "+" },
    { k: "Offline Lectures", v: parseInt(METRICS.lectures, 10), suffix: "+" },
    { k: "Workshops & Masterclasses", v: 5, suffix: "+" },
    { k: "CSAT", v: METRICS.csat, suffix: "%" },
    { k: "Fully Understood", v: METRICS.fullyUnderstood, suffix: "%" },
  ];

  return (
    <Marquee duration={24} gap="gap-6">
      {stats.map((s) => (
        <StatCard key={s.k} s={s} />
      ))}
      <div className="flex gap-6" aria-hidden="true" inert={true}>
        {stats.map((s) => (
          <StatCard key={`dup-${s.k}`} s={s} />
        ))}
      </div>
    </Marquee>
  );
}

export function StatCard({ s }) {
  return (
    <div className="shrink-0 w-56 bg-white border border-hairline rounded-3xl p-7 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="h-1 w-8 rounded-full bg-accent/70" />
      <div className="mt-6 text-4xl font-semibold tracking-tight text-ink">
        {s.isText ? s.v : <AnimatedCounter value={s.v} suffix={s.suffix} />}
      </div>
      <div className="text-sm text-subtle mt-2">{s.k}</div>
    </div>
  );
}

/* -------------------------------
   Animated Counter Component
--------------------------------- */
function AnimatedCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1600;
    let frame;
    let start;

    const tick = (timestamp) => {
      if (start === undefined) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(value * progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
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
