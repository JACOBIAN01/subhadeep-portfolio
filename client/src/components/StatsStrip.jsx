// src/components/StatsStrip.jsx
import GlassCard from "./GlassCard";

export default function StatsStrip() {
  const stats = [
    { k: "Live sessions", v: "3000+" },
    { k: "Student rating", v: "4.7/5" },
    { k: "Learners", v: "100+" },
    { k: "Tech stack", v: "MERN + Cloud" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <GlassCard key={s.k} className="py-4 text-center">
            <div className="text-2xl font-semibold">{s.v}</div>
            <div className="text-xs text-white/60">{s.k}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
