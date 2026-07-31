// src/components/SectionTitle.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function SectionTitle({ kicker, title, right }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {kicker && (
          <div className="text-sm font-medium tracking-wide text-accent mb-3">
            {kicker}
          </div>
        )}
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.1]">
          {title}
        </h2>
      </motion.div>
      {right && <div>{right}</div>}
    </div>
  );
}
