// src/components/StatsStrip.jsx
import { METRICS } from "../data/profileData";

// Static grid (no count-up, no scrolling) so the numbers can be read at a glance.
const STATS = [
  { k: "Live Sessions (Codingal)", v: METRICS.codingalSessions },
  { k: "Student Rating (Newton)", v: `${METRICS.rating}/5` },
  { k: "Learners", v: METRICS.learners },
  { k: "Lectures", v: METRICS.lectures },
  { k: "Workshops & Masterclasses", v: "5+" },
  { k: "CSAT", v: `${METRICS.csat}%` },
];

export function TeachingStats() {
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
      {STATS.map((s) => (
        <div key={s.k} className="bg-white border border-hairline rounded-3xl p-6">
          <div className="h-1 w-8 rounded-full bg-accent/70" />
          <div className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-ink">{s.v}</div>
          <div className="text-sm text-subtle mt-2">{s.k}</div>
        </div>
      ))}
    </div>
  );
}
