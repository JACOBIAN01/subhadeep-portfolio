// src/components/Achievements.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { ACHIEVEMENTS } from "../data/profileData";

const EASE = [0.16, 1, 0.3, 1];

export default function Achievements() {
  return (
    <section id="achievements" className="bg-canvas-alt">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <SectionTitle kicker="Recognition" title="Achievements" />

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 }}
              className="flex items-start gap-4 py-5 border-b border-hairline"
            >
              <span className="text-sm text-faint mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[17px] text-ink leading-relaxed">{a}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
