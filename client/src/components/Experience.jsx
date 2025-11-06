// src/components/Experience.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import { EXPERIENCE } from "../data/profileData";

export default function Experience() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-14">
      <SectionTitle kicker="Career" title="Experience & Leadership" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {EXPERIENCE.map((e) => (
          <GlassCard key={e.role}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{e.role}</div>
                <div className="text-sm text-white/60">{e.org}</div>
              </div>
              <div className="text-xs text-white/60">{e.period}</div>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc list-inside">
              {e.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </motion.div>
    </section>
  );
}
