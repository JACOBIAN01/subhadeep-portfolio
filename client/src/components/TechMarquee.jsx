// src/components/TechMarquee.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { STACK } from "../data/profileData";

export default function TechMarquee() {
  return (
    <div id="stack" className="border-t border-white/10 mt-20 md:mt-28">
      <div className="mx-auto max-w-6xl px-6 py-10 overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: [0, -600] }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {STACK.concat(STACK).map((t, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-500"
            >
              <span className="text-lg">{t.icon}</span>
              <span className="text-xs tracking-wide">{t.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
