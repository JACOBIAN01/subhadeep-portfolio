// src/components/About.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ABOUT } from "../data/profileData";

const EASE = [0.16, 1, 0.3, 1];

export default function About() {
  return (
    <section id="about" className="bg-canvas">
      <div className="mx-auto max-w-3xl px-6 py-28 md:py-36">
        <div className="space-y-3 md:space-y-4">
          {ABOUT.lead.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              className={
                i === 0
                  ? "text-4xl md:text-5xl font-semibold tracking-tight text-ink leading-[1.15]"
                  : "text-2xl md:text-3xl font-medium tracking-tight text-subtle leading-tight"
              }
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          {ABOUT.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
              className="text-lg text-subtle leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 border-t border-hairline pt-10"
        >
          <h3 className="text-sm font-medium text-ink mb-5">At a glance</h3>
          <ul className="space-y-3">
            {ABOUT.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-[15px] text-subtle leading-relaxed"
              >
                <span className="mt-2.5 h-1 w-1 rounded-full bg-faint shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="mt-10 text-sm text-faint">
          {ABOUT.languages.join(" · ")}
        </p>
      </div>
    </section>
  );
}
