// src/components/TechMarquee.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { STACK } from "../data/profileData";

export default function TechMarquee() {
  return (
    <div id="stack" className="border-y border-white/10 bg-white/5">
      <div className="mx-auto max-w-7xl px-4 py-6 overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [0, -600] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          {STACK.concat(STACK).map((t, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 text-white/80"
            >
              <span>{t.icon}</span>
              <span className="text-sm">{t.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
