// src/components/Hero.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { PROFILE, CONTACTS } from "../data/profileData";
import TechMarquee from "./TechMarquee";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-fuchsia-500/30 to-sky-400/30 blur-3xl" />
      <div className="pointer-events-none absolute top-0 -right-40 h-80 w-80 rounded-full bg-gradient-to-tr from-amber-300/30 to-purple-400/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pt-16 md:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="grid md:grid-cols-12 gap-8 items-center"
        >
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 mb-4 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to MERN roles & projects
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Building glossy, reliable web apps{" "}
              <span className="block text-white/60">
                with MERN, realtime & cloud.
              </span>
            </h1>

            <p className="mt-4 text-white/70">{PROFILE.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                View Projects
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
              >
                Connect on LinkedIn
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  className="inline-flex items-center gap-2 hover:text-white"
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-white/80">{c.icon}</span>
                  {c.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <GlassCard className="p-6 md:p-8">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-white/0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-6 bg-white/10 blur-2xl rounded-full" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 12,
                      ease: "linear",
                    }}
                    className="h-36 w-36 rounded-full border-2 border-white/30 grid place-content-center"
                  >
                    <div className="h-4 w-4 rounded-full bg-white/80" />
                  </motion.div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-lg font-medium">{PROFILE.name}</div>
                <div className="text-sm text-white/60">{PROFILE.title}</div>
                <div className="text-xs text-white/50 mt-1">
                  {PROFILE.location}
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>

      <TechMarquee />
    </section>
  );
}
