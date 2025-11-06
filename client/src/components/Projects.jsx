// src/components/Projects.jsx
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";
import { PROJECTS } from "../data/profileData";

export default function Projects() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-14">
      <SectionTitle kicker="Selected Work" title="Projects that ship value" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {PROJECTS.map((p) => (
          <motion.div key={p.name} variants={item}>
            <GlassCard>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <p className="mt-1 text-sm text-white/70">{p.desc}</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3">
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
                  >
                    <FaGithub /> Code{" "}
                    <FaExternalLinkAlt className="opacity-70" />
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-emerald-300 hover:text-emerald-200"
                  >
                    Live <FaExternalLinkAlt className="opacity-70" />
                  </a>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
