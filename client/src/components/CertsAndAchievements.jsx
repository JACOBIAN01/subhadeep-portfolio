// src/components/CertsAndAchievements.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import { CERTS, ACHIEVEMENTS } from "../data/profileData";

export default function CertsAndAchievements() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  return (
    <section id="certs" className="mx-auto max-w-7xl px-4 py-14">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <SectionTitle kicker="Upskilling" title="Certificates" />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            {CERTS.map((c) => (
              <GlassCard key={c.name}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-white/60">{c.org}</div>
                  </div>
                  <div className="text-xs text-white/60">{c.date}</div>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>

        <div id="achievements">
          <SectionTitle kicker="Wins" title="Achievements" />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            {ACHIEVEMENTS.map((a) => (
              <GlassCard key={a}>
                <div className="text-sm md:text-base">{a}</div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
